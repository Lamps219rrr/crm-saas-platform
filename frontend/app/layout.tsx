import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './styles/globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CRM SaaS Platform | Enterprise Customer Relationship Management',
  description:
    'Powerful CRM platform for sales, customer relationships, team productivity, and business operations. Like HubSpot, Salesforce, Pipedrive.',
  keywords: [
    'CRM',
    'SaaS',
    'Sales',
    'Customer Relationship Management',
    'Business Operations',
    'Team Management',
  ],
  metadataBase: new URL('http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'http://localhost:3000',
    title: 'CRM SaaS Platform',
    description: 'Enterprise-grade CRM for modern businesses',
    images: [
      {
        url: 'http://localhost:3000/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
