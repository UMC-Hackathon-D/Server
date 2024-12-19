import { StatusCodes } from "http-status-codes";
import { getMissionDeadline } from "../services/mission.service.js`";
import { missionToServiceEntity } from "../dtos/mission.dtos.js";

export const handleGetMissionDeadline = async (req, res, next) => {
  console.log("미션 마감 시간 조회를 요청했습니다!");
  console.log("body: ", req.body);

  const { partyId, missionId } = req.params;
  const missionDeadline = await getMissionDeadline(
    partyId,
    missionId,
    missionToServiceEntity(req.body)
  );

  res.status(StatusCodes.OK).success(missionDeadline);
};
