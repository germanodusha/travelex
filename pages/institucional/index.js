import Institucional from '../../components/Institucional/Institucional'
import { readMarkdownLocale } from '@/utils/markdown'

export default function InstitucionalPage({ locale, ...props }) {
  return <Institucional locale={locale} {...props} />
}

export function getStaticProps({ locale }) {
  const messages = require(`../../content/${locale}.json`)
  const instQS = readMarkdownLocale('institucionalQS')
  const instNT = readMarkdownLocale('institucionalNT')
  const instRS = readMarkdownLocale('institucionalRS')

  return {
    props: {
      messages,
      locale,
      instQS,
      instNT,
      instRS,
    },
  }
}
