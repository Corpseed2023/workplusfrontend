import { Button, Form, Input, Typography, notification } from "antd"
import React, { useEffect } from "react"
import "./ForgotPassword.scss"
import { useDispatch, useSelector } from "react-redux"
import { forgotPassword } from "../Toolkit/AuthSlice"
import { useNavigate } from "react-router-dom"
const { Title } = Typography

const ForgotPassword = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const loading = useSelector((state) => state.auth.forgotLoading)
  const openNotificationWithIcon = () => {
    notification.success({
      message: "Password changed Successfully",
    })
  }
  const errorNotification = () => {
    notification.error({
      message: "Something went wrong",
    })
  }
  const handleFinish = (values) => {
    dispatch(forgotPassword(values))
      .then((response) => {
        if (response.meta.requestStatus === "fulfilled") {
          openNotificationWithIcon()
          navigate("/login")
        } else if (response.meta.requestStatus === "rejected") {
          errorNotification()
        }
      })
      .catch(() => {
        errorNotification()
      })
  }

  return (
    <div className="forgot-pass-container">
      <Title level={1}>Forgot Password</Title>
      <Form
        className="forgot-pass-form"
        layout="vertical"
        onFinish={handleFinish}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, type: "email", message: "please enter email" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="New Password"
          name="password"
          rules={[
            { required: true, message: "please enter your new password" },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading == "pending" ? true : false}
          >
            {loading == "pending" ? "Submiting..." : "Submit"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ForgotPassword
