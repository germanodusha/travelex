import Layout from '@/components/Layout'
import { NextIntlProvider } from 'next-intl'
import { polyfill } from 'interweave-ssr'
import '@/styles/globals.scss'

polyfill()

function MyApp({ Component, pageProps }) {
  return (
    <NextIntlProvider messages={pageProps.messages}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </NextIntlProvider>
  )
}

export default MyApp
