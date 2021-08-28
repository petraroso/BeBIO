import React from "react"
import styles from "./style.module.css"
import SocialLinks from "../SocialLinks"
import Copyright from "../Copyright"

const Footer = ({ activeTab }) => (
  <footer className={styles.footer}>
    <div className={styles.columns}>
      <div className={styles.firstColumn}>
        <div className={styles.title}>Helpful links</div>
        <div className={styles.link1}>User guidelines</div>
        <div className={styles.link2}>Help center</div>
        <div className={styles.link3}>Terms &#38; Conditions</div>
        <div className={styles.link4}>Privacy policy</div>
      </div>

      <div className={styles.secondColumn}>
        <div className={styles.title}>Learn more</div>
        <div className={styles.link5}>About us</div>
        <div className={styles.link6}>Our partners</div>
        <div className={styles.link7}>FAQs</div>
      </div>

      <div className={styles.thirdColumn}>
        <div className={styles.title3}>Follow us</div>
        <SocialLinks />
      </div>
    </div>
    <Copyright />
  </footer>
)
export default Footer
