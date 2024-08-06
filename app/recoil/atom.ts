import {atom} from 'recoil';

export const countState  = atom<any>({
    key:'countState ',
    default: null,
});

export const themaSate = atom<any>({
    key : 'themaState',
    default:null,
});

 export const loginUid = atom<string>({
    key:'uid',
    default: "",
 });