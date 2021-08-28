import React, { useState } from "react"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import Img from "gatsby-image"
import { Link } from "gatsby"
import BlogPostBody from "../../src/components/BlogPostBody"
import ProfileNav from "../components/Images/ProfileNav"
import ProfileImage1 from "../components/Images/ProfileImage1"
import ProfileImage2 from "../components/Images/ProfileImage2"
import ProfileImage3 from "../components/Images/ProfileImage3"
import CommentSection from "../components/CommentSection"
import BlogRating from "../components/Images/BlogRating"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBookmark as reg } from "@fortawesome/free-regular-svg-icons"
import { faBookmark as sol } from "@fortawesome/free-solid-svg-icons"
import styles from "./blog.module.css"
import HeaderFooterLayout from "../layouts/headerFooter"
import { myLocalStorage } from "../helper"
import { library } from "@fortawesome/fontawesome-svg-core"
library.add(
  reg,
  sol
  // more icons go here
)

const user1 = "_UserName1"
const user2 = "_UserName2"
const user3 = "_UserName3"

const FirstCom =
  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium"
const SecondCom = "Sed ut perspiciatis unde omnis iste"
const ThirdCom = "ut perspiciatis"

const BlogFeed = ({ pageContext }) => {
  let userAcc = myLocalStorage.getItem("loggedIn")
  
  const [button, setButton] = useState(false)
  const [check, setCheck] = useState(null);
  const change = () => {
    setButton(true)
  }
  const { body, title, coverImage, next, prev, authorsName, tags } = pageContext

  const setArray = descr => {
    myLocalStorage.setItem(title, descr)
    setCheck(true)
  }

  const removeArray = property => {
    myLocalStorage.removeItem(property)
    setCheck(false)
  }

  return (
    <HeaderFooterLayout>
      <main className={styles.container}>
        <header className={!prev || !next ? styles.headerTwo : ""}>
          <div className={styles.prev}>
            {prev && (
              <Link to={`/blogPosts/${prev.slug}`}>
                <div className={styles.button3}>Previous</div>
              </Link>
            )}
          </div>
          <div className={styles.next}>
            {next && (
              <Link to={`/blogPosts/${next.slug}`}>
                <div className={styles.button4}>Next</div>
              </Link>
            )}
          </div>
        </header>
        <div className={styles.wholeBlog}>
          <section className={styles.blog1}>
            <div className={styles.imageAndIcon}>
              <Img fluid={coverImage.fluid} className={styles.image} />
              {authorsName ? (
                userAcc && userAcc === authorsName ? (
                  ""
                ) : !!myLocalStorage.getItem(title) ? (
                  <FontAwesomeIcon
                    icon={["fas", "bookmark"]}
                    size="2x"
                    color="black"
                    className={styles.bookmarkIcon}
                    onClick={() => removeArray(title)}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={["far", "bookmark"]}
                    size="2x"
                    color="black"
                    className={styles.bookmarkIcon}
                    onClick={() => setArray(title)}
                  />
                )
              ) : (
                ""
              )}
            </div>
            <div className={styles.head}>
              <div className={styles.h2}>
                <h2>{title}</h2>
              </div>
              <div className={styles.rating}>
                <BlogRating />
              </div>
            </div>
          </section>
          <BlogPostBody
            profileImage={<ProfileNav prop = {userAcc}/>}
            authorsName={authorsName}
            tags={tags}
            userAcc={userAcc}
          />

          <article>{renderRichText(body)}</article>

          <div className={styles.commentHead}>
            <h3 className={styles.commentsTitle}>Comments:</h3>
            <div className={styles.buttonDiv}>
              <textarea
                onClick={change}
                placeholder="Add your comment here..."
                maxLength="160"
                className={styles.textarea1}
              ></textarea>
            </div>
          </div>
          {button ? (
            <div className={styles.commentButtons}>
              <button
                className={styles.button1}
                onClick={() => setButton(false)}
              >
                CANCEL
              </button>
              <button className={styles.button2}>COMMENT</button>
            </div>
          ) : (
            ""
          )}

          <div className={styles.commentBody}>
            <CommentSection
              profileImage={<ProfileImage1 />}
              userName={user1}
              comment={FirstCom}
            />
            <CommentSection
              profileImage={<ProfileImage2 />}
              userName={user2}
              comment={SecondCom}
            />
            <CommentSection
              profileImage={<ProfileImage3 />}
              userName={user3}
              comment={ThirdCom}
            />
            <div className={styles.readmore}>
              <button className={styles.readMoreButton}>Read more</button>
            </div>
          </div>
        </div>
      </main>

      <div className={styles.links}>
      <Link to = {"/blog"}>&#8592; Go back to blog feed </Link>
      </div>
    </HeaderFooterLayout>
  )
}

export default BlogFeed
