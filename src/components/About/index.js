import React from "react"
import styles from "./style.module.css"
import AboutImg1 from "../Images/AboutImg1"
import AboutImg2 from "../Images/AboutImg2"
import { Link } from "gatsby"

const About = () => (
  <div className={styles.container}>
    <div className={styles.about}>
      <div className={styles.text1}>
        <h2>Ever wondered what's in your cosmetics? We have.</h2>
        "Our goal is to educate, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat."
        <div className={styles.links}>
          <Link to={"/review"}>Read more about ingredients &#8594;</Link>
        </div>
      </div>

      <div className={styles.imageDiv1}>
        <AboutImg1 className={styles.image1}></AboutImg1>
      </div>

      <div className={styles.imageDiv2}>
        <AboutImg2 className={styles.image2}></AboutImg2>
      </div>

      <div className={styles.text2}>
        <h2>Sustainable, eco-friendly lifestyle made easy</h2>
        "We want to make reduce, reuse, recycle effortless, consectetur
        adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat."
        <div className={styles.links}>
          <Link to={"/blog"}>Read more about sustainability &#8594;</Link>
        </div>
      </div>
    </div>

    <div className={styles.joinSection}>
      <div className={styles.question}>
        Like what you hear? Agree or disagree? Join BeBIO and share your
        thoughts!
      </div>
      <div className={styles.buttonDiv}>
        <Link to={"/signup"}>
          <button className={styles.button}>Create an account</button>
        </Link>
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

export default About
