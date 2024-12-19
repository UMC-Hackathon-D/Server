import {responseFromUser} from "../dtos/user.dto.js";
import { getUser } from "../repositories/user.repository.js";

export const userEnter = async (data) => {
    
    const user = await getUser(data.user_name, data.party_name);
    
    return responseFromUser(user);
  };