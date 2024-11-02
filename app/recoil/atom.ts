import { atom } from "recoil";

//강아지 선택
export const countState = atom<any>({
  key: "countState ",
  default: 0,
});
//테마 선택
export const themaSate = atom<any>({
  key: "themaState",
  default: 0,
});
//uid
export const loginUid = atom({
  key: "uid",
  default: {
    uid: "",
    fullName: "",
  },
});
//글 작성 아이콘 이미지
export const writeIconState = atom<string[]>({
  key: "writeicons",
  default: [],
});
