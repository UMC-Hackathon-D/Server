import {StatusCodes} from "http-status-codes";
import { createToParty} from "../dtos/party.dto.js";
import { partyCreate} from "../services/party.service.js";


//그룹(파티) 생성하기
export const handlerPartyCreate = async(req,res,next)=>{
    console.log("그룹(파티) 생성 요청");

    const group = await partyCreate(createToParty(req.body));
    res.status(StatusCodes.OK).success(group);
    /*
  #swagger.summary = '그룹 생성 API';
  #swagger.description = '새로운 그룹을 생성하는 API입니다.';
  #swagger.tags = ['Party']
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            partyName: { type: "string", example: "안녕하세요" },
            name: { type: "string", example: "깡태" },
            numMember: { type: "number", example: 4 },
            password: { type: "string", example: "asdf" }
          },
          required: ["partyName", "name", "numMember", "password"]
        }
      }
    }
  };

  #swagger.responses[200] = {
    description: "그룹 생성 성공 응답",
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
                partyId: { type: "number", example: 10 },
                partyName: { type: "string", example: "안녕하세요" },
                numMember: { type: "number", example: 4 },
                password: { type: "string", example: "asdf" }
              }
            }
          }
        }
      }
    }
  };

  #swagger.responses[400] = {
    description: "그룹 생성 실패 응답",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "P001" },
                reason: { type: "string", example: "이미 존재하는 그룹 입니다." },
                data: { type: "object" }
              }
            },
            success: { type: "object", nullable: true, example: null }
          }
        }
      }
    }
  };
*/
}




