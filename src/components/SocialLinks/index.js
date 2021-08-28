import React from 'react'
import styles from './style.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFacebook, faTwitter, faInstagram} from "@fortawesome/free-brands-svg-icons"


const SocialLinks = () => (
    <nav className = {styles.SocialLinks}>  
     <a href="https://hr-hr.facebook.com/" className={styles.facebook}><FontAwesomeIcon icon = {faFacebook} size="2x"/></a> 
     <a href ="https://www.instagram.com/" className={styles.instagram}><FontAwesomeIcon icon = {faInstagram} size="2x"/></a>
     <a href ="https://twitter.com/login?lang=en" className={styles.twitter}><FontAwesomeIcon icon = {faTwitter} size="2x"/></a>
    </nav>
)
export default SocialLinks