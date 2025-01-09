import multer from "multer";
import path from "path";

// Multer configuration for PDFs
const pdfStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/pdfs");
      // Specify the directory for PDFs
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

const pdfFilter = (req, file, cb) => {
  // Accept only PDF files
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Not a PDF! Please upload a PDF."), false);
  }
};



const uploadPDF = multer({ storage: pdfStorage, fileFilter: pdfFilter, });

export  default uploadPDF
