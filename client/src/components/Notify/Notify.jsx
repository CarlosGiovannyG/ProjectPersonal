import React from 'react';
import styles from './notify.module.css'
import { GrAlert, GrFormCheckmark} from 'react-icons/gr'
import { useState } from 'react';

const NotifyError = ({ success, error }) => {
  
  const [message ] = useState(success);
  const [messageError ] = useState(error);

    
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
