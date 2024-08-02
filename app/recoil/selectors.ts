import { selector } from "recoil";
import { countState  } from "./atom";

export const dogSelectState = selector({
    key:'dogSelectState',
    get: ({get}) =>{
        const img = get(countState );
        return img
    },
});









