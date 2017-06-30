# jquery-slider
在线显示地址  http://www.daiwei.org/components/jquery-slider/

### 参数
<pre>
width: 			        1200, 					// 幻灯片的宽度
height:     	                500, 					// 幻灯片的高度
activeIndex: 			0, 			                // 默认显示的幻灯片索引
speed: 				800, 					// 幻灯片的切换时间
durantion:  			3000, 					// 幻灯片的显示时间
showSlider: 			true, 					// 是否显示幻灯片左右按钮
showOrigin: 			true, 					// 是否显示底部的索引状态
originType: 			'circle', 				// circle的话  底部的active状态就是元 的 ,不写或者不是'circle'则是非圆形状态
originPosition: 		'right', 				// 底部小圆点显示的位置    'center'  'right'
backgroundSize: 		'cover', 				// backgournd-size效果
backgourndPosition: 	       'center center', 		        // backgournd-position效果
selectLeftClassName: 	        'dw-icon-left', 		        // 点击左边的按钮  显示class的名称
selectRightClassName: 	        'dw-icon-right', 		        // 点击右边的按钮  显示class的名称
source: [
  {
    src: 'img/slider1.jpg',			         // 幻灯片图片地址		
    hasHref: true,			                // 是否有链接
    href: 'https://github.com/IFmiss/jquery-slider',	// 链接地址					
    hrefTarget: '_self'			        	// 链接打开方式  _self, _blank, _top等
  },
  {
    src: 'img/slider2.jpg',
    hasHref: false,
    hrefTarget: '_self',
  },
  {
    src: 'img/slider3.jpg',
    hasHref: false,
    hrefTarget: '_self',
    },
    {
      src: 'img/slider4.jpg',
      hasHref: true,
      href: 'https://github.com/IFmiss/jquery-slider',
      hrefTarget: '_self'
    }
  ]
<pre>
一款基于jquery的幻灯片组件

<code>
$('.testSlider1').slider({
  width:300,
  height:300,
  showSlider: false,
  showOrigin: false,
  originPosition:'center'
});
</code>
