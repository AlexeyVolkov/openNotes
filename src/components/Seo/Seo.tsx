import { Helmet } from 'react-helmet'

export type SeoPropsType = {
  title?: string
  description?: string
}

const Seo = (props: SeoPropsType) => (
  <Helmet>
    <title>{props.title}</title>
    <meta name="description" content={props.description} />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={props.title} />
    <meta property="og:description" content={props.description} />
  </Helmet>
)

export default Seo
