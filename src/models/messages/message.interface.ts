import {Profile} from "../profile/profile.interface";

export interface MESSAGE {
  user: Profile;
  date:Date;
  lastMessage:string;
}
