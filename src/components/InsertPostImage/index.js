import React, { Component } from "react"
import firebase from "../Firebase/firebase"
import styles from "./style.module.css"
//import { getStorage } from "firebase/storage"
import AddNewFeed from "../AddNewFeed"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faImage } from "@fortawesome/free-solid-svg-icons"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      image: null,
      progress: 0,
      downloadURL: null,
      button: false,
      title: "",
      update: false,
    }
  }

  handleChange = e => {
    if (e.target.files[0]) {
      this.setState({
        image: e.target.files[0],
      })
    }
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
    return (
      <div className={styles.container}>
        <div className={styles.wholeBlog}>
          <h2 className={styles.add}>Add new post</h2>
          <button
            className={styles.insert}
            onClick={() => this.setState({ update: true })}
          >
            <FontAwesomeIcon icon={faImage} size="1x" color="#11111" />
            &nbsp;&nbsp;Upload post image
          </button>
          {this.state.update ? (
            <section className={styles.field}>
              <div className={styles.uploadButtonsDiv}>
                <div className={styles.buttonDiv1}>
                  <label className={styles.buttonUpload}>
                    Choose&nbsp;file
                    <input type="file" id="file" onChange={this.handleChange} />
                  </label>
                </div>
                <div className={styles.arrowIcon}>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    size="2x"
                    color="#808080"
                  />
                </div>
                <div className={styles.buttonDiv}>
                  <button
                    className={styles.buttonUpload}
                    onClick={this.handleUpload}
                  >
                    Upload
                  </button>
                </div>
              </div>
              <div className={styles.picHolderDiv}>
                <img
                  className={styles.pictureHolder}
                  src={
                    this.state.downloadURL ||
                    "https://via.placeholder.com/260x350"
                  }
                  alt="Uploaded Images"
                  height="260"
                  width="350"
                />
              </div>

              <div className={styles.progress}>
                <span>Uploaded </span>
                {this.state.progress}
                <span>%</span>
              </div>
            </section>
          ) : (
            ""
          )}
        </div>

        <AddNewFeed prop={this.state.downloadURL} />
      </div>
    )
  }
}
