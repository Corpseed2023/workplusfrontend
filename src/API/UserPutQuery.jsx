import axios from "axios"

export const userPutQuery = (URL, data) => {
  return axios.put(URL, {
    ...data,
  })
}