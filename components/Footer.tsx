"use client";

export function Footer() {
  return (
    <footer
      className="border-t border-neutral-200 py-8 sm:py-12 bg-white"
      data-centje-footer
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center gap-4 sm:gap-6 md:flex-row md:justify-between">
          <div className="flex items-center gap-3">
            <span className="text-lg sm:text-xl font-bold text-neutral-900 tracking-tight">
              centje
            </span>
            <span className="text-xs sm:text-sm text-neutral-400">
              &copy; {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
