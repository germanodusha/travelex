// import imgBannerOne from '../public/images/bannerTwoHome.png'
// import imgBannerTwo from '../public/images/bannerTwoHome.png'
// import imgBannerThree from '../public/images/bannerThreeHome.png'
// import imgBannerFour from '../public/images/bannerFourHome.png'
import imgBanner from '../public/images/IMG9.png'
import imgCorpTradeFinance from '../public/images/11.CambCopr_tradefinance.jpg'
import imgCorpTradeService from '../public/images/12.CambCopr_tradeservice.jpg'
import imgCorpHedge from '../public/images/13.CambCorp_hedge.jpg'
import imgCorpAssessoria from '../public/images/14.CambCorp_assessoria.jpg'
import imgCorpAnalises from '../public/images/15.CambCorp_análises.jpg'
import imgPFTurismo from '../public/images/16.CambPF_turismo.jpg'
import imgPFTransf from '../public/images/17.CambPF_transferencias.jpg'
import imgPFPag from '../public/images/18.CambPF_pagamentos.jpg'
import imgPFHedge from '../public/images/19.CambPF_Hedge.jpg'

const CambiosTypes = {
  CORPORATIVO: 'corporativo',
  PESSOA_FISICA: 'pessoa-fisica',
}

const Services = {
  [CambiosTypes.CORPORATIVO]: [
    { image: imgCorpTradeFinance, path: 'trade-finance' },
    { image: imgCorpTradeService, path: 'trade-service' },
    { image: imgCorpHedge, path: 'hedge' },
    { image: imgCorpAssessoria, path: 'assessoria-e-servicos' },
    { image: imgCorpAnalises, path: 'analises-registros-e-declaracoes' },
  ],
  [CambiosTypes.PESSOA_FISICA]: [
    { image: imgPFTurismo, path: 'cambio-turismo' },
    { image: imgPFTransf, path: 'transferencias-internacionais' },
    { image: imgPFPag, path: 'pagamentos-internacionais' },
    { image: imgPFHedge, path: 'hedge' },
  ],
}

export { CambiosTypes, Services }
