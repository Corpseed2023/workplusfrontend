import { Button, Card, Col, Row, Space, Typography } from "antd"
import React, { useState } from "react"
import "./ScreenPhoto.scss"
import { Link } from "react-router-dom"
import FullScreenImageViewer from "./FullScreenImageViewer"
const { Text } = Typography

const ScreenCard = ({ index, image, time, date }) => {
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const handleCloseViewer = () => {
    setIsViewerOpen(false)
  }

  return (
    <Card
      key={index}
      size="small"
      actions={[
        <Row>
          <Col span={16} className="flex-left-center">
            <Space direction="vertical" size={0}>
              <Text strong>Date : {date}</Text>
              <Text strong>Time : {time}</Text>
            </Space>
          </Col>
          <Col span={8} className="flex-right-center">
            <Link to={image}>
              <Button type="primary">
                Download
              </Button>
            </Link>
          </Col>
        </Row>,
      ]}
    >
      {/* <div className="image-box">
        <img
          src={image}
          onClick={() => setIsViewerOpen(true)}
          alt="screen shot"
          className="big-view-image"
        />
      </div>

      {isViewerOpen && (
        <FullScreenImageViewer
          image={image}
          index={index}
          onClose={handleCloseViewer}
        />
      )} */}
      <FullScreenImageViewer src={image}/>
    </Card>
  )
}

export default ScreenCard
