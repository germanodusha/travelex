import { useTranslations } from 'use-intl'
import FormPage from '@/components/FormPage'
import { FormTypes } from '@/components/RegisterForm'
import Footer from '@/components/Layout/Footer'
import Scroller from '@/components/Scroller'
import ChangeThemeOnScroll from '@/components/ChangeThemeOnScroll'
import imgBannerTwo from '../public/images/bannerTwoHome.png'

const themeOptions = { background: 'white' }

function Cadastro(props) {
  const translate = useTranslations('Jobs')

  return (
    <Scroller pages={2}>
      <div>
        <ChangeThemeOnScroll
          theme="light"
          options={themeOptions}
          style={{ transform: 'translateY(50%)', height: '20%' }}
        />
        <FormPage
          backgroundImage={imgBannerTwo}
          description={translate('description')}
          descriptionTitle={translate('descriptionTitle')}
          formType={FormTypes.TRABALHE_CONOSCO}
          hideFormType
          menuTheme="light"
          menuOptions={themeOptions}
          {...props}
        />
      </div>

      <div>
        <ChangeThemeOnScroll
          theme="dark"
          options={{}}
          style={{ transform: 'translateY(50%)', height: '20%' }}
        />
        <Footer />
      </div>
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
