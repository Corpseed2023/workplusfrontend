import React, { useEffect, useState } from "react"
import "./MainPage.scss"
import { fakeData } from "../data/fakeData"
import CardDesign from "../Components/CardDesign"
import CmGap from "../Components/CmGap"
import MdHeading from "../Components/MdHeading"
import { useDispatch, useSelector } from "react-redux"
import { mainDataFun } from "../Toolkit/MainDataSlice"
import { getProductivePercentage } from "../data/dateFunctions"
import getHoursMinutesDifference from "../data/dateFunctions"
import ProcessDataComp from "../Components/ProcessDataComp"
import CmBtn from "../Components/CmBtn"
import { DailyActivityFun } from "../Toolkit/DailyActivitySlice"
import dayjs from "dayjs"

const MainPage = () => {
  const [filterDate, setFilterDate] = useState(
    new Date().toISOString().split("T")[0]
  )
  const [dateFilterDep, setDateFilterDep] = useState(false)
  const [startTimeDep, setStartTimeDep] = useState(false)

  const userEmail = useSelector((prev) => prev?.auth?.currentUser?.data?.email)

  const { ActivityLoading } = useSelector((prev) => prev?.activity)

  const [dailyTimer, setDailyTimer] = useState({
    email: userEmail,
    date: new Date().toISOString().split("T")[0],
    loginTime: new Date(),
  })

  

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(mainDataFun(userDate))
  }, [dispatch, dateFilterDep, startTimeDep])

  const mainData = useSelector((prev) => prev?.mainData?.mainApiData)

  const {
    loginTime,
    present,
    dayOfWeek,
    loginTimeConvention,
    logoutTimeConvention,
    attendanceType,
    gapTime,
    logoutTime,
  } = mainData

  console.log("maintimedata", loginTimeConvention)

  const filterCurrentData = () => {
    setDateFilterDep((prev) => !prev)
  }

  const data1 = new Date(Date.now())
  const data2 = new Date(loginTime)
  const { hours: userHours, minutes: userMinutes } = getHoursMinutesDifference(
    data1,
    data2
  )

  const data3 = new Date(logoutTime)
  const data4 = new Date(loginTime)
  const { hours: userHoursOut, minutes: userMinutesOut } =
    getHoursMinutesDifference(data3, data4)

  const productivePercentage = getProductivePercentage(userHours, userMinutes)

  const userDate = {
    date: filterDate,
    email: userEmail,
  }

  const startMorningTimeFun = async () => {
    const morningTime = await dispatch(DailyActivityFun(dailyTimer))
    if ((morningTime.type = "send-daily-activity/fulfilled")) {
      setStartTimeDep((prev) => !prev)
    }
    console.log(morningTime)
  }

  return (
    <CmGap>
      <div className="align-between">
        <MdHeading data={`My Workplus Time`} />
        <div>
          <input
            type="date"
            className="mr-1 mb-0"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
          <CmBtn data={`Filter`} onClick={filterCurrentData} />
          <CmBtn
            className="start-btn"
            data={`${ActivityLoading ? "Please wait.." : "Start Time"}`}
            onClick={startMorningTimeFun}
          />
        </div>
      </div>
      <div className="chart-box">
        <CardDesign
          heading="Arrival Time"
          data={fakeData}
          contant={
            loginTime !== null
              ? dayjs(loginTime).format("hh:mm A").toLowerCase()
              : "null"
          }
        />
        <CardDesign
          heading="Left Time"
          data={fakeData}
          contant={
            logoutTime !== null
            ? dayjs(logoutTime).format("hh:mm A").toLowerCase()
            : "null"
          }
        />
        <CardDesign
          heading="Desk Time"
          data={fakeData}
          contant={
            loginTime !== null
              ? userHours > 10
                ? `10h 00m`
                : `${userHours}h ${userMinutes}m`
              : "NULL"
          }
        />
        <CardDesign
          heading="Today's Report Time"
          data={fakeData}
          contant={
            logoutTime !== null
              ? `${userHoursOut}h ${userMinutesOut}m`
              : "0h 0m"
          }
        />
        <CardDesign
          heading="Productive Time"
          data={fakeData}
          contant={present ? "PRESENT" : "ABSENT"}
          className={present ? "green-cl" : "red-cl"}
        />
        <CardDesign
          heading="Day Of the Week"
          data={fakeData}
          contant={dayOfWeek !== null ? dayOfWeek : "NULL"}
        />
        <CardDesign
          heading="Productivity"
          data={fakeData}
          contant={`${productivePercentage ? productivePercentage : "NULL"} %`}
        />
        <CardDesign
          heading="Today's Presence"
          data={fakeData}
          contant={`${attendanceType ? attendanceType : "NULL"} `}
        />
        <CardDesign
          heading="Today's Break Time"
          data={fakeData}
          contant={`${gapTime ? gapTime : "NULL "}`}
        />
      </div>

      <ProcessDataComp date={filterDate} dateFilterDep={dateFilterDep} />
    </CmGap>
  )
}

export default MainPage
