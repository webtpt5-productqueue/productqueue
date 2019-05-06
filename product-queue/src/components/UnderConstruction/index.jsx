import React from 'react'
import './index.css'

function UnderConstruction(props) {
  return (
    <div id="uc-wrapper">
      <p className="title">Under Construction 🚧</p>
      <p className="content">
        Don't worry, we'll be finished soon 😀<br />
        Until we're ready, {` `}
        <a href="https://giphy.com/explore/dog" target="_blank">
          check out these cute dog gifs!
        </a>
      </p>
    </div>
  )
}

export default UnderConstruction
