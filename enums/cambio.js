// import imgBannerOne from '../public/images/bannerTwoHome.png'
// import imgBannerTwo from '../public/images/bannerTwoHome.png'
// import imgBannerThree from '../public/images/bannerThreeHome.png'
// import imgBannerFour from '../public/images/bannerFourHome.png'
import imgBanner from '../public/images/IMG9.png'

const CambiosTypes = {
  CORPORATIVO: 'corporativo',
  PESSOA_FISICA: 'pessoa-fisica',
}

const Services = {
  [CambiosTypes.CORPORATIVO]: [
    { image: imgBanner, path: 'trade-finance' },
    { image: imgBanner, path: 'trade-service' },
    { image: imgBanner, path: 'hedge' },
    { image: imgBanner, path: 'assesoria-e-servicos' },
    { image: imgBanner, path: 'analises-registros-e-declaracoes' },
  ],
  [CambiosTypes.PESSOA_FISICA]: [
    { image: imgBanner, path: 'cambio-turismo' },
    { image: imgBanner, path: 'transferencias-internacionais' },
    { image: imgBanner, path: 'pagamentos-internacionais' },
    { image: imgBanner, path: 'hedge' },
  ],
}

export { CambiosTypes, Services }
