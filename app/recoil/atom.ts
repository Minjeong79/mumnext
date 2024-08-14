import {atom} from 'recoil';

//강아지 선택
export const countState  = atom<any>({
    key:'countState ',
    default: null,
});
//테마 선택
export const themaSate = atom<any>({
    key : 'themaState',
    default:null,
});
//uid
 export const loginUid = atom<string>({
    key:'uid',
    default: "",
 });
//산책 아이콘
export const walkState = atom<any>({
    key:'walkIcon',
    default: null,
});

export const writeIconState =atom<string[]>({
    key:'writeicons',
    default:[],
});