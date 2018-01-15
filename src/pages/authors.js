import React from 'react'  
import s from '../styles/authors.module.scss'

const Authors =  ({ data }) => {
  return (
    <div>
      {data.allAuthors.edges.map(author => (
        <div
          key={author.node.id}
          className={s.authors}
        >
          <img 
            src={author.node.image.url} 
            alt={author.node.name}
            className={s.authorImage}
          />
          <h3 className={s.name}>{author.node.name}</h3>
          <p className={s.bio}>{author.node.bio}</p>
        </div>
      ))} 
    </div>
  )
}

export default Authors

export const allAuthorsQuery = graphql`
  query AllAuthorsQuery {
    allAuthors {
      edges {
        node {
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
      }
    }
  }
`