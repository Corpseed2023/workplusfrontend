import React, { useRef } from "react"
import "./ScreenPhoto.scss"
import { Link } from "react-router-dom"
import { Modal } from "antd"

const ScreenPhoto = ({ index, image, time, date }) => {
  const imgRef = useRef()

  const imageBigger = () => {
    if (imgRef.current) {
      imgRef.current.style.position = "absolute"
      imgRef.current.style.top = "20px"
      imgRef.current.style.right = "0px"
      imgRef.current.style.left = "0px"
      imgRef.current.style.bottom = "0px"
      imgRef.current.style.margin = "auto"
      imgRef.current.style.height = "80vh"
      imgRef.current.style.width = "90vw"
      imgRef.current.style.border = "2px solid #fff"
      imgRef.current.style.boxShadow = "0px 15px 20px rgba(0,0,0,.5)"
      imgRef.current.style.zIndex = "1000"
      imgRef.current.style.backdropFilter = "blur(10px)"
    }
  }

  const imageSmaller = () => {
    if (imgRef.current) {
      imgRef.current.style.position = "relative"
      imgRef.current.style.top = "0px"
      imgRef.current.style.left = "0px"
      imgRef.current.style.height = "200px"
      imgRef.current.style.width = "100%"
      imgRef.current.style.zIndex = "1"
      imgRef.current.style.backdropFilter = "none"
      imgRef.current.style.border = "none"
      imgRef.current.style.boxShadow = "none"
    }
  }

  return (
    <div key={index}>
      <div className="image-box" ref={imgRef}>
        <img onClick={imageBigger} src={image} />
        <i
          onClick={imageSmaller}
          className={`fa-solid cross-click fa-circle-xmark`}
        ></i>
      </div>
      <div className="sm-date">
        <div>
          <p className="mb-0 py-0 px-2">
            <b>Date: </b> {date}{" "}
          </p>
          <p className="mb-0 py-0 px-2">
            {" "}
            <b>Time: </b>
            {time}{" "}
          </p>
        </div>
        <div>
          <Link className="cm-btn-one" to={image}>
            Download
          </Link>
        </div>
      </div>

      <Modal >
        <img src={image}/>
      </Modal>
    </div>
  )
}

export default ScreenPhoto
