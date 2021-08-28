import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-image"
import styles from "./style.module.css"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"

const CarouselContainer = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulCarousel(limit: 6) {
        nodes {
          body {
            raw
          }
          title
          slug
          tags
          authorsName 
          coverImage {
            fluid(quality: 90, maxWidth: 1920) {
              src
              srcSet
              srcSetWebp
              srcWebp
              base64
              aspectRatio
            }
          }
        }
      }
    }
  `)

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.decor}>
        <h2>Explore hot topics this week</h2>
      </div>
      <Carousel
        autoPlay
        infiniteLoop
        useKeyboardArrows
        dynamicHeight
        interval={5500}
        transitionTime={3500}
        showStatus={false}
      >
        {data.allContentfulCarousel.nodes.map(node => {
          return (
            <Link to={`/hottestPosts/${node.slug}`}>
              <div className={styles.carouselContetnt}>
                <Img fluid={node.coverImage.fluid} className={styles.image} />
                <div className={styles.title}>
                  <h2 className={styles.span}>{node.title}</h2>
                </div>
              </div>
            </Link>
          )
        })}
      </Carousel>
    </div>
  )
}

export default CarouselContainer
