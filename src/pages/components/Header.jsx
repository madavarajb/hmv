// import { Moon, Sun } from "lucide-react";

const Header = () => {
    return (
        <header
            className="sticky w-full z-50 top-0 border-b bg-background/95 backdrop-blur py-2 
      supports-[backdrop-filter]:bg-background/60"
        >
            {/* Header text */}
            <div className=" mx-auto flex items-center justify-between  px-5 h-12">
                {/* theme Toggle */}
                {/* <div
          onClick={HandleTheme}
          className={`flex items-center transition-transform duration-500 ${
            isDark ? "rotate-180" : "rotate-0"
          }`}
        >
          {isDark ? (
            <Sun className="h-6 w-6 text-yellow-500 rotate-0 transition-all" />
          ) : (
            <Moon className="h-6 w-6 text-blue-500 rotate-0 transition-all" />
          )}
        </div> */}
            </div>
        </header>
    );
};

export default Header;
