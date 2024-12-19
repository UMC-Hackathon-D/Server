import { StatusCodes } from "http-status-codes";
import { createPartyUser } from "../services/user.service.js";
import { userToServiceEntity } from "../dtos/user.dto.js";

export const handleCreatePartyUser = async (req, res, next) => {
  /* #swagger.summary = 'Create new user in party API'
     #swagger.tags = ['Party']
     #swagger.description = 'Creates a new user in an existing party if there is space available'
     
     #swagger.parameters['partyId'] = {
        in: 'path',
        description: 'ID of the party to join',
        required: true,
        type: 'integer'
     }

     #swagger.parameters['characterId'] = {
        in: 'path',
        description: 'ID of the character to use',
        required: true,
        type: 'integer'
     }

     #swagger.parameters['name'] = {
        in: 'path',
        description: 'Name of the user in the party',
        required: true,
        type: 'string',
     }
     
     #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    required: ["name", "characterId"],
                    properties: {
                        name: { type: "string", example: "PlayerOne" },
                        characterId: { type: "integer", example: 1 }
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
                                characterId: { type: "integer", example: 1 },
                                partyId: { type: "integer", example: 1 },
                                character: {
                                    type: "object",
                                    properties: {
                                        id: { type: "integer", example: 1 },
                                        photo: { type: "string", example: "character1.jpg" }
                                    }
                                },
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

  const { partyId } = req.params;
  const user = await createPartyUser(partyId, userToServiceEntity(req.body));
  res.status(StatusCodes.OK).success(user);
};
