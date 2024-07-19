import React, { useState } from "react"
import "./SideBar.scss"
import SideBarBtn from "../Components/SideBarBtn"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import CmBtn from "../Components/CmBtn"
import { logoutFun } from "../Toolkit/AuthSlice"
import { useNavigate } from "react-router-dom"
import { sendReportFun } from "../Toolkit/SendReportSlice"
import Snackbar from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"

const SideBar = () => {
  const currentUserRole = useSelector(
    (prev) => prev?.auth.currentUser?.data?.roles
  )
  const [open, setOpen] = useState(false)
  const [openTwo, setOpenTwo] = useState(false)
  const userEmail = useSelector((prev) => prev?.auth?.currentUser?.data?.email)
  const adminRole = currentUserRole?.includes("ADMIN")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const logoutUser = () => {
    if (window.confirm("Are you sure for Logout?") == true) {
      const key = localStorage.getItem("persist:root")
      dispatch(logoutFun())
      const token = localStorage.removeItem(key)
      navigate("/login")
    }
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }
    setOpenTwo(false)
    setOpen(false)
  }

  let date = new Date()

  let year = date.getFullYear()
  let month = (date.getMonth() + 1).toString().padStart(2, "0")
  let day = date.getDate().toString().padStart(2, "0")

  let formattedDate = `${year}-${month}-${day}`

  const data = {
    email: userEmail,
    localDate: formattedDate,
  } 

  const sendReportFunction = async () => {
    if (window.confirm("Are you want to Send Your Report ?") == true) {
      const logoutTimeResponse = await dispatch(sendReportFun(data))
      if (logoutTimeResponse.type === "send-report-data-urls/rejected")
        return setOpenTwo(true)
      setOpen(true)
      window.location.reload()
    }
  }

  return (
    <div className="sidebar-data">
      <Snackbar open={openTwo} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Report Not Send Succesfully!
        </Alert>
      </Snackbar>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Report Send Succesfully!
        </Alert>
      </Snackbar>
      <h3>
        <i className="fa-regular mr-2 fa-clock"></i>Workplus
      </h3>
      <div className="side-buttons mt-4">
        <SideBarBtn
          linkPath={``}
          name="My Workplus Time"
          icon={<i className="fa-solid fa-desktop"></i>}
        />
        {adminRole ? (
          <>
            {/* <SideBarBtn
              linkPath={`screenshot`}
              name="Screen Shot"
              icon={<i className="fa-regular fa-image"></i>}
            /> */}
            <SideBarBtn
              linkPath={`users`}
              name="Users"
              icon={<i className="fa-solid fa-user"></i>}
            />
            <SideBarBtn
              linkPath={`reports`}
              name="Reports"
              icon={<i className="fa-regular fa-file-word"></i>}
            />
            <SideBarBtn
              linkPath={`monthly-report`}
              name="Monthly Report"
              icon={<i className="fa-regular fa-file-word"></i>}
            />
            <SideBarBtn
              linkPath={`ipaddress`}
              name="IP"
              icon={<i className="fa-solid fa-mobile-screen-button"></i>}
            />
            {/* <SideBarBtn
              linkPath={`userlist`}
              name="User List Gap"
              icon={<i className="fa-solid fa-users"></i>}
            /> */}
          </>
        ) : (
          ""
        )}

        <SideBarBtn
          linkPath={`gap`}
          name="Gap"
          icon={<i className="fa-solid fa-arrows-left-right-to-line"></i>}
        />

        <CmBtn
          className="side-btn hover-w"
          onClick={sendReportFunction}
          data={`Send Report`}
          icon={<i className="fa-solid mr-2 fa-share-from-square"></i>}
        />
        <CmBtn
          className="side-btn hover-w"
          onClick={logoutUser}
          data={`Logout`}
          icon={<i className="fa-solid mr-2 fa-right-from-bracket"></i>}
        />
      </div>
    </div>
  )
}

export default SideBar
