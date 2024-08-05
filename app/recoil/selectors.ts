import { selector } from "recoil";
import { countState, themaSate  } from "./atom";

export const dogSelectState = selector({
    key:'dogSelectState',
    get: ({get}) =>{
        const value = get(countState );
        return `dog${value}`
    },
});

export const themaSelectState = selector({
    key:'themaSelectState',
    get:({get})=>{
        const value = get(themaSate);
        return `thema${value}`
    },
});









