import request from '../utils/request';
import { storeUtil } from '../utils/storeUtil';

let _baseUrl='http://10.16.2.223:8090';
let _imgUrl='http://10.16.2.223:8082';
function toLogin(mobile, password){
    let url = 'http://10.16.2.223:8090/user/authCodeLogin';
    return request.post(url, {mobile: mobile, rcode: password}, function (res){

        res.headPath = _imgUrl + res.headPath;
        storeUtil.saveData('USER', res);
        return res;
    })

}
function getUserInfo(update) {
    let url = _baseUrl + '/user/queryUser';
    console.log(update, 'userInfo')
    if (update) {
        return new Promise((resolve, reject) => {
            request.post(url).then(res => {
                resolve(res);
                storeUtil.saveData('USER', res);
            }).catch(err => {
                reject(err);
            })
        })
    } else {
        return storeUtil.loadData('USER');

    }
}

/**
 * 获取社保卡和公积金卡数量
 * @returns {*}
 */
function getPersonInfo(update) {
    var url = _baseUrl + '/personCenter/getPersonInfo';

    return  new Promise( (resolve, reject) => {

        if (update) {
            request.get(url).then( res => {
                resolve(res);
            }).catch( err => {
                reject(err);
            });
        } else {
            storeUtil.loadData("PERSION").then( res => {
                resolve(res)
            }).catch( err => {
                request.get(url).then( res => {
                    console.log(res)
                    resolve(res);
                }).catch( err => {
                    reject(err);
                });
            })
        }
    })

};
export default {
    toLogin,
    getUserInfo,
    getPersonInfo
}