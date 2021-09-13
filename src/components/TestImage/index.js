import React, { Component } from "react"
import firebase from "../Firebase/firebase"
import styles from "./style.module.css"
import { getStorage } from "firebase/storage"
import AddNewFeed from "../AddNewFeed"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faImage } from "@fortawesome/free-solid-svg-icons"


export default class App extends Component {
  constructor() {
    super()
    this.state = {
      image: null,
      progress: 0,
      downloadURL: null,
      button:false,
      title:"",
      update:false,
    }
  }
  
  
  handleChange = e => {
    if (e.target.files[0]) {
      this.setState({
        image: e.target.files[0],
      })
    }

    // console.log(e.target.files[0])
  }

  handleUpload = () => {
    let file = this.state.image
    var storage = firebase.storage()
    var storageRef = storage.ref()
    var uploadTask = storageRef.child("folder/" + file.name).put(file)

    

    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      snapshot => {
        var progress =
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100
        this.setState({ progress })
      },
      error => {
        throw error
      },
      () => {
        // uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) =>{

        uploadTask.snapshot.ref.getDownloadURL().then(url => {
          this.setState({
            downloadURL: url,
          })
        })
        document.getElementById("file").value = null
      }
    )
  }

 

  render() {
    console.log("parent");
    console.log(this.state.update);
    return (
      <div className={styles.container}>
      <div className={styles.wholeBlog}>
      <h2 className={styles.add}>Add new post</h2>
        <button className={styles.insert} onClick={() => this.setState({update:true})}>
            <FontAwesomeIcon icon={faImage} size="1x" color="#11111" />
            &nbsp;&nbsp;update profile picture
          </button>
      {this.state.update? 
      <section className={styles.field}>
        <div className={styles.buttonDiv}>
        <label className = {styles.buttonUpload}>
          Choose file
          <input type="file" id="file" onChange={this.handleChange} />
        </label>
        </div>

        <div className = {styles.picHolderDiv}>
         <img
          className={styles.pictureHolder}
          src={this.state.downloadURL || "https://via.placeholder.com/150x150"}
          alt="Uploaded Images"
          height="150"
          width="150"

        />
        </div>
        
        <div className = {styles.progress}>
        <span>Image uploaded... </span>
        {this.state.progress}
        <span>%</span>
        </div>

        <div className={styles.buttonDiv}>
        <button className={styles.buttonUpload} onClick={this.handleUpload}>
          Upload
        </button>
        </div>
        </section> : ""}
        
        </div>

        <AddNewFeed prop={this.state.downloadURL}
         />
        
      
      
      </div>
    )
  }
}
;
