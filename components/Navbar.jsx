"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <Link href="/" onClick={closeMenu}>
        <img src="/img/logo.png" height="60" alt="Logo" className="logo" />
      </Link>

      {/* Hamburger Icon */}
      <div
        className={`hamburger ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        <Link
          href="/"
          className={pathname === "/" ? "active" : ""}
          onClick={closeMenu}
        >
          Home
        </Link>
        <Link
          href="/about"
          className={pathname === "/about" ? "active" : ""}
          onClick={closeMenu}
        >
          About us
        </Link>
        <Link
          href="/careers"
          className={pathname === "/careers" ? "active" : ""}
          onClick={closeMenu}
        >
          Careers
        </Link>
        <Link
          href="/contact"
          className={pathname === "/contact" ? "active" : ""}
          onClick={closeMenu}
        >
          Contact us
        </Link>
      </div>
    </nav>
  );
}
