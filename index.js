const express = require('express');
const conn = require('./config');
const dotenv = require('dotenv');
const createTable = require('./userDetails');
const fileUploads = require('./multer');
const fs = require('fs');


dotenv.config();

const app = express();

app.use(express.json());
const port = process.env.DB_PORT || 5000;

//To create table
createTable();

//CRUD Operations

//Create
app.post('/addUserData',fileUploads('file'), async(req,res) => {
        const file = req.file;
        let filePath = '';
        let originalPath = '';
        let extension = '';
        if (!file) {
          return res
            .status(400)
            .json({ message: "File is missing in the request" });
        }
        extension = file.originalname.split(".").pop(); // Get the file extension
        originalPath = `${process.env.FILE_LOCATION}public/upload//${file.filename}`;
        filePath = originalPath;
        const newPath = `${process.env.FILE_LOCATION}public/upload/${file.filename}.${extension}`;
        const fileNames=`${file.filename}` + `.` + `${extension}`;
        fs.rename(filePath, newPath, (err) => {
          if (err) {
            console.log("Error renaming file:", err);
          } else {
            console.log("File Renamed!");
          }
        });
        
      const data = {
          name : req.body.name,
          img : fileNames,
          summary : req.body.summary
      };
      conn.query("Insert into user_details SET?", data ,(error,result,fileds) => {
          if(error){
            console.log("error", error);
              res.json({
               status:404,
               message:"Data not found" 
              })
           }else{
               res.json({
                   status:200,
                   message:"Users data Inserted successfullly"
               })
           }
      })
   
})

//Read
app.get('/getUserData',(req,res) => {
    conn.query("select * from user_details", (err,result) => {
        if(err){
           res.json({
            status:404,
            message:"Data not found" 
           })
        }else{
            res.json({
                status:200,
                message:"Users data get successfullly",
                data:result
            })
        }
    })
});

//Update
app.put('/updateUserData/:id', fileUploads('file'),(req,res) => {
    const file = req.file;
        let filePath = '';
        let originalPath = '';
        let extension = '';
        if (!file) {
          return res
            .status(400)
            .json({ message: "File is missing in the request" });
        }
        extension = file.originalname.split(".").pop(); // Get the file extension
        originalPath = `${process.env.FILE_LOCATION}public/upload//${file.filename}`;
        filePath = originalPath;
        const newPath = `${process.env.FILE_LOCATION}public/upload/${file.filename}.${extension}`;
        const fileNames=`${file.filename}` + `.` + `${extension}`;
        fs.rename(filePath, newPath, (err) => {
          if (err) {
            console.log("Error renaming file:", err);
          } else {
            console.log("File Renamed!");
          }
        });
    const data = [req.body.name,fileNames,req.body.summary,req.params.id];
    conn.query("UPDATE user_details SET name = ?, img = ?, summary = ? where id = ?", data ,(error,result,fileds) => {
        if(error){
            console.log("error", error)
            res.json({
             status:404,
             message:"Data not found" 
            })
         }else{
             res.json({
                 status:200,
                 message:"Users data Updated  successfullly"
             })
         }
    });
})


//Delete
app.delete('/deleteUserData/:id',(req,res) => {
    const data = [req.params.id];
    conn.query("DELETE FROM user_details WHERE id = ?", data ,(error,result,fileds) => {
        if(error){
            console.log("error", error)
            res.json({
             status:404,
             message:"Data not found" 
            })
         }else{
             res.json({
                 status:200,
                 message:"Users data deleted successfullly"
             })
         }
    });
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
