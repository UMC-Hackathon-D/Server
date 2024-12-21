import { StatusCodes } from "http-status-codes";
import {
  getUserOngoingMission,
  getAvailableTargetUsers,
  getRandomMissions,
  createUserMission,
  getMissionPreview,
  updateExpiredMissions,
  submitMissionCompletion,
} from "../services/mission.service.js";
import { missionCompletionRequestToDTO } from "../dtos/mission.dto.js";

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
                oneOf: [
                  {
                    type: "object",
                    properties: {
                      userMissionId: { type: "integer", example: 1 },
                      missionId: { type: "integer", example: 123 },
                      missionName: { type: "string", example: "비밀 미션" },
                      missionContent: { type: "string", example: "미션 내용" },
                      missionUserId: { type: "integer", example: 456 },
                      targetUserId: { type: "integer", example: 789 },
                      status: { type: "string", example: "in_progress" },
                      createdAt: { type: "string", format: "date-time" },
                      updatedAt: { type: "string", format: "date-time" }
                    }
                  },
                  {
                    type: "null",
                    description: "No in progress mission yet"
                  }
                ]
              }
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

export const handleGetAvailableTargetUsers = async (req, res, next) => {
  console.log("미션 대상자 조회를 요청했습니다!");

  const { partyId, userId } = req.params;

  const availableTargetUsers = await getAvailableTargetUsers(
    parseInt(partyId),
    parseInt(userId)
  );

  res.status(StatusCodes.OK).success(availableTargetUsers);

  /* 
    #swagger.summary = '미션 대상자 조회 API'
    #swagger.tags = ['Mission']
    #swagger.description = '그룹 내에서 미션을 수행할 수 있는 대상자 목록을 조회합니다. 자기 자신과 이미 미션 대상으로 지정된 사용자는 제외됩니다.'
    
    #swagger.parameters['partyId'] = {
      in: 'path',
      description: '파티 ID',
      required: true,
      type: 'integer'
    }
    
    #swagger.parameters['userId'] = {
      in: 'path',
      description: '요청한 사용자 ID',
      required: true,
      type: 'integer'
    }

    #swagger.responses[200] = {
      description: "Available target users retrieved successfully",
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
                    name: { type: "string", example: "유저1" },
                    characterId: { type: "integer", example: 2 },
                    character: {
                      type: "object",
                      properties: {
                        id: { type: "integer", example: 2 },
                        photo: { type: "string", example: "character2.jpg" }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    #swagger.responses[404] = {
      description: "Party not found or no available users",
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
                  reason: { type: "string", example: "No available target users found" },
                  data: {
                    type: "object",
                    properties: {
                      partyId: { type: "integer", example: 1 },
                      userId: { type: "integer", example: 2 }
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

export const handleGetRandomMissions = async (req, res, next) => {
  console.log("랜덤 미션 내용 조회를 요청했습니다!");

  const randomMissions = await getRandomMissions();
  res.status(StatusCodes.OK).success(randomMissions);

  /* 
    #swagger.summary = '랜덤 미션 조회 API'
    #swagger.tags = ['Mission']
    #swagger.description = '미션 목록에서 무작위로 3개의 미션을 조회합니다.'
    
    #swagger.responses[200] = {
      description: "랜덤 미션 조회 성공",
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
                    missionName: { type: "string", example: "비밀 미션" },
                    missionContent: { type: "string", example: "팀원에게 격려의 메시지 보내기" }
                  }
                }
              }
            }
          }
        }
      }
    }

    #swagger.responses[404] = {
      description: "미션을 찾을 수 없음",
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
                  reason: { type: "string", example: "No missions found" }
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

export const handleCreateUserMission = async (req, res, next) => {
  console.log("유저 미션 등록을 요청했습니다!");
  console.log("params: ", req.params);
  console.log("body: ", req.body);

  const { partyId, userId } = req.params;
  const { missionId, targetUserId } = req.body;

  const userMission = await createUserMission({
    partyId: parseInt(partyId),
    userId: parseInt(userId),
    missionId: parseInt(missionId),
    targetUserId: parseInt(targetUserId),
  });

  res.status(StatusCodes.OK).success(userMission);

  /* 
    #swagger.summary = '유저 미션 등록 API'
    #swagger.tags = ['Mission']
    #swagger.description = '특정 유저에게 미션을 할당합니다.'
    
    #swagger.parameters['partyId'] = {
      in: 'path',
      description: '파티 ID',
      required: true,
      type: 'integer'
    }
    
    #swagger.parameters['userId'] = {
      in: 'path',
      description: '미션을 수행할 유저 ID',
      required: true,
      type: 'integer'
    }

    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["missionId", "targetUserId"],
            properties: {
              missionId: { type: "integer", description: "할당할 미션 ID" },
              targetUserId: { type: "integer", description: "미션 대상 유저 ID" }
            }
          }
        }
      }
    }

    #swagger.responses[201] = {
      description: "미션 등록 성공",
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
                  id: { type: "integer", example: 1 },
                  missionId: { type: "integer", example: 1 },
                  missionUserId: { type: "integer", example: 2 },
                  targetUserId: { type: "integer", example: 3 },
                  status: { type: "string", example: "in_progress" },
                  createdAt: { type: "string", format: "date-time" },
                  updatedAt: { type: "string", format: "date-time" }
                }
              }
            }
          }
        }
      }
    }

    #swagger.responses[400] = {
      description: "유저가 이미 진행 중인 미션이 있는 경우",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "M003" },
                  reason: { type: "string", example: "User already has an ongoing mission" },
                  data: {
                    type: "object",
                    properties: {
                      userId: { type: "integer", example: 123 },
                      existingMissionId: { type: "integer", example: 456 }
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

export const handleGetMissionPreview = async (req, res, next) => {
  console.log("미션 미리보기 조회를 요청했습니다!");
  console.log("query params: ", req.query);

  const { missionId, targetUserId } = req.query;

  const preview = await getMissionPreview({
    missionId: parseInt(missionId),
    targetUserId: parseInt(targetUserId),
  });

  res.status(StatusCodes.OK).success(preview);

  /* 
    #swagger.summary = '미션 미리보기 조회 API'
    #swagger.tags = ['Mission']
    #swagger.description = '선택한 미션과 대상 유저에 대한 미리보기 메시지를 조회합니다.'
    
    #swagger.parameters['missionId'] = {
      in: 'query',
      description: '미션 ID',
      required: true,
      type: 'integer'
    }
    
    #swagger.parameters['targetUserId'] = {
      in: 'query',
      description: '대상 유저 ID',
      required: true,
      type: 'integer'
    }

    #swagger.responses[200] = {
      description: "미션 미리보기 조회 성공",
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
                  previewMessage: { 
                    type: "array",
                    items: {
                      type: "string"
                    },
                    example: [
                      "오늘의 미션은",
                      "홍길동(이)에게 격려의 메시지 보내기 입니다!",
                      "그럼 파이팅 :)"
                    ]
                  }
                }
              }
            }
          }
        }
      }
    }
    
    #swagger.responses[404] = {
      description: "미션 또는 유저를 찾을 수 없음",
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
                  reason: { type: "string", example: "미션을 찾을 수 없습니다" },
                  data: {
                    type: "object",
                    properties: {
                      missionId: { type: "integer", example: 999 }
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

export const handleSubmitMissionCompletion = async (req, res, next) => {
  console.log("미션 인증 등록을 요청했습니다!");
  console.log("params: ", req.params);
  console.log("body: ", req.body);
  console.log("files", req.file);

  const missionData = {
    ...req.params,
    photo: req.file?.location, // S3에 업로드된 파일의 URL
    review: req.body.review,
  };
  const completedMission = await submitMissionCompletion(
    missionCompletionRequestToDTO(req.params, missionData)
  );

  res.status(StatusCodes.OK).success(completedMission);

  /* 
    #swagger.summary = '미션 완료 인증 API'
    #swagger.tags = ['Mission']
    #swagger.description = '미션 완료를 인증하고 완료 상태로 변경합니다.'
    
    #swagger.parameters['partyId'] = {
      in: 'path',
      description: '파티 ID',
      required: true,
      type: 'integer'
    }
    
    #swagger.parameters['userId'] = {
      in: 'path',
      description: '유저 ID',
      required: true,
      type: 'integer'
    }

    #swagger.parameters['userMissionId'] = {
      in: 'path',
      description: '유저 미션 ID',
      required: true,
      type: 'integer'
    }

        #swagger.requestBody = {
      required: true,
      content: {
        "multipart/form-data": {
          schema: {
            type: "object",
            required: ["image", "review"],
            properties: {
              image: {
                type: "string",
                format: "binary",
                description: "미션 완료 인증 사진 파일"
              },
              review: {
                type: "string",
                description: "미션 완료 후기"
              }
            }
          }
        }
      }
    }

    #swagger.responses[200] = {
      description: "미션 완료 인증 성공",
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
                  id: { type: "integer", example: 1 },
                  userMissionId: { type: "integer", example: 1 },
                  photo: { type: "string", example: "photo_url.jpg" },
                  review: { type: "string", example: "미션 후기입니다." },
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
      description: "미션을 찾을 수 없음",
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
                  reason: { type: "string", example: "Mission not found" },
                  data: {
                    type: "object",
                    properties: {
                      userId: { type: "integer", example: 1 },
                      userMissionId: { type: "integer", example: 1 }
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

export const handleManualMissionStatusUpdate = async (req, res, next) => {
  console.log("미션 상태 수정(in progress -> failed) 을 직접 요청했습니다!");

  const result = await updateExpiredMissions();
  res.status(StatusCodes.OK).success(result);

  /* 
    #swagger.summary = 'Mission Status Update API'
    #swagger.tags = ['Mission']
    #swagger.description = 'Manually triggers the update of in-progress missions to failed status. This endpoint is for testing purposes.'
    
    #swagger.responses[200] = {
      description: "Successfully updated mission statuses",
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
                  count: { 
                    type: "integer", 
                    description: "Number of missions updated",
                    example: 5 
                  }
                }
              }
            }
          }
        }
      }
    }
  */
};
