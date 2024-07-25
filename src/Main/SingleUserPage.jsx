import React, { useEffect, useState } from "react"
import "./MainPage.scss"
import { fakeData } from "../data/fakeData"
import CardDesign from "../Components/CardDesign"
import CmGap from "../Components/CmGap"
import MdHeading from "../Components/MdHeading"
import { useDispatch, useSelector } from "react-redux"
import { mainDataAllFun } from "../Toolkit/MainDataSlice"
import getHoursMinutesDifference from "../data/dateFunctions"
import { getProductivePercentage } from "../data/dateFunctions"
import ProcessDataComp from "../Components/ProcessDataComp"
import CmBtn from "../Components/CmBtn"
import { getCurrentUserFun } from "../Toolkit/AllUsersSlice"
import { useParams } from "react-router-dom"
import GapTimeBar from "./GapTimeBar"
import { allGapFun } from "../Toolkit/AllGapSlice"

const SingleUserPage = () => {
  const [filterDate, setFilterDate] = useState(
    new Date().toISOString().split("T")[0]
  )
  const [singlePro, setSinglePro] = useState(true)
  const [dateFilterDep, setDateFilterDep] = useState(false)

  const userEmail = useSelector(
    (prev) => prev?.auth?.currentUser?.data?.user?.email
  )

  const userData = useSelector((prev) => prev?.auth?.currentUser?.data?.user)

  const { useremail } = useParams()

  const dispatch = useDispatch()

  const mainData = useSelector((prev) => prev?.mainData?.mainAllApiData)

  const changeUser = useSelector((prev) => prev?.alluser?.singleUser?.data)

  const {
    loginTime,
    present,
    dayOfWeek,
    loginTimeConvention,
    logoutTimeConvention,
    logoutTime,
    attendanceType,
    gapTime,
    productiveTime
  } = mainData

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
    email: useremail,
  }

  const gapParam = {
    userMailId: useremail ? useremail : userEmail,
    date: filterDate,
  }

  useEffect(() => {
    dispatch(getCurrentUserFun(useremail))
  }, [dispatch, useremail])

  useEffect(() => {
    dispatch(mainDataAllFun(userDate))
  }, [dispatch, dateFilterDep])

  useEffect(() => {
    dispatch(allGapFun(gapParam))
  }, [dispatch, filterDate])

  return (
    <CmGap>
      <div className="align-between">
        <MdHeading data={`Single User`} />
        <div>
          <input
            type="date"
            className="mr-1 mb-0"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
          <CmBtn data={`Filter`} onClick={filterCurrentData} />
        </div>
      </div>

      <div className="user-info">
        <p>
          <b>User Name:</b> {changeUser?.username}
        </p>
        <p>
          <b>User Email:</b> {changeUser?.email}
        </p>
      </div>

      <div className="chart-box">
        <CardDesign
          heading="Arrival Time"
          data={fakeData}
          contant={
            loginTime !== null
              ? new Date(loginTime).getHours().toString().padStart(2, "0") +
                ":" +
                new Date(loginTime).getMinutes().toString().padStart(2, "0") +
                " " +
                loginTimeConvention
              : "NULL"
          }
        />
        <CardDesign
          heading="Left Time"
          data={fakeData}
          contant={
            logoutTime !== null
              ? new Date(logoutTime).getHours().toString().padStart(2, "0") +
                ":" +
                new Date(logoutTime).getMinutes().toString().padStart(2, "0") +
                " " +
                logoutTimeConvention
              : "NULL"
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
          heading="Today Report Time"
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
          contant={attendanceType !== null ? attendanceType : "NULL"}
        />
        <CardDesign
          heading="Today's Break Time"
          data={fakeData}
          contant={`${gapTime ? gapTime : "NULL"}`}
        />
        <CardDesign
          heading="Productive time"
          data={fakeData}
          contant={`${productiveTime ? productiveTime : "NULL "}`}
        />
      </div>
      <GapTimeBar />
      <ProcessDataComp
        date={filterDate}
        pro={singlePro}
        dateFilterDep={dateFilterDep}
      />
    </CmGap>
  )
}

export default SingleUserPage
