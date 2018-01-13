import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import './index.scss'

const Header = (props) => {
  return (
    <div
      style={{
        background: 'crimson',
        marginBottom: '1.45rem',
        boxShadow: '0 3px 5px #aaa',
      }}
    >
      <div
        style={{
          margin: '0 auto',
          maxWidth: 960,
          padding: '1.45rem 1.0875rem',
        }}
      >
        <h1 style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              color: 'white',
              textDecoration: 'none',
            }}
          >
            {props.title}
          </Link>
        </h1>
          <h4
            style={{ color: 'white', fontWeight: 100, marginTop: '1rem' }}
          >
            {props.byline}
          </h4>
      </div>
      <div 
        style={{ display: 'flex' }}>
        <Link
          to="/"
          style={{ color: '#ccc', marginLeft: '1.5rem', marginBottom: '1rem' }}
        >
        Home
        </Link>

        <Link
          to="/authors/"
          style={{ color: '#ccc', marginLeft: '1.5rem', marginBottom: '1rem' }}
        >
        Authors
        </Link>
      </div>
    </div>
  )
}

const TemplateWrapper = ({ children, data }) => (
  <div>
    <Helmet
      title="Gatsby GraphCMS"
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    />
    <Header 
      title={data.site.siteMetadata.title} 
      byline={data.site.siteMetadata.byline}  
    />
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '0px 1.0875rem 1.45rem',
        paddingTop: 0,
      }}
    >
      {children()}
    </div>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper

export const query = graphql`
  query LayoutQuery {
    site {
      id
      siteMetadata {
        title
        byline
      }
    }
  }
`