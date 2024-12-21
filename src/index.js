import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from "swagger-ui-express";
import {
  handleCreatePartyUser,
  handlerPartyCreate,
  handlerPartyMember,
} from "./controllers/party.controller.js";
import {
  handleRenameUser,
  handleUserEnter,
  handleUpdateUserCharacter,
} from "./controllers/user.controller.js";

import {
  handlerGetCollection,
  handlerGetReview,
} from "./controllers/collection.controller.js";
import { handleGetCharacters } from "./controllers/character.controller.js";
import {
  handleGetUserOngoingMission,
  handleGetAvailableTargetUsers,
  handleGetRandomMissions,
  handleCreateUserMission,
  handleGetMissionPreview,
  handleManualMissionStatusUpdate,
  handleSubmitMissionCompletion,
} from "./controllers/mission.controller.js";
import { scheduleMissionStatusUpdate } from "./scheduler/mission.scheduler.js";
import { imageUploader } from "./middleware/s3Setting.js";

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
    // host: `localhost:${3000}`,
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
app.get(
  "/api/v1/parties/:partyId/users/:userId/collection",
  handlerGetCollection
);

// 미션 후기 상세 조회
app.get(
  "/api/v1/parties/:partyId/collection/complete_missions/:CMId",
  handlerGetReview
);

// get character lists
app.get("/api/v1/characters", handleGetCharacters);

// 사용자 닉네임 변경하기
app.patch("/api/v1/parties/:partyId/users/:userId/rename", handleRenameUser);

// patch user character
app.patch(
  "/api/v1/parties/:partyId/users/:userId/character",
  handleUpdateUserCharacter
);

// get user ongoing mission
app.get(
  "/api/v1/parties/:partyId/users/:userId/mission/ongoing",
  handleGetUserOngoingMission
);

//그룹 유저 조회
app.get("/api/v1/parties/:partyId/users", handlerPartyMember);

// get availabe target users
app.get(
  "/api/v1/parties/:partyId/users/:userId/available-targets",
  handleGetAvailableTargetUsers
);

// get mission contents
app.get("/api/v1/missions/random", handleGetRandomMissions);

// post user mission
app.post(
  "/api/v1/parties/:partyId/users/:userId/missions",
  handleCreateUserMission
);

// get mission preivew
app.get("/api/v1/missions/preview", handleGetMissionPreview);

// patch mission status
scheduleMissionStatusUpdate();

// patch mission status manullay (in_progress -> failed)
app.patch("/api/v1/missions/update-status", handleManualMissionStatusUpdate);

// post user mission verification
app.post(
  "/api/v1/parties/:partyId/users/:userId/userMissions/:userMissionId/complete",
  imageUploader.single("image"),
  handleSubmitMissionCompletion
);

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
