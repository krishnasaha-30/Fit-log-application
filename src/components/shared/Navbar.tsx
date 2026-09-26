"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { usePlan } from "@/context/PlanContext";
import Image from "next/image";
import logoImg from "@/assets/logo.png";



const navLinks = [
  { label: "Workout", href: "/" },
  { label: "My Plan", href: "/my-plan" },
];

const Navbar = () => {
  const pathname = usePathname();
  const { todaysPlan, saved } = usePlan();

  return (
    <nav className="sticky top-0 z-50 border-b border-base-300 bg-base-100/90 backdrop-blur">
      <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg  text-primary-content font-display text-lg font-bold">
            <Image
                src={logoImg}
                alt="Books"
                priority
                className="h-auto w-full object-cover transition duration-500 hover:scale-105"
              />
          </span>
          <span className="font-display text-xl font-bold tracking-wide">
            FITLOG
          </span>
        </Link>

        {/* Nav links */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`font-display text-sm font-semibold uppercase tracking-wide transition-colors ${
                    isActive
                      ? "text-primary"
                      : "text-base-content/60 hover:text-base-content"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Badges */}
        <div className="flex items-center gap-2">
          <Link
            href="/my-plan"
            className="rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary-content"
          >
            Plan {todaysPlan.length}
          </Link>
          <Link
            href="/my-plan"
            className="rounded-full border border-base-300 px-3 py-1 text-xs font-bold uppercase tracking-wide text-base-content"
          >
            Saved {saved.length}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
