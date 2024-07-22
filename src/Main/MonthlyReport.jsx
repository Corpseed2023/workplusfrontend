import React, { useEffect, useState } from "react"
import TableComp from "../Components/TableComp"
import CmBtn from "../Components/CmBtn"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { allReportsFun } from "../Toolkit/AllReportsSlice"
import MdHeading from "../Components/MdHeading"
import CmGap from "../Components/CmGap"
import { allUserDataFun } from "../Toolkit/MonthlyDataSlice"
import dayjs from "dayjs"
import { Typography } from "antd"
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
const { Text } = Typography

const MonthlyReport = () => {
  const [filterDate, setFilterDate] = useState("")
  const [year, setYear] = useState("")
  const [month, setMonth] = useState("")

  let data

  useEffect(() => {
    data = filterDate?.split("-")
    setYear(data[0])
    setMonth(data[1])
  }, [filterDate])

  const [dateFilterDep, setDateFilterDep] = useState(false)

  const userDate = {
    year: filterDate.length === 0 ? new Date().getFullYear() : year,
    month: filterDate.length === 0 ? new Date().getMonth() + 1 : month,
  }

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(allUserDataFun(userDate))
  }, [dispatch, dateFilterDep])

  const { monReport, monReportLoading, monReportError } = useSelector(
    (prev) => prev?.monreport
  )

  // const { hours: userHours, minutes: userMinutes } = getHoursMinutesDifference(
  //   new Date(allReports?.loginTime),
  //   new Date(allReports?.logoutTime)
  // )

  const filterCurrentData = () => {
    setDateFilterDep((prev) => !prev)
  }

  const columns = [
    {
      field: "index",
      headerName: "ID",
      width: 80,
      renderCell: (props) => (
        <p>{props.row.index + 1}</p> // Adding 1 to make index 1-based
      ),
    },
    {
      field: "userName",
      headerName: "User Name",
      width: 240,
    },
    {
      field: "userEmail",
      headerName: "User Email",
      width: 240,
    },
    {
      field: "date",
      headerName: "Date",
      width: 150,
      renderCell: (props) => {
        ;<Text>{dayjs(props?.row?.loginTime).format("YYYY-MM-DD")}</Text>
      },
    },
    {
      field: "totalTime",
      headerName: "Total Working Time",
      width: 150,
      renderCell: (props) => <p>{props?.row?.totalTime}</p>,
    },
    {
      field: "present",
      headerName: "User Present",
      width: 150,
      renderCell: (props) => (
        <p>{props?.row?.present ? "Present" : "Absent"}</p>
      ),
    },
    {
      field: "loginTime",
      headerName: "Login Time",
      width: 150,
      renderCell: (props) => {
        console.log("sdjkfgkjdsfkjds", props.row)
        return (
          <Text>
            {dayjs(props?.row?.loginTime, "HH:mm:ss.SSSSSS").format("HH:mm")}
          </Text>
        )
      },
    },
    {
      field: "logoutTime",
      headerName: "Left Time",
      width: 150,
      renderCell: (props) => (
        <Text>
          {dayjs(props?.row?.logoutTime, "HH:mm:ss.SSSSSS").format("HH:mm")}
        </Text>
      ),
    },
  ]

  const rowsWithIndex = monReport.map((report, index) => ({
    ...report,
    index,
  }))

  return (
    <CmGap>
      <div className="align-between">
        <MdHeading data={`User Monthly Report`} />
        <div>
          <input
            type="month"
            id="start"
            name="start"
            className="mr-1 mb-0"
            min="2024-03"
            value={filterDate || `2024-01`}
            onChange={(e) => setFilterDate(e.target.value)}
          />
          <CmBtn data={`Filter`} onClick={filterCurrentData} />
        </div>
      </div>

      <TableComp
        loading={monReportLoading}
        error={monReportError}
        data={rowsWithIndex}
        col={columns}
      />
    </CmGap>
  )
}

export default MonthlyReport
