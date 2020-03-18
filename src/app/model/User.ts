import { AppCommon } from './AppCommon';

export interface IUser{
    userName: string,
    userNameValid: boolean,
    authencticationStatus: boolean,
    commonResponse : AppCommon
}