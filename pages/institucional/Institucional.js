import { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'use-intl'
import classNames from 'classnames'
import Banner from '@/components/Banner'
import Footer from '@/components/Layout/Footer'
import Bicolumn from '@/components/Bicolumn'
import ChangeThemeOnScroll from '@/components/ChangeThemeOnScroll'
import useLockScrollFirstPage from '@/hooks/useLockScrollFirstPage'
import { usePageLimits } from '@/contexts/LayoutContext'
import styles from './Institucional.module.scss'
import bannerInstitutional from '../../public/images/bannerInstitutional.jpg'
import imgInstitutional from '../../public/images/imgInstitutional.png'
import imgLivro from '../../public/images/IMG9.png'
import imgNext from '../../public/images/seta.svg'
// import imgNextHover from '../../public/images/seta_hover.svg'

function InstitucionalContent({
  text,
  video = true,
  image = true,
  extraText = true,
}) {
  return (
    <>
      <p>{[text, text].join('\n\n')}</p>
      {video && (
        <div className={styles['media']}>
          <video src="/videos/bg-teste.mp4" controls autoPlay muted loop />
        </div>
      )}
      {extraText && <p>{[text, text].join('\n\n')}</p>}
      {image && (
        <div className={styles['media']}>
          <Image src={imgInstitutional} alt="" />
        </div>
      )}
      {extraText && <p>{[text, text].join('\n\n')}</p>}
    </>
  )
}

function Carousel() {
  const { limits } = usePageLimits()
  const [currentItem, setCurrentItem] = useState(0)

  const handleNext = () => setCurrentItem((v) => Math.min(2, v + 1))
  const handlePrev = () => setCurrentItem((v) => Math.max(0, v - 1))

  const items = [
    {
      id: 1,
      bg: imgInstitutional,
      left: '+300k',
      right: 'Novos investimentos no travelex bank em 2021',
    },
    {
      id: 2,
      bg: bannerInstitutional,
      left: '+300k',
      right: 'Novos investimentos no travelex bank em 2021',
    },
    {
      id: 3,
      bg: imgLivro,
      left: '+300k',
      right: 'Novos investimentos no travelex bank em 2021',
    },
  ]

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
            <Image src={bg} alt="" objectFit="cover" />
            <div className={styles['carousel__content']}>
              <div className={styles['carousel__content-left']}>
                <p>{left}</p>
              </div>
              <div
                className={styles['carousel__content-right']}
                style={{
                  left: `${limits.rightColumn.left}px`,
                  width: `${limits.rightColumn.width}px`,
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
        role="button"
        tabIndex={0}
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
        role="button"
        tabIndex={0}
      >
        <Image src={imgNext} alt="" objectFit="cover" />
      </div>
    </div>
  )
}

function Institucional() {
  const translate = useTranslations('About')

  useLockScrollFirstPage()

  return (
    <div className={styles['page']}>
      <ChangeThemeOnScroll theme="dark" />
      <Banner
        showGradient
        title={translate('mainTitle')}
        image={bannerInstitutional}
      />

      <ChangeThemeOnScroll theme="light" />

      <Bicolumn
        id="quem-somos"
        title="Quem Somos"
        subTitle={translate('mainSubtitle')}
      >
        <InstitucionalContent
          text={translate('mainParagraph')}
          video={false}
          image={false}
          extraText={false}
        />
      </Bicolumn>

      <Carousel />

      <Bicolumn
        id="nossa-trajetoria"
        title="Nossa Trajetória"
        subTitle={translate('mainSubtitle')}
      >
        <InstitucionalContent text={translate('mainParagraph')} />
      </Bicolumn>

      <Bicolumn
        id="responsabilidade-socioambiental"
        title={'Responsabilidade\nSocioambiental'}
        subTitle={translate('mainSubtitle')}
      >
        <InstitucionalContent text={translate('mainParagraph')} />
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
