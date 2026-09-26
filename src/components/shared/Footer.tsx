import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-base-300 bg-base-200">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-content font-display text-sm font-bold">
            F
          </span>
          <span className="font-display text-lg font-bold tracking-wide">
            FITLOG
          </span>
        </div>

        <p className="text-sm text-base-content/60">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
