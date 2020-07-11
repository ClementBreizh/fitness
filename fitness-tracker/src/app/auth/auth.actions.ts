import { Action } from "@ngrx/store";

export const SET_AUTH = '[Auth] Set Auth ';
export const SET_UNAUTH = '[Auth] Set UnAuth';

export class SetAuth implements Action {
    readonly type = SET_AUTH;
}

export class SetUnAuth implements Action {
    readonly type = SET_UNAUTH;
}

export type AuthAction = SetAuth | SetUnAuth;