import multer from "multer";
import path from "path";

// ✅ ABSOLUTE PATH
const uploadPath = path.join(process.cwd(), "uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath); // ✅ FIXED
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

export const upload = multer({ storage });


// 🔥 MEDIA URL MIDDLEWARE (KEEP AS IS)
const mediaUrl = (req, res, next) => {

  const baseUrl =
    process.env.NODE_ENV === "production"
      ? process.env.PROD_URL
      : process.env.LOCAL_URL;

  req.mediaUrl = baseUrl;

  next();
};

export default mediaUrl;