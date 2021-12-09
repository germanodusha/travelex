import imgBannerOne from '../public/images/bannerTwoHome.png'
import imgBannerTwo from '../public/images/bannerTwoHome.png'
import imgBannerThree from '../public/images/bannerThreeHome.png'
import imgBannerFour from '../public/images/bannerFourHome.png'

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

export { CambiosTypes, Services }
