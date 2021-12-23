import { useTranslations } from 'use-intl'
import FormPage from '@/components/FormPage'
import { FormTypes } from '@/components/RegisterForm'
import imgBannerOne from '../public/images/bannerOneHome.png'
import Footer from '@/components/Layout/Footer'
import ChangeThemeOnScroll from '@/components/ChangeThemeOnScroll'

function Cadastro(props) {
  const translate = useTranslations('openAccount')

  function FooterWrapper() {
    return (
      <>
        <ChangeThemeOnScroll theme="dark" options={{}} />
        <Footer />
        <ChangeThemeOnScroll
          theme="dark"
          options={{}}
          style={{ transform: 'translateY(-100%)' }}
        />
      </>
    )
  }

  return (
    <div>
      <FormPage
        backgroundImage={imgBannerOne}
        description={translate('description')}
        // descriptionTitle="Trabalho conosco"
        menuTheme="light"
        hideFormType={false}
        formType={FormTypes.PESSOA_FISICA}
        {...props}
      />
      <ChangeThemeOnScroll
        theme="light"
        options={{}}
        style={{ transform: 'translateY(-100%)' }}
      />
      <FooterWrapper />
    </div>
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

export default Cadastro
