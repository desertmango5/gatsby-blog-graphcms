const path = require('path');
const slash = require('slash');

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  return new Promise((resolve, reject) => {
    const postTemplate = path.resolve(`src/templates/blog-post.js`)

    graphql(`
      {
        allPosts {
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
        result.data.allPosts.edges.map(({ node }) => {
          createPage({
            path: `/post/${node.slug}`,
            component: slash(postTemplate),
            context: {
              slug: node.slug,
            },
          })
        })
      resolve()
    })
  })
}