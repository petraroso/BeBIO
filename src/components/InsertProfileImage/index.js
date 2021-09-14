import React, { Component } from "react"
import firebase from "../Firebase/firebase"
import styles from "./style.module.css"
import { Link } from "gatsby"
import UpdateUserInfo from "../UpdateUserInfo"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      image: null,
      progress: 0,
      downloadURL: null,
    }
  }

  handleChange = e => {
    if (e.target.files[0]) {
      this.setState({
        image: e.target.files[0],
      })
    }
  }

  handleUpload = e => {
    let file = this.state.image
    var storage = firebase.storage()
    var storageRef = storage.ref()
    var uploadTask = storageRef.child("folder/" + file.name).put(file)

    e.preventDefault()

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
      <main className={styles.background}>
        <form className={styles.container}>
          <h2 className={styles.add}>Update information</h2>

          <section className={styles.field}>
            <div className={styles.uploadButtonsDiv}>
              <div className={styles.buttonDiv}>
                <label className={styles.buttonUpload1}>
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
              <div className={styles.buttonDiv2}>
                <button
                  className={styles.buttonUpload2}
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
                  "https://via.placeholder.com/150x150"
                }
                alt="Uploaded Images"
                height="150"
                width="150"
              />
            </div>

            <div className={styles.progress}>
              <span>Uploaded </span>
              {this.state.progress}
              <span>%</span>
            </div>
          </section>

          <>
            <UpdateUserInfo
              prop={this.state.downloadURL}
              progress={this.state.progress}
            />
          </>
        </form>
        <span className={styles.spanclass}>
          <Link to={"/profile"}>Cancel</Link>
        </span>

        <div className={styles.area}>
          <ul className={styles.circles}>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </main>
    )
  }
}
