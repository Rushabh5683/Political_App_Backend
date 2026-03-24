import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

export const upload = multer({ storage });

const mediaUrl = (req, res, next) => {

  const baseUrl =
    process.env.NODE_ENV === "production"
      ? process.env.PROD_URL
      : process.env.LOCAL_URL;

  req.mediaUrl = baseUrl;

  next();
};

export default mediaUrl;