import axios from "axios"

export const deleteQuery = (URL,data) => {
  return axios.delete(URL,{data})
}
