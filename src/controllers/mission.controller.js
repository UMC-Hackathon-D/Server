import { StatusCodes } from "http-status-codes";
import { getUserOngoingMission } from "../services/mission.service.js";

export const handleGetMissionDeadline = async (req, res, next) => {
  console.log("미션 마감 시간 조회를 요청했습니다!");

  const { partyId, missionId } = req.params;
  const missionDeadline = await getMissionDeadline(partyId, missionId);

  res.status(StatusCodes.OK).success(missionDeadline);
};

export const handleGetUserOngoingMission = async (req, res, next) => {
  console.log("유저 진행 중 미션 조회를 요청했습니다!");

  const { partyId, userId } = req.params;
  const ongoingMission = await getUserOngoingMission(partyId, userId);

  res.status(StatusCodes.OK).success(ongoingMission);

  /* 
    #swagger.summary = 'Get User Ongoing Mission API'
    #swagger.tags = ['Mission']
    #swagger.description = 'Retrieves the ongoing mission for a specific user in a party. A user can only have one ongoing mission at a time.'
    
    #swagger.parameters['partyId'] = {
      in: 'path',
      description: 'ID of the party',
      required: true,
      type: 'integer'
    }
    
    #swagger.parameters['userId'] = {
      in: 'path',
      description: 'ID of the user',
      required: true,
      type: 'integer'
    }

    #swagger.responses[200] = {
      description: "Successfully retrieved user's ongoing mission",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "null", example: null },
              success: {
                type: "object",
                properties: {
                  userMissionId: { type: "integer", example: 1 },
                  missionId: { type: "integer", example: 123 },
                  missionName: { type: "string", example: "Secret Mission" },
                  missionContent: { type: "string", example: "Complete the task" },
                  missionUserId: { type: "integer", example: 456 },
                  targetUserId: { type: "integer", example: 789 },
                  status: { type: "string", example: "ONGOING" },
                  createdAt: { type: "string", format: "date-time" },
                  updatedAt: { type: "string", format: "date-time" }
                }
              }
            }
          }
        }
      }
    }

    #swagger.responses[404] = {
      description: "Mission not found for the user",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "M001" },
                  reason: { type: "string", example: "No mission found for this user" },
                  data: {
                    type: "object",
                    properties: {
                      userId: { type: "integer", example: 123 }
                    }
                  }
                }
              },
              success: { type: "null", example: null }
            }
          }
        }
      }
    }

    #swagger.responses[400] = {
      description: "Mission exists but not in ongoing status",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "M002" },
                  reason: { type: "string", example: "Mission exists but is not in ongoing status" },
                  data: {
                    type: "object",
                    properties: {
                      userId: { type: "integer", example: 123 },
                      missionId: { type: "integer", example: 456 },
                      currentStatus: { type: "string", example: "COMPLETED" }
                    }
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
