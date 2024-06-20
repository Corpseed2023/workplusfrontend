import React, { useState } from "react"
import CmBtn from "../Components/CmBtn"
import ModelInput from "../Components/ModelInput"
import "./CmModel.scss"
import ModelDropDown from "../Components/ModelDropDown"
import { useDispatch, useSelector } from "react-redux"
import { createUserFun } from "../Toolkit/AllUsersSlice"

const CreateUserModel = () => {
  const currId = useSelector((prev) => prev?.auth?.currentUser?.data)
  
  const {
    createNewUser: newUser,
    newuserLoading,
    newUserError,
  } = useSelector((prev) => prev?.alluser)

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    createdBy: currId?.id,
    roleNames: [],
    enable: true,
  })

  const dispatch = useDispatch()

  const createNewUser = async (e) => {
    e.preventDefault()
    const createUserRes = await dispatch(createUserFun(userData))
    window.location.reload()
  }

  const setUserDataFun = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const userRoles = useSelector((prev) => prev?.role?.allRoles)

  return (
    <>
      <form>
        <ModelInput
          labelData={"User Name"}
          onChange={setUserDataFun}
          name="username"
          placeholder={`Enter User Name`}
        />
        <ModelInput
          labelData={"Email ID"}
          name="email"
          onChange={setUserDataFun}
          placeholder={`Enter User Email`}
        />
        <ModelDropDown
          labelData={`Select Role`}
          onChange={setUserDataFun}
          name="roleNames"
          value={userRoles.roleName}
          val={userRoles?.map((role) => ({
            value: role.id,
            label: role.roleName,
          }))}
        />
        <div className="model-btn-box">
          <CmBtn
            onClick={createNewUser}
            data={newuserLoading ? `Please wait` : "Create User"}
          />
        </div>
      </form>
    </>
  )
}

export default CreateUserModel
