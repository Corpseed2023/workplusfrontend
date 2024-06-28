import React, { useEffect, useState } from "react"
import CmGap from "../Components/CmGap"
import CmBtn from "../Components/CmBtn"
import MdHeading from "../Components/MdHeading"
import ScreenPhoto from "../Components/ScreenPhoto"
import { allScreenShotFun } from "../Toolkit/ScreenShotSlice"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import TableScalaton from "../Components/TableScalaton"
import NoRecordAdded from "../Components/NoRecordAdded"
import ScreenCard from "../Components/ScreenCard"
import dayjs from "dayjs"
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
const ScreenShotPage = () => {
  const [filterDate, setFilterDate] = useState(
    new Date().toISOString().split("T")[0]
  )




  const [dateFilterDep, setDateFilterDep] = useState(false)
  const { useremail } = useParams()

  const dispatch = useDispatch()

  const filterCurrentData = () => {
    setDateFilterDep((prev) => !prev)
  }

  useEffect(() => {
    dispatch(allScreenShotFun(userDate))
  }, [dispatch, useremail, dateFilterDep])

  const { allScreenshot, screenshotLoading, screenshotError } = useSelector(
    (prev) => prev?.screenshot
  )

  const userDate = {
    date: filterDate,
    email: useremail,
  }

  return (
    <CmGap>
      <div className="align-between">
        <MdHeading data={`All Screen Shot`} />
        <div>
          <input
            type="date"
            className="mr-1 mb-0"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
          <CmBtn data={`Add Filter`} onClick={filterCurrentData} />
        </div>
      </div>
      {screenshotLoading && <TableScalaton />}
      {screenshotError && <NoRecordAdded />}
      {allScreenshot && !screenshotLoading && !screenshotError && (
        <div className="three-item">
          {allScreenshot?.map((img, index) => (
            // <ScreenPhoto
            //   key={index}
            //   image={img?.screenshotUrl}
            //   time={new Date(img?.screenshotTime).toLocaleTimeString()}
            //   date={new Date(img?.screenshotTime).toLocaleDateString()}
            // />
            <ScreenCard
              key={index}
              index={index}
              image={img?.screenshotUrl}
              id={img?.id}
              // time={new Date(img?.screenshotTime).toLocaleTimeString()}
              time={dayjs.utc(img?.screenshotTime).add(5, 'hour').format('hh:mm A')}
              // date={new Date(img?.screenshotTime).toLocaleDateString()}
              date={dayjs.utc(img?.screenshotTime).add(5, 'hour').format("DD/MM/YYYY")}
            />
          ))}
        </div>
      )}
    </CmGap>
  )
}

export default ScreenShotPage
