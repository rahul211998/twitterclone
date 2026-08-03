import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

// memoryStorage() is temporary — it lives only in RAM during the request.

export default upload;



// Request comes in
//       │
//       ▼
// multer reads image → stores in req.file.buffer (RAM)
//       │
//       ▼
// sendMail runs → attaches buffer to email → email sent ✅
//       │
//       ▼
// Request ends → buffer is GONE from memory ❌