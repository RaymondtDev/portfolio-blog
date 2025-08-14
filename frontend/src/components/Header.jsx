import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Button from "./ux/Button";

function Header() {
  const { user } = useAuth();
  const headerRef = useRef(null);

  useEffect(() => {
    if (headerRef.current) {
      const headerHeight = headerRef.current.offsetHeight;

      document.documentElement.style.setProperty(
        "--header-height",
        `${headerHeight}px`
      )
    }
  }, [])

  return (
    <header ref={headerRef} className="prose flex justify-between items-center w-svw md:w-[80vw] h-[80px] md:h-[60px] fixed top-0 left-1/2 -translate-x-1/2  bg-gray-100 px-5 shadow-md max-w-none md:mt-2 md:rounded-md overflow-y-hidden z-50" style={{ marginInline: "auto" }}>
      <div className="h-fit w-24 grid place-items-center">
        <img src="/logo.png" alt="logo" className="max-h-full scale-150 object-contain"/>
      </div>
      <nav className={`flex justify-stretch items-center`}>
        <Link to="/" className="py-4 px-2.5 text-[var(--text-color)] hover:bg-gray-300">Home</Link>
        <Link to="/blog" className="py-4 px-3 text-[var(--text-color)] hover:bg-gray-300">Blog</Link>
        { user ? 
          (<Button link="/dashboard" className="hidden md:block bg-[var(--btn-color)] h-fit hover:bg-[var(--btn-hover)] sm:ml-3 text-white font-bold">Dashboard</Button>) : 
          (<Button link="/login" className="hidden md:block bg-[var(--btn-color)] h-fit hover:bg-[var(--btn-hover)] sm:ml-3 text-white font-bold">Login</Button>)
        }
      </nav>
    </header>
  );
}

export default Header;