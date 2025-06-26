import React, { useContext, useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Select from 'react-select'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Spiner  from "../../components/Spiner/Spiner"
import { registerFun } from '../../services/Apis';
import {useNavigate} from "react-router-dom"
import './Register.css'
import { addData } from '../../components/context/ContextProvider';
const Register = () => {
  
  const[inputData,setInputData] = useState({
    fname:"",
    lname:"",
    email:"",
    mobile:"",
    gender:"",
    location:""
  });

  // console.log("Input data ",inputData)

  const [status,setStatus] = useState("Active")
  const [image,setImage] = useState("")
  const [preview,setPreview] = useState("")
 
  const [showpin,setShowSpin] = useState(true)


  const navigate = useNavigate();


  const {useradd,setUseradd} = useContext(addData)

  // status options
  const options = [
    {value:'Active',label:'Active'},
    {value:'InActive',label:'Inactive'}
  ]


  // setInput Value
  const handleChange =(e)=>{
    const {name,value} =e.target;
    setInputData({
      ...inputData,
      [name]:value
    })
  }

  //status set 
  const handleStatus = (e)=>{
    // console.log(e);
    setStatus(e.value)
    
  }

  // profile set 
  const handleProfile = (e)=>{
    // console.log(e.target.files);
    setImage(e.target.files[0])
  }

  useEffect(()=>{
    if(image){
      setPreview(URL.createObjectURL(image))
    } 

    setTimeout(()=>{
      setShowSpin(false)
    },3000)

  },[image])


  // Submit userdata
  const handleSubmit = async(e)=>{
    e.preventDefault();
    const {fname,lname,email,mobile,gender,location} = inputData;
    if(fname===""){
      toast.error("First Name is Required !")
    } else if(lname===""){
      toast.error("Last Name is Required !")
    }else if(email===""){
      toast.error("Email is Required !")
    }else if(!email.includes("@")){
      toast.error("Enter Valid Email !")
    }else if(mobile===""){
      toast.error("Mobile is Required !")
    }else if(mobile.length>12){
      toast.error("Enter Valid Mobile Number !")
    }else if(gender===""){
      toast.error("Gender is Required !")
    }else if(status===""){
      toast.error("Status is Required !")
    }else if(image===""){
      toast.error("Profile Image is Required !")
    } else if(location===""){
      toast.error("Location is Required !")
    } else {
      // toast.success("Registration done Successfully")
      const data = new FormData();
      data.append("fname",fname)
      data.append("lname",lname)
      data.append("email",email)
      data.append("mobile",mobile)
      data.append("gender",gender)
      data.append("status",status)
      data.append("user_profile",image)
      data.append("location",location)

      const config={
        "Content-Type": "multipart/form-data"
      }

      const response = await registerFun(data,config)
      // console.log(response.status)

      if(response.status===200) {
        setInputData({
          ...inputData,
          fname:"",
          lname:"",
          email:"",
          mobile:"",
          gender:"",
          location:""
        });
        setStatus("");
        setImage("");
        setUseradd(response.data)
        navigate("/")
      } else {
        toast.error("Error!")
      }

    } 
  }

  return (
    <>
      {
      showpin ? <Spiner /> : <div className='container'>
      <h2 className='text-center mt-1'>Register Your Details</h2>
      <Card className='shadow mt-3 p-3'>
        <div className='profile_div text-center'>
          <img src={preview ? preview:'/man.png'} alt='img'/>
        </div>
          <Form>
            <Row>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" name='fname' value={inputData.fname} placeholder="Enter FirstName" onChange={handleChange} />      
              </Form.Group>
              
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" name='lname' value={inputData.lname} placeholder="Enter LastName" onChange={handleChange} />      
              </Form.Group>
              
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name='email' value={inputData.email} placeholder="Enter Email" onChange={handleChange} />      
              </Form.Group>

              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Mobile</Form.Label>
                <Form.Control type="text" name='mobile' value={inputData.mobile} placeholder="Enter Phone Number" onChange={handleChange} />      
              </Form.Group>
              
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Select Your Gender</Form.Label>
                <Form.Check
                  type={"radio"}
                  label={`Male`}
                  name='gender'
                  value={"Male"}
                  onChange={handleChange}
                />
                <Form.Check
                  type={"radio"}
                  label={`Female`}
                  name='gender'
                  value={"Female"}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Select Your Status</Form.Label>
                <Select options={options} /*value={status}*/ onChange={handleStatus}  />
               </Form.Group>

               <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Select Your Profile</Form.Label>
                <Form.Control type="file" name='user_profile' placeholder="Select Your Profile" onChange={handleProfile} />      
              </Form.Group>

              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Enter Your Location</Form.Label>
                <Form.Control type="text" name='location' value={inputData.location} placeholder="Enter Your Location" onChange={handleChange} />      
              </Form.Group>
              
              
              <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit
              </Button>
            </Row>
            
          </Form>
      </Card>
      <ToastContainer position='top-center' />
    </div>
    
      }
      
    </>
   )
}

export default Register