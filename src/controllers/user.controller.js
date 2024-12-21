import { StatusCodes } from "http-status-codes";
import { userEnter, userRename, updateUseCharacter, deletePartyUser } from "../services/user.service.js";
import { bodyToRenameUser, bodyToUser } from "../dtos/user.dto.js";

// 그룹 재입장하기
export const handleUserEnter = async (req, res, next) => {
  console.log("그룹에 재입장을 요청하였습니다!");

  const user = await userEnter(
    bodyToUser(req.params.userName, req.params.partyName)
  );

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
  /*
  #swagger.summary = '사용자 닉네임 변경 API';
  #swagger.tags = ['User']
  #swagger.parameters['partyId'] = {
    in: 'path',
    description: '파티 아이디',
    required: true,
    schema: 1
  }
  #swagger.parameters['userId'] = {
    in: 'path',
    description: '유저 아이디',
    required: true,
    schema: 1
  }
  
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          required: ["userName"],
          properties: {
            userName: { type: "string", example: "예은" }
          }
        }
      }
    }
  }

  #swagger.responses[200] = {
    description: "사용자 닉네임 변경 성공 응답",
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
                id: { type: "number", example: 6 },
                partyId: { type: "string", example: "엔찌" },
                name: { type: "string", example: "새로운닉네임" },
                createdAt: { type: "string", format: "date-time", example: "2024-02-20T12:00:00Z" },
                updatedAt: { type: "string", format: "date-time", example: "2024-02-20T12:00:00Z" },
                characterId: { type: "number", example: 1 }
              }
            }
          }
        }
      }
    }
  };

  #swagger.responses[400] = {
    description: "사용자 닉네임 변경 실패 응답",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "U002" },
                reason: { type: "string", example: "그룹 내 동일한 닉네임이 있습니다." }
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
export const handleUpdateUserCharacter = async (req, res, next) => {
  console.log("유저의 캐릭터 선택을 요청했습니다!");
  console.log("params: ", req.params);
  console.log("body: ", req.body);

  const { partyId, userId } = req.params;
  const { characterId } = req.body;

  const updatedUser = await updateUseCharacter(
    parseInt(partyId),
    parseInt(userId),
    parseInt(characterId)
  );

  res.status(StatusCodes.OK).success(updatedUser);

  /* 
  #swagger.summary = 'Update User Character'
  #swagger.tags = ['User']
  #swagger.description = 'Update user character id if character exists'

  #swagger.parameters['partyId'] = {
    in: 'path',
    description: 'Party Id',
    required: true,
    type: 'integer'
  }

  #swagger.parameters['userId'] = {
    in: 'path',
    description: 'User Id',
    required: true,
    type: 'integer'
  }
     
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          required: ["characterId"],
          properties: {
            characterId: { type: "number", example: 1 }
          }
        }
      }
    }
  }

  #swagger.responses[200] = {
    description: "Successfully updated party user character",
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
                name: { type: "string", example: "PlayerOne" },
                partyId: { type: "integer", example: 1 },
                characterId: { type: "integer", example: 1 },
                character: {
                  type: "object",
                  properties: {
                    id: { type: "integer", example: 1 },
                    photo: { type: "string", example: "character1.jpg" }
                  }
                },
                createdAt: { type: "string", format: "date-time", example: "2024-02-20T12:00:00Z" },
                updatedAt: { type: "string", format: "date-time", example: "2024-02-20T12:00:00Z" }
              }
            }
          }
        }
      }
    }
  }

  #swagger.responses[404] = {
    description: "Cannot Find Existing Character",
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
                reason: { type: "string", example: "Character Not Found" },
                data: { type: "object" }
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

export const handleUserDelete = async(req,res,next) =>{
  console.log("사용자 삭제를 요청하였습니다.");

  const delUser = await deletePartyUser(req.params.userId);
  
  res.status(StatusCodes.OK).success(delUser);
  /* 
  #swagger.summary = '사용자 삭제 요청'
  #swagger.tags = ['User']
  #swagger.description = '그룹 내 사용자 삭제 요청'

  #swagger.parameters['partyId'] = {
    in: 'path',
    description: 'Party Id',
    required: true,
    type: 'integer'
  }

  #swagger.parameters['userId'] = {
    in: 'path',
    description: 'User Id',
    required: true,
    type: 'integer'
  }

  #swagger.responses[200] = {
  description: "사용자 삭제 성공",
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
              id: { type: "integer", example: 3 },
              name: { type: "string", example: "옌찌" },
              partyId: { type: "integer", nullable: true, example: null },
              characterId: { type: "integer", nullable: true, example: null },
              character: { type: "object", nullable: true, example: null },
              party: { type: "object", nullable: true, example: null },
              createAt: { type: "string", nullable: true, format: "date-time", example: null },
              updateAt: { type: "string", format: "date-time", example: "2024-12-22T00:28:16.559Z" }
            }
          }
        }
      }
    }
  }
*/
}

