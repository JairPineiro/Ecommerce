import { useState, useEffect } from "react"
import { getUserService } from "../Services/userServices"


export const Dashboard = () => {

  const [userData, setUserData] = useState({});
  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserService(token)
        if(response.status === 200){
          setUserData(response.data)
        } 
      } catch (error) {
        console.log('Ocurrió un error en Dashboard', error)
      }
    }
    fetchUserData()
  },[token])
  return (
    <>
      {userData?.first_name &&  <p>{userData.first_name}</p>}
      {userData?.last_name &&  <p>{userData.last_name}</p>}
      {userData?.gender &&  <p>{userData.gender}</p>}
      {userData?.email &&  <p>{userData.email}</p>}
      {userData?.role &&  <p>{userData.role}</p>}
    </>
  )
}
