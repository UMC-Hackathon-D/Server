import schedule from "node-schedule";
import moment from "moment-timezone";
import { updateExpiredMissions } from "../services/mission.service.js";

export const scheduleMissionStatusUpdate = () => {
  const rule = new schedule.RecurrenceRule();
  rule.hour = 0;
  rule.minute = 0;
  rule.tz = "Asia/Seoul";

  schedule.scheduleJob(rule, async () => {
    console.log(
      `Running scheduled mission status update at ${moment()
        .tz("Asia/Seoul")
        .format()}`
    );
    try {
      await updateExpiredMissions();
      console.log("Successfully updated expired missions");
    } catch (error) {
      console.error("Failed to update expired missions:", error);
    }
  });
};
