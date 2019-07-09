import request from '../utils/request';
import { storeUtil, storageUser } from '../utils/storeUtil';

let baseUrl='http://10.16.2.223:8090';
let imgUrl='http://10.16.2.223:8082';

//新闻列表
function getNewsList(pagenum ){
    var url = baseUrl + '/document/getNewsList';

    var data = {"pageNum": pagenum,"pageSize": 10, cityCode: storageUser.cityCode };

    return request.post(url,data, function(res){

        res.list.map(function(val, i){

            if (!val.authorName) {
                val.authorName = '查社';
            }
        })
        return res;
    });
};
export default {
    getNewsList
}