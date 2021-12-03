import Link from 'next/link'
// import { useTranslations } from 'use-intl'
import Footer from '@/components/Layout/Footer'
import Title from '@/components/Title'
import ChangeThemeOnScroll from '@/components/ChangeThemeOnScroll'
import useLockScrollFirstPage from '@/hooks/useLockScrollFirstPage'
import styles from './Corporativo.module.scss'

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

const corpServices = [
  {
    id: 1,
    title: 'Análises, Registros e Declarações',
    body: 'Análises, Registros e Declarações',
  },
  {
    id: 2,
    title: 'Hedge',
    body: 'Hedge',
  },
  {
    id: 3,
    title: 'Assesoria e Serviços',
    body: 'Assesoria e Serviços',
  },
  {
    id: 4,
    title: 'Trade Finance',
    body: 'Trade Finance',
  },
  {
    id: 5,
    title: 'Trade Service',
    body: 'Trade Service',
  },
]

function Services({ services }) {
  // const [currentBody, setCurrentBody] = useState(0)

  return (
    <div className={styles['services']}>
      <div className={styles['services__nav-desk']}>
        <div className={styles['services__nav-sticky']}>
          {services.map(({ id, title }) => (
            <div key={id} className={styles['services__nav-item']}>
              <Link href={`/cambio/corporativo#${id}`}>
                <a>
                  <h3>{title}</h3>
                </a>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className={styles['services__body']}>
        {services.map(({ id, title, body }) => (
          <div key={id} id={id}>
            <h3 className={styles['services__nav-mobile']}>{title}</h3>
            <p>{`${body}\n\n${LOREM_IPSUM}`}</p>
          </div>
        ))}
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

function Corporativo() {
  // const translate = useTranslations('Corporate')

  useLockScrollFirstPage()

  return (
    <div className={styles['content']}>
      <Cover />
      <Services services={corpServices} />
      <FAQ />
      <Form />
      <Footer />
    </div>
  )
}

export default Corporativo
