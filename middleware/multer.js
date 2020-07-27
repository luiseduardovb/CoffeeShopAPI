const multer = require("multer");

//line 4 (./media and not ../media because it is activated in app.js not in this file)
// line 5 takes a function as a key. this function has three arguments, cb is equal to callback function
//line 7 first argument is error, second argument is name of file or image we want to send
// line 14   create variable which is the middleware method that will upload the image

const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${+new Date()}${file.originalname}`);
  },
});

const upload = multer({
  storage,
});

module.exports = upload;
