'use client';

import type { FooterContent } from '@/data/section-defaults';
import type { Theme } from '@/types/page';

interface FooterSectionProps {
  variant: string;
  content: FooterContent;
  theme: Theme;
  isEditing?: boolean;
  onUpdate?: (content: Partial<FooterContent>) => void;
}

function FooterMultiColumn({ content, theme }: { content: FooterContent; theme: Theme }) {
  return (
    <footer className="py-16 px-6" style={{ backgroundColor: theme.colorScheme === 'dark' ? '#030712' : '#f9fafb', color: theme.textColor }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-lg font-bold mb-3" style={{ fontFamily: theme.fontHeading }}>{content.companyName}</h3>
            {content.tagline && <p className="text-sm opacity-50" style={{ fontFamily: theme.fontBody }}>{content.tagline}</p>}
          </div>
          {content.columns.map((col, i) => (
            <div key={i}>
              <h4 className="text-sm font-semibold mb-4 opacity-70">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link, li) => (
                  <li key={li}>
                    <a href={link.href} className="text-sm opacity-50 hover:opacity-80 transition-opacity">{link.text}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: theme.colorScheme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }}>
          <p className="text-xs opacity-40">{content.copyright}</p>
          {content.socials.length > 0 && (
            <div className="flex gap-4">
              {content.socials.map((s, i) => (
                <a key={i} href={s.href} className="text-sm opacity-40 hover:opacity-70 transition-opacity capitalize">{s.platform}</a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}

function FooterSimple({ content, theme }: { content: FooterContent; theme: Theme }) {
  return (
    <footer className="py-12 px-6" style={{ backgroundColor: theme.colorScheme === 'dark' ? '#030712' : '#f9fafb', color: theme.textColor }}>
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-lg font-bold mb-2" style={{ fontFamily: theme.fontHeading }}>{content.companyName}</h3>
        {content.tagline && <p className="text-sm opacity-50 mb-6" style={{ fontFamily: theme.fontBody }}>{content.tagline}</p>}
        <div className="flex items-center justify-center gap-6 mb-8 flex-wrap">
          {content.columns.flatMap(col => col.links).slice(0, 6).map((link, i) => (
            <a key={i} href={link.href} className="text-sm opacity-50 hover:opacity-80 transition-opacity">{link.text}</a>
          ))}
        </div>
        <p className="text-xs opacity-40">{content.copyright}</p>
      </div>
    </footer>
  );
}

function FooterMinimal({ content, theme }: { content: FooterContent; theme: Theme }) {
  return (
    <footer className="py-8 px-6" style={{ backgroundColor: theme.colorScheme === 'dark' ? '#030712' : '#f9fafb', color: theme.textColor }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-semibold" style={{ fontFamily: theme.fontHeading }}>{content.companyName}</p>
        <p className="text-xs opacity-40">{content.copyright}</p>
      </div>
    </footer>
  );
}

export function FooterSection({ variant, content, theme }: FooterSectionProps) {
  const footerContent = content as FooterContent;
  switch (variant) {
    case 'simple': return <FooterSimple content={footerContent} theme={theme} />;
    case 'minimal': return <FooterMinimal content={footerContent} theme={theme} />;
    default: return <FooterMultiColumn content={footerContent} theme={theme} />;
  }
}
