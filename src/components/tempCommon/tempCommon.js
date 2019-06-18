
import { TabContainer, TabContainerItem } from 'mint-ui';
import { Tabbar, TabItem } from 'mint-ui';
import { Popup } from 'mint-ui';
import { Swipe, SwipeItem } from 'mint-ui';
import price from "./price-description"



export default (Vue)=>{
	// console.log(Vue);
	// 定义全局组件
	Vue.component("test",{
		template:"<h1>hello Vue</h1>"
	});
	Vue.component("priceDescription",price);
  //引入底部tabbar
  Vue.component(TabContainer.name, TabContainer);
  Vue.component(TabContainerItem.name, TabContainerItem);

  Vue.component(Tabbar.name, Tabbar);
  Vue.component(TabItem.name, TabItem);
  //引入弹框
  Vue.component(Popup.name, Popup);
  //引入轮播图
  Vue.component(Swipe.name, Swipe);
  Vue.component(SwipeItem.name, SwipeItem);

}
