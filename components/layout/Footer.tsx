import { studio } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-canvas">
      <div className="container-page grid gap-16 py-16 md:grid-cols-12 md:gap-8 md:py-24">
        <div className="md:col-span-5">
          <div className="font-display text-2xl leading-none tracking-title">
            {studio.name}
          </div>
          <p className="mt-6 max-w-xs text-sm text-muted">{studio.tagline}</p>
        </div>

        <div className="md:col-span-4">
          <div className="eyebrow mb-4">Studio</div>
          <address className="not-italic text-sm leading-6 text-ink/80">
            {studio.address.line1}
            <br />
            {studio.address.line2}
            <br />
            {studio.address.line3}
          </address>
          <address className="mt-6 not-italic text-sm leading-6 text-ink/60">
            {studio.altAddress.line1}
            <br />
            {studio.altAddress.line2}
            <br />
            {studio.altAddress.line3}
          </address>
        </div>

        <div className="md:col-span-3">
          <div className="eyebrow mb-4">Contact</div>
          <a
            href={studio.phoneHref}
            className="block text-sm text-ink/80 hover:text-ink"
          >
            {studio.phone}
          </a>
          <ul className="mt-8 space-y-2 text-sm text-ink/60">
            <li>
              <a href="#portfolio" className="hover:text-ink">
                Projects
              </a>
            </li>
            <li>
              <a href="#story" className="hover:text-ink">
                3D Renders
              </a>
            </li>
            <li>
              <a href="#process" className="hover:text-ink">
                Process
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-ink">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ink/10">
        <div className="container-page flex flex-col gap-2 py-6 text-[11px] uppercase tracking-eyebrow text-muted md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} {studio.short}</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-ink">
              Privacy
            </a>
            <a href="#" className="hover:text-ink">
              Cookies
            </a>
            <a href="#" className="hover:text-ink">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
