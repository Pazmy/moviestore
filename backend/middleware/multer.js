const multer = require("multer");

const productStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/movies");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});
const userStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/avatar");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});
const actorStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/actor");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ storage: userStorage, fileFilter: fileFilter });
const uploadActor = multer({ storage: actorStorage, fileFilter: fileFilter });
const uploads = multer({ storage: productStorage, fileFilter: fileFilter });

module.exports = { upload, uploads, uploadActor };
