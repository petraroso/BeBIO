import React, { useState } from "react"
import styles from "./style.module.css"
import Envelope from "../Images/Envelope"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons"

const ContactPage = ({ activeTab }) => {

  const [submit, setSubmit] = useState(false)
  const [count, setCount] = useState (0)
  console.log(count);
  return(

  <div className={styles.container}>
    <div className={styles.question}>Have some questions?</div>

    <div className={styles.contactInfo}>
      <div className={styles.link1}>contactUs@gmail.com</div>{" "}
      <div className={styles.line}> &nbsp;|&nbsp;</div>
      <div className={styles.support}>
        Support:&nbsp;<div className={styles.link2}>+385 96 772 555</div>
      </div>
      <div className={styles.line}> &nbsp;|&nbsp;</div>
      <nav className={styles.SocialLinks}>
        <a href="https://hr-hr.facebook.com/" className={styles.facebook}>
          <FontAwesomeIcon icon={faFacebook} size="2x" />
        </a>
        <a href="https://www.instagram.com/" className={styles.instagram}>
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </a>
        <a href="https://twitter.com/login?lang=en" className={styles.twitter}>
          <FontAwesomeIcon icon={faTwitter} size="2x" />
        </a>
      </nav>
    </div>
    
    <div className={styles.body}>
      <div className={styles.envelopeContainer}>
        <Envelope />
      </div>

      <div className={styles.forms}>
        <div className={styles.text}>
          <textarea
            onClickCapture = {() =>setCount(count+1)}
            placeholder="Name"
            maxLength="160"
            className={styles.textarea2}
          ></textarea>
        </div>
        <div className={styles.text}>
          <textarea
            onClickCapture = {() =>setCount(count+1)}
            placeholder="Your email"
            maxLength="160"
            className={styles.textarea2}
          ></textarea>
        </div>
        <div className={styles.text}>
          <textarea
            onClickCapture = {() =>setCount(count+1)}
            placeholder="Your questions..."
            maxLength="460"
            rows="6"
            className={styles.textarea2}
          ></textarea>
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick = {() => setSubmit(true)}>Submit</button>
        </div>
        {submit? (count == 3 ?<span className = {styles.msg}>Your&nbsp;question&nbsp;is&nbsp;succesfully&nbsp;sent!</span> : <span className = {styles.msg1}>All fields must be filled!</span>) : ""}
      </div>
    </div>

    <div className={styles.blob} width="100vw" height="756px">
      <svg width="1329" height="755" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M360.444 752.943c-86.43-8.662-166.267-53.512-202.967-113.67-30.956-51.031-31.294-108.429-42.542-163.317-13.544-67.701-44.333-133.554-77.265-197.812C19.783 243.516 1.076 208.176.16 171.463-.92 120.558 34.647 72.433 87.524 42.318 140.112 12.18 208.337-.936 275.864.078c35.95.332 73.057 4.89 103.935 19.702 32.564 15.584 55.434 41.18 88.302 56.567 30.33 14.338 66.874 18.638 101.93 19.344 46.055 1.04 91.883-2.955 135.75-12.104 50.052-10.462 97.065-27.244 146.843-37.943 49.778-10.7 105.179-14.679 154.305.537 45.996 14.342 81.372 43.648 112.98 72.91 51.742 48.338 98.653 99.394 139.865 153.105 27.931 36.203 53.43 73.981 63.933 114.637 20.109 77.541-20.806 160.632-102.37 206.849-67.387 38.481-155.29 50.878-240.958 56.23-78.087 4.794-167.343-.793-240.536 21.14-69.926 20.852-133.926 48.226-206.466 64.97-55.734 12.9-114.158 22.776-172.933 16.92z"
          fill="#696f45"
          opacity=".18"
        ></path>
      </svg>
    </div>
  </div>
  )
}
export default ContactPage
