import React, { useState, useRef } from "react"
import { navigate, Link } from "gatsby"
import styles from "./style.module.css"
import { myLocalStorage } from "../../helper"
import { useAuth } from "../Contexts/AuthContext"

const LogInPage = () => {
  const [username, setUserName] = useState()
 
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [passwordError, setPasswordError] = useState("")
  const [passwordLoading, setPasswordLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setPasswordError("")
      setPasswordLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      myLocalStorage.setItem("loggedIn", username)
      return navigate("/profile")
    } catch {
      setPasswordError("Failed to log in")
    }
    setPasswordLoading(false)
  }

  return (
    <main
      className={styles.background}
    >
      {passwordError}
      <form className={styles.container} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Log in</h2>
        <section className={styles.field}>
          <label htmlFor="email">E-mail</label>
          <input
            name="email"
            type="email"
            ref={emailRef}
          ></input>
        </section>

        <section className={styles.field}>
          <label htmlFor="username">Username</label>
          <input
            name="username"
            required
            onChange={e => setUserName(e.target.value)}
          />
        </section>

        <section className={styles.field}>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            ref={passwordRef}
          />
        </section>

        <p
          className={`${
            styles[passwordError !== "Success" ? "error" : "success"]
          } ${passwordError ? styles.show : ""}`}
        >
          {passwordError}
        </p>
        <div className={styles.button}>
          <button
            className={styles.loginButton}
            type="submit"
            disabled={passwordLoading}
            
          >
            {passwordLoading ? "Loading..." : "Log in"}
          </button>
        </div>
      </form>
      <span className={styles.spanclass}>
        Don't have an account?&nbsp;
        <Link to = {"/signup"}>Sign up</Link>
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

export default LogInPage
