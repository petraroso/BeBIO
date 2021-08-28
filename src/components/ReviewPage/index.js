import React from "react"
import styles from "./style.module.css"
import { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import BlogRating from "../Images/BlogRating"

import Backdrop from "../Backdrop"

const ReviewPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulReviewPage(limit: 9) {
        nodes {
          ingredients {
            raw
          }
          title
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

  const [posts, setPosts] = useState(null)
  const [isLoaded, setLoaded] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [modalPost, setModalPost] = useState(null)

  useEffect(() => {
    let allPosts = data.allContentfulReviewPage.nodes.map(post => {
      post.isShown = false
      return post
    })

    setPosts(allPosts)
    setLoaded(true)
  }, [data.allContentfulReviewPage.nodes])

  const closeBackdrop = () => {
    setShowModal(false)
  }

  let site
  if (isLoaded) {
    site = (
      <div className={styles.container}>
        {posts.map(post => {
          return (
            <div className={styles.reviewPost}>
              <div className={styles.bump}>
                <div
                  key={post.title}
                  onClick={() => {
                    setShowModal(true)
                    setModalPost(post)
                  }}
                >
                  <Img fluid={post.coverImage.fluid} className={styles.image} />
                  <div className={styles.title}>{post.title}</div>
                </div>
              </div>
              <div className={styles.rating}>
                <BlogRating />
              </div>
            </div>
          )
        })}
      </div>
    )
  }
  return (
    <>
      {site}
      {showModal ? (
        <Backdrop post={modalPost} closeBackdrop={closeBackdrop} />
      ) : null}
    </>
  )
}
export default ReviewPage
