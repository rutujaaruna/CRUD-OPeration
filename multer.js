const multer = require('multer');
const fs = require('fs');
const path = require('path');

const FILE_LOCATION = process.env.FILE_LOCATION || "";

// Use an empty string as a default if the env variable is not defined
const uploadFiles = multer.diskStorage({
    destination: (req, res, cb) => {
      const uploadDir = path.join(FILE_LOCATION + 'public/upload/');
      
      if (!fs.existsSync(uploadDir)) {
        // Create the parent directory if it doesn't exist
        fs.mkdirSync(uploadDir, { recursive: true });
      }
  
      cb(null, uploadDir);
    }
  });

// Function to handle file uploads
const fileUploads = (fieldName) => {
  return multer({
    storage: uploadFiles,
    fileFilter: (req, file, cb) => { 
      cb(null, true);
    }
  }).single(fieldName);  
};

module.exports = fileUploads;
