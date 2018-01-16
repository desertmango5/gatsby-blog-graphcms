const path = require('path');
const slash = require('slash');
const {
  createPaginationPages,
  createLinkedPages
} = require('gatsby-pagination');

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  return new Promise((resolve, reject) => {
    const postTemplate = path.resolve(`src/templates/blog-post.js`)
    const indexTemplate = path.resolve(`src/templates/index.js`)

    graphql(`
      {
        allPosts(
          limit: 1000
          sort: { fields: [dateandTime], order: DESC }
        ) {
          totalCount
          edges {
            node {
              title
              content
              slug
              tags
              dateandTime(formatString: "DD MMM YYYY")
              id
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
          }
        }
      }
    `).then(result => {
        if (result.errors) {
          console.log(result.errors)
        }

        // creates Index page
        createPaginationPages({
          createPage,
          edges: result.data.allPosts.edges,
          component: slash(indexTemplate),
          limit: 20
        })

        // creates page for each blog post
        createLinkedPages({
          createPage,
          edges: result.data.allPosts.edges,
          component: slash(postTemplate),
          edgeParser: edge => ({
            path: edge.node.slug,
            context: {
              slug: edge.node.slug,
            },
          }),
          circular: true
        })
      resolve()
    })
  })
}