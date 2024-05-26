import React from "react"

const Head = () => {
  return (
    <>
      <section className='head'>
        <div className='container flexSB'>
          <div className='logo'>
            <h1>Brainiac</h1>
            <span>ONLINE EDUCATION & LEARNING</span>
          </div>

          <div className='social'>
          <a href="https://www.facebook.com/"><i className='fab fa-facebook-f icon'></i></a>
          <a href="https://www.instagram.com/"><i className='fab fa-instagram icon'></i></a>
          <a href="https://twitter.com/"><i className='fab fa-twitter icon'></i></a>
          <a href="https://www.youtube.com/"><i className='fab fa-youtube icon'></i></a>       
          </div>
        </div>
      </section>
    </>
  )
}

export default Head
