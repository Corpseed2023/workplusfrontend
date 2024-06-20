import React, { useEffect, useState } from "react"
import { Icon } from "@iconify/react"
import "./ScreenPhoto.scss"
import { Button } from "antd"
import { useSelector } from "react-redux"

const FullScreenImageViewer = ({ image, onClose, index }) => {
  const { allScreenshot } = useSelector((prev) => prev?.screenshot)
  const [indexCount, setIndexCount] = useState(index)

  const nextImage = () => {
    if (indexCount < allScreenshot?.length - 1) {
      setIndexCount((prev) => prev + 1)
    }
  }

  const prevImage = () => {
    if (indexCount >= 0) {
      setIndexCount((prev) => prev - 1)
    }
  }

  useEffect(() => {
    console.log("myIndex", index)
  }, [index])
  console.log(allScreenshot, index)

  return (
    <div className="overlay">
      <Button type="text" style={{color:'#fff'}} disabled={indexCount===0} onClick={prevImage}>
        <Icon
          icon="fluent:ios-arrow-24-regular"
          height={32}
          width={32}
        />
      </Button>
      <img
        src={allScreenshot[indexCount]?.screenshotUrl}
        alt="Screenshot"
        className="full-screen-image"
      />
      <Button type="text" disabled={indexCount === allScreenshot?.length-1} onClick={nextImage}>
        <Icon
          icon="fluent:ios-arrow-rtl-24-regular"
          height={32}
          width={32}
          color="#ffff"
        />
      </Button>
      <Button type="text" className="close-button" onClick={onClose}>
        <Icon
          icon="fluent:dismiss-24-regular"
          height={32}
          width={32}
          color="#ffff"
        />
      </Button>
    </div>
  )
}

export default FullScreenImageViewer
