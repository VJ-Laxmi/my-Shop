import { Link } from "react-router-dom";

{/* Footer */}
export default function Footer() {
  return (
    <div>
      <footer className="bg-black text-white mt-12">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
            {/* Logo / Intro */}
            <div className="w-full lg:w-1/4">
              <Link to="/" className="inline-flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold">S</div>
                <span className="text-xl font-semibold">ShopCart</span>
              </Link>
              <p className="text-sm text-muted-foreground mt-4 max-w-xs">
                Quality goods, honest prices. Curated collections and fast shipping.
              </p>
            </div>

            {/* flexible spacer to push the social/CTA area to the right */}
            <div className="hidden lg:block flex-1" />
            
            {/* Social / CTA */}
            <div className="w-full lg:w-1/4 flex flex-col items-start lg:items-end gap-4">
              <div className="flex gap-3">
                <a aria-label="X (Twitter)" href="#" className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center">X</a>
                <a aria-label="Facebook" href="#" className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center">f</a>
                <a aria-label="Instagram" href="#" className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center">◎</a>
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                <a href="/#" className="hover:text-white">Sign up for updates</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800">
          <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <span className="sr-only">Region</span>
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 100 20 10 10 0 000-20z"/></svg>
              <span>Croatia</span>
              <span>© {new Date().getFullYear()} ShopCart. All Rights Reserved.</span>
            </div>
            <div className="mt-3 md:mt-0 flex gap-6">
              <Link to="/#" className="hover:text-white">Guides</Link>
              <Link to="/#" className="hover:text-white">Terms of Sale</Link>
              <Link to="/#" className="hover:text-white">Terms of Use</Link>
              <Link to="/#" className="hover:text-white">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};