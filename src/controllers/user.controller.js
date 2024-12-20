import { StatusCodes } from "http-status-codes";
import { userEnter, userRename } from "../services/user.service.js";
import { bodyToRenameUser, bodyToUser } from "../dtos/user.dto.js";

// 그룹 재입장하기
export const handleUserEnter = async (req, res, next) => {
    console.log("그룹에 재입장을 요청하였습니다!");

    const user = await userEnter(bodyToUser(req.params.userName, req.params.partyName));
  
    // console.log(user);
    res.status(StatusCodes.OK).success(user);
    /*
  #swagger.summary = '그룹 재입장하기 API';
  #swagger.tags = ['User']
  #swagger.parameters['partyName'] = {
    in: 'path',
    description: '파티 이름',
    required: true,
    schema: "파티명"
  }
  #swagger.parameters['userName'] = {
    in: 'path',
    description: '유저 이름',
    required: true,
    schema: "옌찌"
  }

  #swagger.responses[200] = {
    description: "그룹 재입장 성공 응답",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "SUCCESS" },
            error: { type: "object", nullable: true, example: null },
            success: {
              type: "object",
              properties: {
                userId: { type: "number", example: 6 },
                userName: { type: "string", example: "엔찌" }
              }
            }
          }
        }
      }
    }
  };

  #swagger.responses[400] = {
    description: "그룹 재입장 실패 응답",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "U001" },
                reason: { type: "string", example: "존재하지 않는 사용자 입니다." },
                data: { type: "object", nullable: true, example: null }
              }
            },
            success: { type: "object", nullable: true, example: null }
          }
        }
      }
    }
  };
*/
};

// 닉네임 변경하기
export const handleRenameUser = async (req, res, next) => {
  console.log("사용자가 닉네임 변경을 요청하였습니다.");

  const user = await userRename(bodyToRenameUser(req.params.userId, req.params.partyId, req.body));

  res.status(StatusCodes.OK).success(user);
};