import { Helmet } from 'react-helmet'

import { SeoPropsType } from './types'

const Seo = (props: SeoPropsType) => (
  <Helmet>
    <title>{props.title}</title>
    <meta name='description' content={props.description} />
    <meta property='og:type' content='website' />
    <meta property='og:title' content={props.title} />
    <meta property='og:description' content={props.description} />
  </Helmet>
)

export default Seo
