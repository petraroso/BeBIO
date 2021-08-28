import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-image"
import styles from "./style.module.css"
import { myLocalStorage } from "../../helper"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { library } from "@fortawesome/fontawesome-svg-core"

library.add(faTrashAlt)

const BookmarkFeed = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulBlogFeed(limit: 20) {
        nodes {
          summary {
            internal {
              content
            }
          }
          body {
            raw
          }
          title
          slug
          tags
          authorsName
          updatedAt
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
  let [posts, setPosts] = useState(null)
  let [isLoaded, setLoaded] = useState(false)

  useEffect(() => {
    let allPosts = data.allContentfulBlogFeed.nodes.map(post => {
      let check = () => !!myLocalStorage.getItem(post.title)
      if (check()) post.isShown = true
      return post
    })

    setPosts(allPosts)
    setLoaded(true)
  }, [data.allContentfulBlogFeed.nodes])

  const changeStorage = property => {
    let newPosts = posts.map(some => {
      if (some.title === property) {
        myLocalStorage.removeItem(property)
        some.isShown = false
      }
      return some
    })

    setPosts(newPosts)
  }

  let firstVar

  if (isLoaded) {
    firstVar = (
      <div className={styles.main}>
        <section className={styles.bookmarkHeader}>
          <div className={styles.heading}>Bookmarks</div>
          <div className={styles.search}>
            <input
              type="text"
              placeholder="Search..."
              
              className={styles.filter}
            />
          </div>
        </section>
        <hr className={styles.line}></hr>
        <section className={styles.container}>
          {posts.map(post => {
            return post ? (
              <div className={post.isShown ? styles.profilePost : styles.hide}>
                <div key={post.slug} onClick={() => changeStorage(post.title)}>
                  <FontAwesomeIcon
                    icon={["fas", "trash-alt"]}
                    fill="white"
                    size="2x"
                    color="black"
                    className={styles.trashIcon}
                  />
                </div>
                <Link to={`/bookmarkPosts/${post.slug}`}>
                  <Img fluid={post.coverImage.fluid} className={styles.image} />
                </Link>
                <div className={styles.body}>
                  <div className={styles.title}>
                    <Link to={`/bookmarkPosts/${post.slug}`}>
                      <h3>{post.title}</h3>
                    </Link>
                  </div>

                  <div className={styles.textContainer}>
                    <p className={styles.text}>
                      {post.summary.internal.content}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )
          })}
        </section>
      </div>
    )
  }
  return <>{firstVar}</>
}
export default BookmarkFeed
