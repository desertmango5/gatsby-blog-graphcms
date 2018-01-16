import React from 'react' 
import Markdown from 'react-markdown'
import Link from 'gatsby-link'
import shortid from 'shortid'
import s from './blog-post.module.scss'
import ReadNext from '../components/ReadNext'

class PostTemplate extends React.Component {
  render() {
    const post = this.props.data.posts
    const { prev, next, total } = this.props.pathContext

    return (
      <div key={shortid.generate()} className={s.post}>
      <p className={s.date}>{post.dateandTime}</p>
        <h3 className={s.title}>{post.title}</h3>
        {post.authors.map(author => (
          <div key={shortid.generate()}>
            <p className={s.author}>Posted by <span className={s.name}>{author.name}</span>
            <img src={author.image.url} alt={author.name} className={s.authorPic} />
            </p>
          </div>
        ))}
        <img 
          src={post.image.url} 
          alt={post.title}
          className={s.contentImg}
        />
        <Markdown 
          className={s.content}
          source={post.content}
          escapeHtml={false}
        />
        <hr/>
        <h5 className={s.tagLabel}>TAGS</h5>
        <div className={s.tags}>
          {post.tags.map(tag => (
            <p key={shortid.generate()} className={s.tag}>{tag}</p>
          ))}
        </div>
        <div className={s.postNavigation}>
          {/* TODO
              1. add href for previous/next
              2. use post.title in place of 'previous'/'next'
              3. only show is there IS a previous or next post    
           */}
          <ReadNext 
            next={this.props.data.next.slug} 
            prev={this.props.data.prev.slug} 
            nextTitle={this.props.data.next.title}
            prevTitle={this.props.data.prev.title}
            nextImage={this.props.data.next.image.url}
            prevImage={this.props.data.prev.image.url}
          />
        </div>
      </div>
    )
  }
}
  
export const postQuery = graphql`
  query readNextPostandBlogPostBySlug(
    $slug: String!, 
    $next: String,
    $prev: String
  ) {
    posts(
      slug: { eq: $slug }
    ) {
      title
      content
      slug
      dateandTime(formatString: "DD MMM YYYY")
      id
      tags
      image {
        url
      }
      authors {
        name
        image {
          url
        }
      }
    }
    next: posts(
      slug: { eq: $next }
    ) {
      title
      slug
      image {
        url
      }
    }
    prev: posts(
      slug: { eq: $prev }
    ) {
      title
      slug
      image {
        url
      }
    }
  }
`
  
export default PostTemplate


