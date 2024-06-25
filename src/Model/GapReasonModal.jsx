import {
  Badge,
  Button,
  Form,
  Input,
  Modal,
  Space,
  Tooltip,
  Typography,
} from "antd"
import React, { useCallback, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { editGaptimeReson } from "../Toolkit/AllGapSlice"
import { Icon } from "@iconify/react"
const { Text } = Typography

const GapReasonModal = ({ data }) => {
  const currUserDetail = useSelector((prev) => prev?.auth?.currentUser?.data)
  const [openModal, setOpenModal] = useState(false)
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  console.log("ksdgfuasdjyg", data)
  const handleEdit = useCallback(() => {
    setOpenModal(true)
    form.setFieldsValue({ reason: data?.reason })
  }, [data])
  const handleFinish = (values) => {
    let temp = {
      email: currUserDetail?.email,
      gapId: data?.lastOfflineId,
      data: values,
    }
    dispatch(editGaptimeReson(temp))
    setOpenModal(false)
  }
  return (
    <>
      <div className="flex-justify-center">
          <Tooltip title={data?.reason}>
            <Text className="reason-text">{data?.reason}</Text>
          </Tooltip>
        <Button onClick={handleEdit} size="small">
          <Icon icon="fluent:edit-20-filled" />
        </Button>
      </div>
      <Modal
        title="Reason for gap time"
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onOk={() => form.submit()}
        centered
        onClose={() => setOpenModal(false)}
      >
        <Form layout="vertical" form={form} onFinish={handleFinish}>
          <Form.Item label="Reason" name="reason">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default GapReasonModal
