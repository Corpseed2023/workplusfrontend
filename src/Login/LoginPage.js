import React, { useState } from "react"
import "./LoginPage.scss"
import InputComponent from "./InputComponent"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { authDataFun } from "../Toolkit/AuthSlice"
import { useNavigate } from "react-router-dom"
import ErrorData from "../Components/ErrorData"

const LoginPage = () => {
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  })
  const [loginError, setLoginError] = useState(false)

  const { currentUser, loading, error } = useSelector((prev) => prev?.auth)
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const getUserdata = (e) => {
    setUserLogin((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const loginUser = async () => {
    const userApiRes = await dispatch(authDataFun(userLogin))
    if (userApiRes?.payload?.status === 200) {
      navigate("/workplus")
    }
    if (userApiRes.type === "auth-user/rejected") {
      setLoginError(true)
      return
    }
  }

  return (
    <div className="login-page">
      <div className="ractangle"></div>
      <div className="ractangle-two"></div>
      <div className="login-form">
        <h2 className="main-heading">Login</h2>
        <div className="py-4">
          <InputComponent
            icon={<i className="fa-regular side-icon fa-envelope"></i>}
            type="email"
            name="email"
            placeholder="Enter Your Email"
            onChange={getUserdata}
            // onChange={getUserdata()}
          />
          <InputComponent
            icon={<i className="fa-solid side-icon fa-lock"></i>}
            type="password"
            placeholder="Enter Your password"
            name="password"
            onChange={getUserdata}
          />
          {loginError ? (
            <ErrorData value={`Please Enter Right Username or Email`} />
          ) : (
            ""
          )}
        </div>
        <button onClick={() => loginUser()} className="login-btn">
          Login
        </button>
        <Link to={'/forgotPassword'} className="forget-pass">Forgot Password ?</Link>
        {/* <p className="account-not">
          Don't have an Account{" "}
          <Link className="going-link" to="/signup">
            Sign up
          </Link>
        </p> */}
      </div>
    </div>
  )
}

export default LoginPage
