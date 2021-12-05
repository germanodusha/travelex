import { useTranslations } from 'use-intl'
import FormPage from '@/components/FormPage'
import { FormTypes } from '@/components/RegisterForm'
import Footer from '@/components/Layout/Footer'
import Scroller from '@/components/Scroller'
import imgBannerTwo from '../public/images/bannerTwoHome.png'

function Cadastro(props) {
  const translate = useTranslations('Jobs')

  return (
    <Scroller>
      <FormPage
        backgroundImage={imgBannerTwo}
        description={translate('description')}
        descriptionTitle={translate('descriptionTitle')}
        formType={FormTypes.TRABALHE_CONOSCO}
        hideFormType
        menuTheme="light"
        {...props}
      />
      <Footer />
    </Scroller>
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
