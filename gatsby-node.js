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

    graphql(`
      {
        allPosts {
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
          component: slash(postTemplate),
          limit: 10
        })

        // creates page for each blog post
        createLinkedPages({
          createPage,
          edges: result.data.allPosts.edges,
          component: slash(postTemplate),
          edgeParser: edge => ({
            path: `/post/${edge.node.slug}`,
            context: {
              slug: edge.node.slug,
              info: edge.node,
            },
          }),
          circular: true
        })
      resolve()
    })
  })
}