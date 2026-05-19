import React from 'react';
import { renderToString } from 'react-dom/server';
import type { Page } from '@/types/page';
import { SectionRenderer } from '@/components/editor/section-renderer';

export function generateHTML(page: Page): string {
  // Convert sections to HTML string
  const sectionsHtml = renderToString(
    <div className="min-h-screen bg-background text-foreground font-body">
      {page.sections.filter(s => s.isVisible).map(section => (
        <SectionRenderer
          key={section.id}
          section={section}
          theme={page.theme}
          isEditing={false}
        />
      ))}
    </div>
  );

  const { theme } = page;
  
  // Create a clean, self-contained HTML document
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${page.title}</title>
  <meta name="description" content="${page.description}">
  
  <!-- Tailwind CSS Play CDN for instant styling -->
  <script src="https://unpkg.com/@tailwindcss/browser@4"></script>
  
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=${theme.fontHeading.replace(/ /g, '+')}:wght@400;600;700;800&family=${theme.fontBody.replace(/ /g, '+')}:wght@400;500;600&display=swap" rel="stylesheet">
  
  <style type="text/tailwindcss">
    @theme {
      --color-background: ${theme.backgroundColor};
      --color-foreground: ${theme.textColor};
      --color-primary: ${theme.primaryColor};
      --color-secondary: ${theme.secondaryColor};
      --color-accent: ${theme.accentColor};
      
      --font-heading: "${theme.fontHeading}", sans-serif;
      --font-body: "${theme.fontBody}", sans-serif;
      
      --radius-sm: ${theme.borderRadius === 'none' ? '0' : theme.borderRadius === 'sm' ? '0.125rem' : theme.borderRadius === 'md' ? '0.25rem' : theme.borderRadius === 'lg' ? '0.5rem' : '0.5rem'};
      --radius-md: ${theme.borderRadius === 'none' ? '0' : theme.borderRadius === 'sm' ? '0.25rem' : theme.borderRadius === 'md' ? '0.375rem' : theme.borderRadius === 'lg' ? '0.5rem' : '0.5rem'};
      --radius-lg: ${theme.borderRadius === 'none' ? '0' : theme.borderRadius === 'sm' ? '0.375rem' : theme.borderRadius === 'md' ? '0.5rem' : theme.borderRadius === 'lg' ? '1rem' : '1rem'};
      --radius-full: 9999px;
    }
    
    body {
      background-color: var(--color-background);
      color: var(--color-foreground);
      font-family: var(--font-body);
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }
    
    h1, h2, h3, h4, h5, h6 {
      font-family: var(--font-heading);
    }
  </style>
</head>
<body>
  ${sectionsHtml}
</body>
</html>`;
}
