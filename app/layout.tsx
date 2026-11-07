import type { Metadata } from 'next';
import { Providers } from './providers';
import '@/styles/globals.scss';

export const metadata: Metadata = {
  title: 'Discount Hub – Frontend & Accessibility Playground',
  description:
    'Senior Frontend Architect showcase demonstrating React.js, Next.js, Redux Toolkit, TypeScript, Bootstrap, SCSS, isolated jQuery, and full WAI-ARIA accessibility.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Skip Navigation Link for Keyboard / Screen Reader Accessibility (WCAG 2.4.1) */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

