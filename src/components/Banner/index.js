import React from "react"
import styles from "./style.module.css"
import { Link } from "gatsby"

const Banner = () => {
  return (
    <div className={styles.banner}>
      <div className={styles.title}>
        <h1>
          Sustainable, <br></br>eco-friendly<br></br>lifestyle
        </h1>
        <div className={styles.description}>
          is possible and easy with a community that<br></br> shares and cares!
        </div>
      </div>
      <div className={styles.section}>
        <div className={styles.buttonDiv1}>
          <Link to={"/signup"}>
            <button className={styles.button1}>Join our community</button>
          </Link>
        </div>
        <div className={styles.buttonDiv2}>
          <Link to={"/blog"}>
            <button className={styles.button2}>
              Explore without an account
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Banner
