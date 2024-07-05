import React, { useCallback, useEffect, useState } from "react"
import CmGap from "../Components/CmGap"
import MdHeading from "../Components/MdHeading"
import {
  allUsersFun,
  deleteUserFun,
  deleteUsers,
  handleNextPagination,
  handlePrevPagination,
} from "../Toolkit/AllUsersSlice"
import { useDispatch, useSelector } from "react-redux"
import TableComp from "../Components/TableComp"
import CmModel from "../Model/CmModel"
import CreateUserModel from "../Model/CreateUserModel"
import { Link, useLocation } from "react-router-dom"
import {
  Button,
  FloatButton,
  Modal,
  Popconfirm,
  Typography,
  notification,
} from "antd"
import CreateUserNEditModal from "../Model/CreateUserNEditModal"
import { Icon } from "@iconify/react"
import CommonTable from "../Components/CommonTable"
import { render } from "@testing-library/react"
const { Text } = Typography

const AllUsers = () => {
  const dispatch = useDispatch()

  const { allUsers, userLoading, userError } = useSelector(
    (prev) => prev?.alluser
  )
  const [selectedRows, setSelectedRows] = useState([])

  const { pathname } = useLocation()

  console.log(pathname)

  const {
    deleteUser,
    deluserLoading,
    delUserError,
    multiUserDeleteLoading,
    multiUserDeleteError,
    page,
  } = useSelector((prev) => prev?.alluser)

  useEffect(() => {
    dispatch(allUsersFun(page))
  }, [dispatch, deleteUser, page])

  const deleteExistUserFun = async (id) => {
    if (window.confirm("Are You Want to Sure ?")) {
      const delUser = await dispatch(deleteUserFun({ id: id }))
    }
  }

  // const editExistUserFun = async () => {
  //   console.log("Edit User")
  // }

  const columns = [
    // { field: "id",
    //  headerName: "ID", width: 60
    // },
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

  const columns1 = [
    {
      title: "User name",
      dataIndex: "username",
      key: "1",
      fixed: "left",
      render: (_, data) => <Link to={`${data?.email}`}>{data?.username}</Link>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "2",
    },
    {
      title: "Created date",
      dataIndex: "createdAt",
      key: "3",
      render: (_, data) => (
        <Text>{new Date(data?.createdAt).toLocaleDateString()}</Text>
      ),
    },
    {
      title: "Role",
      dataIndex: "roles",
      key: "4",
    },
    {
      title: "Gap",
      dataIndex: "gap",
      key: "5",
      render: (_, data) => (
        <Link to={`gap/${data?.email}`}>
          <Button size="small" type="primary">
            View
          </Button>
        </Link>
      ),
    },
    {
      title: "Edit",
      dataIndex: "edit",
      key: "6",
      render: (_, data) => (
        <CreateUserNEditModal
          data={data}
          edit={true}
          modalTitle={"Edit user"}
        />
      ),
    },
    {
      title: "Delete",
      dataIndex: "delete",
      key: "7",
      render: (_, data) => (
        <Button
          danger
          size="small"
          onClick={() => deleteExistUserFun(data?.id)}
        >
          <Icon icon="fluent:delete-20-filled" />
        </Button>
      ),
    },
  ]

  const handleDeleteUser = useCallback(() => {
    dispatch(deleteUsers(selectedRows))
  }, [selectedRows, dispatch])

  useEffect(() => {
    if (multiUserDeleteLoading === "success") {
      notification.success({
        message: "Users deleted successfully",
      })
      setSelectedRows([])
      dispatch(allUsersFun())
    } else if (multiUserDeleteLoading === "rejected") {
      notification.error({
        message: "Something went wrong",
      })
    }
  }, [multiUserDeleteLoading])

  console.log("allusersSelection", selectedRows)
  return (
    <CmGap>
      <div className="align-between">
        <MdHeading
          data={
            pathname === "/workplus/users"
              ? `All Users Report (${allUsers?.length})`
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
      {/* <TableComp
        loading={userLoading}
        error={userError}
        data={allUsers}
        col={columns}
        checkbox={pathname === "/workplus/users" ? true : false}
        setSelectedRows={setSelectedRows}
      /> */}

      <CommonTable
        dataSource={allUsers}
        columns={columns1}
        rowSelection={true}
        selectedRowKeys={selectedRows}
        onRowSelection={setSelectedRows}
        nextPage={handleNextPagination}
        prevPage={handlePrevPagination}
      />

      {selectedRows?.length > 0 && (
        <FloatButton.Group
          shape="square"
          style={{
            right: 600,
            width: 150,
            padding: "12px",
            background: "rgba(0,0,0,0.7)",
            backgroundColor: "rgba(0,0,0,0.7)",
            boxShadow:
              "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;",
          }}
        >
          <Popconfirm
            description="Are you sure to delete users"
            onConfirm={handleDeleteUser}
          >
            <Button danger icon={<Icon icon="fluent:delete-20-filled" />}>
              Delete ({selectedRows?.length})
            </Button>
          </Popconfirm>
        </FloatButton.Group>
      )}
    </CmGap>
  )
}

export default AllUsers
