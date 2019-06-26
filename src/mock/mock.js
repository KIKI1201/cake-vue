import axios from 'axios'
import MockAdapter from 'axios-mock-adapter';
import {userList} from './data/userList'


// var mock = new MockAdapter(axiosInstance,);
let mock=new MockAdapter(axios, { delayResponse: 1000 });
// 注册接口
mock.onPost("/register").reply((config)=>{
    // console.log(config.data);
    var reqdata=JSON.parse(config.data).data;
    // console.log();
    userList.push(reqdata)
    // console.log(userList);
    // console.log(reqdata);
    //  [http状态,{参数}];
    return [200,{msg:'注册成功',code:1,reqdata}];
});


// 登陆接口
mock.onPost('/login').reply(config => {
    var reqdata=JSON.parse(config.data).data;

    for(var i=0;i<userList.length;i++){
        if(userList[i].username==reqdata.uname){
            if(userList[i].password==reqdata.upwd){
                return [200,{ code: 1,data:userList[i],msg:"登陆成功"}];
            }else{
                return [200,{ code: 2,msg:"密码错误"}];
            }
        }
    }

    return [200,{ code: 0,msg:"账号不存在"}];
});








export default axios;
