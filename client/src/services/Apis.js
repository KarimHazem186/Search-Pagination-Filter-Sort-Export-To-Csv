import {commonrequest} from './ApiCall'
import { BASE_URL } from './helper'

export const registerFun = async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/user/register`,data,header)
}

export const getAllUsersFun = async(search,gender,status,sort,page)=>{
    return await commonrequest("GET",`${BASE_URL}/user/details?search=${search}&gender=${gender}&status=${status}&sort=${sort}&page=${page}`,"");
}

export const getSingleUserFun = async(id)=>{
    return await commonrequest("GET",`${BASE_URL}/user/${id}`,"");
}

export const editFun = async(id,data,header)=>{
    return await commonrequest("PUT",`${BASE_URL}/user/edit/${id}`,data,header);
}

export const deleteFun = async(id)=>{
    return await commonrequest("DELETE",`${BASE_URL}/user/delete/${id}`,{});
}

export const statuschangeFun = async(id,data)=>{
    return await commonrequest("PUT",`${BASE_URL}/user/status/${id}`,{data})
}

export const exporttocsvFun = async()=>{
    return await commonrequest("GET",`${BASE_URL}/userexport`,"")
}