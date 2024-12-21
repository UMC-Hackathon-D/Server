import { StatusCodes } from "http-status-codes";
import { getCharacters } from "../services/character.service.js";

export const handleGetCharacters = async (req, res, next) => {
  console.log("캐릭터 조회를 요청했습니다!");

  const characters = await getCharacters();
  res.status(StatusCodes.OK).success(characters);

  /* 
    #swagger.summary = '캐릭터 목록 조회 API'
    #swagger.tags = ['Character']
    #swagger.description = '선택 가능한 캐릭터 목록을 조회하는 API입니다.'
    
    #swagger.responses[200] = {
        description: "캐릭터 조회 성공 응답",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        resultType: { type: "string", example: "SUCCESS" },
                        error: { type: "null", example: null },
                        success: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    id: { type: "integer", example: 1 },
                                    photo: { type: "string", example: "character1.jpg" }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    
    #swagger.responses[404] = {
        description: "캐릭터를 찾을 수 없음",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        resultType: { type: "string", example: "FAIL" },
                        error: {
                            type: "object",
                            properties: {
                                errorCode: { type: "string", example: "C001" },
                                reason: { type: "string", example: "Character not found" },
                                data: { 
                                    type: "object",
                                    example: {}
                                }
                            }
                        },
                        success: { type: "null", example: null }
                    }
                }
            }
        }
    }
    */
};
