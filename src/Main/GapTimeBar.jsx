import React, { useCallback, useEffect, useState } from "react"
import dayjs from "dayjs"
import "./GapTimeBar.scss"
import { useDispatch, useSelector } from "react-redux"
import { Form, Input, Modal, Typography } from "antd"
import { editGaptimeReson } from "../Toolkit/AllGapSlice"
const { Text, Title } = Typography

const GapTimeBar = ({ filterDate }) => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [data, setData] = useState([])
  const [minuteIntervals, setMinuteIntervals] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [gapData, setGapData] = useState({})
  const {
    gapTime,
    userEmail,
    date,
    gapDetails,
    userLoginTime,
    lastActiveTime,
  } = useSelector((state) => state.gap.allGapData)
  console.log("filteredDatata", gapTime)

  const totalMinutes = 10 * 60

  const generateMinuteIntervals = (start, end, totalMinutes) => {
    let intervals = []
    let currentTime = dayjs(start)

    while (
      currentTime.isBefore(dayjs(end)) &&
      intervals.length < totalMinutes
    ) {
      const intervalStart = currentTime.format("HH:mm")
      const intervalEnd = currentTime.add(1, "minute").format("HH:mm")
      intervals.push({
        start: intervalStart,
        end: intervalEnd,
        width: "1%",
        startTime: currentTime.format("YYYY-MM-DDTHH:mm:ss"),
        endTime: currentTime.add(1, "minute").format("YYYY-MM-DDTHH:mm:ss"),
      })
      currentTime = currentTime.add(1, "minute")
    }

    return intervals
  }

  const currentDate = dayjs().format("YYYY-MM-DD")
  const combinedDateTime = dayjs(
    `${filterDate ? filterDate : currentDate}T${"09:00:00"}`
  )

  const replaceIntervals = (minuteIntervals, timeSlotList) => {
    timeSlotList?.forEach((slot) => {
      const start = dayjs(slot.lastOfflineTime).format("HH:mm")
      const end = dayjs(slot.lastOnlineTime).format("HH:mm")

      let startIndex = minuteIntervals?.findIndex(
        (interval) => interval.start === start
      )
      let endIndex = minuteIntervals?.findIndex(
        (interval) => interval.end === end
      )

      if (startIndex !== -1 && endIndex !== -1) {
        minuteIntervals?.splice(startIndex, endIndex - startIndex + 1, {
          ...slot,
          //   start,
          //   end,
          width: `${slot?.gapTime?.split(" ")[0]}%`,
          gap: true,
        })
      }
    })

    return minuteIntervals
  }

  useEffect(() => {
    const intervals = generateMinuteIntervals(
      combinedDateTime,
      dayjs(combinedDateTime).add(10, "hour").format("YYYY-MM-DD HH:mm:ss"),
      totalMinutes
    )
    const updatedMinuteIntervals = replaceIntervals(intervals, gapDetails)

    setData(updatedMinuteIntervals)
    console.log("gapTimeDetails", gapDetails, updatedMinuteIntervals)
  }, [minuteIntervals, gapDetails])

  const getColorBasedOnTime = (item, loginTime, logoutTime) => {
    if (
      dayjs(item?.startTime).format("YYYY-MM-DD HH:mm") <
      dayjs(loginTime).format("YYYY-MM-DD HH:mm")
    ) {
      return "#ffb3b3"
    } else if (item?.gap) {
      if (item?.reason !== null) {
        return "#b3ff99"
      } else if (item?.reason === null) {
        return "#fff"
      }
    } else if (
      dayjs(item?.startTime).format("YYYY-MM-DD HH:mm") >
      dayjs(logoutTime).format("YYYY-MM-DD HH:mm")
    ) {
      return "#ffb3b3"
    } else {
      return "#4ea819"
    }
  }
  const handleEdit = useCallback(
    (item) => {
      setOpenModal(true)
      form.setFieldsValue({ reason: item?.reason })
    },
    [form]
  )

  const handleFinish = useCallback(
    (values) => {
      let temp = {
        email: userEmail,
        lastOfflineId: gapData?.lastOfflineId,
        lastOnlineId: gapData?.lastOnlineId,
        date: dayjs(gapData?.date).format("YYYY-MM-DD"),
        data: values,
      }
      dispatch(editGaptimeReson(temp)).then((response) => {
        if (response.meta.requestStatus === "fulfilled") {
          window.location.reload()
          setOpenModal(false)
        }
      })
    },
    [gapData, userEmail]
  )
  return (
    <div className="bar-container">
      <div className="bar-container-child">
        {data?.map((item, idx) => (
          <div
            key={idx}
            style={{
              width: item?.width,
              height: "40px",
              backgroundColor: getColorBasedOnTime(
                item,
                userLoginTime,
                lastActiveTime
              ),
              cursor: item?.gap ? "pointer" : "default",
            }}
            onClick={() => {
              if (item?.gap) {
                handleEdit(item)
                setGapData(item)
              }
            }}
          />
        ))}
      </div>
      <Modal
        title="Reason for gap time"
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onOk={() => form.submit()}
        centered
        onClose={() => setOpenModal(false)}
        okText="Submit"
      >
        <Title level={5}>
          Date: {dayjs(gapData?.lastOfflineTime).format("DD-MM-YYYY")}
        </Title>
        <div className="gap-time-container-in-modal">
          <Text>
            Start from: {dayjs(gapData?.lastOfflineTime).format("HH:mm")}
          </Text>
          <Text>Gap time: {gapData?.gapTime}</Text>
          <Text>End to: {dayjs(gapData?.lastOnlineTime).format("HH:mm")}</Text>
        </div>
        <Form layout="vertical" form={form} onFinish={handleFinish}>
          <Form.Item label="Reason" name="reason">
            <Input.TextArea
              autoSize={{
                minRows: 2,
                maxRows: 6,
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default GapTimeBar
