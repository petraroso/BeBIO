import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import styles from "./style.module.css"
import BlogRating from "../../components/Images/BlogRating"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBookmark } from "@fortawesome/free-regular-svg-icons"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { library } from "@fortawesome/fontawesome-svg-core"
import firebase from "../../components/Firebase/firebase"

library.add(
  faBookmark

  // more icons go here
)

const BlogContainer = ({ tags }) => {
  const [items, setItems] = useState([])

  useEffect(() => {
    firebase
      .firestore() //access firestore
      .collection("posts") //access "items" collection
      .onSnapshot(snapshot => {
        //You can "listen" to a document with the onSnapshot() method.
        const listItems = snapshot.docs.map(doc => ({
          //map each document into snapshot
          id: doc.id, //id and data pushed into items array
          ...doc.data(), //spread operator merges data to id.
        }))
        setItems(listItems) //items is equal to listItems
      })
  }, [])

  let filtered = (
    <>
      {items
        ? items.map(item => {
            return (
              <div className={styles.container}>
                <div className={styles.post}>
                  <img src={item.imageURL.prop} className={styles.image}></img>

                  <div className={styles.body}>
                    <div className={styles.tags}> #{item.tag}</div>
                    <div>
                      <Link to={`/blogPosts/${item.id}`}>
                        <h2>{item.title}</h2>
                      </Link>
                    </div>
                    <section className={styles.blog2}>
                      <div className={styles.text}>
                        <div> {item.summary}... </div>
                      </div>
                      <div className={styles.ratingandname}>
                        <div className={styles.rating}>
                          <BlogRating />
                        </div>
                        <div className={styles.author}>
                          <h4 className={styles.name}>{item.authorsName}</h4>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            )
          })
        : ""}
    </>
  )

  if (tags) {
    let check = 0

    filtered = (
      <>
        {items
          ? items.map(item => {
              if (item.tag.startsWith(tags)) {
                check = 1
                return (
                  <div className={styles.container}>
                    <div className={styles.post}>
                      <div className={styles.imageDiv}>
                        <img
                          src={item.imageURL.prop}
                          className={styles.image}
                        ></img>
                      </div>
                      <div className={styles.body}>
                        <div className={styles.tags}> #{item.tag}</div>
                        <div>
                          <Link to={`/blogPosts/${item.id}`}>
                            <h2>{item.title}</h2>
                          </Link>
                        </div>
                        <section className={styles.blog2}>
                          <div className={styles.text}>
                            <div> {item.summary} </div>
                          </div>
                          <div className={styles.ratingandname}>
                            <div className={styles.rating}>
                              <BlogRating />
                            </div>
                            <div className={styles.author}>
                              <h4 className={styles.name}>
                                {item.authorsName}
                              </h4>
                            </div>
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>
                )
              }
            })
          : ""}
      </>
    )
    if (check === 0) {
      filtered = (
        <>
          <div className={styles.check}>
            <div className={styles.searchIcon}>
              <FontAwesomeIcon
                icon={faSearch}
                size="5x"
                color="#444444"
                opacity="0.3"
              />
            </div>
            <div className={styles.noResults}>
              No results found for "{tags}"
            </div>
            <div className={styles.searchTipsDiv}>
              <div className={styles.searchTipsHeading}>Search tips:</div>
              <div className={styles.searchTips}>
                &bull; Check your search for typos<br></br>
                &bull; Try a different keyword<br></br>
                &bull; Use more generic search terms
              </div>
            </div>
            <div className={styles.links}>
              <Link to={"/blog"}>&#8592; Go back to blog feed</Link>
            </div>
          </div>
        </>
      )
    }
  }
  return <>{filtered}</>
}

export default BlogContainer
