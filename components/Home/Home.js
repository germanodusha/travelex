import React, { useRef, useState } from 'react'
import styles from './Home.module.scss'
import { useTranslations } from 'use-intl'
import classNames from 'classnames'
import { ParallaxLayer } from '@react-spring/parallax'
import PageScroller from '@/components/PageScroller'
import Accordion from '../Accordion'
import Footer from '../Layout/Footer'
import imgBannerTwo from '../../public/images/bannerTwoHome.png'
import imgBannerThree from '../../public/images/bannerThreeHome.png'
import imgBannerFour from '../../public/images/bannerFourHome.png'
import Banner from '../Banner'

function Home() {
  const scroller = useRef(null)
  const translate = useTranslations('Home')
  const [active, setActive] = useState('')
  const [page, setPage] = useState(0)

  const onPressPagination = (page) => scroller.current.scrollTo(page)

  const faqItems = [
    {
      id: 'faq1',
      title: translate('FAQ.questionOneTitle'),
      content: translate('FAQ.questionOne'),
    },
    {
      id: 'faq2',
      title: translate('FAQ.questionTwoTitle'),
      content: translate('FAQ.questionTwo'),
    },
    {
      id: 'faq3',
      title: translate('FAQ.questionThreeTitle'),
      content: translate('FAQ.questionThree'),
    },
  ]

  const bannerItems = [
    {
      id: 'banner1',
      title: translate('bannerOne.title'),
      link: translate('bannerOne.link'),
      video: '/videos/bg-teste.mp4',
      offset: 0,
    },
    {
      id: 'banner2',
      title: translate('bannerTwo.title'),
      link: translate('bannerTwo.link'),
      image: imgBannerTwo,
      offset: 1,
    },
    {
      id: 'banner3',
      title: translate('bannerThree.title'),
      link: translate('bannerThree.link'),
      image: imgBannerThree,
      offset: 2,
    },
    {
      id: 'banner4',
      title: translate('bannerFour.title'),
      link: translate('bannerFour.link'),
      image: imgBannerFour,
      offset: 3,
    },
  ]

  return (
    <>
      <div
        className={classNames(styles['pagination'], {
          [styles['pagination-hide']]: page >= bannerItems.length,
        })}
      >
        {bannerItems.map((_, i) => (
          <div
            key={i}
            className={classNames(styles['pagination__item'], {
              [styles['pagination__item-active']]: i === page,
            })}
            role="button"
            tabIndex={i}
            onClick={() => onPressPagination(i)}
            onPress={() => onPressPagination(i)}
            onKeyDown={() => onPressPagination(i)}
          >
            <div className={classNames(styles['pagination__item-bg'])} />
          </div>
        ))}
      </div>

      <PageScroller ref={scroller} onPageChange={setPage} pages={6}>
        {bannerItems.map((b) => (
          <ParallaxLayer key={b.id} offset={b.offset}>
            <Banner
              title={b.title}
              link={b.link}
              image={b.image}
              video={b.video}
            />
          </ParallaxLayer>
        ))}

        <ParallaxLayer offset={4}>
          <div
            className={styles['section']}
            style={{ justifyContent: 'flex-end' }}
          >
            <p className={styles['section-subtitle']}>
              {translate('FAQ.title')}
            </p>

            {faqItems.map((x) => {
              const isActive = active === x.id
              const activeClass = isActive ? 'active' : ''
              const toggleAccordion = () => {
                setActive(isActive ? '' : x.id)
                // if (isActive) {
                //   setActive('')
                // } else {
                //   setActive(x.id)
                // }
              }
              return (
                <Accordion
                  key={x.id}
                  id={x.id}
                  title={x.title}
                  content={x.content}
                  activeClass={activeClass}
                  toggleAccordion={toggleAccordion}
                />
              )
            })}
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={5}>
          <Footer />
        </ParallaxLayer>
      </PageScroller>
    </>
  )
}

export default Home
