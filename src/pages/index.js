import React from 'react'
import Link from 'gatsby-link'
import Markdown from 'react-markdown'
import s from '../styles/index.module.scss'

const IndexPage = ({ data, context }) => {
  return (
    <div>
      {data.allPosts.edges.map(post => (
        <div key={post.node.id} className={s.post}>
          <p className={s.date}>{post.node.dateandTime}</p>
          <Link to={`/post/${post.node.slug}`} className={s.link}>
            <h3 className={s.title}>{post.node.title}</h3>
          </Link>
          {post.node.authors.map(author => (
            <div key={author.id} className={s.post}>
              <p className={s.author}>Posted by <span className={s.name}>{author.name}</span>
              <img src={author.image.url} alt="" className={s.authorPic} />
              </p>
            </div>
          ))}
          <img 
            src={post.node.image.url} 
            alt={post.node.title}
            className={s.contentImg}
          />
          <Markdown 
            className={s.content}
            source={post.node.content}
          />
          <hr/>
        </div> 
      ))}
    </div>
  )
}

export default IndexPage

export const allPostsQuery = graphql`
  query allPosts {
    allPosts(sort: {fields: [dateandTime], order: DESC}) {
      edges {
        node {
          title
          content
          slug
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
`