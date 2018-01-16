import React from 'react' 
import Link from 'gatsby-link' 
import s from '../styles/readnext.module.scss'


const ReadNextPost = props => {
  const { path, title, image } = props
  const styles = { 
    backgroundImage: `url(${image}`
  }
  return (
    <div>
      <Link 
        to={path} 
        style={styles}
        className={s.readNext}
      >
        <div className={s.readNext__div}>
          <h4>{title}</h4> 
        </div>
      </Link>
    </div>
  )
}

class ReadNext extends React.Component {
  render() {
    const { 
      next, 
      prev, 
      nextTitle, 
      prevTitle, 
      nextImage, 
      prevImage } = this.props
    return (
      <div className={s.postNavigation}>
        <ReadNextPost 
          path={prev} 
          title={prevTitle}
          image={prevImage} 
        />
        <ReadNextPost 
          path={next} 
          title={nextTitle} 
          image={nextImage}
        />
      </div>
    )
  }
}

export default ReadNext