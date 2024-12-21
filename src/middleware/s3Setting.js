import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";
import {S3Client, DeleteObjectCommand} from "@aws-sdk/client-s3";
import {v4 as uuidv4} from "uuid";


const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials:{
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
})

const allowedExtensions = [".jpg", ".png",".jpeg",".bmp",".gif"];

// 파일 업로드
export const imageUploader = multer({
    storage: multerS3({
        s3:s3,
        bucket: process.env.AWS_S3_BUCKET_NAME, // 버킷 이름
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key:(req,file,callback) => {
            const folder = req.query.folder ?? "reviews";
            const extension = path.extname(file.originalname);
            const uuid = uuidv4();

            if(!allowedExtensions.includes(extension)){
                return callback(new BaseError(status.WRONG_EXTENSION));
            }

            const filePath = `${folder}/${uuid}_${file.originalname}`;

            callback(null, filePath);
        },
    }),
    // 이미지 용량
    limits: {fileSize: 5 * 1024* 1024 },
});

// 파일 삭제
export const deleteImage = async (key)=>{
    try{
        const command = new DeleteObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: key,
        });
        const response = await s3.send(command);
        console.log("파일 삭제 성공:", response);
        return response;
    }catch(err){
        throw err;
    }
}




















