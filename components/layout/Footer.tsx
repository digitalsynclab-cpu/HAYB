export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#2563EB]/15 py-6 px-4">
      <div className="max-w-7xl mx-auto text-center sm:text-left">
        <p className="text-[#8BA3C7] text-sm">
          © {currentYear} HAYB. Tüm hakları saklıdır.
        </p>
        <p className="text-[#8BA3C7]/40 text-xs mt-1">
          Developer · Yunus Emre Başkan
        </p>
      </div>
    </footer>
  );
}
