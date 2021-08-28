import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import styles from "./style.module.css"

const EnvelopeImg = () => {
  const data = useStaticQuery(graphql`
    query {
      desktop: file(relativePath: { eq: "envelope.png" }) {
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
      className={styles.envelopeImg}
    />
  )
}
export default EnvelopeImg
