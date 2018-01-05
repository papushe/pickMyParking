import {Profile} from "../../models/profile/profile.interface";


const userList: Profile[] = [
  {
    firstName:'Amit',
    lastName:'Shely',
    email:'papushe9@gmail.com',
    price:50,
    availability:'Each day from 9 in the morning to 17 in the evening',
    avatar:'assets/imgs/avatar_active.png',
    parkingPlace:"Afula, ישראל"
  },
  { firstName:'Moran',
    lastName:'Rubin',
    email:'moravru111@gmail.com',
    price:150,
    availability:'Each day from 9 in the morning to 17 in the evening',
    avatar:'assets/imgs/avatar_active.png',
    parkingPlace:"Tel-aviv, ישראל"
  },
  { firstName:'Shaked',
    lastName:'Shely',
    email:'shaked@gmail.com',
    price:70,
    availability:'Each day from 9 in the morning to 17 in the evening',
    avatar:'assets/imgs/avatar_active.png',
    parkingPlace:"Rehovot, ישראל"
  }
];

export const USER_LIST = userList;
