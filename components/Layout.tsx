import React, { ReactNode } from 'react'
import Head from 'next/head'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'Tennenlohe Food' }: Props) => (
  <div className="app-container container">
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    {children}
    <footer className="text-center">
      <span>Get Your Grub On</span>
    </footer>
  </div>
)

export default Layout
