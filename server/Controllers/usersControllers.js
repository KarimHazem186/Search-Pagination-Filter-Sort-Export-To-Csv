const usersModel = require("../models/usersSchema");
const moment = require("moment");
const csv = require("fast-csv")
const fs = require("fs");
// register users
const register = async(req,res)=>{
    // console.log(req.file) // photo info
    // console.log(req.body) // user info
    const file = req.file.filename;
    const {fname,lname,email,mobile,gender,location,status} = req.body;

    if(!fname || !lname || !email || !mobile || !gender || !location || !status || !file) {
        res.status(401).json("All Inputs is Required")
    }

    try {
        const preuser = await usersModel.findOne({email:email});

        if(preuser) {
            res.status(401).json("This user already exist in our database")
        } else {
            const dataCreated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
            console.log(dataCreated)
            const userData = new usersModel({
                dataCreated,fname,lname,email,mobile,gender,location,status,profile:file
            });
            await userData.save();
            console.log(userData)
            res.status(200).json(userData)
        }
    } catch (error) {
        res.status(401).json(error)
        console.log("catch block error ")
    }
}

const getAllUsers = async(req,res)=>{
    const search = req.query.search || ""
    
    const gender = req.query.gender || ""
    
    const status = req.query.status || ""
    
    const sort = req.query.sort || ""
    
    const page = req.query.page || 1

    const ITEM_PER_PAGE = 4;

    const query = {
        fname: {$regex:search,$options:"i"}
    }

    if(gender !=="All") {
        query.gender = gender
    }
    if(status !=="All") {
        query.status = status
    }
    try {
        // console.log(req.query)

        const skip = (page -1) * ITEM_PER_PAGE // 1 * 4 = 4

        const count = await usersModel.countDocuments(query);
        console.log("count",count)
        const usersdata = await usersModel.find(query)
        .sort({dataCreated:sort =="new" ? -1 : 1})
            .limit(ITEM_PER_PAGE)
            .skip(skip);
        const pageCount = Math.ceil(count/ITEM_PER_PAGE); // 3/4  

        res.status(200).json({
            Pagination: {
                count,pageCount
            },
            usersdata
        })
    } catch(error) {
        res.status(401).json(error)
    }    
}

const getSingleUser=async(req,res)=>{
    const {id} = req.params;
    try {
        const userdata = await usersModel.findOne({_id:id});
        res.status(200).json(userdata)
    } catch(error){
        res.status(401).json(error)
    }
}

// user edit
const useredit = async(req,res)=>{
    const {id} = req.params;
    const {fname,lname,email,mobile,gender,location,status,user_profile} = req.body;
    const file = req.file ? req.file.filename : user_profile

    const dateUpdated = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');

    try {
        const updateuser = await usersModel.findByIdAndUpdate({_id:id},{
            fname,lname,email,mobile,gender,location,status,profile:file,dateUpdated
        },{
            new:true
        });
        await updateuser.save();
        res.status(200).json(updateuser);
    } catch(error) {
        res.status(401).json(error)
    }
}

// delete user
const userdelete = async(req,res)=>{
    const {id} = req.params;
    try {
        const deleteuser = await usersModel.findByIdAndDelete({_id:id});
        res.status(200).json(deleteuser);
    } catch(error) {
        res.status(401).json(error)
    }
}

const userstatus = async(req,res)=>{
    const {id} = req.params;
    const {data} = req.body;

    try {
        const userstatusupdate = await usersModel.findByIdAndUpdate({_id:id},{status:data},{new:true});
        res.status(200).json(userstatusupdate)
    } catch(error) {
        res.status(401).json(error)
    }
}

const userExport = async (req, res) => {
    try {
        const userdata = await usersModel.find();

        const csvStream = csv.format({ header: true });

        if (!fs.existsSync("public/files/export")) {
            if (!fs.existsSync("public/files")) {
                fs.mkdirSync("public/files");
            }
            if (!fs.existsSync("public/files/export")) {
                fs.mkdirSync("public/files/export");
            }
        }

        const writableStream = fs.createWriteStream("public/files/export/users.csv");
        csvStream.pipe(writableStream);

        writableStream.on("finish", function () {
            res.json({
                downloadUrl: `http://localhost:6010/files/export/users.csv`
            });
        });

        if (userdata.length > 0) {
            userdata.forEach((user) => {
                csvStream.write({
                    FirstName: user.fname || "_",
                    LastName: user.lname || "_",
                    Email: user.email || "_",
                    Phone: user.mobile || "_",
                    Gender: user.gender || "_",
                    Status: user.status || "_",
                    Profile: user.profile || "_",
                    Location: user.location || "_",
                    DateCreated: user.dateCreated || "_",
                    DateUpdated: user.dateUpdated || "_",
                });
            });
        }

        csvStream.end();
    } catch (error) {
        res.status(401).json(error);
    }
};


module.exports = {
    register,
    getAllUsers,
    getSingleUser,
    useredit,
    userdelete,
    userstatus,
    userExport,
}
