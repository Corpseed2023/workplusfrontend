import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import "./App.css"
import MainPage from "./Main/MainPage"
import MainOutlet from "./Main/MainOutlet"
import HomePage from "./Main/HomePage"
import LoginPage from "./Login/LoginPage"
import Signup from "./Login/Signup"
import ScreenShotPage from "./Main/ScreenShotPage"
import AllUsers from "./Main/AllUsers"
import SingleUserPage from "./Main/SingleUserPage"
import ReportsPage from "./Main/ReportsPage"
import AllReportsUser from "./Main/AllReportsUser"
import SingleUserMonthlyReport from "./Main/SingleUserMonthlyReport"
import { useSelector } from "react-redux"
import AddNewIP from "./Main/AddNewIP"
import MonthlyReport from "./Main/MonthlyReport"
import GapPage from "./Main/GapPage"
import { ConfigProvider } from "antd"
import ForgotPassword from "./Login/ForgotPassword"

function App() {
  const authStatus = useSelector((state) => state.auth.isAuth)

  return (
    <div className="App">
      <ConfigProvider theme={{
        components:{
          Card:{
            colorBorderSecondary:'#c6c8cb',
            padding:8,
            actionsLiMargin:0,
            borderRadius:4,
            borderRadiusLG:6,
          }
        }
      }}>
        <BrowserRouter>
          <Routes>
            <Route path="" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgotPassword" element={<ForgotPassword/>} />

            <Route
              path="/workplus"
              element={authStatus ? <MainOutlet /> : <Navigate to="/login" />}
            >
              <Route path="" element={<MainPage />} />
              <Route path="gap" element={<GapPage />} />

              <Route path="ipaddress" element={<AddNewIP />} />
              {/* <Route
                path="screenshot"
                element={authStatus ? <AllUsers /> : <Navigate to="/login" />}
              />
              <Route
                path="screenshot/:useremail"
                element={
                  authStatus ? <ScreenShotPage /> : <Navigate to="/login" />
                }
              /> */}
              <Route path="reports" element={<AllReportsUser />}>
                <Route path="" element={<ReportsPage />} />
                <Route
                  path=":useremail"
                  element={<SingleUserMonthlyReport />}
                />
              </Route>
              <Route path="monthly-report" element={<MonthlyReport />} />

              <Route path="userlist" element={<AllUsers />} />
              <Route path="userlist/:useremail" element={<GapPage />} />
              <Route path="users" element={<AllUsers />} />
              <Route
                path="users/screenshot/:useremail"
                element={
                  authStatus ? <ScreenShotPage /> : <Navigate to="/login" />
                }
              />
              <Route path="users/:useremail" element={<SingleUserPage />} />
              <Route path="users/gap/:useremail" element={<GapPage />} />
            </Route>
            <Route path="*" element={<h1>Page Not Found</h1>} />
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </div>
  )
}

export default App
