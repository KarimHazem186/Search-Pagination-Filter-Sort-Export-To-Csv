import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Spiner from "../../components/Spiner/Spiner"
import { getSingleUserFun } from '../../services/Apis'
import './Profile.css'
import { useParams } from 'react-router-dom'
import { BASE_URL } from '../../services/helper'
import moment from "moment"
const Profile = () => {
  const [showspin,setShowSpin] = useState(true)
  const [userprofile,setUserProfile] = useState({})
  const {id} =useParams();
  console.log(id);

  const userProfileGet=async()=>{
    const response = await getSingleUserFun(id)
    console.log(response)
    if(response.status === 200){
      setUserProfile(response.data)
    }else {
      console.log("error")
    }
  }

  useEffect(()=>{
    userProfileGet();
    setTimeout(()=>{
        setShowSpin(false)
      },1200)
  },[])
  return (
    <>
    {
      showspin ? <Spiner /> : <div className="container">
      <Card className='card-profile shadow col-lg-6 mx-auto mt-5'>
        <Card.Body>
          <Row>
            <div className="col">
              <div className='card-profile-status d-flex justify-content-center'>
                <img src={`${BASE_URL}/uploads/${userprofile.profile}`} alt='Img'/>
              </div>
            </div>
          </Row>
          <div className='text-center'>
            <h3 className='mt-3'>{userprofile.fname +`${" "}`+ userprofile.lname}</h3>
                <h2 className='mt-2'><i className='fa-solid fa-envelope email'></i>&nbsp;:-<span>{userprofile.email}</span></h2>

                <h4 className='mt-2'><i className='fa-solid fa-mobile'></i>&nbsp;:-<span>{userprofile.mobile}</span></h4>

               <h4 className='mt-2'><i className='fa-solid fa-person'></i>&nbsp;:-<span>{userprofile.gender}</span></h4>
            
                <h4 className='mt-2'><i className='fa-solid fa-location-pin location'></i>&nbsp;:-<span>{userprofile.location}</span></h4>
            
                <h4 className='mt-2'>Status&nbsp;:-<span>{userprofile.status}</span></h4>
              
                <h4 className='mt-2'><i className='fa-solid fa-calendar-days calendar'></i>&nbsp;:-Date Created&nbsp;:-<span>{moment(userprofile.dataCreated).format("DD-MM-YY")}</span></h4>
              
                <h4 className='mt-2'><i className='fa-solid fa-calendar-days calendar'></i>&nbsp;:-Date Updated&nbsp;:-<span>{userprofile.dateUpdated}</span></h4>
            </div>
        </Card.Body>
      </Card>
    </div>
    } 
    </>
  )
}

export default Profile