import { useTranslations } from 'use-intl'
import { useRouter } from 'next/router'
import UsefulPageLegacy from '@/components/UsefulPageLegacy'
import Interweave from 'interweave'
import { readMarkdownLocale } from '@/utils/markdown'

function Compliance({ markdown }) {
  const { locale } = useRouter()
  const translate = useTranslations('Compliance')

  return (
    <UsefulPageLegacy title={translate('title')} caption={translate('caption')}>
      <Interweave noWrap content={markdown[locale]} />
    </UsefulPageLegacy>
  )
}

export function getStaticProps({ locale }) {
  const messages = require(`../content/${locale}.json`)
  const markdown = readMarkdownLocale('compliance')

  return {
    props: {
      messages,
      locale,
      markdown,
    },
  }
}

export default Compliance
