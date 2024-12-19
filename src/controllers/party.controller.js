import { StatusCodes } from "http-status-codes";
import { createPartyUser } from "../services/user.service.js";
import { partyCreate } from "../services/party.service.js";
import { userToServiceEntity } from "../dtos/user.dto.js";
import { createToParty } from "../dtos/party.dto.js";

export const handleCreatePartyUser = async (req, res, next) => {
  /* #swagger.summary = '그룹에 유저 등록하기 API'
     #swagger.tags = ['Party']
     #swagger.description = 'Creates a new user in an existing party if there is space available'
     
     #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    required: ["partyName", "name", "password"],
                    properties: {
                        partyName: { type: "string", example: "PartyOne" },
                        name: { type: "string", example: "PlayerOne" },
                        password: { type: "string", example: "partyPassword" }
                    }
                }
            }
        }
     }

     #swagger.responses[200] = {
        description: "Successfully created party user",
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
                                party: {
                                    type: "object",
                                    properties: {
                                        id: { type: "integer", example: 1 },
                                        name: { type: "string", example: "Party Name" },
                                        numMember: { type: "integer", example: 3 }
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

     #swagger.responses[400] = {
        description: "Party has reached maximum member limit",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        resultType: { type: "string", example: "FAIL" },
                        error: {
                            type: "object",
                            properties: {
                                errorCode: { type: "string", example: "P003" },
                                reason: { type: "string", example: "Party has reached maximum member limit" },
                                data: {
                                    type: "object",
                                    properties: {
                                        partyId: { type: "integer", example: 1 },
                                        currentMembers: { type: "integer", example: 6 },
                                        maxMembers: { type: "integer", example: 6 }
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

    #swagger.responses[401] = {
        description: "Invalid party password",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                resultType: { type: "string", example: "FAIL" },
                error: {
                  type: "object",
                  properties: {
                    errorCode: { type: "string", example: "P004" },
                    reason: { type: "string", example: "파티 비밀번호가 일치하지 않습니다" },
                    data: {
                      type: "object",
                      properties: {
                        partyId: { type: "integer", example: 1 },
                        inputPassword: { type: "string", example: "wrongpass"}
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

     #swagger.responses[404] = {
        description: "Party not found",
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
                                reason: { type: "string", example: "Requested party does not exists" },
                                data: {
                                    type: "object",
                                    properties: {
                                        partyId: { type: "integer", example: 999 }
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

     #swagger.responses[409] = {
        description: "Duplicate user name in party",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        resultType: { type: "string", example: "FAIL" },
                        error: {
                            type: "object",
                            properties: {
                                errorCode: { type: "string", example: "P002" },
                                reason: { type: "string", example: "This name is already taken in the party" },
                                data: {
                                    type: "object",
                                    properties: {
                                        partyId: { type: "integer", example: 1 },
                                        name: { type: "string", example: "PlayerOne" }
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
  console.log("파티 가입을 요청했습니다!");
  console.log("body: ", req.body);

  const user = await createPartyUser(userToServiceEntity(req.body));
  res.status(StatusCodes.OK).success(user);
};

//그룹(파티) 생성하기
export const handlerPartyCreate = async (req, res, next) => {
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
};
