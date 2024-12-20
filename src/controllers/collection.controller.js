import {StatusCodes} from "http-status-codes";
import { partyCollections} from "../services/collection.service.js";
import {collectionToParty} from "../dtos/collection.dto.js";


//해당 그룹의 낭만모음집 조회
export const handlerGetCollection = async (req, res) => {
    const collections = await partyCollections(collectionToParty(req.params));
    res.status(StatusCodes.OK).success(collections);
    /*
  #swagger.summary = '낭만모음집 조회 API';
  #swagger.description = '특정 파티와 유저 ID를 기반으로 해당 유저의 미션 시작 시간과 관련된 정보를 가져옵니다.
  missionStartTime은 넘겨준 userId의 미션이 진행중일경우 미션 시작 시간을 넘겨줍니다.';
  #swagger.tags = ['collection']

  #swagger.parameters['partyId'] = {
    in: 'path',
    description: '파티 ID',
    required: true,
  }

  #swagger.parameters['userId'] = {
    in: 'path',
    description: '유저 ID',
    required: true,
  }

  #swagger.responses[200] = {
    description: "낭만모음집 조회 성공(유저ID의 미션이 진행중인 경우)",
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
                missionStartTime: { type: "string", format: "date-time", example: "2024-12-19 05:08:10.000000" },
                collection: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      CMId: { type: "number", example: 1 },
                      missionName: { type: "string", example: "코드 대신 짜주기" },
                      review: { type: "string", example: "너무 힘들다" },
                      fromUserName: { type: "string", example: "강림" },
                      targetUserName: { type: "string", example: "깡태" },
                      photo: { type: "string", example: "xxxxxxx.png" },
                      userCharacter: { type: "string", example: "xxxxxxx.png" },
                      createAt: { type: "string", format: "date-time", example: "2024-12-19 01:22:03.000000" }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  };
  #swagger.responses[201] = {
    description: "낭만모음집 조회 성공(유저ID의 미션이 완료된 경우)",
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
                missionStartTime: { type: "string", format: "date-time", example: null },
                collection: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      CMId: { type: "number", example: 1 },
                      missionName: { type: "string", example: "코드 대신 짜주기" },
                      review: { type: "string", example: "너무 힘들다" },
                      fromUserName: { type: "string", example: "강림" },
                      targetUserName: { type: "string", example: "깡태" },
                      photo: { type: "string", example: "xxxxxxx.png" },
                      userCharacter: { type: "string", example: "xxxxxxx.png" },
                      createAt: { type: "string", format: "date-time", example: "2024-12-19 01:22:03.000000" }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  };
  #swagger.responses[400] = {
  description: "낭만모음집 조회 실패",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          resultType: { type: "string", example: "FAIL" },
          error: {
            type: "object",
            properties: {
              errorCode: { type: "string", example: "CM001" },
              reason: { type: "string", example: "완료된 미션이 없습니다." },
              data: {
                type: "object",
                properties: {
                  missionStartTime: {
                    type: "string",
                    format: "date-time",
                    example: "2024-12-20T01:14:04.000Z"
                  },
                  partyName: { type: "string", example: "그루비룸" }
                }
              }
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

