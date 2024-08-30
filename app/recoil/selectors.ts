import { selector } from "recoil";
import { countState, loginUid, themaSate, writeIconState  } from "./atom";

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

export const LoginState = selector({
    key:'loginState',
    get:({get})=>{
        const value = get(loginUid);
        return value;
    }
});

export const writePickState = selector({
    key:'writePickState',
    get:({get})=>{
        const value = get(writeIconState);
        return value;
    }
});
