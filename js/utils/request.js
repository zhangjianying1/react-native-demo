import superagent from 'superagent';
import DeviceInfo from './device';
import { storageUser, storeUtil }  from './storeUtil';
import {
    Text,
    NetInfo,
    DeviceEventEmitter
} from 'react-native';

function post(url, sendData, transHandler) {

    let storageUserData = storageUser.getStroageUserData();
    DeviceEventEmitter.emit('loadingShow');

    return new Promise((resolve, reject) => {

        superagent
            .post(url)
            .set('deviceId', DeviceInfo.getUniqueID())
            .set('appid', DeviceInfo.getBundleId())
            .set('appVersion', DeviceInfo.getVersion())
            .set('userId', storageUserData.userId)
            .set('token', storageUserData.token)
            .set('resVersion', DeviceInfo.getVersion())
            .send(sendData || {}) // query string
            .end((err, res) => {
                DeviceEventEmitter.emit('loadingHide');
                if (res.status == 200) {

                    if (res.body.data) {

                        let resultData = res.body.data;

                        // 是登录的时候
                        if (resultData.token) {
                            storageUser.setStorageUserData(resultData);
                        }
                        if (transHandler) {
                            resultData = transHandler(resultData);
                        }
                        resolve(resultData);
                    } else {

                        if (res.body.err && res.body.err.code == '30005') {
                            storeUtil.saveData('USER', {});
                        }
                        reject(res.body.err)
                    }
                } else if (res.status == 404){
                    reject({code: '9999', msg: '地址是不是写错了'});
                } else {
                    console.log(res)
                    reject(res.err);
                }
            });
    })
}
function get(url, sendData) {
    let storageUserData = storageUser.getStroageUserData();

    return new Promise((resolve, reject) => {
        superagent
            .get(url)
            .set('deviceId', DeviceInfo.getUniqueID())
            .set('appid', DeviceInfo.getBundleId())
            .set('appVersion', DeviceInfo.getVersion())
            .set('userId', storageUserData.userId)
            .set('token', storageUserData.token)
            .set('resVersion', DeviceInfo.getVersion())
            .query(sendData || {}) // query string
            .end((err, res) => {

                if (err) return;
                if (res.status == 200) {

                    if (res.body.data) {
                        resolve(res.body.data);
                    } else {
                        if (res.body.err && res.body.err.code == '30005') {
                            storeUtil.saveData('USER', {});
                        }
                        reject(res.body.err)
                    }
                } else if (res.status == 404){
                    reject({code: '9999', msg: '地址是不是写错了'});
                }
            });
    })

}
export default {
    post,
    get
}
