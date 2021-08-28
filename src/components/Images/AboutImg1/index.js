import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import styles from "./style.module.css"

const AboutImg1 = () => {
  const data = useStaticQuery(graphql`
    query {
      desktop: file(relativePath: { eq: "about1.jpg" }) {
        childImageSharp {
          fluid(quality: 90, maxWidth: 1920) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
        extension
        publicURL
      }
    }
  `)
  return (
    <Img
      fluid={data.desktop.childImageSharp.fluid}
      className={styles.aboutImg1}
    />
  )
}
export default AboutImg1
