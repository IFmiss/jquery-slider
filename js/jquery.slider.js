(function($){
	$.fn.slider = function (options) {
		var $this = $(this);
		var _this = this;
		return this.each (function(){
			var defaultValue = {
				width: 					1200, 					// 幻灯片的宽度
				height:     			500, 					// 幻灯片的高度
				activeIndex: 			0, 						// 默认显示的幻灯片索引
				speed: 					500, 					// 幻灯片的切换时间
				durantion:  			3000, 					// 幻灯片的显示时间
				showSlider: 			true, 					// 是否显示幻灯片左右按钮
				showOrigin: 			true, 					// 是否显示底部的索引状态
				originType: 			'circle', 				// circle的话  底部的active状态就是元 的 ,不写或者不是'circle'则是非圆形状态
				originPosition: 		'right', 				// 底部小圆点显示的位置    'center'  'right'
				backgroundSize: 		'cover', 				// backgournd-size效果
				backgourndPosition: 	'center center', 		// backgournd-position效果
				selectLeftClassName: 	'dw-icon-left', 		// 点击左边的按钮  显示class的名称
				selectRightClassName: 	'dw-icon-right', 		// 点击右边的按钮  显示class的名称
				source: [
							{
								src: 'img/slider1.jpg',									// 幻灯片图片地址		
								hasHref: true,												// 是否有链接
								href: 'https://github.com/IFmiss/jquery-slider',			// 链接地址					
								hrefTarget: '_self'											// 链接打开方式  _self, _blank, _top等
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
			}

			var opt = $.extend(defaultValue, options || {});
			
			var currentIndex = 0; 		// 这是随机变化的索引 和插件的索引有区别的
			var t ;						// 这是自动播放的 t
			var canChange = true;		// 是否可以改变幻灯片    用于解决连续点击上一页下一页抖动问题

			defaultValue.init = function() {
				_this.cpt_slider = $('<div class="cpt-slider">').css({
					width:opt.width,
					height:opt.height
				}).appendTo($this);
				_this.ul_slider = $('<ul class="ul-slider">').appendTo(_this.cpt_slider);
				for (var i = 0 ; i < opt.source.length;i++){
					// _this.li_slider = $('li_slider')
					if(opt.source[i].hasHref){
						_this.li_slider = $('<li class="li-slider" style="width:'+opt.width+'px;height:'+opt.height+'px;background: url('+opt.source[i].src+');background-size: '+opt.backgroundSize+';background-position:'+opt.backgourndPosition+'"><a class="href-slider" href="'+opt.source[i].href+'" target="'+opt.source[i].hrefTarget+'"></a></li>').appendTo(_this.ul_slider);
					}else{
						_this.li_slider = $('<li class="li-slider" style="width:'+opt.width+'px;height:'+opt.height+'px;background: url('+opt.source[i].src+');background-size: '+opt.backgroundSize+';background-position:'+opt.backgourndPosition+'"></div>').appendTo(_this.ul_slider);
					}
				}
				if(opt.showSlider){
					_this.left_select = $('<div class="slider-selelct left"><i class="'+opt.selectLeftClassName+'"></i></div>').appendTo(_this.cpt_slider);
					_this.right_select = $('<div class="slider-selelct right"><i class="'+opt.selectRightClassName+'"></i></div>').appendTo(_this.cpt_slider);
				}
				if(opt.showOrigin){
					if(opt.originPosition === 'center') _this.slider_origin = $('<span class="slider-origin"></span>').css({left:'50%',transform:'translate(-50%,0)','-webkit-transform':'translate(-50%,0)','-moz-transform':'translate(-50%,0)'}).appendTo(_this.cpt_slider);
					if(opt.originPosition === 'right') _this.slider_origin = $('<span class="slider-origin"></span>').css({right:'20px',transform:'translate(0,0)','-webkit-transform':'translate(0,0)','-moz-transform':'translate(0,0)'}).appendTo(_this.cpt_slider);
					for(var i = 0;i< opt.source.length;i++){
						_this.span_origin = opt.activeIndex === i ? $('<span class="span-origin active '+opt.originType+'"></span>') : $('<span class="span-origin '+opt.originType+'"></span>')
						_this.span_origin.appendTo(_this.slider_origin)
					}
				}
				$('.span-origin.active').css({background:opt.originColor});
				defaultValue.editView();
			}

			defaultValue.editView = function() {
				// 为了保证图片平滑滚动  最后一张和第一张的联系  在原来的基础上再加一个li_slder，但不会被计入索引
				var firstli_slder = _this.ul_slider.find('li:first').prop("outerHTML");
				$(firstli_slder).appendTo(_this.ul_slider);
				var length = _this.ul_slider.children().length;
				_this.ul_slider.css({
					width: length * opt.width
				})
				defaultValue.autoPlay();
				defaultValue.event();
			}

			defaultValue.autoPlay = function () {
				var length = _this.ul_slider.children().length;
				t = setInterval(function (){
					currentIndex ++;
					if(currentIndex >= length) {
						// currentIndex = 0
						_this.ul_slider.css('left',0)
						currentIndex = 1
					}
					defaultValue.setOriginState(currentIndex);
					_this.ul_slider.stop().animate({'left': - opt.width * currentIndex},opt.speed)
				}, opt.durantion)
			}

			defaultValue.event = function() {
				_this.cpt_slider.hover(function(){
					clearInterval(t);
					if(opt.showSlider){
						_this.left_select.stop().fadeIn();
						_this.right_select.stop().fadeIn();
					}
				},function(){
					if(opt.showSlider){
						_this.left_select.stop().fadeOut();
						_this.right_select.stop().fadeOut();
					}
					defaultValue.autoPlay();
				});

				if(opt.showOrigin){
					_this.left_select.on('click',function(){
						if(canChange){
							defaultValue.prevPage();
						}else{
							return
						}
					})

					_this.right_select.on('click',function(){
						if(canChange){
							defaultValue.nextPage();
						}else{
							return
						}
					})

					_this.slider_origin.children().hover(function(){
						var index = $(this).index();
						currentIndex = index;
						defaultValue.indexPage (index);
					});
				}

			}

			defaultValue.indexPage = function(index) {
				var length = _this.ul_slider.children().length;
				defaultValue.setOriginState(index);
				_this.ul_slider.stop().animate({'left': - index * opt.width},opt.speed)
			}

			defaultValue.prevPage = function(){
				canChange = false;
				var length = _this.ul_slider.children().length;
				currentIndex --;
				if(currentIndex < 0) {
					// currentIndex = 0
					_this.ul_slider.css('left',  - opt.width * (length - 1) )
					currentIndex = length - 2
				}
				defaultValue.setOriginState(currentIndex);
				_this.ul_slider.stop().animate({'left': - currentIndex * opt.width},opt.speed,'linear',function(){
					canChange = true
				})
			}

			defaultValue.nextPage = function(){
				canChange = false;
				var length = _this.ul_slider.children().length;
				currentIndex ++;
				if(currentIndex >= length) {
					// currentIndex = 0
					_this.ul_slider.css('left',0)
					currentIndex = 1
				}
				defaultValue.setOriginState(currentIndex);
				_this.ul_slider.stop().animate({'left': - opt.width * currentIndex},opt.speed,'linear',function(){
					canChange = true
				})
			}

			//设置底部索引的状态  不管是在点击还是自动播放
			defaultValue.setOriginState = function (index) {
				var length = _this.ul_slider.children().length;
				if(opt.showOrigin){
					if(index === length - 1){
						_this.slider_origin.children().eq(0).addClass('active').stop().siblings().removeClass('active');
					}else{
						_this.slider_origin.children().eq(index).addClass('active').stop().siblings().removeClass('active');
					}
				}
			}

			defaultValue.init();
		})
	}
})(jQuery)