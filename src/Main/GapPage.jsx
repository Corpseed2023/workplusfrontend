import React, { useEffect, useState } from "react"
import CmGap from "../Components/CmGap"
import MdHeading from "../Components/MdHeading"
import { useDispatch, useSelector } from "react-redux"
import { allGapFun } from "../Toolkit/AllGapSlice"
import TableComp from "../Components/TableComp"
import { useParams } from "react-router-dom"
import dayjs from "dayjs"
import GapReasonModal from "../Model/GapReasonModal"

const GapPage = () => {
  const [filterDate, setFilterDate] = useState("")

  console.log(filterDate)

  const { useremail } = useParams()

  const { email } = useSelector((prev) => prev?.auth?.currentUser?.data)

  console.log(email)

  const dispatch = useDispatch()

  const gapParam = {
    userMailId: useremail ? useremail : email,
    date: filterDate,
  }

  useEffect(() => {
    dispatch(allGapFun(gapParam))
  }, [dispatch, filterDate])

  const { allGapData, gapError, gapLoading } = useSelector((prev) => prev?.gap)

  const data = useSelector((prev) => prev?.gap)

  const columns = [
    {
      field: "index",
      headerName: "ID",
      width: 80,
      renderCell: (props) => (
        <p>{props.row.id + 1}</p> // Adding 1 to make index 1-based
      ),
    },
    {
      field: "date",
      headerName: "Date",
      width: 150,
    },
    {
      field: "gapStartTime",
      headerName: "Gap Start Time",
      width: 150,
      renderCell: (props) => (
        <p>{dayjs(props?.row?.lastOfflineTime).format("HH:mm:ss")}</p>
      ),
    },
    {
      field: "gapEndTime",
      headerName: "Gap End Time",
      width: 150,
      renderCell: (props) => (
        <p>{dayjs(props?.row?.lastOnlineTime).format("HH:mm:ss")}</p>
      ),
    },
    {
      field: "gapTime",
      headerName: "Gap Time",
      width: 150,
    },
    {
      field: "reason",
      headerName: "Reason",
      width: 150,
      renderCell: (props) => <GapReasonModal data={props?.row} />,
    },
  ]

  const gapReport = allGapData?.gapDetails?.map((report, index) => ({
    ...report,
    id: index,
    date: allGapData?.date,
  }))

  const totalGapMinute = allGapData?.gapDetails?.reduce(
    (accumulator, item) => accumulator + parseInt(item.gapTime),
    0
  )

  console.log("total gap minute", allGapData?.userName)

  console.log(gapReport)

  return (
    <CmGap>
      <div className="align-between">
        <MdHeading data={`Daily Gap Report`} />
        <div>
          <input
            type="date"
            className="mr-1 mb-0"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </div>
      </div>

      <div className="gap-time">
        <p>
          GapTime Total is : <b>{totalGapMinute}</b> Minute
        </p>
      </div>
      <div className="gapuser-details">
        <h6>UserName : {allGapData?.userName}</h6>
        <h6>UserEmail : {allGapData?.userEmail}</h6>
      </div>

      <TableComp
        loading={gapLoading}
        error={gapError}
        data={gapReport}
        col={columns}
      />
    </CmGap>
  )
}

export default GapPage
