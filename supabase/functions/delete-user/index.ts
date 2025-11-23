import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

Deno.serve(async (req) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  }

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    // Get the authorization header from the request
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('Missing authorization header')
    }

    // Verify the user making the request
    const token = authHeader.replace('Bearer ', '')
    const { data: { user: requestingUser }, error: authError } = await supabaseClient.auth.getUser(token)
    
    if (authError || !requestingUser) {
      throw new Error('Unauthorized')
    }

    // Check if requesting user is admin
    const { data: roles, error: roleError } = await supabaseClient
      .from('user_roles')
      .select('role')
      .eq('user_id', requestingUser.id)
      .single()

    if (roleError || roles?.role !== 'admin') {
      throw new Error('Forbidden: Admin access required')
    }

    // Get user ID to delete from request body
    const { userId } = await req.json()
    
    if (!userId) {
      throw new Error('Missing userId in request body')
    }

    // Prevent admin from deleting themselves
    if (userId === requestingUser.id) {
      throw new Error('Cannot delete your own account')
    }

    // Delete the user using admin API
    const { error: deleteError } = await supabaseClient.auth.admin.deleteUser(userId)

    if (deleteError) {
      throw deleteError
    }

    return new Response(
      JSON.stringify({ success: true }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    )
  }
})
