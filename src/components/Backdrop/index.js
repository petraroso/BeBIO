import React, { useState } from "react"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import Img from "gatsby-image"
import BlogRating from "../Images/BlogRating"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { library } from "@fortawesome/fontawesome-svg-core"
import ProfileImage1 from "../Images/ProfileImage1"
import ProfileImage2 from "../Images/ProfileImage2"
import ProfileImage3 from "../Images/ProfileImage3"
import CommentSection from "../CommentSection"
import styles from "./style.module.css"
library.add(
  faPlus,
  faTimes
  // more icons go here
)

const user1 = "_UserName1"
const user2 = "_UserName2"
const user3 = "_UserName3"
const FirstCom =
  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium"
const SecondCom = "Sed ut perspiciatis unde omnis iste"
const ThirdCom = "ut perspiciatis"

const Backdrop = props => {
  const [button, setButton] = useState(false)

  const change = () => {
    setButton(true)
  }

  let spinner = (
    <div className={styles.wholeSite}>
      <div className={styles.index}>
        <div key={props.post.title} onClick={() => props.closeBackdrop()}>
          <FontAwesomeIcon
            icon={["fas", "times"]}
            fill="white"
            size="2x"
            color="black"
            className={styles.timesIcon}
          />
        </div>

        <div className={styles.leftDiv}>
          <Img fluid={props.post.coverImage.fluid} className={styles.image} />
        </div>

        <div className={styles.rightDiv}>
          <div className={styles.title}>{props.post.title}</div>
          <div className={styles.rating}>
            <BlogRating />
          </div>
          <div className={styles.ingredientsTitle}>Ingredients:</div>
          <div className={styles.ingredients}>
            {renderRichText(props.post.ingredients)}
          </div>
        </div>
      </div>

      <div className={styles.reviewHead}>
        <h3 className={styles.commentsTitle}>Reviews</h3>
        <div className={styles.buttonDiv}>
          <textarea
            onClick={change}
            placeholder="Add your review here..."
            maxLength="160"
            className={styles.textarea3}
          ></textarea>
        </div>
      </div>
      {button ? (
        <div className={styles.commentButtons}>
          <button className={styles.button1} onClick={() => setButton(false)}>
            CANCEL
          </button>
          <button className={styles.button2}>SUBMIT</button>
        </div>
      ) : null}
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
  )

  return (
    <>
      <div className={styles.backdrop} onClick={props.closeBackdrop}></div>
      <div className={styles.modal}>{spinner}</div>
    </>
  )
}

export default Backdrop
