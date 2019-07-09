import Storage from 'react-native-storage'
import { AsyncStorage } from 'react-native';

var storage = new Storage({
    // 最大容量，默认值1000条数据循环存储
    size: 1000,

    // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
    // 如果不指定则数据只会保存在内存中，重启后即丢失
    storageBackend: AsyncStorage,

    // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
    defaultExpires: 1000 * 3600 * 24,

    // 读写时在内存中缓存数据。默认启用。
    enableCache: true,

})



class StorageUserData {
    constructor(props){
        //super(props);

        this.storageUserData = {};
    }
    setStorageUserData(data){
        this.storageUserData = data;
    }
    getStroageUserData(){
        return this.storageUserData;
    }
}

export const storageUser = new StorageUserData();
export const KEY = {
    WELCOME: {key: 'WELCOME', id: 999},
    USER: {key: 'USER', id: 1000},
    SECURITY: { key: 'SECURITY', id: 10001},
    PERSION: { key: 'PERSION', id: 10002}
}

export const storeUtil = {
    saveData: function(key, data){
        let result = Object.assign(KEY[key], {data: data});
        storage.save(result);
    },
    loadData: function(key){
        return storage.load(KEY[key])
    }
}
