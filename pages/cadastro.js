import { useState, useEffect } from 'react'
import { useTranslations } from 'use-intl'
import FormPage from '@/components/FormPage'
import { FormTypes } from '@/components/RegisterForm'
import Footer from '@/components/Layout/Footer'
import Scroller from '@/components/Scroller'
import { useMenuTheme } from '@/contexts/LayoutContext'
import imgBannerOne from '../public/images/bannerOneHome.png'

const themeOptions = { background: 'white' }

function Cadastro(props) {
  const translate = useTranslations('openAccount')
  const [current, setCurrent] = useState(0)
  const { changeTheme } = useMenuTheme()

  useEffect(() => {
    const themes = [
      ['light', themeOptions],
      ['dark', {}],
    ]
    changeTheme(...themes[current])
  }, [current, changeTheme])

  return (
    <Scroller disableAutoTheme pages={2} onPageChange={setCurrent}>
      <FormPage
        backgroundImage={imgBannerOne}
        description={translate('description')}
        // descriptionTitle={translate('descriptionTitle')}
        formType={FormTypes.PESSOA_FISICA}
        hideFormType={false}
        disableTheme
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
