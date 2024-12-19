import { StatusCodes } from "http-status-codes";
import { userEnter } from "../services/user.service.js";
import { bodyToUser } from "../dtos/user.dto.js";

export const handleUserEnter = async (req, res, next) => {
    console.log("그룹에 재입장을 요청하였습니다!");
    
    const user = await userEnter(bodyToUser(req.params.userName, req.params.partyName));
  
    console.log(user);
    res.status(StatusCodes.OK).success(user);
  };