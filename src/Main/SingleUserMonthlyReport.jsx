import React, { useEffect, useState } from "react"
import MdHeading from "../Components/MdHeading"
import TableComp from "../Components/TableComp"
import { allReportsFun } from "../Toolkit/AllReportsSlice"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import CmBtn from "../Components/CmBtn"
import TableScalaton from "../Components/TableScalaton"
import NoRecordAdded from "../Components/NoRecordAdded"
import CommonDataTable from "../data/CommonDataTable"

const SingleUserMonthlyReport = () => {
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

  const { useremail } = useParams()

  const userDate = {
    year: filterDate.length === 0 ? new Date().getFullYear() : year,
    month: filterDate.length === 0 ? new Date().getMonth() + 1 : month,
    email: useremail,
  }

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(allReportsFun(userDate))
  }, [dispatch, dateFilterDep])

  const { allReports, reportsError, reportsLoading } = useSelector(
    (prev) => prev?.allreports
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
      renderCell: (props) => (
        <p>{new Date(props?.row?.loginTime).toLocaleDateString()}</p>
      ),
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
      renderCell: (props) => (
        <p>{new Date(props?.row?.loginTime).toLocaleTimeString()}</p>
      ),
    },
    {
      field: "logoutTime",
      headerName: "Left Time",
      width: 150,
      renderCell: (props) => (
        <p>{new Date(props?.row?.logoutTime).toLocaleTimeString()}</p>
      ),
    },
  ]

  const rowsWithIndex = allReports.map((report, index) => ({
    ...report,
    index,
  }))

  return (
    <>
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
        loading={reportsLoading}
        error={reportsError}
        data={rowsWithIndex}
        col={columns}
      />
    </>
  )
}

export default SingleUserMonthlyReport
