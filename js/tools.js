	//计算元素的内部或者外部属性，若为内联属性则只需要使用elemen.name调用即可
	//obj为对象名不需要引号，name为属性名带引号，如getStyele(box,"width")
	function getStyle(obj,name)
			{
				
				if(window.getComputedStyle){
					//正常浏览器的方式，具有getComputedStyle()方法
					return getComputedStyle(obj , null)[name];
				}else{
					//IE8的方式，没有getComputedStyle()方法
					return obj.currentStyle[name];
				}
			}
	//目前仍然存在的问题，使用body作为对象时，IE无法显示为auto，无法计算具体数值	
	
	
	//尝试创建一个可以执行简单动画的函数
	/*
	 * 参数：
	 * 	obj:要执行动画的对象
	 * 	attr:要执行动画的样式，比如：left top width height
	 * 	target:执行动画的目标位置
	 * 	speed:移动的速度(正数向右移动，负数向左移动)
	 *  callback:回调函数，这个函数将会在动画执行完毕以后执行
	 */
	function move( obj, attr, target, speed, callback)
		{
			clearInterval(obj.timer);
			var current = parseInt(getStyle(obj,attr));//移动开始前
			if(current > target) speed = -speed;//确定移动的方向			
			obj.timer = setInterval(function(){
				var oldvalue = parseInt(getStyle(obj,attr));//移动中不停变化的value
				var newvalue = oldvalue + speed;
				if((speed < 0&&newvalue < target)||(speed > 0&&newvalue > target))
					{
						newvalue = target;
						//console.log(move);
					}
				obj.style[attr] = newvalue + "px";	
				if(newvalue == target)
				{
					clearInterval(obj.timer);
					callback();
				}
			} ,30 )
			

		}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	