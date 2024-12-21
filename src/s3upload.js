import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";
import { v4 as uuidv4 } from "uuid.js";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const allowedExtensions = [".jpg", ".png", ".jpeg", ".bmp", ".gif"];

export const imageUploader = multer({
  storage: multerS3({
    s3: s3, // S3 객체
    bucket: process.env.AWS_S3_BUCKET_NAME, // Bucket 이름
    contentType: multerS3.AUTO_CONTENT_TYPE, // Content-type, 자동으로 찾도록 설정
    key: (req, file, callback) => {
      // 파일명
      const uploadDirectory = req.query.directory ?? ""; // 디렉토리 path 설정을 위해서
      const folder = req.query.folder ?? "review"; // 요청에서 폴더명을 가져오거나 기본값 설정
      const extension = path.extname(file.originalname); // 파일 이름 얻어오기
      const uuid = uuidv4(); // UUID 생성

      // extension 확인을 위한 코드 (확장자 검사용)
      if (!allowedExtensions.includes(extension)) {
        return callback(new BaseError(status.WRONG_EXTENSION));
      }

      // 파일경로 생성
      const filePath = `${folder}/${uuid}_${file.originalname}`;

      // 저장될 파일 경로
      callback(null, filePath);
    },
    // acl: "public-read-write", // 파일 액세스 권한
  }),
  // 이미지 용량 제한 (5MB)
  limits: { fileSize: 5 * 1024 * 1024 },
});
