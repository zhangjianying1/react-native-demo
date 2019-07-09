import { storageUser } from '../utils/storeUtil';
export const SUCRITY = 'SUCRITY';
export const USER = 'USER';

export const setSecurityData = (data) => {
    return {
        type: SUCRITY,
        data
    }
}

export const setUserData = (data) => {
    storageUser.setStorageUserData(data);
    return {
        type: USER,
        data
    }
}

