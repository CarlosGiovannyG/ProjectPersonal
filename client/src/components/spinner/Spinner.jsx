import React from 'react'
import { FaSpinner } from 'react-icons/fa';
import styles from './spinner.module.css'

const Spinner = () => {
  return (
    <div className={styles.spinner}>
      <FaSpinner className={styles.spinning} size={80}/>
    </div>
  )
}

export default Spinner
