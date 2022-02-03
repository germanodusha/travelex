import { useEffect } from 'react'
import { useTranslations } from 'use-intl'
import { useMenuTheme } from '@/contexts/LayoutContext'
import UsefulPage from '@/components/UsefulPage'
import FAQAccordion from '@/components/FAQAccordion'

function FAQ() {
  const translate = useTranslations('FAQ')
  const { changeTheme } = useMenuTheme()

  useEffect(() => {
    changeTheme('light')
    return () => changeTheme('dark')
  }, [changeTheme])

  const faqItems = [
    {
      id: 'faq1',
      title: translate('questionOneTitle'),
      content: translate('questionOne'),
    },
    {
      id: 'faq2',
      title: translate('questionTwoTitle'),
      content: translate('questionTwo'),
    },
    {
      id: 'faq3',
      title: translate('questionThreeTitle'),
      content: translate('questionThree'),
    },
    {
      id: 'faq4',
      title: translate('questionFourTitle'),
      content: translate('questionFour'),
    },
    {
      id: 'faq5',
      title: translate('questionFiveTitle'),
      content: translate('questionFive'),
    },
    {
      id: 'faq6',
      title: translate('questionSixTitle'),
      content: translate('questionSix'),
    },
  ]

  return (
    <UsefulPage
      title={translate('title')}
      caption={translate('caption')}
      backgroundColor="#a6a6a6"
      color="#000"
      alwaysShowTitle={false}
      Wrapper="div"
    >
      <div className="faq-page">
        <FAQAccordion theme="light" faqItems={faqItems} showContact />
      </div>

      <style jsx>{`
        .faq-page {
          padding-top: 10rem;
        }
      `}</style>
    </UsefulPage>
  )
}

export function getStaticProps({ locale }) {
  const messages = require(`../content/${locale}.json`)

  return {
    props: {
      messages,
      locale,
    },
  }
}

export default FAQ
