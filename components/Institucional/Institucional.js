/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'use-intl'
import classNames from 'classnames'
import Banner from '@/components/Banner'
import Footer from '@/components/Layout/Footer'
import Bicolumn from '@/components/Bicolumn'
import ChangeThemeOnScroll from '@/components/ChangeThemeOnScroll'
// import useLockScrollFirstPage from '@/hooks/useLockScrollFirstPage'
import Interweave from 'interweave'
import { usePageLimits } from '@/contexts/LayoutContext'
import styles from './Institucional.module.scss'
// import bannerInstitutional from '../../public/images/bannerInstitutional.png'
// import imgInstitutional from '../../public/images/imgInstitutional.png'
// import imgLivro from '../../public/images/IMG9.png'
// import imgDestaque from '../../public/images/6.Institucional_carrossel1.jpg'
// import imgDestaque2 from '../../public/images/7.Institucional_carrossel2.jpg'
// import imgDestaque3 from '../../public/images/8.Institucional_carrossel3.jpg'
import imgInstitutional from '../../public/images/9.Institucional_SOS1.jpg'
import imgInstitutional2 from '../../public/images/10.Institucional_SOS2.jpg'
// import imgNextHover from '../../public/images/seta_hover.svg'
import imgNext from '../../public/images/seta.svg'

import useInterval from '@/hooks/useInterval'

function InstitucionalContent({
  text,
  text2,
  text3,
  video = true,
  image = true,
  image2 = true,
  extraText = true,
}) {
  return (
    <>
      <p style={{ whiteSpace: 'pre-line' }}>{text}</p>
      {video && (
        <div className={styles['media']}>
          <video src="/videos/1.Home_Video.mp4" autoPlay muted loop />
        </div>
      )}
      {image && (
        <div className={styles['media']}>
          <Image src={imgInstitutional} alt="" />
        </div>
      )}
      {extraText && <p style={{ whiteSpace: 'pre-line' }}>{text2}</p>}
      {image2 && (
        <div className={styles['media']}>
          <Image src={imgInstitutional2} alt="" />
        </div>
      )}
      {extraText && <p style={{ whiteSpace: 'pre-line' }}>{text3}</p>}
    </>
  )
}

function Carousel() {
  const { limits } = usePageLimits()
  const [currentItem, setCurrentItem] = useState(0)

  const handleNext = () => setCurrentItem((v) => Math.min(2, v + 1))
  const handlePrev = () => setCurrentItem((v) => Math.max(0, v - 1))

  const translate = useTranslations('About')
  const dataOne = translate('dataOne')
  const dataOneDesc = translate('dataOneDescription')
  const dataTwo = translate('dataTwo')
  const dataTwoDesc = translate('dataTwoDescription')
  const dataThree = translate('dataThree')
  const dataThreeDesc = translate('dataThreeDescription')

  const items = [
    {
      id: 1,
      bg: '/images/6.Institucional_carrossel1.jpg',
      left: dataOne,
      right: dataOneDesc,
    },
    {
      id: 2,
      bg: '/images/7.Institucional_carrossel2.jpg',
      left: dataTwo,
      right: dataTwoDesc,
    },
    {
      id: 3,
      bg: '/images/8.Institucional_carrossel3.jpg',
      left: dataThree,
      right: dataThreeDesc,
    },
  ]

  // timing to rotate
  const nextItem = useCallback(() => {
    const maxPage = items.length - 1
    setCurrentItem((current) => (current >= maxPage ? 0 : current + 1))
  }, [items.length])

  // alterar tempo 3000
  useInterval(nextItem, 6000)

  const showNext = currentItem < items.length - 1
  const showPrev = currentItem > 0

  return (
    <div className={styles['carousel']}>
      <div
        className={styles['carousel__items']}
        style={{ transform: `translateX(-${currentItem * 100}vw)` }}
      >
        {items.map(({ id, bg, left, right }) => (
          <div key={id} className={styles['carousel__items-item']}>
            <img src={bg} alt="" />
            <div className={styles['carousel__content']}>
              <div
                className={styles['carousel__content-left']}
                style={{
                  width: `${limits.rightColumn.left}px`,
                }}
              >
                <p>{left}</p>
              </div>
              <div
                className={styles['carousel__content-right']}
                style={{
                  left: `${limits.rightColumn.left}px`,
                  // width: `${limits.rightColumn.width}px`,
                }}
              >
                <p>{right}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        className={classNames(styles['carousel__prev'], {
          [styles['carousel__prev-hidden']]: !showPrev,
          [styles['carousel__prev-visible']]: showPrev,
        })}
        onClick={handlePrev}
        onPress={handlePrev}
        onKeyPress={() => {}}
        role="presentation"
        // role="button"
        // tabIndex={0}
      >
        <Image src={imgNext} alt="" objectFit="cover" />
      </div>

      <div
        className={classNames(styles['carousel__next'], {
          [styles['carousel__next-hidden']]: !showNext,
          [styles['carousel__next-visible']]: showNext,
        })}
        onClick={handleNext}
        onPress={handleNext}
        onKeyPress={() => {}}
        role="presentation"
        // role="button"
        // tabIndex={0}
      >
        <Image src={imgNext} alt="" objectFit="cover" />
      </div>
    </div>
  )
}

function Institucional({ instQS, instRS }) {
  const { locale } = useRouter()
  const { limits } = usePageLimits()
  const translate = useTranslations('About')
  // const [rightWidth, setrightWidth] = useState(0)

  // const mediaSize = rightWidth - limits.rightColumn.width
  // const mediaSize = rightWidth - limits.rightColumn.left - 20

  // useEffect(() => {
  //   const onResize = () => {
  //     setrightWidth(window.innerWidth)
  //   }
  //   onResize()
  //   window.addEventListener('resize', onResize)

  //   return () => {
  //     window.removeEventListener('resize', onResize)
  //   }
  // }, [])

  // useLockScrollFirstPage()

  return (
    <div className={styles['page']}>
      <ChangeThemeOnScroll theme="dark" />
      <div className={styles['page-limitation']}>
        <Banner
          showGradient
          title={translate('mainTitle')}
          image="/images/5.Institucional_capa.jpg"
        />
      </div>

      <ChangeThemeOnScroll theme="light" />

      <Bicolumn
        id="quem-somos"
        title="Quem Somos"
        subTitle={translate('mainSubtitle')}
      >
        {/* <InstitucionalContent
          text={translate('mainParagraph')}
          video={false}
          image={false}
          image2={false}
          extraText={false}
        /> */}
        <div
          className={styles['media']}
          style={{
            left: `${limits.rightColumn.left}px`,
            width: `${limits.rightColumn.width}px`,
          }}
        >
          <Interweave noWrap content={instQS[locale]} />
        </div>
      </Bicolumn>

      <Carousel />

      <Bicolumn
        id="nossa-trajetoria"
        title="Nossa Trajetória"
        subTitle={translate('secondarySubtitle')}
      >
        <InstitucionalContent
          text={translate('secondaryParagraph')}
          image={false}
          image2={false}
          extraText={false}
        />
        {/* <div>
          <Interweave noWrap content={instNT[locale]} />
        </div> */}
      </Bicolumn>

      <Bicolumn
        id="responsabilidade-socioambiental"
        title={'Responsabilidade\nSocioambiental'}
        subTitle={translate('tertiarySubtitle')}
      >
        {/* <InstitucionalContent
          text={translate('tertiaryParagraph')}
          text2={translate('tertiaryParagraph2')}
          text3={translate('tertiaryParagraph3')}
          video={false}
          image
          image2
          extraText
        /> */}

        <div
          className={styles['media']}
          style={{
            left: `${limits.rightColumn.left}px`,
            width: `${limits.rightColumn.width}px`,
          }}
        >
          <Interweave noWrap content={instRS[locale]} />
        </div>
      </Bicolumn>

      <ChangeThemeOnScroll
        theme="light"
        style={{ transform: 'translateY(-100%)' }}
      />
      <ChangeThemeOnScroll theme="dark" />
      <Footer />
    </div>
  )
}

export default Institucional
