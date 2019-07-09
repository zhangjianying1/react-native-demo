import request from '../utils/request';
import { storeUtil } from '../utils/storeUtil';

let baseUrl='http://10.16.2.223:8090';
let imgUrl='http://10.16.2.223:8082';

function getConsultList(pageNum, Status){
    var url = baseUrl + '/consultService/getConsultList';
    return request.post(url,{pageNum: pageNum, pageSize: 7, Status: Status});
};
function getConsultDetail(id){
    var url = baseUrl + '/consultService/getConsultDetail/'+id;
    return request.get(url);
};
export default {
    getConsultList,
    getConsultDetail
}