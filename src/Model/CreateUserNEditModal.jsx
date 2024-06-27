import React, { useCallback, useEffect, useState } from "react"
import CmModel from "./CmModel"
import CreateUserModel from "./CreateUserModel"
import { Button, Form, Input, Modal, Select } from "antd"
import { useDispatch, useSelector } from "react-redux"
import {
  allUsersFun,
  createUserFun,
  editUserFun,
} from "../Toolkit/AllUsersSlice"
import { Icon } from "@iconify/react"

const CreateUserNEditModal = ({ edit, data, modalTitle }) => {
  const currId = useSelector((prev) => prev?.auth?.currentUser?.data)
  const [openModal, setOpenModal] = useState(false)
  const [form] = Form.useForm()
  const {
    createNewUser: newUser,
    newuserLoading,
    newUserError,
  } = useSelector((prev) => prev?.alluser)

  const dispatch = useDispatch()

  const userRoles = useSelector((prev) => prev?.role?.allRoles)
  useEffect(() => {
    form.setFieldsValue({
      username: data?.username,
      email: data?.email,
      roleNames: data?.roles,
    })
  }, [data])

  const submitData = useCallback(
    (values) => {
      values.enable = true
      if (edit) {
        values.updatedBy = currId?.id
        values.id = data?.id
        // dispatch(editUserFun(values))
        dispatch(editUserFun(values)).then((action) => {
          if (editUserFun.fulfilled.match(action)) {
            dispatch(allUsersFun())
            setOpenModal(false)
          }
        })
      } else {
        values.createdBy = currId?.id
        dispatch(createUserFun(values))
        setOpenModal(false)
      }
    },
    [data, currId]
  )

  console.log("jkcbivsghi", currId)

  return (
    <>
      <Button
        onClick={() => setOpenModal(true)}
        type={edit ? "default" : "primary"}
        size={edit ? "small" : "middle"}
      >
        {edit ? <Icon icon="fluent:edit-20-filled" /> : "Create user"}
      </Button>

      <Modal
        title={modalTitle}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onOk={() => form.submit()}
        centered
        onClose={() => setOpenModal(false)}
      >
        <Form layout="vertical" form={form} onFinish={submitData}>
          <Form.Item
            label="User name"
            name="username"
            rules={[{ required: true, message: "enter user name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email id"
            name="email"
            rules={[{ required: true, type: "email", message: "enter email" }]}
          >
            <Input disabled={edit} />
          </Form.Item>
          <Form.Item
            label="Select roles"
            name="roleNames"
            rules={[{ required: true, message: "select role" }]}
          >
            <Select
              options={userRoles?.map((item) => ({
                value: item?.roleName,
                label: item?.roleName,
              }))}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default CreateUserNEditModal
