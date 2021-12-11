import React from 'react'
import { useTranslations } from 'use-intl'
import CarouselWithInterval from '@/components/CarouselWithInterval'
import useLockScrollFirstPage from '@/hooks/useLockScrollFirstPage'
import Footer from '../Layout/Footer'
import imgBannerTwo from '../../public/images/bannerTwoHome.png'
import imgBannerThree from '../../public/images/bannerThreeHome.png'
import imgBannerFour from '../../public/images/bannerFourHome.png'
import Banner from '../Banner'

function CarouselItem({ item }) {
  return (
    <Banner
      showGradient={false} // TODO add at carousel level
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

  useLockScrollFirstPage()

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
      image: imgBannerTwo,
    },
    {
      id: 'banner3',
      title: translate('bannerThree.title'),
      link: translate('bannerThree.link'),
      image: imgBannerThree,
    },
    {
      id: 'banner4',
      title: translate('bannerFour.title'),
      link: translate('bannerFour.link'),
      image: imgBannerFour,
    },
  ]

  return (
    <main>
      <CarouselWithInterval data={bannerItems} RenderItem={CarouselItem} />
      <Footer />
    </main>
  )
}

export default Home
