import React, { useCallback, useEffect, useState } from "react"
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
  const dispatch = useDispatch()
  const userRoles = useSelector((prev) => prev?.role?.allRoles)
  useEffect(() => {
    form.setFieldsValue({
      username: data?.username,
      email: data?.email,
      roleNames: data?.roles,
    })
  }, [data,form])

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
        window.location.reload()
        setOpenModal(false)
      }
    },
    [data, currId,dispatch,edit]
  )


  return (
    <>
      <Button
        onClick={() => setOpenModal(true)}
        type={edit ? "text" : "primary"}
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
        okText="Submit"
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
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default CreateUserNEditModal
