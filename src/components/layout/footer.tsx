import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail, ChevronRight } from 'lucide-react';

const footerLinks = [
  {
    title: 'Company',
    links: [
      { href: '/story', label: 'About Us' },
      { href: '/story', label: 'Our Story' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms & Conditions' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { href: '/contact', label: 'Contact Us' },
    ],
  },
];

const socialLinks = [
  { href: 'https://www.facebook.com/profile.php?id=61564700682320', label: 'Facebook', icon: Facebook },
  { href: 'https://instagram.com', label: 'Instagram', icon: Instagram },
  { href: 'https://youtube.com', label: 'YouTube', icon: Youtube },
];

export function Footer() {
  return (
    <footer className="bg-[#44362A] relative">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23927557' fill-opacity='0.5'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Gold accent bar */}
      <div className="relative h-[3px] bg-gradient-to-r from-transparent via-[#927557] to-transparent opacity-60" />

      {/* Newsletter / CTA strip */}
      <div className="relative border-b border-[#927557]/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-heading text-xl font-bold text-white">Stay Connected</h3>
              <p className="text-[#C5BEB3] text-sm mt-1">Get the latest brews and exclusive offers.</p>
            </div>
            <a
              href="mailto:hello@181lounge.ph"
              className="inline-flex items-center gap-2 bg-[#927557] hover:bg-[#7a6348] text-white px-6 py-3 rounded-lg font-semibold text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Subscribe to Newsletter
              <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand Column */}
          <div className="lg:col-span-5">
            <Link to="/" className="inline-block mb-6">
              <img
                src="/images/logo.jpg"
                alt="181 Lounge"
                className="h-20 w-20 rounded-full object-cover ring-4 ring-[#927557]/20 shadow-lg shadow-black/20"
              />
            </Link>
            <h3 className="font-heading text-3xl font-bold text-white mb-3 tracking-tight">
              181 Lounge
            </h3>
            <p className="text-[#C5BEB3] leading-relaxed max-w-md text-sm">
              Experience the smooth, rich taste of 181 Lounge. From our carefully
              selected beans to your cup, we deliver premium coffee experiences.
              Browse our curated books, enjoy a boardgame, and make every visit memorable.
            </p>

            <div className="mt-8 space-y-4">
              <a
                href="https://maps.google.com/?q=35+Mamatid+Cabuyao+Philippines+4025"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#C5BEB3] hover:text-[#927557] transition-colors group"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#927557]/10 group-hover:bg-[#927557]/20 transition-colors">
                  <MapPin className="h-4 w-4 text-[#927557]" />
                </span>
                <span className="text-sm">35 Mamatid, Cabuyao, Philippines 4025</span>
              </a>
              <a
                href="tel:09487510923"
                className="flex items-center gap-3 text-[#C5BEB3] hover:text-[#927557] transition-colors group"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#927557]/10 group-hover:bg-[#927557]/20 transition-colors">
                  <Phone className="h-4 w-4 text-[#927557]" />
                </span>
                <span className="text-sm">0948 751 0923</span>
              </a>
              <a
                href="mailto:hello@181lounge.ph"
                className="flex items-center gap-3 text-[#C5BEB3] hover:text-[#927557] transition-colors group"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#927557]/10 group-hover:bg-[#927557]/20 transition-colors">
                  <Mail className="h-4 w-4 text-[#927557]" />
                </span>
                <span className="text-sm">hello@181lounge.ph</span>
              </a>
            </div>
          </div>

          {/* Link Columns */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {footerLinks.map((group) => (
              <div key={group.title}>
                <h4 className="font-heading text-sm font-bold text-white uppercase tracking-[0.15em] mb-6">
                  <span className="inline-block pb-2 border-b-2 border-[#927557]/40">{group.title}</span>
                </h4>
                <ul className="space-y-4">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="text-[#C5BEB3] text-sm hover:text-white transition-colors inline-flex items-center gap-2 group"
                      >
                        <span className="h-1 w-1 rounded-full bg-[#927557]/0 group-hover:bg-[#927557] transition-all duration-300" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Social */}
          <div className="lg:col-span-3">
            <h4 className="font-heading text-sm font-bold text-white uppercase tracking-[0.15em] mb-6">
              <span className="inline-block pb-2 border-b-2 border-[#927557]/40">Follow Us</span>
            </h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#927557]/10 text-[#927557] hover:bg-[#927557] hover:text-white transition-all duration-300 hover:scale-110 active:scale-95"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
            <p className="text-[#C5BEB3]/70 text-sm mt-6 leading-relaxed">
              Follow us on social media for the latest updates, promotions, and behind-the-scenes content.
            </p>

            {/* Decorative quote */}
            <div className="mt-8 pt-6 border-t border-[#927557]/10">
              <p className="text-[#C5BEB3]/50 text-xs italic leading-relaxed">
                &ldquo;Coffee is a language in itself.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-[#927557]/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#C5BEB3]/70 text-xs">
              &copy; {new Date().getFullYear()} 181 Lounge. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-[#C5BEB3]/70 hover:text-[#927557] text-xs transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-[#C5BEB3]/70 hover:text-[#927557] text-xs transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
