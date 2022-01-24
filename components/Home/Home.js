import React from 'react'
import { useTranslations } from 'use-intl'
import CarouselWithInterval from '@/components/CarouselWithInterval'
import { useEffectOnce } from 'react-use'
import { useMenuTheme } from '@/contexts/LayoutContext'
import Footer from '../Layout/Footer'
// import imgBannerTwo from '../../public/images/bannerTwoHome.png'
// import imgBannerThree from '../../public/images/bannerThreeHome.png'
// import imgBannerFour from '../../public/images/bannerFourHome.png'
import Banner from '../Banner'

function CarouselItem({ item }) {
  return (
    <Banner
      showGradient
      key={item.id}
      title={item.title}
      link={item.link}
      image={item.image}
      video={item.video}
    />
  )
}

function Home() {
  const translate = useTranslations('Home')
  const { changeTheme } = useMenuTheme()

  useEffectOnce(() => {
    changeTheme('dark')
  })

  const bannerItems = [
    {
      id: 'banner1',
      title: translate('bannerOne.title'),
      link: translate('bannerOne.link'),
      video: '/videos/bg-teste.mp4',
    },
    {
      id: 'banner2',
      title: translate('bannerTwo.title'),
      link: translate('bannerTwo.link'),
      image: '/images/bannerTwoHome.png',
    },
    {
      id: 'banner3',
      title: translate('bannerThree.title'),
      link: translate('bannerThree.link'),
      image: '/images/bannerThreeHome.png',
    },
    {
      id: 'banner4',
      title: translate('bannerFour.title'),
      link: translate('bannerFour.link'),
      image: '/images/bannerFourHome.png',
    },
  ]

  return (
    <main>
      <div className="snap__align-start">
        <CarouselWithInterval data={bannerItems} RenderItem={CarouselItem} />
      </div>

      <div className="snap__align-start">
        <Footer />
      </div>
    </main>
  )
}

export default Home
