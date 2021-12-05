import { useCallback, useMemo } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useTranslations } from 'use-intl'
import Footer from '@/components/Layout/Footer'
import Title from '@/components/Title'
import FAQAccordion from '@/components/FAQAccordion'
import { FormTypes } from '@/components/RegisterForm'
import FormPage from '@/components/FormPage'
import ChangeThemeOnScroll from '@/components/ChangeThemeOnScroll'
import useLockScrollFirstPage from '@/hooks/useLockScrollFirstPage'
import styles from './cambio.module.scss'

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
    'analises-registros-e-declaracoes',
    'hedge',
    'assesoria-e-servicos',
    'trade-finance',
    'trade-service',
  ],
  [CambiosTypes.PESSOA_FISICA]: [
    'cambio-turismo',
    'transferencias-internacionais',
    'pagamentos-internacionais',
    'hedge',
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
  const router = useRouter()
  const { cambio } = router.query
  const services = Services[cambio]
  const translate = useCambioTranslations()

  const servicePath = useMemo(() => {
    const DEFAULT_PATH = services[0]

    const [, path] = router.asPath.split('#')
    if (!path) return DEFAULT_PATH

    const isValid = services.some((p) => p === path)
    if (!isValid) return DEFAULT_PATH

    return path
  }, [services, router.asPath])

  const getHref = useCallback(
    (path) => `${router.pathname.replace('[cambio]', cambio)}#${path}`,
    [router.pathname, cambio]
  )

  return (
    <div className={styles['services']}>
      <div className={styles['services__nav-desk']}>
        <div className={styles['services__nav-sticky']}>
          {services.map((path, id) => (
            <div key={id} className={styles['services__nav-item']}>
              {path === servicePath && (
                <div className={styles['services__nav-active']} />
              )}
              <Link href={getHref(path)}>
                <a>
                  <h3>{translate(`services.${path}`)}</h3>
                </a>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className={styles['services__body']}>
        <div className={styles['services__service-desk']}>
          <div className={styles['services__service-header']} />
          <p>{translate(`services.${servicePath}-body`)}</p>
        </div>

        <div className={styles['services__service-mobile']}>
          {services.map((path) => (
            <div key={path} id={path}>
              <h3>{translate(`services.${path}`)}</h3>
              <p>{translate(`services.${path}-body`)}</p>
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
