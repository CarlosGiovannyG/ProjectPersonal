import React, { useEffect } from 'react';
import styles from './notify.module.css'
import { GrAlert, GrFormCheckmark} from 'react-icons/gr'
import { useState } from 'react';

const NotifyError = ({ success, error }) => {
  
  const [message, setMessage] = useState(null);
  const [messageError, setMessageError] = useState(null);

  useEffect(() => {
    if (success) {
      setMessage(success);
      setTimeout(() => setMessage(null),5000)
    }
  
    if (error) {
      setMessageError(error)
      setTimeout(() => setMessageError(null),5000)
    }
    
  }, [error, success, message, messageError]);
  
  return (
  <>
    {messageError && 
    <div className={styles.notifyError}>
      <GrAlert className={styles.AlertError}/>
          <div className={styles.message}>
            {messageError}
    </div>
    </div>
      }
    {message && 
    <div className={styles.notify}>
          <GrFormCheckmark className={styles.Alert}/>
    <div className={styles.message} >
            {message}
    </div>
    </div>
      }
    </>
  )
}

export default NotifyError
