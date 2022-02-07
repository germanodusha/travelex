import { useCallback, useRef, useMemo } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'use-intl'
import classNames from 'classnames'
import Interweave from 'interweave'
import { readMarkdownLocale } from '@/utils/markdown'
import Footer from '@/components/Layout/Footer'
// import Title from '@/components/Title'
import Banner from '@/components/Banner'
import FAQAccordion from '@/components/FAQAccordion'
// import { FormTypes } from '@/components/RegisterForm'
// import FormPage from '@/components/FormPage'
import ChangeThemeOnScroll from '@/components/ChangeThemeOnScroll'
import { useMenuTheme, usePageLimits } from '@/contexts/LayoutContext'
import useLockScrollFirstPage from '@/hooks/useLockScrollFirstPage'
import { CambiosTypes, Services } from '@/enums/cambio'
import styles from './cambio.module.scss'

const themeOptions = { background: 'white' }

const useCambioTranslations = () => {
  const router = useRouter()
  const translate = useTranslations(`cambio-${router.query.cambio}`)

  return translate
}

function Cover() {
  const router = useRouter()
  const { cambio } = router.query
  const translate = useCambioTranslations()

  return (
    <div className={styles['cover']}>
      <ChangeThemeOnScroll theme="light" options={themeOptions} />
      <div className={styles['cover__header']} />
      <div>
        {cambio === 'corporativo' && (
          <>
            <Banner
              showGradient
              title={translate('title')}
              image={'/images/2.Home_destaq1.jpg'}
            />
            <div className={styles['cover__border']} />
          </>
        )}
        {cambio === 'pessoa-fisica' && (
          <>
            <Banner
              showGradient
              title={translate('title')}
              image={'/images/3.Home_destaq2.jpg'}
            />
            <div className={styles['cover__border']} />
          </>
        )}
      </div>
      <ChangeThemeOnScroll theme="light" options={themeOptions} />
    </div>
  )

  // Blue BG
  // return (
  //   <div className={styles['cover']}>
  //     <ChangeThemeOnScroll theme="light" options={themeOptions} />
  //     <div className={styles['cover__header']} />
  //     <div>
  //       <Title
  //         mainTitle={translate('title')}
  //         color="white"
  //         titleClassName={styles['cover__title']}
  //       />
  //       <div className={styles['cover__border']} />
  //     </div>
  //     <ChangeThemeOnScroll theme="light" options={themeOptions} />
  //   </div>
  // )
}

function ServicesContent({ markdowns }) {
  const serviceBody = useRef()
  const router = useRouter()
  const { cambio } = router.query
  const services = Services[cambio]
  const translate = useCambioTranslations()
  const { limits } = usePageLimits()

  const service = useMemo(() => {
    const DEFAULT_SERVICE = services[0]
    const [, path] = router.asPath.split('#')
    if (!path) return DEFAULT_SERVICE

    const findService = services.find((p) => p.path === path)
    if (!findService) return DEFAULT_SERVICE

    return findService
  }, [services, router.asPath])

  const getHref = useCallback(
    (path) => `${router.pathname.replace('[cambio]', cambio)}#${path}`,
    [router.pathname, cambio]
  )

  const handleNavigate = () => {
    serviceBody.current?.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    })
  }

  return (
    <div className={styles['services']}>
      <ChangeThemeOnScroll theme="light" options={themeOptions} />
      <div
        className={styles['services__nav-desk']}
        style={{ width: `${limits.rightColumn.x}px` }}
      >
        <div className={styles['services__nav-sticky']}>
          {services.map(({ path }, id) => (
            <div key={id} className={styles['services__nav-item']}>
              {path === service.path && (
                <div className={styles['services__nav-active']} />
              )}
              <Link href={getHref(path)}>
                <a>
                  <h3
                    onClick={handleNavigate}
                    onKeyDown={() => {}}
                    role="presentation"
                  >
                    {translate(`services.${path}`)}
                  </h3>
                </a>
              </Link>
            </div>
          ))}
        </div>
        <div className={styles['services__service-description']}>
          <p>{translate(`services.${service.path}-banner`)}</p>
        </div>
      </div>

      <ChangeThemeOnScroll theme="light" options={themeOptions} />
      <div className={styles['services__body']} ref={serviceBody}>
        <div className={styles['services__service-desk']} id={service.path}>
          <div className={styles['services__service-banner']}>
            <Image alt="background" src={service.image} objectFit="cover" />
            {/* <div className={styles['services__service-description']}>
              <p>{translate(`services.${service.path}-banner`)}</p>
            </div> */}
          </div>

          <div className={styles['services__service-body']}>
            <Interweave
              noWrap
              content={markdowns[service.path][router.locale]}
            />
          </div>
        </div>

        <div className={styles['services__service-mobile']}>
          {services.map(({ path, image }) => (
            <div key={path} id={path}>
              <div
                className={classNames(
                  styles['services__service-bg'],
                  styles['services__service-bg-mobile']
                )}
              >
                <div className={styles['services__service-banner']}>
                  <Image alt="background" src={image} objectFit="cover" />
                  <div className={styles['services__service-description']}>
                    <p>{translate(`services.${path}-banner`)}</p>
                  </div>
                </div>
              </div>

              <div className={styles['services__service-mobile-body']}>
                <h3>{translate(`services.${path}`)}</h3>
                <Interweave noWrap content={markdowns[path][router.locale]} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function BUFFER() {
  const translate = useCambioTranslations()

  const text = translate('BUFFER.title')
  const telefone = translate('BUFFER.telefone')
  const email = translate('BUFFER.email')

  return (
    <div className={styles['buffer']}>
      <div className={styles['buffer__title']}>
        <h3>{`${text} ${telefone} e ${email}`}</h3>
      </div>
    </div>
  )
}

function FAQ() {
  const translate = useCambioTranslations()

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

  return (
    <div className={styles['faq']}>
      <ChangeThemeOnScroll theme="light" options={themeOptions} />
      <FAQAccordion
        showTitle
        title={translate('FAQ.title')}
        faqItems={faqItems}
        theme="white"
      />
    </div>
  )
}

// function Form() {
//   const { query } = useRouter()
//   const translate = useCambioTranslations()

//   let type =
//     query.cambio === CambiosTypes.CORPORATIVO
//       ? FormTypes.CORPORATIVO
//       : FormTypes.PESSOA_FISICA

//   return (
//     <div className={styles['form']}>
//       <FormPage
//         description={translate('form-description')}
//         hideType
//         disableTheme
//         formType={type}
//         menuTheme="light"
//         theme="white"
//       />
//       <ChangeThemeOnScroll
//         theme="light"
//         options={themeOptions}
//         style={{ transform: 'translateY(-100%)' }}
//       />
//     </div>
//   )
// }

function FooterWrapper() {
  return (
    <>
      <Footer />
      <ChangeThemeOnScroll
        theme="dark"
        options={{}}
        style={{ transform: 'translateY(-140%)', height: '20%' }}
      />
    </>
  )
}

function Cambio({ markdowns }) {
  useLockScrollFirstPage()
  const { theme } = useMenuTheme()

  return (
    <div className={styles['container']}>
      <div
        className={classNames(styles['menu-bg'], {
          [styles['menu-bg__dark']]: theme === 'dark',
          [styles['menu-bg__light']]: theme === 'light',
        })}
      ></div>
      <Cover />
      <ServicesContent markdowns={markdowns} />
      <BUFFER />
      <FAQ />
      {/* <Form /> */}
      <FooterWrapper />
    </div>
  )
}

export function getStaticPaths() {
  const paths = [
    { params: { cambio: CambiosTypes.CORPORATIVO }, locale: 'pt-BR' },
    { params: { cambio: CambiosTypes.PESSOA_FISICA }, locale: 'pt-BR' },
    { params: { cambio: CambiosTypes.CORPORATIVO }, locale: 'en-US' },
    { params: { cambio: CambiosTypes.PESSOA_FISICA }, locale: 'en-US' },
  ]

  return {
    paths,
    fallback: false,
  }
}

export function getStaticProps({ locale, params }) {
  const messages = require(`../../content/${locale}.json`)

  const markdowns = Services[params.cambio].reduce(
    (prev, service) => ({
      ...prev,
      [service.path]: readMarkdownLocale(
        `cambio/${params.cambio}/${service.path}`
      ),
    }),
    {}
  )

  return {
    props: {
      messages,
      locale,
      markdowns,
    },
  }
}

export default Cambio
