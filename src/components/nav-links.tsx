'use client';

import Link from 'next/link';

const navLinks = [
  { href: '/#about', label: 'About' },
  { href: '/#services', label: 'Services' },
  { href: '/#portfolio', label: 'Portfolio' },
  { href: '/merch', label: 'Merch' },
  { href: '/blog', label: 'Blog' },
  { href: '/#contact', label: 'Contact' },
];

interface NavLinksProps {
    onLinkClick: () => void;
}

export function NavLinks({ onLinkClick }: NavLinksProps) {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      const targetId = href.substring(2);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
    onLinkClick();
  };

  return (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="hover:text-primary transition-colors"
          prefetch={!link.href.startsWith('/#')}
          onClick={(e) => handleLinkClick(e, link.href)}
        >
          {link.label}
        </Link>
      ))}
    </>
  );
}
