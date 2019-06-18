import request from "./http"
var url1="/json1811.ashx"
class Apls {

  // 获取banner数据
  GetList(data) {
    return request({
      method: "get",
      url: url1,
      params: data
    })
  }

  // 获取图标,魔法猜心,品质甄选的数据
  GetIndexCakeList() {
    return request({
      method: "get",
      url: url1,
      params: {
        v: Number(new Date()),
        c: "Index",
        m: "GetIndexCakeList"
      }
    })
  }

  //  三张广告焦点图详情接口
  GetNSCakeByName(data) {
    return request({
      method: "get",
      url: url1,
      params: {
        Name: data.Name,
        c: "NsCakeCenter",
        m: "GetNSCakeByName",
        v: "1560225194548"
      }
    })
  }

  // 商品详情接口
  GetCakeByName(data) {
    return request({
      method: "get",
      url: url1,
      params: {
        City: "上海",
        ProName: data.ProName,
        c: "Product",
        m: "GetCakeByName",
        v: "1560236137480"
      }
    })
  }

  //分类数据接口
  GetJdListNew() {
    return request({
      method: "get",
      url: url1,
      params: {
        c: "NsCakeCenter",
        m: "GetJdListNew",
        v: "1560225194548"
      }
    })
  }

  GetjzCakeInfo(data){
    return request({
      method: "get",
      url: url1,
      params: {
        City: "上海",
        ProName: data.ProName,
        c: "IndexCenter",
        m: "GetjzCakeInfo",
        v: "1560236137480"
      }
    })
  }
  GetRuPCakeByName(data){
    return request({
      method: "get",
      url:url1,
      params: {
        Name: data.Name,
        c: "NsCakeCenter",
        m: "GetRuPCakeByName",
        v: "1560225194548"
      }
    })
  }


}

export default new Apls();
