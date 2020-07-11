import { Action } from "@ngrx/store";
import { AuthAction, SET_AUTH, SET_UNAUTH } from "./auth.actions";


export interface State {
    isAuth: boolean;
}

const initState: State = {
    isAuth: false
};

export function authReducer(state = initState, action: AuthAction) {
    switch (action.type) {
        case SET_AUTH:
            return {
                isAuth: true
            };
        case SET_UNAUTH:
            return {
                isAuth: false
            };
        default:
            return state;
    }
}

export const getIsAuth = (state: State) => state.isAuth;