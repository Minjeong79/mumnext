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
export const loginUid = atom({
    key:'user',
    default: {
        uid:'',
        fullName:''
    },
 });
//글 작성 아이콘 이미지
export const writeIconState =atom<string[]>({
    key:'writeicons',
    default:[],
});