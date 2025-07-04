const multer = require('multer');


// storage config
const storage = multer.diskStorage({
    
    destination:(req,file,callback)=>{
        callback(null,"./uploads")
    },
    
    filename:(req,file,callback)=>{
        const filename = `image-${Date.now()}.${file.originalname}`
        callback(null,filename)
    }
});

// filter 
const filefilter = (req,file,callback)=>{
    if(file.mimetype==="image/png" ||"image/jpg"||"image/jpeg") {
        callback(null,true)
    }else {
        callback(null,false)
        return callback(new Error("Only .png .jpg & .jpeg files are supported or Formatted  Allowed"));
    }
}

const upload = multer({
    storage: storage,
    filefilter: filefilter,
})

module.exports =upload;