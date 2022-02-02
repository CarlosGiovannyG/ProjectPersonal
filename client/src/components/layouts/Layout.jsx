import React, { useEffect, useState } from 'react'
import Navbar from '../navbar/Navbar';

const Layout = ({ children }) => {  
  const url = window.location.href.slice(21);
  const [scrollHeight, setScrollHeight] = useState(0);


  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollHeight(position)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
  }, [scrollHeight])
  
  console.log(url, scrollHeight);

  return (
    <>
      <Navbar isScrolling={scrollHeight}/>
     {children} 
    </>
  )
}

export default Layout
