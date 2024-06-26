import React, { useEffect } from "react"
import CmGap from "../Components/CmGap"
import MdHeading from "../Components/MdHeading"
import { allUsersFun, deleteUserFun } from "../Toolkit/AllUsersSlice"
import { useDispatch, useSelector } from "react-redux"
import TableComp from "../Components/TableComp"
import CmModel from "../Model/CmModel"
import CreateUserModel from "../Model/CreateUserModel"
import { Link, useLocation } from "react-router-dom"
import { Button, Modal } from "antd"
import CreateUserNEditModal from "../Model/CreateUserNEditModal"
import { Icon } from "@iconify/react"

const AllUsers = () => {
  const dispatch = useDispatch()

  const { allUsers, userLoading, userError } = useSelector(
    (prev) => prev?.alluser
  )

  const { pathname } = useLocation()

  console.log(pathname)

  const { deleteUser, deluserLoading, delUserError } = useSelector(
    (prev) => prev?.alluser
  )

  useEffect(() => {
    dispatch(allUsersFun())
  }, [dispatch, deleteUser])

  const deleteExistUserFun = async (id) => {
    if (window.confirm("Are You Want to Sure ?")) {
      const delUser = await dispatch(deleteUserFun({ id: id }))
    }
  }

  // const editExistUserFun = async () => {
  //   console.log("Edit User")
  // }

  const columns = [
    { field: "id", headerName: "ID", width: 60 },
    {
      field: "username",
      headerName: "User Name",
      width: 200,
      renderCell: (props) => (
        <Link to={`${props?.row?.email}`}>{props.row.username}</Link>
      ),
    },
    { field: "email", headerName: "Email ID", width: 300 },
    {
      field: "createdAt",
      headerName: "Created Date",
      width: 150,
      renderCell: (props) => (
        <p>{new Date(props?.row?.createdAt).toLocaleDateString()}</p>
      ),
    },
    {
      field: "role",
      headerName: "Role",
      width: 100,
      renderCell: (props) => <p>{props?.row?.roles}</p>,
    },
    {
      field: "gap",
      headerName: "Gap",
      width: 100,
      renderCell: (props) => (
        <Link to={`gap/${props?.row?.email}`}>
          <Button size="small" type="primary">
            View Gap
          </Button>
        </Link>
      ),
    },
    {
      field: "Edit",
      headerName: "Edit",
      width: 90,
      renderCell: (props) => (
        <CreateUserNEditModal
          data={props?.row}
          edit={true}
          modalTitle={"Edit user"}
        />
      ),
    },
    {
      field: "Delete",
      headerName: "Delete",
      width: 90,
      renderCell: (props) => (
        // <p onClick={() => deleteExistUserFun(props?.row?.id)}>
        //   <i className="fa-solid fa-trash"></i>
        // </p>
        <Button
          danger
          size="small"
          onClick={() => deleteExistUserFun(props?.row?.id)}
        >
          <Icon icon="fluent:delete-20-filled" />
        </Button>
      ),
    },
  ]

  return (
    <CmGap>
      <div className="align-between">
        <MdHeading
          data={
            pathname === "/workplus/users"
              ? `All Users Report`
              : pathname === "/workplus/userlist"
              ? "All User List"
              : "All Users Screenshot"
          }
        />
        {/* <CmModel
          data={`Create New user`}
          modelhead={"create User"}
          modelId={`createUserModel`}
        >
          <CreateUserModel />
        </CmModel> */}

        <CreateUserNEditModal edit={false} modalTitle={"Create user"} />
      </div>
      <TableComp
        loading={userLoading}
        error={userError}
        data={allUsers}
        col={columns}
      />
    </CmGap>
  )
}

export default AllUsers
