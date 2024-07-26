import { Button, Form, Input, Typography, notification } from "antd"
import React, { useCallback, useState } from "react"
import "./ForgotPassword.scss"
import { useDispatch, useSelector } from "react-redux"
import { forgotPassword, genrateOtp, validateOtp } from "../Toolkit/AuthSlice"
import { useNavigate } from "react-router-dom"
const { Title } = Typography

const ForgotPassword = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const loading = useSelector((state) => state.auth.forgotLoading)
  const [getOtp, setGetOtp] = useState("start")
  const [changePassword, setChangePassword] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState(false)
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
 

  const handleOtpGenration = useCallback(
    (values) => {
      console.log("sdkjhflksdhvlisd", values)
      if (getOtp === "start") {
        dispatch(genrateOtp(values))
          .then((resp) => {
            if (resp.meta.requestStatus === "fulfilled") {
              setGetOtp("done")
              notification.success({ message: "Otp sent to your email id" })
            } else if (resp.meta.requestStatus === "rejected") {
              errorNotification()
            }
          })
          .catch(() => {
            errorNotification()
          })
      } else if (getOtp === "done") {
        dispatch(validateOtp(values)).then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            setChangePassword(true)
            setGetOtp("end")
            notification.success({ message: "Otp successfull" })
          } else if (resp.meta.requestStatus === "rejected") {
            errorNotification()
          }
        })
      } else if (changePassword) {
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
    },
    [getOtp]
  )
  return (
    <div className="forgot-pass-container">
      <Title level={1}>Forgot Password</Title>
      <Form
        className="forgot-pass-form"
        layout="vertical"
        onFinish={handleOtpGenration}
        size="large"
      >
        <Form.Item
          label="Email"
          name="userMailId"
          rules={[
            { required: true, type: "email", message: "please enter email" },
          ]}
        >
          <Input />
        </Form.Item>
        {getOtp === "done" && (
          <Form.Item
            label="Otp"
            name="otp"
            rules={[{ required: true, message: "please enter otp" }]}
          >
            <Input.OTP length={4} />
          </Form.Item>
        )}

        {changePassword && (
          <Form.Item
            label="New password"
            name="password"
            rules={[
              { required: true, message: "please enter your new password" },
            ]}
          >
            <Input.Password />
          </Form.Item>
        )}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading === "pending" ? true : false}
          >
            {loading === "pending" ? "Submiting..." : "Submit"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ForgotPassword
