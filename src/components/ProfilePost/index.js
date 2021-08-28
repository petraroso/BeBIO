import React from 'react'
import styles from './style.module.css'
//import ProfileContainer from '../../modules/ProfileContainer'


const ProfilePost = ({image,text}) =>(

    <div className = {styles.profilePost}>
        <div className = {styles.image} >{image}</div>
        <div className={styles.shadow}>
            <p className = {styles.text}>{text}</p>
        </div>

    </div>
  )
export default ProfilePost