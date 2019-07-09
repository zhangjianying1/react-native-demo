import request from '../utils/request';
import { storeUtil } from '../utils/storeUtil';
let baseUrl = 'http://10.16.2.223:8090';

function getNewSpecial(){
    let url = baseUrl + '/document/getNewestSpecial';
    return request.get(url)

}

//查询社保卡基本信息
function getSecInfo(securityId, update){
    let url = baseUrl + '/security/getSecInfo';

    return new Promise((resolve, reject) => {
        if (update) {
            request.post(url, { securityAcctId: securityId }).then( res  => {
                resolve(res);
                storeUtil.saveData('SECURITY', res);
            }, err => {
                reject(err);
            });
        } else {
            storeUtil.loadData('SECURITY').then((res) => {
                resolve(res);
            }).catch( err => {
                request.post(url, { securityAcctId: securityId }).then( res  => {
                    resolve(res);
                    storeUtil.saveData('SECURITY', res);
                }, err => {
                    reject(err);
                });

            })
        }


    })

};

//查询绑定社保卡列表
function getSecList(){
    var url = baseUrl + '/security/getSecList';
    return request.post(url);
};

//卡片解绑
function removeSecurity(accountId) {
    var url = baseUrl + '/grab/unbunding';
    return request.post(url,{cardType:"0",accountId: accountId});
};
//切换默认账户
function changeDefaultAccount(accountId) {
    var url = baseUrl + '/grab/changeDefaultAccount';
    return request.post(url,{cardType:"0",accountId: accountId});
};
export default{
    getNewSpecial,
    getSecInfo,
    getSecList,
    removeSecurity,
    changeDefaultAccount
}