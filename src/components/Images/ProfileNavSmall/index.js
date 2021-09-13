import React from "react"
import { useStaticQuery, graphql } from "gatsby"
//import Img from "gatsby-image"
import Img from "gatsby-image"
import styles from "./style.module.css"

const ProfileNavSmall = ({prop}) => {
  
  const data = useStaticQuery(graphql`
    query {
      desktop: file(relativePath: { eq: "profilePic.png" }) {
        childImageSharp {
          fluid(quality: 90, maxWidth: 800) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
        extension
        publicURL
      }
    }
  `)
  return (
    <img
    src = {prop || "https://via.placeholder.com/150x150"}
      className={prop? styles.titleImage : ""}
      alt="Profile image"
               height="50"
                width="50"
    ></img>
   
  )
}
export default ProfileNavSmall