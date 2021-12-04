import { useCallback, useMemo } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
// import { useTranslations } from 'use-intl'
import Footer from '@/components/Layout/Footer'
import Title from '@/components/Title'
import ChangeThemeOnScroll from '@/components/ChangeThemeOnScroll'
import useLockScrollFirstPage from '@/hooks/useLockScrollFirstPage'
import styles from './cambio.module.scss'

const LOREM_IPSUM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vitae nulla ac velit accumsan mattis. Proin eget turpis felis. Praesent vitae tortor eu leo dictum molestie id eget odio. In tellus magna, facilisis a lectus quis, rhoncus consectetur sem. In eget risus luctus, feugiat dolor sed, interdum mi. Proin condimentum mauris metus, sit amet luctus dui suscipit tristique. Duis a sapien eget velit tincidunt hendrerit. Nam aliquam semper velit in suscipit. Ut quis massa in magna viverra rhoncus id quis mi.\n\nCurabitur at interdum eros. Quisque eu venenatis velit. Duis vel aliquam lacus. Fusce aliquet luctus eros quis mollis. Mauris viverra efficitur neque sit amet auctor. Praesent vitae dictum arcu, eu porta mauris. In at efficitur orci. Vivamus tristique tempus semper. Fusce porttitor massa sit amet neque eleifend consequat. Pellentesque sed sodales sapien. Quisque eu cursus erat. Nunc malesuada fringilla egestas. Proin eu sodales eros. Nulla mi mauris, rutrum finibus cursus at, vestibulum non tortor.'

function Cover() {
  return (
    <div className={styles['cover']}>
      <ChangeThemeOnScroll theme="light" />
      <div className={styles['cover__header']} />
      <div>
        <Title
          mainTitle={'Câmbio Corporativo\nTravelex Partners'}
          color="white"
          titleClassName={styles['cover__title']}
        />
        <div className={styles['cover__border']} />
      </div>
      <ChangeThemeOnScroll theme="light" />
    </div>
  )
}

const CambiosTypes = {
  CORPORATIVO: 'corporativo',
  PESSOA_FISICA: 'pessoa-fisica',
}

const Services = {
  [CambiosTypes.CORPORATIVO]: [
    {
      id: 0,
      title: 'Análises, Registros e Declarações',
      body: `Análises, Registros e Declarações\n\n${LOREM_IPSUM}`,
      path: 'analises-registros-e-declaracoes',
    },
    {
      id: 1,
      title: 'Hedge',
      body: `Hedge\n\n${LOREM_IPSUM}`,
      path: 'hedge',
    },
    {
      id: 2,
      title: 'Assesoria e Serviços',
      body: `Assessoria e Serviços\n\n${LOREM_IPSUM}`,
      path: 'assesoria-e-servicos',
    },
    {
      id: 3,
      title: 'Trade Finance',
      body: `Trade Finance\n\n${LOREM_IPSUM}`,
      path: 'trade-finance',
    },
    {
      id: 4,
      title: 'Trade Service',
      body: `Trade Service\n\n${LOREM_IPSUM}`,
      path: 'trade-service',
    },
  ],
  [CambiosTypes.PESSOA_FISICA]: [
    {
      id: 0,
      title: 'Câmbio Turismo',
      body: `Câmbio Turismo\n\n${LOREM_IPSUM}`,
      path: 'cambio-turismo',
    },
    {
      id: 1,
      title: 'Transferências Internacionais',
      body: `Transferências Internacionais\n\n${LOREM_IPSUM}`,
      path: 'transferencias-internacionais',
    },
    {
      id: 2,
      title: 'Pagamentos Internacionais',
      body: `Pagamentos Internacionais\n\n${LOREM_IPSUM}`,
      path: 'pagamentos-internacionais',
    },
    {
      id: 3,
      title: 'Hedge',
      body: `Hedge\n\n${LOREM_IPSUM}`,
      path: 'hedge',
    },
  ],
}

function ServicesContent({ services }) {
  const router = useRouter()

  const getHref = useCallback(
    (path) =>
      `${router.pathname.replace('[cambio]', router.query.cambio)}#${path}`,
    [router.pathname, router.query]
  )

  const servicePath = useMemo(() => {
    const DEFAULT_PATH = services[0].path
    const [, path] = router.asPath.split('#')

    if (!path) return DEFAULT_PATH

    const isValid = services.map((s) => s.path).some((p) => p === path)
    if (!isValid) return DEFAULT_PATH

    return path
  }, [services, router.asPath])

  const service = services.find((s) => s.path === servicePath)

  return (
    <div className={styles['services']}>
      <div className={styles['services__nav-desk']}>
        <div className={styles['services__nav-sticky']}>
          {services.map(({ id, title, path }) => (
            <div key={id} className={styles['services__nav-item']}>
              {path === servicePath && (
                <div className={styles['services__nav-active']} />
              )}
              <Link href={getHref(path)}>
                <a>{title}</a>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className={styles['services__body']}>
        <div className={styles['services__service-desk']}>
          <h3>{service?.title}</h3>
          <p>{service?.body}</p>
        </div>

        <div className={styles['services__service-mobile']}></div>

        {/**services.map(({ id, title, body, path }) => (
          <div key={id} id={path}>
            <h3 className={styles['services__nav-mobile']}>{title}</h3>
            <p>{body}</p>
          </div>
        ))**/}
      </div>
    </div>
  )
}

function FAQ() {
  return null
}

function Form() {
  return null
}

function Cambio() {
  const { query } = useRouter()
  // const translate = useTranslations('Corporate')

  useLockScrollFirstPage()

  return (
    <div className={styles['content']}>
      <Cover />
      <ServicesContent services={Services[query.cambio]} />
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
