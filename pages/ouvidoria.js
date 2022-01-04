import { useTranslations } from 'use-intl'
import { useRouter } from 'next/router'
import Interweave from 'interweave'
import UsefulPageLegacy from '@/components/UsefulPageLegacy'
import { readMarkdownLocale } from '@/utils/markdown'

function Ouvidoria({ markdown }) {
  const { locale } = useRouter()
  const translate = useTranslations('Ouvidoria')

  return (
    <UsefulPageLegacy title={translate('title')} caption={translate('caption')}>
      <Interweave noWrap content={markdown[locale]} />
    </UsefulPageLegacy>
  )
}

export function getStaticProps({ locale }) {
  const messages = require(`../content/${locale}.json`)
  const markdown = readMarkdownLocale('ouvidoria')

  return {
    props: {
      messages,
      locale,
      markdown,
    },
  }
}

export default Ouvidoria
