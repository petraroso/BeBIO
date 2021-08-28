import React from 'react'
import styles from './style.module.css'


const BookmarkPost = ({image, text,profileImage,authorsName}) => (
    <section className = {styles.hottestPost}>
        <div className = {styles.image} >{image}</div>
        <div className={styles.articleHalf}>
            <div className={styles.author}>
                <div className = {styles.profileImage}>
                     {profileImage}
                </div>
                <h4 className = {styles.name}>{authorsName}</h4>
            </div>
            <img className = {styles.rate} src= '..\..\images\rating.png' alt="image"/>
            <p className = {styles.text}>{text}</p>
            <button className={styles.button}>Read more</button>
        </div>
    </section>

)
export default BookmarkPost