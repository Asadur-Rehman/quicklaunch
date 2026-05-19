import type { Page, Section, Theme } from '@/types/page';

function esc(val: unknown): string {
  if (val == null) return '';
  return String(val)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function get<T = string>(obj: Record<string, unknown>, key: string): T {
  return obj[key] as T;
}

function radii(r: Theme['borderRadius']): string {
  const map = { none: '0', sm: '0.25rem', md: '0.5rem', lg: '1rem', full: '9999px' };
  return map[r] ?? '0.5rem';
}

// ─── Section generators ─────────────────────────────────────────────────────

function heroHTML(c: Record<string, unknown>, t: Theme, r: string): string {
  const primary = get(c, 'primaryCta') as { text: string; href: string } | undefined;
  const secondary = get(c, 'secondaryCta') as { text: string; href: string } | undefined;
  const badge = get(c, 'badge');

  return `
<section style="background:${t.backgroundColor};padding:5rem 1.5rem 4rem;text-align:center;">
  <div style="max-width:56rem;margin:0 auto;">
    ${badge ? `<span style="display:inline-block;padding:0.25rem 1rem;border-radius:9999px;background:${t.primaryColor}22;color:${t.primaryColor};font-size:0.8125rem;font-weight:600;margin-bottom:1.5rem;">${esc(badge)}</span>` : ''}
    <h1 style="font-family:'${t.fontHeading}',sans-serif;font-size:clamp(2.25rem,5vw,3.75rem);font-weight:800;line-height:1.1;color:${t.textColor};margin-bottom:1.5rem;">${esc(get(c, 'headline'))}</h1>
    <p style="font-size:clamp(1rem,2vw,1.25rem);color:${t.textColor}bb;margin-bottom:2.5rem;max-width:40rem;margin-left:auto;margin-right:auto;line-height:1.6;">${esc(get(c, 'subheadline'))}</p>
    <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;">
      ${primary ? `<a href="${esc(primary.href)}" style="display:inline-block;padding:0.875rem 2rem;border-radius:${r};background:${t.primaryColor};color:#fff;font-weight:700;font-size:1rem;font-family:'${t.fontBody}',sans-serif;">${esc(primary.text)}</a>` : ''}
      ${secondary ? `<a href="${esc(secondary.href)}" style="display:inline-block;padding:0.875rem 2rem;border-radius:${r};border:2px solid ${t.primaryColor};color:${t.primaryColor};font-weight:600;font-size:1rem;font-family:'${t.fontBody}',sans-serif;">${esc(secondary.text)}</a>` : ''}
    </div>
  </div>
</section>`;
}

function featuresHTML(c: Record<string, unknown>, t: Theme, r: string): string {
  const features = (get(c, 'features') as Array<{ title: string; description: string }>) ?? [];

  return `
<section style="background:${t.backgroundColor};padding:5rem 1.5rem;">
  <div style="max-width:72rem;margin:0 auto;">
    <div style="text-align:center;margin-bottom:3.5rem;">
      <h2 style="font-family:'${t.fontHeading}',sans-serif;font-size:clamp(1.75rem,3vw,2.75rem);font-weight:800;color:${t.textColor};margin-bottom:1rem;">${esc(get(c, 'headline'))}</h2>
      <p style="font-size:1.125rem;color:${t.textColor}99;max-width:36rem;margin:0 auto;line-height:1.6;">${esc(get(c, 'subheadline'))}</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(17rem,1fr));gap:1.5rem;">
      ${features.map(f => `
      <div style="padding:2rem;border-radius:${r};border:1px solid ${t.primaryColor}22;background:${t.primaryColor}08;">
        <h3 style="font-family:'${t.fontHeading}',sans-serif;font-size:1.125rem;font-weight:700;color:${t.textColor};margin-bottom:0.75rem;">${esc(f.title)}</h3>
        <p style="font-size:0.9375rem;color:${t.textColor}99;line-height:1.6;">${esc(f.description)}</p>
      </div>`).join('')}
    </div>
  </div>
</section>`;
}

function howItWorksHTML(c: Record<string, unknown>, t: Theme, r: string): string {
  const steps = (get(c, 'steps') as Array<{ number: number; title: string; description: string }>) ?? [];

  return `
<section style="background:${t.primaryColor}08;padding:5rem 1.5rem;">
  <div style="max-width:72rem;margin:0 auto;">
    <div style="text-align:center;margin-bottom:3.5rem;">
      <h2 style="font-family:'${t.fontHeading}',sans-serif;font-size:clamp(1.75rem,3vw,2.75rem);font-weight:800;color:${t.textColor};margin-bottom:1rem;">${esc(get(c, 'headline'))}</h2>
      <p style="font-size:1.125rem;color:${t.textColor}99;max-width:36rem;margin:0 auto;line-height:1.6;">${esc(get(c, 'subheadline'))}</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(17rem,1fr));gap:2rem;">
      ${steps.map(step => `
      <div style="text-align:center;padding:1.5rem;">
        <div style="display:inline-flex;align-items:center;justify-content:center;width:3.5rem;height:3.5rem;border-radius:${r};background:${t.primaryColor};color:#fff;font-size:1.25rem;font-weight:800;font-family:'${t.fontHeading}',sans-serif;margin-bottom:1.25rem;">${step.number}</div>
        <h3 style="font-family:'${t.fontHeading}',sans-serif;font-size:1.125rem;font-weight:700;color:${t.textColor};margin-bottom:0.625rem;">${esc(step.title)}</h3>
        <p style="font-size:0.9375rem;color:${t.textColor}99;line-height:1.6;">${esc(step.description)}</p>
      </div>`).join('')}
    </div>
  </div>
</section>`;
}

function testimonialsHTML(c: Record<string, unknown>, t: Theme, r: string): string {
  const items = (get(c, 'testimonials') as Array<{ quote: string; author: string; role: string; company: string }>) ?? [];
  const stars = '★★★★★';

  return `
<section style="background:${t.backgroundColor};padding:5rem 1.5rem;">
  <div style="max-width:72rem;margin:0 auto;">
    <h2 style="font-family:'${t.fontHeading}',sans-serif;font-size:clamp(1.75rem,3vw,2.75rem);font-weight:800;color:${t.textColor};text-align:center;margin-bottom:3rem;">${esc(get(c, 'headline'))}</h2>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(18rem,1fr));gap:1.5rem;">
      ${items.map(item => `
      <div style="padding:2rem;border-radius:${r};border:1px solid ${t.primaryColor}22;background:${t.primaryColor}06;">
        <div style="color:${t.accentColor};font-size:1rem;margin-bottom:1rem;letter-spacing:0.1em;">${stars}</div>
        <p style="font-size:0.9375rem;color:${t.textColor}cc;line-height:1.7;margin-bottom:1.5rem;font-style:italic;">&ldquo;${esc(item.quote)}&rdquo;</p>
        <div>
          <p style="font-weight:700;color:${t.textColor};font-family:'${t.fontHeading}',sans-serif;font-size:0.9375rem;">${esc(item.author)}</p>
          <p style="font-size:0.8125rem;color:${t.textColor}77;">${esc(item.role)} · ${esc(item.company)}</p>
        </div>
      </div>`).join('')}
    </div>
  </div>
</section>`;
}

function pricingHTML(c: Record<string, unknown>, t: Theme, r: string): string {
  const tiers = (get(c, 'tiers') as Array<{
    name: string; price: string; period: string; description: string;
    features: string[]; cta: { text: string; href: string }; highlighted?: boolean;
  }>) ?? [];

  return `
<section style="background:${t.primaryColor}08;padding:5rem 1.5rem;">
  <div style="max-width:72rem;margin:0 auto;">
    <div style="text-align:center;margin-bottom:3.5rem;">
      <h2 style="font-family:'${t.fontHeading}',sans-serif;font-size:clamp(1.75rem,3vw,2.75rem);font-weight:800;color:${t.textColor};margin-bottom:1rem;">${esc(get(c, 'headline'))}</h2>
      <p style="font-size:1.125rem;color:${t.textColor}99;max-width:36rem;margin:0 auto;line-height:1.6;">${esc(get(c, 'subheadline'))}</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(18rem,1fr));gap:1.5rem;max-width:52rem;margin:0 auto;">
      ${tiers.map(tier => `
      <div style="padding:2rem;border-radius:${r};background:${t.backgroundColor};border:${tier.highlighted ? `2px solid ${t.primaryColor}` : `1px solid ${t.primaryColor}22`};${tier.highlighted ? `box-shadow:0 0 32px ${t.primaryColor}30;` : ''}">
        <h3 style="font-family:'${t.fontHeading}',sans-serif;font-size:1.25rem;font-weight:700;color:${t.textColor};margin-bottom:0.375rem;">${esc(tier.name)}</h3>
        <p style="font-size:0.875rem;color:${t.textColor}77;margin-bottom:1.5rem;">${esc(tier.description)}</p>
        <div style="margin-bottom:1.5rem;">
          <span style="font-family:'${t.fontHeading}',sans-serif;font-size:2.5rem;font-weight:800;color:${t.textColor};">${esc(tier.price)}</span>
          <span style="font-size:0.875rem;color:${t.textColor}77;margin-left:0.375rem;">/ ${esc(tier.period)}</span>
        </div>
        <ul style="list-style:none;padding:0;margin:0 0 1.75rem;display:flex;flex-direction:column;gap:0.625rem;">
          ${tier.features.map(f => `<li style="display:flex;align-items:flex-start;gap:0.625rem;font-size:0.9375rem;color:${t.textColor}cc;"><span style="color:${t.accentColor};flex-shrink:0;margin-top:0.1em;">✓</span>${esc(f)}</li>`).join('')}
        </ul>
        <a href="${esc(tier.cta.href)}" style="display:block;text-align:center;padding:0.75rem 1.5rem;border-radius:${r};background:${tier.highlighted ? t.primaryColor : 'transparent'};color:${tier.highlighted ? '#fff' : t.primaryColor};border:2px solid ${t.primaryColor};font-weight:700;font-size:0.9375rem;font-family:'${t.fontBody}',sans-serif;">${esc(tier.cta.text)}</a>
      </div>`).join('')}
    </div>
  </div>
</section>`;
}

function faqHTML(c: Record<string, unknown>, t: Theme, r: string): string {
  const questions = (get(c, 'questions') as Array<{ question: string; answer: string }>) ?? [];

  return `
<section style="background:${t.backgroundColor};padding:5rem 1.5rem;">
  <div style="max-width:48rem;margin:0 auto;">
    <div style="text-align:center;margin-bottom:3rem;">
      <h2 style="font-family:'${t.fontHeading}',sans-serif;font-size:clamp(1.75rem,3vw,2.75rem);font-weight:800;color:${t.textColor};margin-bottom:1rem;">${esc(get(c, 'headline'))}</h2>
      <p style="font-size:1.125rem;color:${t.textColor}99;line-height:1.6;">${esc(get(c, 'subheadline'))}</p>
    </div>
    <div style="display:flex;flex-direction:column;gap:1rem;">
      ${questions.map(q => `
      <div style="padding:1.5rem;border-radius:${r};border:1px solid ${t.primaryColor}22;background:${t.primaryColor}06;">
        <h3 style="font-family:'${t.fontHeading}',sans-serif;font-size:1rem;font-weight:700;color:${t.textColor};margin-bottom:0.625rem;">${esc(q.question)}</h3>
        <p style="font-size:0.9375rem;color:${t.textColor}99;line-height:1.6;">${esc(q.answer)}</p>
      </div>`).join('')}
    </div>
  </div>
</section>`;
}

function ctaHTML(c: Record<string, unknown>, t: Theme, r: string): string {
  const cta = get(c, 'cta') as { text: string; href: string } | undefined;
  const badge = get(c, 'badge');

  return `
<section style="background:${t.primaryColor};padding:5rem 1.5rem;text-align:center;">
  <div style="max-width:48rem;margin:0 auto;">
    ${badge ? `<span style="display:inline-block;padding:0.25rem 1rem;border-radius:9999px;background:rgba(255,255,255,0.2);color:#fff;font-size:0.8125rem;font-weight:600;margin-bottom:1.5rem;">${esc(badge)}</span>` : ''}
    <h2 style="font-family:'${t.fontHeading}',sans-serif;font-size:clamp(1.75rem,3vw,2.75rem);font-weight:800;color:#fff;margin-bottom:1rem;line-height:1.2;">${esc(get(c, 'headline'))}</h2>
    <p style="font-size:1.125rem;color:rgba(255,255,255,0.75);margin-bottom:2.5rem;line-height:1.6;">${esc(get(c, 'subheadline'))}</p>
    ${cta ? `<a href="${esc(cta.href)}" style="display:inline-block;padding:1rem 2.5rem;border-radius:${r};background:#fff;color:${t.primaryColor};font-weight:800;font-size:1rem;font-family:'${t.fontBody}',sans-serif;">${esc(cta.text)}</a>` : ''}
  </div>
</section>`;
}

function footerHTML(c: Record<string, unknown>, t: Theme): string {
  const cols = (get(c, 'columns') as Array<{ title: string; links: Array<{ text: string; href: string }> }>) ?? [];
  const socials = (get(c, 'socials') as Array<{ platform: string; href: string }>) ?? [];

  return `
<footer style="background:${t.backgroundColor};border-top:1px solid ${t.primaryColor}22;padding:3.5rem 1.5rem 2rem;">
  <div style="max-width:72rem;margin:0 auto;">
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(12rem,1fr));gap:2.5rem;margin-bottom:3rem;">
      <div>
        <p style="font-family:'${t.fontHeading}',sans-serif;font-size:1.25rem;font-weight:800;color:${t.textColor};margin-bottom:0.5rem;">${esc(get(c, 'companyName'))}</p>
        ${get(c, 'tagline') ? `<p style="font-size:0.875rem;color:${t.textColor}88;line-height:1.5;">${esc(get(c, 'tagline'))}</p>` : ''}
        ${socials.length ? `<div style="display:flex;gap:0.75rem;margin-top:1rem;">${socials.map(s => `<a href="${esc(s.href)}" style="font-size:0.8125rem;color:${t.primaryColor};border:1px solid ${t.primaryColor}44;padding:0.25rem 0.625rem;border-radius:0.25rem;">${esc(s.platform)}</a>`).join('')}</div>` : ''}
      </div>
      ${cols.map(col => `
      <div>
        <p style="font-size:0.75rem;font-weight:700;color:${t.textColor}77;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:1rem;">${esc(col.title)}</p>
        <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:0.625rem;">
          ${col.links.map(l => `<li><a href="${esc(l.href)}" style="font-size:0.9375rem;color:${t.textColor}99;">${esc(l.text)}</a></li>`).join('')}
        </ul>
      </div>`).join('')}
    </div>
    <div style="border-top:1px solid ${t.primaryColor}22;padding-top:1.5rem;text-align:center;">
      <p style="font-size:0.875rem;color:${t.textColor}66;">${esc(get(c, 'copyright'))}</p>
    </div>
  </div>
</footer>`;
}

function generateSectionHTML(section: Section, theme: Theme, r: string): string {
  const c = section.content;
  switch (section.type) {
    case 'hero':          return heroHTML(c, theme, r);
    case 'features':      return featuresHTML(c, theme, r);
    case 'how-it-works':  return howItWorksHTML(c, theme, r);
    case 'testimonials':  return testimonialsHTML(c, theme, r);
    case 'pricing':       return pricingHTML(c, theme, r);
    case 'faq':           return faqHTML(c, theme, r);
    case 'cta':           return ctaHTML(c, theme, r);
    case 'footer':        return footerHTML(c, theme);
    default:              return '';
  }
}

// ─── Main export ─────────────────────────────────────────────────────────────

export function generateHTML(page: Page): string {
  const { theme } = page;
  const r = radii(theme.borderRadius);

  const sectionsHtml = page.sections
    .filter(s => s.isVisible)
    .sort((a, b) => a.order - b.order)
    .map(s => generateSectionHTML(s, theme, r))
    .join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(page.title)}</title>
  <meta name="description" content="${esc(page.description)}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=${theme.fontHeading.replace(/ /g, '+')}:wght@400;600;700;800&family=${theme.fontBody.replace(/ /g, '+')}:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    body { margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
    a { text-decoration: none; }
    img { max-width: 100%; height: auto; }
  </style>
</head>
<body>
${sectionsHtml}
</body>
</html>`;
}
