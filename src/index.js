import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from "swagger-ui-express";
import {
  handleCreatePartyUser,
  handlerPartyCreate,
} from "./controllers/party.controller.js";
import { handleUserEnter } from "./controllers/user.controller.js";
import {handlerGetCollection} from "./controllers/collection.controller.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

/*****************공통 응답을 사용할 수 있는 헬퍼 함수 등록*********************/
app.use((req, res, next) => {
  res.success = (success) => {
    return res.json({
      resultType: "SUCCESS",
      error: null,
      success: success,
    });
  };

  res.error = ({ errorCode = "unknown", reason = null, data = null }) => {
    return res.json({
      resultType: "FAIL",
      error: { errorCode, reason, data },
      success: null,
    });
  };

  next();
});
/*****************공통 응답을 사용할 수 있는 헬퍼 함수 등록*********************/

app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

app.get("/", (req, res) => {
  // #swagger.ignore = true
  res.send("Hello World!");
});

app.use(
  "/docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(
    {},
    {
      swaggerOptions: {
        url: "/openapi.json",
      },
    }
  )
);

app.get("/openapi.json", async (req, res, next) => {
  // #swagger.ignore = true
  const options = {
    openapi: "3.0.0",
    disableLogs: true,
    writeOutputFile: false,
  };
  const outputFile = "/dev/null"; // 파일 출력은 사용하지 않습니다.
  const routes = ["./src/index.js"];
  const doc = {
    info: {
      title: "Nangman Boat",
      description: "UMC 장기 해커톤 개쩌는 D조 낭만보트",
    },
    host: `${process.env.SERVER_IP}:3000`,
  };

  const result = await swaggerAutogen(options)(outputFile, routes, doc);
  res.json(result ? result.data : null);
});

//그룹 생성하기
app.post("/api/v1/parties/create", handlerPartyCreate);

// 파티 유저 등록하기
app.post("/api/v1/parties/users/signup", handleCreatePartyUser);

// 파티 재입장하기
app.get("/api/v1/parties/:partyName/users/:userName", handleUserEnter);


// 낭만모음집 조회
app.get("/api/v1/parties/:partyId/users/:userId/collection", handlerGetCollection);


/****************전역 오류를 처리하기 위한 미들웨어*******************/
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  console.log(err);
  res.status(err.statusCode || 500).error({
    errorCode: err.errorCode || "unknown",
    reason: err.reson || err.message || null,
    data: err.data || null,
  });
});
/****************전역 오류를 처리하기 위한 미들웨어*******************/

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
