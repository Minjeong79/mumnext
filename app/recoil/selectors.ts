import { selector } from "recoil";
import { dogThemaSelect } from "./atom";

export const dogSelectState = selector({
    key:'dogSelectState',
    get: ({get}) =>{
        const imgList = get(dogThemaSelect);
        return imgList
    },
});









