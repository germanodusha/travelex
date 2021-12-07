import { useCallback, useRef, useMemo } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'use-intl'
import classNames from 'classnames'
import Footer from '@/components/Layout/Footer'
import Title from '@/components/Title'
import FAQAccordion from '@/components/FAQAccordion'
import { FormTypes } from '@/components/RegisterForm'
import FormPage from '@/components/FormPage'
import ChangeThemeOnScroll from '@/components/ChangeThemeOnScroll'
import useLockScrollFirstPage from '@/hooks/useLockScrollFirstPage'
import imgBannerOne from '../../public/images/bannerTwoHome.png'
import imgBannerTwo from '../../public/images/bannerTwoHome.png'
import imgBannerThree from '../../public/images/bannerThreeHome.png'
import imgBannerFour from '../../public/images/bannerFourHome.png'
import styles from './cambio.module.scss'

const LOREM_IPSUM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris orci magna, fermentum eu scelerisque id, efficitur ut dui. Sed mattis aliquet placerat. Integer imperdiet, eros et semper malesuada, sapien lorem luctus erat, ac auctor erat velit sed odio. Quisque efficitur nulla sed tortor dictum, vitae lobortis turpis pharetra. Sed et tempor tellus, non accumsan enim. Curabitur scelerisque erat dignissim turpis commodo ullamcorper. Curabitur malesuada nibh in facilisis consectetur. Curabitur non luctus nunc, vitae rutrum risus. In sed mi leo. Vivamus tempor tellus quis velit sagittis bibendum. Mauris eu suscipit augue. In id nunc nisl.'

const useCambioTranslations = () => {
  const router = useRouter()
  const translate = useTranslations(`cambio-${router.query.cambio}`)

  return translate
}

const CambiosTypes = {
  CORPORATIVO: 'corporativo',
  PESSOA_FISICA: 'pessoa-fisica',
}

const Services = {
  [CambiosTypes.CORPORATIVO]: [
    { image: imgBannerFour, path: 'trade-finance' },
    { image: imgBannerOne, path: 'trade-service' },
    { image: imgBannerTwo, path: 'hedge' },
    { image: imgBannerThree, path: 'assesoria-e-servicos' },
    { image: imgBannerOne, path: 'analises-registros-e-declaracoes' },
  ],
  [CambiosTypes.PESSOA_FISICA]: [
    { image: imgBannerOne, path: 'cambio-turismo' },
    { image: imgBannerTwo, path: 'transferencias-internacionais' },
    { image: imgBannerThree, path: 'pagamentos-internacionais' },
    { image: imgBannerFour, path: 'hedge' },
  ],
}

function Cover() {
  const translate = useCambioTranslations()

  return (
    <div className={styles['cover']}>
      <ChangeThemeOnScroll theme="light" />
      <div className={styles['cover__header']} />
      <div>
        <Title
          mainTitle={translate('title')}
          color="white"
          titleClassName={styles['cover__title']}
        />
        <div className={styles['cover__border']} />
      </div>
      <ChangeThemeOnScroll theme="light" />
    </div>
  )
}

function ServicesContent() {
  const serviceBody = useRef()
  const router = useRouter()
  const { cambio } = router.query
  const services = Services[cambio]
  const translate = useCambioTranslations()

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
    serviceBody.current?.scrollIntoView({ block: 'start', behavior: 'smooth' })
  }

  return (
    <div className={styles['services']}>
      <div className={styles['services__nav-desk']}>
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
      </div>

      <div className={styles['services__body']} ref={serviceBody}>
        <div className={styles['services__service-desk']} id={service.path}>
          <div className={styles['services__service-banner']}>
            <Image alt="background" src={service.image} objectFit="cover" />
            {/** TODO locole this **/}
            <div className={styles['services__service-description']}>
              <p>{LOREM_IPSUM}</p>
            </div>
          </div>

          <div className={styles['services__service-body']}>
            <p>{translate(`services.${service.path}-body`)}</p>
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
                  {/** TODO locole this **/}
                  <div className={styles['services__service-description']}>
                    <p>{LOREM_IPSUM}</p>
                  </div>
                </div>
              </div>

              <div className={styles['services__service-mobile-body']}>
                <h3>{translate(`services.${path}`)}</h3>
                <p>{translate(`services.${path}-body`)}</p>
              </div>
            </div>
          ))}
        </div>
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
      <FAQAccordion
        showTitle
        title={translate('FAQ.title')}
        faqItems={faqItems}
        theme="white"
      />
    </div>
  )
}

function Form() {
  const { query } = useRouter()
  const translate = useCambioTranslations()

  const type =
    query.cambio === CambiosTypes.CORPORATIVO
      ? FormTypes.CORPORATIVO
      : FormTypes.PESSOA_FISICA

  return (
    <div className={styles['form']}>
      <FormPage
        description={translate('form-description')}
        hideType
        formType={type}
        menuTheme="light"
        theme="white"
      />
    </div>
  )
}

function Cambio() {
  useLockScrollFirstPage()

  return (
    <div>
      <Cover />
      <ServicesContent />
      <FAQ />
      <Form />
      <Footer />
    </div>
  )
}

export function getStaticPaths() {
  const paths = [
    { params: { cambio: CambiosTypes.CORPORATIVO } },
    { params: { cambio: CambiosTypes.PESSOA_FISICA } },
  ]

  return {
    paths,
    fallback: false,
  }
}

export function getStaticProps({ locale }) {
  const messages = require(`../../content/${locale}.json`)

  return {
    props: {
      messages,
      locale,
    },
  }
}

export default Cambio
