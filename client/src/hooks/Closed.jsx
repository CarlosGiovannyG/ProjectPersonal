import React from 'react';
import {GrClose} from 'react-icons/gr'

const Closed = ({style, click}) => {
  return (
    <GrClose className={style} onClick={click}  />
  )
}

export default Closed
