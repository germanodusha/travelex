import { useTranslations } from 'use-intl'
import { useRouter } from 'next/router'
import UsefulPageComp from '@/components/UsefulPageComp'
import Interweave from 'interweave'
import { readMarkdownLocale } from '@/utils/markdown'

function Compliance({ markdown, markdown2 }) {
  const { locale } = useRouter()
  const translate = useTranslations('Compliance')

  return (
    <UsefulPageComp title={translate('title')} caption={translate('caption')}>
      <Interweave noWrap content={markdown[locale]} />
      <Interweave noWrap content={markdown2[locale]} />
    </UsefulPageComp>
  )
}

export function getStaticProps({ locale }) {
  const messages = require(`../content/${locale}.json`)
  const markdown = readMarkdownLocale('compliance')
  const markdown2 = readMarkdownLocale('compliance2')

  return {
    props: {
      messages,
      locale,
      markdown,
      markdown2,
    },
  }
}

export default Compliance
