import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import styles from "./style.module.css"

const ProfileImage3 = () => {
  const data = useStaticQuery(graphql`
    query {
      myImage: file(relativePath: { eq: "commentPic3.png" }) {
        childImageSharp {
          fixed(width: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)
  return (
    <Img fixed={data.myImage.childImageSharp.fixed} className={styles.image} />
  )
}

export default ProfileImage3
