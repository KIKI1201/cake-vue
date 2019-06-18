export default (Vue)=>{
  //设置全局过滤器
	Vue.filter('textLengthSet', function(value,max) {
		  if (!value) return ''
		  if (!max) return value;
		  if (value.length <= max) return value;
		  if(value.length>max){
		  	value = value.substr(0, max);
		  	return value+"...";
		  }
	});
	Vue.filter('strSub', function(value,end) {
		return value.substring(0,end);
	});
  Vue.filter('priceFilter', function(value,aa) {
    return aa+value.toFixed(2);
  });
}
