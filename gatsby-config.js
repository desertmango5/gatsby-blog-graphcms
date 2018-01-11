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
          endpoint: `https://api.graphcms.com/simple/v1/cjc8ur3k41gkn0189owdwc7oo`,
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
            }
          }`
        }
      },
      `gatsby-plugin-react-helmet`,
      `gatsby-plugin-sass`,
    ],
}
