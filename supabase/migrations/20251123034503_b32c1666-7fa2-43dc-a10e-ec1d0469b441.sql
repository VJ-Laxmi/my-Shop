-- Add last_login column to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS last_login timestamp with time zone;

-- Clean up orphaned profiles (profiles where user doesn't exist in auth.users)
DELETE FROM public.profiles 
WHERE user_id NOT IN (SELECT id FROM auth.users);

-- Clean up orphaned user_roles
DELETE FROM public.user_roles 
WHERE user_id NOT IN (SELECT id FROM auth.users);

-- Now add foreign key constraints with cascade delete
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_user_id_fkey;
ALTER TABLE public.profiles ADD CONSTRAINT profiles_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.user_roles DROP CONSTRAINT IF EXISTS user_roles_user_id_fkey;
ALTER TABLE public.user_roles ADD CONSTRAINT user_roles_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Users can update their own last login" ON public.profiles;

-- Policy to allow users to update their own last_login
CREATE POLICY "Users can update their own last login"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);