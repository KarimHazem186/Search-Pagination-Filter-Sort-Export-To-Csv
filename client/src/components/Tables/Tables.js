import React from 'react'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import Dropdown from 'react-bootstrap/Dropdown'
import Badge from 'react-bootstrap/Badge'
import { BASE_URL } from '../../services/helper'
import {statuschangeFun} from '../../services/Apis.js'
import { NavLink } from 'react-router-dom'
import './Table.css'
import { toast, ToastContainer } from 'react-toastify'
import Paginations from '../Pagination/Paginations.js'
const Tables = ({userdata,deleteUser,getAllUsers,handlePrevious,handleNext,page,pageCount,setPage}) => {
  const handleChange = async(id,status)=>{
    // console.log(id,status)
    const response = await statuschangeFun(id,status)
    // console.log(response)
    if(response.status ===200){
      getAllUsers();
      console.log("Status updated")
      toast.success("Status Updated")
    } else {
      toast.error("Status Error")
    }
  }
  return (
    <>
      <div className="container">
        <Row>
          <div className='col mt-4'>
            <Card className='shadow'>
              <Table className='align-align-items-center' responsive="sm">
                <thead className='thead-dark'>
                  <tr className='table-dark'>
                    <th>ID</th>
                    <th>FullName</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Status</th>
                    <th>Profile</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    userdata.length > 0 ? userdata.map((elemnet,index)=>{
                      return (
                        <>
                          <tr key={index}>
                            <td>{index + 1 +(page-1)*4}</td>
                            <td>{elemnet.fname+" "+elemnet.lname}</td>
                            <td>{elemnet.email}</td>
                            <td>{elemnet.gender==="Male" ? "M":"F"}</td>
                            <td className='d-flex align-items-center'>
                            <Dropdown className='text-center'>
                              <Dropdown.Toggle className='dropdown_btn' id="dropdown-basic">
                                <Badge bg={elemnet.status==="Active" ? "primary":"danger"}>
                                  {elemnet.status}<i className='fa-solid fa-angle-down'></i>
                                </Badge>
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item onClick={()=>handleChange(elemnet._id,"Active")} >Active</Dropdown.Item>
                                <Dropdown.Item onClick={()=>handleChange(elemnet._id,"InActive")}>InActive</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                            </td>
                            <td className='img_parent'>
                              <img src={`${BASE_URL}/uploads/${elemnet.profile}`} alt="img" />
                            </td>
                            <td>
                              <Dropdown className='text-center'>
                                <Dropdown.Toggle variant='light' className='action' id="dropdown-basic">
                                  <i className="fa-solid fa-ellipsis-vertical" style={{color: "#000000"}}></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item >
                                    <NavLink to={`/userprofile/${elemnet._id}`} className="text-decoration-none">
                                      <i className='fa-solid fa-eye' style={{color:"green"}}></i>&nbsp;<span>View</span>
                                    </NavLink>
                                  </Dropdown.Item>

                                  <Dropdown.Item >
                                  <NavLink to={`/edit/${elemnet._id}`} className="text-decoration-none">
                                    <i className='fa-solid fa-pen-to-square' style={{color:"blue"}}></i>&nbsp;<span>Edit</span>
                                  </NavLink>
                                  </Dropdown.Item>

                                  <Dropdown.Item >
                                  <div onClick={()=>deleteUser(elemnet._id)}>
                                    <i className='fa-solid fa-trash' style={{color:"red"}}></i>&nbsp;<span>Delete</span>
                                  </div>
                                  </Dropdown.Item>

                                </Dropdown.Menu>

                                
                              </Dropdown>
                            </td>
                          </tr>
                        </>
                      )
                    }) : <div className='no_data text-center'>NO Data Found</div>
                  }
          
                </tbody>
              </Table>
              <Paginations
                handlePrevious={handlePrevious}
                handleNext={handleNext}
                page={page}
                pageCount={pageCount}
                setPage={setPage}
              />
            </Card>
          </div>
        </Row>
        <ToastContainer />
      </div>
    </>
  )
}
export default Tables