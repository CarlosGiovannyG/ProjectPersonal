
const multer = require('multer')

const storage = multer.diskStorage({
  destination: path.join(__dirname, './Public/Images'),
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + path.extname(file.originalname));
  }
})

const upload = multer({ storage })

module.exports = upload;