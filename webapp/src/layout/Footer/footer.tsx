import * as commonStyles from "../../assets/styles/common.module.css";
import * as styles from "./footer.module.css";
import React from "react";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={commonStyles.container}>
        <h2>Footer</h2>
      </div>
    </footer>
  );
}
