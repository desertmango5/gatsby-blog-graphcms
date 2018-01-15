require('dotenv').config({ path: './.env.development' })

module.exports = {
  siteMetadata: {
    title: `Gatsby GraphCMS Blog`,
    byline: `A Practice Project`
  },
  plugins: 
    [
      {
        resolve: `gatsby-plugin-typography`,
        options: {
          pathToConfigModule: `src/utils/typography.js`,
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `src`,
          path: `${__dirname}/src/`,
        },
      },
      {
        resolve: `gatsby-source-graphcms`,
        options: {
          endpoint: process.env.GATSBY_API_URL,
          query: `{
            allPosts {
              title
              content
              id
              slug
              tags
              dateandTime
              image {
                fileName
                handle
                url
              }
              authors {
                id
                name
                image {
                  url
                }
              }
            },
            allAuthors {
              id
              name
              bio
              image {
                id
                url
              }
              posts {
                id
                title
                slug
              }
            }
          }`
        }
      },
      `gatsby-plugin-react-helmet`,
      `gatsby-plugin-sass`,
    ],
}
