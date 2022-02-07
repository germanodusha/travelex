// import { useState, useEffect } from 'react'
import { useTranslations } from 'use-intl'
import FormPage from '@/components/FormPage'
import { FormTypes } from '@/components/RegisterForm'
import Footer from '@/components/Layout/Footer'
// import Scroller from '@/components/Scroller'
// import { useMenuTheme } from '@/contexts/LayoutContext'
// import imgBannerTwo from '../public/images/bannerTwoHome.png'

import ChangeThemeOnScroll from '@/components/ChangeThemeOnScroll'

const themeOptions = { background: 'white' }

function Cover(props) {
  const translate = useTranslations('Jobs')

  const containerStyle = {
    height: '100vh',
    overflow: 'hidden',
    scrollSnapAlign: 'start',
  }

  return (
    <div style={containerStyle}>
      <FormPage
        backgroundImage={'/images/21.Trabalheconosco.jpg'}
        description={translate('description')}
        descriptionTitle={translate('descriptionTitle')}
        formType={FormTypes.TRABALHE_CONOSCO}
        hideFormType
        disableTheme
        showGradient
        {...props}
      />
      <ChangeThemeOnScroll
        theme="light"
        options={themeOptions}
        style={{ transform: 'translateY(-100%)', height: '20%' }}
      />
    </div>
  )
}

function FooterWrapper() {
  return (
    <div className="snap__align-start">
      <Footer />
      <ChangeThemeOnScroll
        theme="dark"
        options={{}}
        style={{ transform: 'translateY(-100%)', height: '20%' }}
      />
    </div>
  )
}

function TrabalheConosco() {
  // const translate = useTranslations('Jobs')
  // const [current, setCurrent] = useState(0)
  // const { changeTheme } = useMenuTheme()

  // useEffect(() => {
  //   const themes = [
  //     ['light', themeOptions],
  //     ['dark', {}],
  //   ]
  //   changeTheme(...themes[current])
  // }, [current, changeTheme])

  return (
    <div>
      <Cover />
      <FooterWrapper />
    </div>
    // <Scroller disableAutoTheme pages={2} onPageChange={setCurrent}>
    //   <FormPage
    //     backgroundImage={imgBannerTwo}
    //     description={translate('description')}
    //     descriptionTitle={translate('descriptionTitle')}
    //     formType={FormTypes.TRABALHE_CONOSCO}
    //     hideFormType
    //     disableTheme
    //     {...props}
    //   />
    //   <Footer />
    // </Scroller>
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

export default TrabalheConosco
