import React from 'react';
import Closed from '../../hooks/Closed';
import styles from './modal.module.css'

const Modal = ({ children, openModal, closeModal }) => {
  const handlePropagation = e => e.stopPropagation();

  return (
    <article className={openModal ? styles.open : styles.close} onClick={closeModal}>
      <div className={styles.container} onClick={handlePropagation}>
        
        <Closed style={styles.closed} click={closeModal}  />
{children}
      </div>
    </article>
  )
}

export default Modal
