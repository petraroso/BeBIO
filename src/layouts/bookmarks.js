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
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBookmark } from "@fortawesome/free-regular-svg-icons"
import styles from "./blog.module.css"
import HeaderFooterLayout from "../layouts/headerFooter"
import { myLocalStorage } from "../helper"
import { library } from "@fortawesome/fontawesome-svg-core"

library.add(
  faBookmark
  // more icons go here
)

const user1 = "_UserName1"
const user2 = "_UserName2"
const user3 = "_UserName3"

const FirstCom =
  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium"
const SecondCom = "Sed ut perspiciatis unde omnis iste"
const ThirdCom = "ut perspiciatis"

const BookmarkPost = ({ pageContext }) => {
  const { body, title, coverImage, next, prev, tags, authorsName } = pageContext

  const [button, setButton] = useState(false)
  const change = () => {
    setButton(true)
  }
  let userAcc = myLocalStorage.getItem("loggedIn")

  return (
    <HeaderFooterLayout>
      <main className={styles.container}>
        <header className={!prev || !next ? styles.headerTwo : ""}>
          <div className={styles.prev}>
            {prev && (
              <Link to={`/bookmarkPosts/${prev.slug}`}>
                <div className={styles.button3}>Previous</div>
              </Link>
            )}
          </div>
          <div className={styles.next}>
            {next && (
              <Link to={`/bookmarkPosts/${next.slug}`}>
                <div className={styles.button4}>Next</div>
              </Link>
            )}
          </div>
        </header>
        <div className={styles.wholeBlog}>
          <section className={styles.blog1}>
            <div className={styles.imageAndIcon}>
              <Img fluid={coverImage.fluid} className={styles.image} />
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
            userAcc={userAcc}
            tags={tags}
            authorsName={authorsName}
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
            <></>
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
      <Link to = {"/bookmarks"}>&#8592; Go back to bookmarks </Link>
      </div>
    </HeaderFooterLayout>
  )
}

export default BookmarkPost
