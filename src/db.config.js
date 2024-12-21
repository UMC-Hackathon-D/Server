// import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

// Prisma 클라이언트 생성 (한국 시간 처리 포함)
export const prisma = new PrismaClient({});

// 시간 처리를 위한 미들웨어 추가
prisma.$use(async (params, next) => {
  // 데이터 생성/수정 시 KST로 변환
  if (params.action === "create" || params.action === "update") {
    if (params.args.data) {
      const data = params.args.data;
      // createAt 필드가 있으면 KST로 변환
      if (data.createAt) {
        data.createAt = convertToKST(data.createAt);
      }
      // updateAt 필드가 있으면 KST로 변환
      if (data.updateAt) {
        data.updateAt = convertToKST(data.updateAt);
      }
    }
  }

  const result = await next(params);

  // 데이터 조회 시 KST로 변환
  if (
    params.action === "findMany" ||
    params.action === "findFirst" ||
    params.action === "findUnique"
  ) {
    if (result && typeof result === "object") {
      if (result.createAt) {
        result.createAt = convertToKST(result.createAt);
      }
      if (result.updateAt) {
        result.updateAt = convertToKST(result.updateAt);
      }
    }
  }

  return result;
});

// KST 변환 헬퍼 함수
export const convertToKST = (date) => {
  return new Date(new Date(date).getTime() + 9 * 60 * 60 * 1000);
};

// 현재 시간을 KST로 반환하는 헬퍼 함수
export const getCurrentKSTDate = () => {
  return convertToKST(new Date());
};

// export const pool = mysql.createPool({
//   host: process.env.DB_HOST || "localhost", // mysql의 hostname
//   user: process.env.DB_USER || "root", // user 이름
//   port: process.env.DB_PORT || 3306, // 포트 번호
//   database: process.env.DB_NAME || "umc_7th", // 데이터베이스 이름
//   password: process.env.DB_PASSWORD || "password", // 비밀번호
//   waitForConnections: true,
//   // Pool에 획득할 수 있는 connection이 없을 때,
//   // true면 요청을 queue에 넣고 connection을 사용할 수 있게 되면 요청을 실행하며, false이면 즉시 오류를 내보내고 다시 요청
//   connectionLimit: 10, // 몇 개의 커넥션을 가지게끔 할 것인지
//   queueLimit: 0, // getConnection에서 오류가 발생하기 전에 Pool에 대기할 요청의 개수 한도
// });
