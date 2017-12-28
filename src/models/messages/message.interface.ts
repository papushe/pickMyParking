import {USER} from "../user/user.interface";

export interface MESSAGE {
  user: USER;
  date:Date;
  lastMessage:string;
}
