
import { SUCRITY, USER } from '../actions/actions';

export const securityData = (state = {}, action) => {
    switch (action.type) {
        case SUCRITY:
            return action.data;

        default:
        return state;
    }
}

export const userData = (state = {}, action) => {

    switch (action.type) {
        case USER:
            if (!action.data) return {};

            return  action.data;
        default:
        return state;
    }
}

