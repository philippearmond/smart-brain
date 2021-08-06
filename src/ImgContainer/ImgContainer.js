import React from 'react'

import './imgContainer.css'

const ImgContainer = ( { faceBoxSize, imgState } ) => ( //https://i.pinimg.com/originals/be/b3/1f/beb31f3df42c1582add62066fff01d9b.jpg
    <div className="display-img-container">
        <div className="img-container">
            <img src={ imgState } id="inputImage" />
            <div className="bounding-box" style={ {bottom: faceBoxSize.rightCol , left: faceBoxSize.bottomRow, right: faceBoxSize.topRow , top: faceBoxSize.leftCol} }></div>
        </div>
    </div>
)

export default ImgContainer