import {MESSAGE} from "../../models/messages/message.interface";
import {USER_LIST} from "../profiles/profiles";

const userList = USER_LIST;
const messageList:MESSAGE[] = [];

userList.forEach((user)=>{
  messageList.push({user:user,date:new Date(), lastMessage:'Hello every one'})
});

export const MESSAGE_LIST = messageList;
