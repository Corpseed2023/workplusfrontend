import axios from "axios"

export const deleteQuery = (URL,data) => {
  console.log('deleetyetete',URL,data)
  return axios.delete(URL,{data})
}
