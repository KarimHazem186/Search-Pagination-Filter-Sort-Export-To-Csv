import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import Spiner  from "../../components/Spiner/Spiner"
import {useNavigate} from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import './Home.css'
import Tables from '../../components/Tables/Tables';
import { addData, deleteData, updateData } from '../../components/context/ContextProvider';
import { deleteFun, exporttocsvFun, getAllUsersFun } from '../../services/Apis';
import { toast } from 'react-toastify';
const Home = () => {
  const [userdata,setUserData] = useState([])
  
  const [showpin,setShowSpin] = useState(true)

  const [search,setSearch] = useState("")
  
  const [gender,setGender] = useState("All")
  
  const [status,setStatus] = useState("All")

  const [sort,setSort] = useState("new")

  const [page,setPage] = useState(1)

  const [pageCount,setPageCount] = useState(0)


  const {useradd,setUseradd} = useContext(addData)

  const {userUpdate,setUserUpdate} = useContext(updateData)

  const {userDelete,setUserDelete} = useContext(deleteData)



  const navigate = useNavigate()

  const adduser = ()=> {
    navigate("/register")
  }

  // get all users
  const getAllUsers = async()=> {
    const response = await getAllUsersFun(search,gender,status,sort,page)
    console.log(response)
    console.log(response.data.Pagination.pageCount)
    if(response.status ===200) {
      setUserData(response.data.usersdata);
      setPageCount(response.data.Pagination.pageCount)
    } else {
      console.log("Error For get User data")
    }
  }

  // user delete 
  const deleteUser = async(id)=>{
    const response = await deleteFun(id);
    if(response.status===200){
      getAllUsers()
      setUserDelete(response.data)
    } else {
      toast.error("error")
    }
  }

  // export user
  const exportuser = async()=>{
    const response = await exporttocsvFun();
    // console.log(response)
    if(response.status===200){
      window.open(response.data.downloadUrl,"blank")
    } else {
      toast.error("ERROR!")
    }
  }

  // pagination
 //  handle prev btn
  const handlePrevious =()=>{
    setPage(()=>{
      if(page===1) return page;
      return page -1
    })
  }

  // handle next btn
  const handleNext =()=>{
    setPage(()=>{
      if(page===pageCount) return page;
      return page + 1
    })
  }



  useEffect(()=>{
    getAllUsers()
    setTimeout(()=>{
      setShowSpin(false)
    },1200)
  },[search,gender,status,sort,page])
  
  return (
    <>
      {
        useradd ? <Alert variant="success" onClose={()=>setUseradd("")} dismissible>{useradd.fname.toUpperCase()} Successfully Added</Alert> : ""
      }
      {
        userUpdate ? <Alert variant="primary" onClose={()=>setUserUpdate("")} dismissible>{userUpdate.fname.toUpperCase()} Successfully Updated</Alert> : ""
      }
      {
        userDelete ? <Alert variant="danger" onClose={()=>setUserDelete("")} dismissible>{userDelete.fname.toUpperCase()} Successfully Deleted</Alert> : ""
      }
      <div className='container'>
        <div className='main_div'>
          {/* Search add btn */}
          <div className='search_add mt-4 d-flex justify-content-between'>
            <div className='search col-lg-4'>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e)=>setSearch(e.target.value)}
                />
                <Button variant="success" className='search_btn'>Search</Button>
            </Form>
            </div>
            <div className='add_btn'>
              <Button variant='primary' onClick={adduser}><i className='fa-solid fa-plus'></i>&nbsp;Add User</Button>
            </div>
          </div>
          {/* export,gender,status */}
          <div className='filter_div mt-5 d-flex justify-content-between flex-wrap'>
            <div className='export_csv'>
              <Button className='export_btn' onClick={exportuser}>Export to CSV</Button>
            </div>
            <div className='filter_gender'>
              <div className='filter'>
                <h3>Filter By Gender</h3>
                <div className='gender d-flex justify-content-around'>
                <Form.Check
                    type={"radio"}
                    label={`All`}
                    name='gender'
                    value={"All"}
                    onChange={(e)=>setGender(e.target.value)}
                    defaultChecked
                  />

                  <Form.Check
                    type={"radio"}
                    label={`Male`}
                    name='gender'
                    value={"Male"}
                    onChange={(e)=>setGender(e.target.value)}
                  />

                  <Form.Check
                    type={"radio"}
                    label={`Female`}
                    name='gender'
                    value={"Female"}
                    onChange={(e)=>setGender(e.target.value)}
                  />
                </div>
              </div>
            </div>
            {/*Short by value */}
            <div className='filter_newold'>
              <h3>Short By Value</h3>
              <Dropdown className='text-center'>
                <Dropdown.Toggle className='dropdown_btn' id="dropdown-basic">
                   <i className="fa-solid fa-sort"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={()=>setSort("new")}>New</Dropdown.Item>
                  <Dropdown.Item onClick={()=>setSort("old")}>Old</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            {/* Filter by Status */}
            <div className='filter_status'>
              <div className='status'>
                <h3>Filter By Status</h3>
                <div className='status_radio d-flex justify-content-around flex-wrap'>
                  <Form.Check
                      type={"radio"}
                      label={`All`}
                      name='status'
                      value={"All"}
                      onChange={(e)=>setStatus(e.target.value)}
                      defaultChecked
                    />
                    &nbsp;&nbsp;&nbsp;
                    <Form.Check
                      type={"radio"}
                      label={`Active`}
                      name='status'
                      value={"Active"}
                      onChange={(e)=>setStatus(e.target.value)}
                    />
                    &nbsp;&nbsp;&nbsp;
                    <Form.Check
                      type={"radio"}
                      label={`InActive`}
                      name='status'
                      value={"InActive"}
                      onChange={(e)=>setStatus(e.target.value)}
                    />
                </div>
              </div>
            </div>
          </div>
        </div>
        {
          showpin ? <Spiner /> :  
          <Tables
            userdata={userdata} 
            deleteUser={deleteUser}
            getAllUsers={getAllUsers}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
            page={page}
            pageCount={pageCount}
            setPage={setPage}
          />

        }
      </div>
    </>
  )
}

export default Home