import { StatusCodes } from "http-status-codes";
import { createPartyUser } from "../services/user.service.js";
import { userToServiceEntity } from "../dtos/user.dto.js";

export const handleCreatePartyUser = async (req, res, next) => {
  console.log("파티 가입을 요청했습니다!");
  console.log("body: ", req.body);

  const { partyId } = req.params;
  const user = await createPartyUser(partyId, userToServiceEntity(req.body));
  res.status(StatusCodes.OK).success(user);
};
