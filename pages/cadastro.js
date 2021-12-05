import { useTranslations } from 'use-intl'
import FormPage from '@/components/FormPage'
import { FormTypes } from '@/components/RegisterForm'
import imgBannerOne from '../public/images/bannerOneHome.png'

function Cadastro(props) {
  const translate = useTranslations('openAccount')

  return (
    <FormPage
      backgroundImage={imgBannerOne}
      description={translate('description')}
      // descriptionTitle="Trabalho conosco"
      menuTheme="light"
      hideFormType={false}
      formType={FormTypes.PESSOA_FISICA}
      {...props}
    />
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
