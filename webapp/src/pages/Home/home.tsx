import * as styles from "./home.module.css"
import React from "react"
import reactImage from "../../assets/images/react.svg"

export default function Home() {
  return (
    <>
      <h2>Home page</h2>
      <div className={styles.image}>
        <img src={reactImage} alt="Logo of the React" />
      </div>
    </>
  )
}
