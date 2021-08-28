import React from "react"
import styles from "./style.module.css"
import {Link} from "gatsby"

const Page404 = () => (
  <div className={styles.background}>
    <div className={styles.body}>
      <div className={styles.title}>404</div>
      <div className={styles.explanation}>
        Page is not organic nor eco-friendly! :(
      </div>

      <div className={styles.buttondiv}>
        <Link to={"/"}>
          <button className={styles.button}>Return to Home</button>
        </Link>
      </div>

      <div className={styles.area}>
        <ul className={styles.circles}>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  </div>
)

export default Page404
