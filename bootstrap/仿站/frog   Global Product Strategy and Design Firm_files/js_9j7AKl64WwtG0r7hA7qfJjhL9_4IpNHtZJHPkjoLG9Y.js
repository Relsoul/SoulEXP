/* global namespacing of object */
window.App = window.App || {};

(function ($) {
    Drupal.frogweb6 = {};
    Drupal.frogweb6.autoAttach = function () {

        var isTouch = ($('html').hasClass('touch') ? true : false);

        adjustMask();

        function adjustMask(){
            $('.nav-mask').width($('.container').offset().left);
        }

        jQuery.cachedScript = function( url, options ) {

          // Allow user to set any option except for dataType, cache, and url
          options = $.extend( options || {}, {
            dataType: "script",
            cache: true,
            url: url
          });

          // Use $.ajax() since it is more flexible than $.getScript
          // Return the jqXHR object so we can chain callbacks
          return jQuery.ajax( options );
        };

        if ($('html').attr('lang') == 'zh-hans') {
            $.cachedScript("//player.youku.com/jsapi");
        } else {
            if($('.is-in-china').length<=0){       
                $.cachedScript("//platform.twitter.com/widgets.js");
            }
            
        }

        /**
         * Desktop Only
         */
        if(!isTouch){
            // Skirt- Teaser
            $('.skirt').hover(
                function () {
                    $(this).find('.info').stop(true, false).show();
                }, function () {
                    $(this).find('.info').stop(true, false).hide();
                }
            );
            $('.overview .span3 a').hover(function(){
                $(this).parents('.span3').next().find('article').toggleClass('active');
            });
            $('.overview .span9 a').hover(function(){
                $(this).parents('.span9').next().find('article').toggleClass('active');
            });

            //Animated gif's on hover
            $('img.img-shape[data-src-gif]').hover(function(){
                $(this).attr('src', $(this).attr('data-src-gif'));
            },function(){
                $(this).attr('src', $(this).attr('data-src-orig'));
            });

            /**
             * Node Teaser - Reverse out colors
             */
            $('article.node-teaser').live('hover', function(){
                if(!$(this).hasClass('node-work') && !$(this).hasClass('node-studio')){
                    $(this).toggleClass('active');
                }
            });

            $('#block-frogweb-2 .contact').click(function(){
                var section = $('.new-business');
                if (section.hasClass('active') && ( section.offset().top > ($(window).scrollTop()+$(window).height()))){
                    $.scrollTo(($('#block-frogweb-2').offset().top-48), 800, {axis: 'y'});
                } else {
                    section.slideToggle(400, function(){
                        $(this).toggleClass('active');
                        $.scrollTo(($('#block-frogweb-2').offset().top-48), 800, {axis: 'y'});
                    });
                }
            });
        }

        function isScrolledIntoView(elem){
            var docViewTop = $(window).scrollTop();
            var docViewBottom = docViewTop + $(window).height();

            var elemTop = $(elem).offset().top;
            var elemBottom = elemTop + $(elem).height();

            return ((elemBottom <= docViewBottom));
        }

        /**
         * Homepage - Carousel
         */
        
        /**
         * Work - Animated Gifs
         */
        $('.image img[data-src-gif]').bind('inview', function (event, visible) {
            if (visible == true) {
                // element is now visible in the viewport
                $(this).attr('src', $(this).attr('data-src-gif'));
            } else {
                // element has gone out of viewport
                $(this).attr('src', $(this).attr('data-src-orig'));
            }
        });

        /**
         * Work - Index List
         */
        if($('table.work-list').length > 0) {
            $("table.work-list")
                .collapsible("td.collapsible", {
                    collapse: true
                }).tablesorter({
                    //sortList        : [[1,1]],                     // set default sort column
                    headers         : {0: {sorter: false}}, // don't sort by first column
                    widgets         : ['zebra'], // set the widgets being used - zebra stripping
                    onRenderHeader  : function (){
                        this.append("<span></span>");
                    },
                    debug           : false
                });

            /**
             * Row Click
             */
            $('.projects tr.project').click(function(){
                if (!$(this).hasClass('active')) {
                    var toOpen = $(this);
                    if ($('tr.project.active').length > 0) {
                        //close open
                        $('tr.project.active').each(function(){
                            $(this).toggleClass('active').next().find('td .extra').slideToggle('fast', function(){
                                toOpen.toggleClass('active').next().find('td .extra').slideToggle('slow');
                                $.scrollTo((toOpen.offset().top-80), 800, {axis: 'y'});
                            });
                        });
                    } else {
                        $(this).toggleClass('active').next().find('td .extra').slideToggle('slow');
                        $.scrollTo(($(this).offset().top-80), 800, {axis: 'y'});
                    }
                } else {
                    //clicked active, close active
                    $(this).toggleClass('active').next().find('td .extra').slideToggle('slow');
                    $.scrollTo(($(this).offset().top-80), 800, {axis: 'y'});
                }
            });

            /**
             * Close Button
             */
            $('.projects .close').click(function(e){
                pde(e);
                $('.projects table tr.active').toggleClass('active').next().find('td .extra').slideToggle('slow');
            });
        }

        /**
         * Grow Down
         * Teaser: Studios, Work(Index Grid)
         */
        var headerHeight = $("#navbar").height();
        var trayOpen = false;
        var clickLock = false;

        $('article.growdown').click(function(event){
            pde(event);
            if(clickLock == false){
                clickLock = true;
                var article = $(this);
                if(trayOpen == false){
                    //closed
                    openTray(article)
                } else {
                    //already open
                    if(article.parent().hasClass('active')){
                        closeTray();
                        return;
                    }
                    closeTray(openTray, article);

                }
            }
        });

        function openTray(article){
            trayOpen = true;
            var extra = $(article).parent().find('.extra');
            var total_height = article.outerHeight(true) + $(extra).height();

            $(article).parent().height(total_height).addClass('active');
            $(extra).slideDown(400, function(){
                $.scrollTo(($(article).offset().top), 800, {axis: 'y'});
                clickLock = false;
                //History.replaceState(null, null, window.location.pathname+"#"+article.find("a[name]").attr('name'));
                //History.pushState(null, null, window.location.pathname+"#"+article.find("a[name]").attr('name'));
            });
        }

        function closeTray(callback, article){

            var active = $('li.active');

            $(active).animate({'height': active.find('article').width()}, 400, 'swing').removeClass('active');
            $(active).find('.extra').slideUp(400, function(){
                if (callback && typeof(callback) === "function") callback(article);
            });

            /*
            if (article) {
                History.back();
            } else {
                History.go(-1);
            }*/

            clickLock = false;
            trayOpen = false;

        }

        if($('article.growdown').length > 0) {
            var hash = History.getHash();
            if (hash){
                //History.pushState(null, null, window.location.pathname);
                $("a[name='"+hash+"']").parents('article').click();
            }
        }

        // Work - New Business form - confirmation
        if ($('.node-type-work, .node-type-industry').length > 0) {
            var hash = History.getHash();
            if(hash && hash == 'form'){
                $('#block-frogweb-2 .contact').click();
            }
        }

        function fixDrawerHeight(){
            var article = $('li.active article');
            var extra = $(article).parent().find('.extra');
            var total_height = article.outerHeight(true) + $(extra).height();
            $(article).parent().css({'height': total_height}).addClass('active');
        }

        /**
         * Grow Down - Close Button
         */
        $('.btn-close').click(function () {
            $('.active, .expanded').removeClass('active').removeClass('expanded');
        });

        /**
         * Studio Clock - Update Time
         */
        if ($('.clock').length > 0) {
            drawClocks();
        }

        function drawClocks(){
            $.each($('.clock'), function () {
                $(this).html('');
                var id = $(this).attr('id');
                var canvas = Raphael(id, $(this).width(), $(this).width());
                canvas.setSize($(this).width()+5, $(this).width()+20);

                w = $(this).width()/2;
                h = $(this).width()/2 + 13;

                var clock = canvas.circle(w, h, ($(this).width() / 2));

                clock.attr({"fill":"#f6f1eb", "stroke":"#444444", "stroke-width": 0});

                hour_hand = canvas.path("M"+w+","+(h+10)+"L"+w+",35");
                hour_hand.attr({stroke: "#000", "stroke-width": 6.5});

                minute_hand = canvas.path("M"+w+","+(h+10)+"L"+w+",25");
                minute_hand.attr({stroke: "#000", "stroke-width": 6.5});

                update_clock($(this), hour_hand, minute_hand, clock);
            });

        }

        function update_clock(clock, hour_hand, minute_hand, canvas){
            var offset = clock.attr('data-offset');
            var now = new Date();
            var utc = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
            var sec = utc.getSeconds();
            var min = utc.getMinutes();

            var hour = utc.getHours() + (offset / 60 / 60);
            var hour12 = ((hour % 12) + min / 60);

            hour_hand.rotate(30*hour, clock.width()/2, clock.width()/2+13);
            minute_hand.rotate(6*min, clock.width()/2, clock.width()/2+13);

            if (hour < 6 || hour > 17) {
                clock.addClass('dark');
                canvas.attr({"fill":"#161616", "stroke":"#FFF", "stroke-width": 0});
                hour_hand.attr({stroke: "#FFF"});
                minute_hand.attr({stroke: "#FFF"});
            }
        }


        /**
         * Studio Video title slides
         */
        $('div.video .play').live('click', function(e){
            pde(e);
            container = $(this).parent();
            var video = container.attr('data-rsvideo')
            if (video.indexOf("youku") !== -1){
                var id = video.replace("http://v.youku.com/v_show/id_","");
                id = id.replace('.html','');
                src = '<div id="youkuplayer"></div><div class="close"><a>Close</a></div>';
                container.html(src);
                player =  new YKU.Player('youkuplayer',{
                    client_id : 'cc8e4cd18b184718',
                    vid : id,
                    autoplay: true,
                    events:{
                        onPlayEnd: function(){
                            $('article.node-video .close').click();
                        }
                    }
                });
            } else {
                id = container.attr('data-rsvideo').split("/").pop();
                src = '<iframe src="http://player.vimeo.com/video/'+id+'?title=0&amp;byline=0&amp;portrait=0&amp;autoplay=1" width="1200" height="674" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
                src += '<div class="close"><a>Close</a></div>';
                container.html(src);
            }
        });

        $('div.video .close').live('click', function(e){
            pde(e);
            container = $(this).parent();
            src = '<div class="play"></div><img src="'+container.attr('data-image')+'" />';
            container.html(src);
        });

        /**
         * Case Study
         */
        if($('#gallery').length > 0) {
            var slider = $("#gallery ul").royalSlider({
                keyboardNavEnabled      : true,
                autoScaleSlider         : true,
                loop                    : true,
                autoScaleSliderWidth    : 1200,
                autoScaleSliderHeight   : 676,
                imageScaleMode          : 'fill',
                arrowsNavAutoHide       : true,
                slidesSpacing           : 0,
                arrowsNavHideOnTouch    : true,
                sliderDrag              : false,
                video: {
                    autoHideBlocks      : true,
                    autoHideArrows      : true,
                    autoHideControlNav  : true
                },
                fullscreen: {
                    enabled: true,
                    nativeFS: true
                }
            }).data('royalSlider');

            slider.ev.on('rsOnCreateVideoElement', function(e, url){
                if (url.indexOf("youku") !== -1){
                    var id = url.replace("http://v.youku.com/v_show/id_","");
                    id = id.replace('.html','');
                    slider.videoObj = '<div id="youkuplayer"></div>';

                    setTimeout(function() {
                        player =  new YKU.Player('youkuplayer',{
                            client_id : 'cc8e4cd18b184718',
                            vid : id,
                            autoplay: true,
                            events:{
                                onPlayEnd: function(){
                                    $('article.node-video .close').click();
                                }
                            }
                        });
                    }, 50);
                }
            });

            //hide bullet nav if there is only 1 item
            if(slider.numSlides == 1){
                $('.rsBullets').css({'display': 'none'});
                $('.rsFullscreenBtn').css({'display' : 'none'});
            }

            $('.rsArrowRight').mousemove(function(){
                if(slider.isFullscreen != true) $('.rsContainer').addClass('nudgeRight');
            }).mouseout(function(){
                $('.rsContainer').removeClass('nudgeRight');
            });

            $('.rsArrowLeft').mousemove(function(){
                if (slider.isFullscreen != true) $('.rsContainer').addClass('nudgeLeft');
            }).mouseout(function(){
                $('.rsContainer').removeClass('nudgeLeft');
            });

            slider.ev.on('rsBeforeMove', function(event, type, userAction ) {
                $('.rsContainer').removeClass('nudgeRight nudgeLeft'); //clear nudge on slideshow advance
            });
        }

        /**
         * Culture
         */

        if ($('.page-about-culture, .page-work-portfolio, .page-node-edit').length > 0 && $('.page-work-portfolio-list').length <= 0 && $("img.lazy").length>0) {
            $("img.lazy").lazyload({threshold : 200});
            
        }

        /**
         * News & Views
         */
        if ($('.page-news-views').length > 0) {
            setTimeout(function(){
                var minHeight = 0;
                var minObject = null;
                var groups = new Array();
                $('.row [class*="span"]').each(function(){
                    if ($(this).outerHeight(true) < minHeight || minHeight == 0) {
                         if (typeof(minObject) === 'undefined') {
                            minObject = $(this);
                         } else {
                            groups.push($(this));
                            minObject = $(this);
                         }
                         minHeight = $(this).outerHeight();
                    } else {
                        groups.push($(this));
                    }
                });

                $(groups).each(function(){
                    var height = 0;
                    $(this).children().each(function(){
                        if (height < minHeight) {
                            height += $(this).outerHeight(true);
                        } else {
                            $(this).remove();
                        }
                    });
                });
            }, 1000);
        }

        /**
         * Work Filter
         */
        $('.page-work-portfolio .filter-group a').click(function(e){
            pde(e);
            var filter = $(this);
            var filterGroupAll = $(this).parents('.terms').find('li a[data-filter*="all"]');
            var active = $(this).hasClass('active');

            //filter based on tid
            $('.filter-group li a').removeClass('active'); //exclude all
            $('li a[data-filter*="all"]').addClass('active');
            filterGroupAll.removeClass('active'); //disable only all filter for active group

            if (active){
                filter.removeClass('active');
                filterGroupAll.click();
            } else if (filter.attr('data-filter') == 'all') {
                //showall
                $("[data-filter='all']").addClass('active');
                $('.hide').removeClass('hide');
            } else if ($('table.work-list').length > 0) {
                //Work Index - List
                filter.addClass('active');
                $('tr.active').click();
                $('.work-list .project').each(function(){
                    filter_terms_nav(filter.attr('data-filter'), $(this), $(this));
                });
            } else if($('.page-news-views').length > 0 ){
                //News & Views

                var filterTerm = filter.attr('data-filter');

                $('.item').each(function(){
                    var node = $(this).find('article');
                    var terms = new Array();
                    if (node.attr('data-terms') !== undefined){
                        terms = node.attr('data-terms').split(',');
                        if($.inArray(filterTerm, terms) == -1){
                            $(this).addClass('hide');
                        } else {
                            $(this).removeClass('hide');
                        }
                    }
                });
            } else {
                filter.addClass('active');
                $('.projects li article').each(function(){
                    filter_terms_nav(filter.attr('data-filter'), $(this), $(this).parent());
                });
            }

            hideEmptyYears()
        });

        function hideEmptyYears() {
            //Hide Empty Years after filter
            $('.projects ul').each(function(){
                if ($(this).children().size() == ($(this).children('.hide').size()+1)) {
                    $(this).addClass('hide');
                } else {
                    $(this).removeClass('hide');
                }
            });
        }

        function filter_terms_nav(tid, article, item){
            var terms = new Array();
            if (article) {
                terms = article.attr('data-terms').split(',');
                if($.inArray(tid, terms) == -1){
                    item.addClass('hide');
                } else {
                    item.removeClass('hide');
                }
            }
        }


        if($('.page-work-portfolio').length > 0){
            setTimeout(function() {
                var tid = getUrlVars()["tid"];
                if (tid) {

                    //var term = $('a[data-filter="'+tid+'"] span');
                    var term = $('a[data-name="'+unescape(tid)+'"] span');
                    term.click();
                    $('#nav-work a#filter').click();
                    $('a[data-group="'+term.parents('.filter-group').attr('id')+'"]').click();
                }
            }, 10);
        }

        /*
         * Work Filter - Tray
         */
        $('#nav-work a#filter').click(function(e){
            pde(e);
            $(this).toggleClass('active');
            $('#filter-list').slideToggle();
        });

        /*
         * News & Views
         */
        $('.page-news-views .filter-group a').click(function(e){
            pde(e);
            var filter = $(this);
            var group = $(this).parents('.terms');
            group.find('li a.active').removeClass('active');

            $(this).addClass('active');
            if (filter.attr('data-filter') == 'all') {
                //showall
                group.parents('div[class^="span"]').find('.hide').removeClass('hide');
            } else {
                //News & Views

                var filterTerm = filter.attr('data-filter');
                $(this).parents('div[class^="span"]').find('.item').each(function(){
                    var node = $(this).find('article');
                    var terms = new Array();
                    if (node.attr('data-terms') !== undefined){
                        terms = node.attr('data-terms').split(',');
                        if($.inArray(filterTerm, terms) == -1){
                            $(this).addClass('hide');
                        } else {
                            $(this).removeClass('hide');
                        }
                    }
                });
            }

            //Hide Empty Years after filter
            $('.img-shape').each(function(){
                if ($(this).parents('div[class^="span"]').find('.filter-group a[data-filter="all"]').hasClass('active')){
                    $(this).removeClass('hide');
                } else {
                    $(this).addClass('hide');
                }
            });
        });

        $('#filter-type a').click(function(e){
            pde(e);
            $('#filter-type a').removeClass('active');
            $('.filter-group').removeClass('active');
            $($(this).attr('href')).addClass('active');
            $(this).addClass('active');
        });

        /**
         * Search
         */
        $('li.search a').click(function(e){
            pde(e);
            $("body").addClass("modal-open");
            $('#wrapper div#search').fadeToggle();
            $('#search .form-text').focus();
        });
        $('div#search .close').click(function(e){
            pde(e);
            $("body").removeClass("modal-open");
            $('#wrapper div#search').fadeToggle(200);
        });

        var stopLink = false;
        $('article.node-teaser a.edit, article.skirt a.edit').click(function(event){
            window.open($(this).attr('href'), '_self');
            pde(event);
            stopLink = true;
        });

        //full article click state
        $('article.node-teaser, article.skirt').live('click', function(event){
            if(stopLink == false){
                if(!$(this).hasClass('node-studio') && !$(this).hasClass('node-video') && !$(this).hasClass('node-social')){
                    //pde(event);
                    var dest = $(this).find('a').attr('href');
                    var has_link = $(this).find('.info p a').length;
                    
                    if(typeof dest != 'undefined'&&has_link==0) {
                        target = ($(this).find('a').attr('target') ? $(this).find('a').attr('target') : '_self');
                        window.open($(this).find('a').attr('href'),target);
                    }
                }
            } else {
                stopLink = true;
            }
        });

        /**
         * Top Navigation
         */
        var $nav, $friedolin, $menu, breakpoint, viewport, mobile_breakpoint;
        $nav = $("nav.main");
		$friedolin = $nav.find(".logo");
		$menu = $nav.find(".menu");

		viewport = $(window).width();
		previous_viewport = 0;
		breakpoint = 1025;
		mobile_breakpoint = 480;


		var list_item_line_height = 40;

		evalWindowSize();

		$(window).resize(function(e){
            adjustMask();
			evalWindowSize();
            fixDrawerHeight();
            if ($('.clock').length > 0) {
                drawClocks();
            }
            if ($('.projects').length > 0) {
                $('.projects li:not(.active)').each(function(){
                    $(this).removeAttr('style');
                });
            }
		});

        $(window).scroll(function () {
            //Desktop
            if (!isTouch) {
                if ($(document).scrollTop() > 80) {
                    if (!$menu.hasClass('closed') && !hovering) {
                        closeNav(true);
                    }
                } else {
                    if ($menu.hasClass('closed') && viewport > breakpoint) {
                        openNav(true);
                    }
                }

                //Case Study - New Business Form
                if ($('#block-frogweb-2').length > 0) {

                    if(isScrolledIntoView('.node-work header, .node-industry header,.node-static-page header')){
                        $('.contact').addClass('inview');
                    } else if($('.contact').hasClass('inview')){
                        $('.contact').removeClass('inview');
                    }

                    if (($(window).scrollTop()+$(window).height()) >= $('#block-frogweb-2').offset().top) {
                        $('.contact').addClass('lock');
                    } else {
                        $('.contact').removeClass('lock');
                    }
                }
            }
        });

        $menu.bind('inview', function (event, visible) {
            if (visible == false && isTouch) {
                if (!$menu.hasClass('closed')) {
                    closeNav(true);
                }
            }
        });

		// expand and collapse secondary nav
		$menu.find("i").each(function(e){
			$(this).on("click",function(e){
                toggleSubMenu($(this));
			});
		});

		// evaluate friedolin events
		$friedolin.on("click",function(e){
			if(isTouch){ console.log('yeesss');
				pde(e);
                if($menu.hasClass('active')){
                    closeNav(true);
                } else {
                    openNav(true);
                }
			}
		});

		//Menu Enter
		var hovering = false;
		$nav.children(".wrapper").on("mouseenter",function(e){
            if(!isTouch){
                hovering = true;
                openNav(true);
            }
		});

		//Menu Exit
		$nav.children(".wrapper").on("mouseleave",function(e){
			hovering = false;
			setTimeout(function(){
				if(!hovering){
                    if(viewport < breakpoint){
                        closeNav(true);
                    } else {
                        if ($(document).scrollTop() > 80) closeNav(true);
                    }
				}
			},1500);
		});

        function toggleSubMenu(subMenu){
            $menu.children("li.active").not(subMenu.parent()).removeClass("active").find("ul").slideToggle();
			subMenu.parent().toggleClass("active");
			subMenu.parent().find("ul").slideToggle();
        }

		function evalWindowSize(){
			viewport = $(window).width();
			if(viewport >= breakpoint && previous_viewport < breakpoint){
				$nav.addClass("desktop");
				repositionNav();
			}
			if(viewport < breakpoint && previous_viewport >= breakpoint){
				$nav.removeClass("desktop");
				repositionNav();
			}
			if(viewport < mobile_breakpoint && previous_viewport >= mobile_breakpoint){
				repositionNav();
			}
			previous_viewport = viewport;
		}

        function openNav(animate){
            if($nav.hasClass("desktop")){
                if (!$menu.hasClass('animating')) {
                    if(animate){
                        $menu.show();
                        $menu.addClass('animating').animate({left:"80px"},250,function(e){
                            $menu.removeClass("active, animating"); }
                        );
                    } else {
                        $menu.css("left","80px").show().addClass("active");
                    }
                }
            } else {
                if(animate){
                    $menu.slideDown(250,function(e){
                        $(this).is(":visible") ? $(this).addClass('active') : $(this).removeClass("active");
                    });
                } else {
                    $menu.show();
                }
            }
            $menu.removeClass('closed');
        }

        function closeNav(animate){
            if($nav.hasClass("desktop")){
                if(animate){
                    $menu.addClass('animating').animate({left:"-500px"},250,function(e){$menu.hide().removeClass("active, animating")});
                }else{
                    $menu.css("left","-500px").hide().removeClass("active");
                }
            } else {
                if(animate){
                    $menu.slideUp(250,function(e){
                        $(this).is(":visible") ? $(this).addClass('active') : $(this).removeClass("active");
                    });
                } else {
                    $menu.toggle().removeClass("active");
                }
            }
            $menu.addClass('closed');
            toggleSubMenu($menu.find('li.active a'));
        }

        function repositionNav(){
            var left = "80px";
            var top = "0px";
            if(viewport >= breakpoint){
                // desktop
            }
            if(viewport <= breakpoint && viewport >= mobile_breakpoint){
                left = "80px";
                top = "0px";
            }else if(viewport < mobile_breakpoint){
                left = "0px";
                top = "80px";
            }
            $menu.css("left",left).css("top",top);
        }

        //Function to prevent Default Events
        function pde(e){
            var evt = e || window.event; // IE compatibility

            if(e.preventDefault){
                evt.preventDefault();
            } else{
                evt.returnValue = false;
                evt.cancelBubble = true;
            }
        }

        function getUrlVars(){
            var vars = [], hash;
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for(var i = 0; i < hashes.length; i++)
            {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
            return vars;
        }

        if(isTouch){
            $('input, textarea').live('focus', function(){
                $('header#navbar').css({position:'absolute'})
            });

            $('input, textarea').live('blur', function(){
                $('header#navbar').css({position:'fixed'})
            });

            $('.img-shape').click(function(e){
                pde(e);
            });
        }

    }
    $(Drupal.frogweb6.autoAttach);

    
    
})(jQuery);

jQuery(document).ready(function($) {
    if($('#block-frogweb-2').length > 0){
        
        $('#block-new-business-button').click(function(event) { console.log('vcc');
           _gaq('send', 'event', 'block-new-business-button', 'click', 'nav-buttons');
        });
    }

    //when we are in work/portfolio page
    if ($('.page-work-portfolio').length > 0 && window.location.hash.replace("#", "")) {
        $('#'+window.location.hash.replace("#", "")).click();
    }

    //new place for homepage slider
    if($('#carouselxxx').length > 0) {
        console.log('hhh');
        var slider = $("#carousel > ul").royalSlider({
            keyboardNavEnabled      : true,
            autoScaleSlider         : true,
            loop                    : true,
            autoScaleSliderWidth    : 1200,
            autoScaleSliderHeight   : 676,
            imageScaleMode          : 'fill',
            slidesSpacing           : 0,
            sliderDrag              : false,
            arrowsNav               : false,
            transitionSpeed         : 800,
            slidesOrientation       : 'vertical',
            autoHeight              : true,
            fadeinLoadedSlide          : true,
            easeInOut              :'easeInOutSine'
        }).data('royalSlider');

        setTimeout(function() {
            $("#carousel > ul").royalSlider("updateSliderSize", true);
        }, 300);
    }

    if($('#carousel').length > 0 && $('html').hasClass('no-touch')) {
        $('#carousel').flexslider({
            animation: "slide",
            direction: "vertical",
            directionNav: false,
            slideshowSpeed: 8000,
            animationSpeed: 1000,
            controlNav: true,
            
            start: function(slider){
                var li_height = $('#carousel li').height();
                //console.log(li_height);
                $('.flex-viewport').css({height:li_height});
            }
        });
    }
    

});






























;
/*
 * jQuery FlexSlider v2.4.0
 * Copyright 2012 WooThemes
 * Contributing Author: Tyler Smith
 */!function($){$.flexslider=function(e,t){var a=$(e);a.vars=$.extend({},$.flexslider.defaults,t);var n=a.vars.namespace,i=window.navigator&&window.navigator.msPointerEnabled&&window.MSGesture,s=("ontouchstart"in window||i||window.DocumentTouch&&document instanceof DocumentTouch)&&a.vars.touch,r="click touchend MSPointerUp keyup",o="",l,c="vertical"===a.vars.direction,d=a.vars.reverse,u=a.vars.itemWidth>0,v="fade"===a.vars.animation,p=""!==a.vars.asNavFor,m={},f=!0;$.data(e,"flexslider",a),m={init:function(){a.animating=!1,a.currentSlide=parseInt(a.vars.startAt?a.vars.startAt:0,10),isNaN(a.currentSlide)&&(a.currentSlide=0),a.animatingTo=a.currentSlide,a.atEnd=0===a.currentSlide||a.currentSlide===a.last,a.containerSelector=a.vars.selector.substr(0,a.vars.selector.search(" ")),a.slides=$(a.vars.selector,a),a.container=$(a.containerSelector,a),a.count=a.slides.length,a.syncExists=$(a.vars.sync).length>0,"slide"===a.vars.animation&&(a.vars.animation="swing"),a.prop=c?"top":"marginLeft",a.args={},a.manualPause=!1,a.stopped=!1,a.started=!1,a.startTimeout=null,a.transitions=!a.vars.video&&!v&&a.vars.useCSS&&function(){var e=document.createElement("div"),t=["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"];for(var n in t)if(void 0!==e.style[t[n]])return a.pfx=t[n].replace("Perspective","").toLowerCase(),a.prop="-"+a.pfx+"-transform",!0;return!1}(),a.ensureAnimationEnd="",""!==a.vars.controlsContainer&&(a.controlsContainer=$(a.vars.controlsContainer).length>0&&$(a.vars.controlsContainer)),""!==a.vars.manualControls&&(a.manualControls=$(a.vars.manualControls).length>0&&$(a.vars.manualControls)),a.vars.randomize&&(a.slides.sort(function(){return Math.round(Math.random())-.5}),a.container.empty().append(a.slides)),a.doMath(),a.setup("init"),a.vars.controlNav&&m.controlNav.setup(),a.vars.directionNav&&m.directionNav.setup(),a.vars.keyboard&&(1===$(a.containerSelector).length||a.vars.multipleKeyboard)&&$(document).bind("keyup",function(e){var t=e.keyCode;if(!a.animating&&(39===t||37===t)){var n=39===t?a.getTarget("next"):37===t?a.getTarget("prev"):!1;a.flexAnimate(n,a.vars.pauseOnAction)}}),a.vars.mousewheel&&a.bind("mousewheel",function(e,t,n,i){e.preventDefault();var s=a.getTarget(0>t?"next":"prev");a.flexAnimate(s,a.vars.pauseOnAction)}),a.vars.pausePlay&&m.pausePlay.setup(),a.vars.slideshow&&a.vars.pauseInvisible&&m.pauseInvisible.init(),a.vars.slideshow&&(a.vars.pauseOnHover&&a.hover(function(){a.manualPlay||a.manualPause||a.pause()},function(){a.manualPause||a.manualPlay||a.stopped||a.play()}),a.vars.pauseInvisible&&m.pauseInvisible.isHidden()||(a.vars.initDelay>0?a.startTimeout=setTimeout(a.play,a.vars.initDelay):a.play())),p&&m.asNav.setup(),s&&a.vars.touch&&m.touch(),(!v||v&&a.vars.smoothHeight)&&$(window).bind("resize orientationchange focus",m.resize),a.find("img").attr("draggable","false"),setTimeout(function(){a.vars.start(a)},200)},asNav:{setup:function(){a.asNav=!0,a.animatingTo=Math.floor(a.currentSlide/a.move),a.currentItem=a.currentSlide,a.slides.removeClass(n+"active-slide").eq(a.currentItem).addClass(n+"active-slide"),i?(e._slider=a,a.slides.each(function(){var e=this;e._gesture=new MSGesture,e._gesture.target=e,e.addEventListener("MSPointerDown",function(e){e.preventDefault(),e.currentTarget._gesture&&e.currentTarget._gesture.addPointer(e.pointerId)},!1),e.addEventListener("MSGestureTap",function(e){e.preventDefault();var t=$(this),n=t.index();$(a.vars.asNavFor).data("flexslider").animating||t.hasClass("active")||(a.direction=a.currentItem<n?"next":"prev",a.flexAnimate(n,a.vars.pauseOnAction,!1,!0,!0))})})):a.slides.on(r,function(e){e.preventDefault();var t=$(this),i=t.index(),s=t.offset().left-$(a).scrollLeft();0>=s&&t.hasClass(n+"active-slide")?a.flexAnimate(a.getTarget("prev"),!0):$(a.vars.asNavFor).data("flexslider").animating||t.hasClass(n+"active-slide")||(a.direction=a.currentItem<i?"next":"prev",a.flexAnimate(i,a.vars.pauseOnAction,!1,!0,!0))})}},controlNav:{setup:function(){a.manualControls?m.controlNav.setupManual():m.controlNav.setupPaging()},setupPaging:function(){var e="thumbnails"===a.vars.controlNav?"control-thumbs":"control-paging",t=1,i,s;if(a.controlNavScaffold=$('<ol class="'+n+"control-nav "+n+e+'"></ol>'),a.pagingCount>1)for(var l=0;l<a.pagingCount;l++){if(s=a.slides.eq(l),i="thumbnails"===a.vars.controlNav?'<img src="'+s.attr("data-thumb")+'"/>':"<a>"+t+"</a>","thumbnails"===a.vars.controlNav&&!0===a.vars.thumbCaptions){var c=s.attr("data-thumbcaption");""!=c&&void 0!=c&&(i+='<span class="'+n+'caption">'+c+"</span>")}a.controlNavScaffold.append("<li>"+i+"</li>"),t++}a.controlsContainer?$(a.controlsContainer).append(a.controlNavScaffold):a.append(a.controlNavScaffold),m.controlNav.set(),m.controlNav.active(),a.controlNavScaffold.delegate("a, img",r,function(e){if(e.preventDefault(),""===o||o===e.type){var t=$(this),i=a.controlNav.index(t);t.hasClass(n+"active")||(a.direction=i>a.currentSlide?"next":"prev",a.flexAnimate(i,a.vars.pauseOnAction))}""===o&&(o=e.type),m.setToClearWatchedEvent()})},setupManual:function(){a.controlNav=a.manualControls,m.controlNav.active(),a.controlNav.bind(r,function(e){if(e.preventDefault(),""===o||o===e.type){var t=$(this),i=a.controlNav.index(t);t.hasClass(n+"active")||(a.direction=i>a.currentSlide?"next":"prev",a.flexAnimate(i,a.vars.pauseOnAction))}""===o&&(o=e.type),m.setToClearWatchedEvent()})},set:function(){var e="thumbnails"===a.vars.controlNav?"img":"a";a.controlNav=$("."+n+"control-nav li "+e,a.controlsContainer?a.controlsContainer:a)},active:function(){a.controlNav.removeClass(n+"active").eq(a.animatingTo).addClass(n+"active")},update:function(e,t){a.pagingCount>1&&"add"===e?a.controlNavScaffold.append($("<li><a>"+a.count+"</a></li>")):1===a.pagingCount?a.controlNavScaffold.find("li").remove():a.controlNav.eq(t).closest("li").remove(),m.controlNav.set(),a.pagingCount>1&&a.pagingCount!==a.controlNav.length?a.update(t,e):m.controlNav.active()}},directionNav:{setup:function(){var e=$('<ul class="'+n+'direction-nav"><li class="'+n+'nav-prev"><a class="'+n+'prev" href="#">'+a.vars.prevText+'</a></li><li class="'+n+'nav-next"><a class="'+n+'next" href="#">'+a.vars.nextText+"</a></li></ul>");a.controlsContainer?($(a.controlsContainer).append(e),a.directionNav=$("."+n+"direction-nav li a",a.controlsContainer)):(a.append(e),a.directionNav=$("."+n+"direction-nav li a",a)),m.directionNav.update(),a.directionNav.bind(r,function(e){e.preventDefault();var t;(""===o||o===e.type)&&(t=a.getTarget($(this).hasClass(n+"next")?"next":"prev"),a.flexAnimate(t,a.vars.pauseOnAction)),""===o&&(o=e.type),m.setToClearWatchedEvent()})},update:function(){var e=n+"disabled";1===a.pagingCount?a.directionNav.addClass(e).attr("tabindex","-1"):a.vars.animationLoop?a.directionNav.removeClass(e).removeAttr("tabindex"):0===a.animatingTo?a.directionNav.removeClass(e).filter("."+n+"prev").addClass(e).attr("tabindex","-1"):a.animatingTo===a.last?a.directionNav.removeClass(e).filter("."+n+"next").addClass(e).attr("tabindex","-1"):a.directionNav.removeClass(e).removeAttr("tabindex")}},pausePlay:{setup:function(){var e=$('<div class="'+n+'pauseplay"><a></a></div>');a.controlsContainer?(a.controlsContainer.append(e),a.pausePlay=$("."+n+"pauseplay a",a.controlsContainer)):(a.append(e),a.pausePlay=$("."+n+"pauseplay a",a)),m.pausePlay.update(a.vars.slideshow?n+"pause":n+"play"),a.pausePlay.bind(r,function(e){e.preventDefault(),(""===o||o===e.type)&&($(this).hasClass(n+"pause")?(a.manualPause=!0,a.manualPlay=!1,a.pause()):(a.manualPause=!1,a.manualPlay=!0,a.play())),""===o&&(o=e.type),m.setToClearWatchedEvent()})},update:function(e){"play"===e?a.pausePlay.removeClass(n+"pause").addClass(n+"play").html(a.vars.playText):a.pausePlay.removeClass(n+"play").addClass(n+"pause").html(a.vars.pauseText)}},touch:function(){function t(t){a.animating?t.preventDefault():(window.navigator.msPointerEnabled||1===t.touches.length)&&(a.pause(),g=c?a.h:a.w,S=Number(new Date),x=t.touches[0].pageX,b=t.touches[0].pageY,f=u&&d&&a.animatingTo===a.last?0:u&&d?a.limit-(a.itemW+a.vars.itemMargin)*a.move*a.animatingTo:u&&a.currentSlide===a.last?a.limit:u?(a.itemW+a.vars.itemMargin)*a.move*a.currentSlide:d?(a.last-a.currentSlide+a.cloneOffset)*g:(a.currentSlide+a.cloneOffset)*g,p=c?b:x,m=c?x:b,e.addEventListener("touchmove",n,!1),e.addEventListener("touchend",s,!1))}function n(e){x=e.touches[0].pageX,b=e.touches[0].pageY,h=c?p-b:p-x,y=c?Math.abs(h)<Math.abs(x-m):Math.abs(h)<Math.abs(b-m);var t=500;(!y||Number(new Date)-S>t)&&(e.preventDefault(),!v&&a.transitions&&(a.vars.animationLoop||(h/=0===a.currentSlide&&0>h||a.currentSlide===a.last&&h>0?Math.abs(h)/g+2:1),a.setProps(f+h,"setTouch")))}function s(t){if(e.removeEventListener("touchmove",n,!1),a.animatingTo===a.currentSlide&&!y&&null!==h){var i=d?-h:h,r=a.getTarget(i>0?"next":"prev");a.canAdvance(r)&&(Number(new Date)-S<550&&Math.abs(i)>50||Math.abs(i)>g/2)?a.flexAnimate(r,a.vars.pauseOnAction):v||a.flexAnimate(a.currentSlide,a.vars.pauseOnAction,!0)}e.removeEventListener("touchend",s,!1),p=null,m=null,h=null,f=null}function r(t){t.stopPropagation(),a.animating?t.preventDefault():(a.pause(),e._gesture.addPointer(t.pointerId),w=0,g=c?a.h:a.w,S=Number(new Date),f=u&&d&&a.animatingTo===a.last?0:u&&d?a.limit-(a.itemW+a.vars.itemMargin)*a.move*a.animatingTo:u&&a.currentSlide===a.last?a.limit:u?(a.itemW+a.vars.itemMargin)*a.move*a.currentSlide:d?(a.last-a.currentSlide+a.cloneOffset)*g:(a.currentSlide+a.cloneOffset)*g)}function o(t){t.stopPropagation();var a=t.target._slider;if(a){var n=-t.translationX,i=-t.translationY;return w+=c?i:n,h=w,y=c?Math.abs(w)<Math.abs(-n):Math.abs(w)<Math.abs(-i),t.detail===t.MSGESTURE_FLAG_INERTIA?void setImmediate(function(){e._gesture.stop()}):void((!y||Number(new Date)-S>500)&&(t.preventDefault(),!v&&a.transitions&&(a.vars.animationLoop||(h=w/(0===a.currentSlide&&0>w||a.currentSlide===a.last&&w>0?Math.abs(w)/g+2:1)),a.setProps(f+h,"setTouch"))))}}function l(e){e.stopPropagation();var t=e.target._slider;if(t){if(t.animatingTo===t.currentSlide&&!y&&null!==h){var a=d?-h:h,n=t.getTarget(a>0?"next":"prev");t.canAdvance(n)&&(Number(new Date)-S<550&&Math.abs(a)>50||Math.abs(a)>g/2)?t.flexAnimate(n,t.vars.pauseOnAction):v||t.flexAnimate(t.currentSlide,t.vars.pauseOnAction,!0)}p=null,m=null,h=null,f=null,w=0}}var p,m,f,g,h,S,y=!1,x=0,b=0,w=0;i?(e.style.msTouchAction="none",e._gesture=new MSGesture,e._gesture.target=e,e.addEventListener("MSPointerDown",r,!1),e._slider=a,e.addEventListener("MSGestureChange",o,!1),e.addEventListener("MSGestureEnd",l,!1)):e.addEventListener("touchstart",t,!1)},resize:function(){!a.animating&&a.is(":visible")&&(u||a.doMath(),v?m.smoothHeight():u?(a.slides.width(a.computedW),a.update(a.pagingCount),a.setProps()):c?(a.viewport.height(a.h),a.setProps(a.h,"setTotal")):(a.vars.smoothHeight&&m.smoothHeight(),a.newSlides.width(a.computedW),a.setProps(a.computedW,"setTotal")))},smoothHeight:function(e){if(!c||v){var t=v?a:a.viewport;e?t.animate({height:a.slides.eq(a.animatingTo).height()},e):t.height(a.slides.eq(a.animatingTo).height())}},sync:function(e){var t=$(a.vars.sync).data("flexslider"),n=a.animatingTo;switch(e){case"animate":t.flexAnimate(n,a.vars.pauseOnAction,!1,!0);break;case"play":t.playing||t.asNav||t.play();break;case"pause":t.pause()}},uniqueID:function(e){return e.filter("[id]").add(e.find("[id]")).each(function(){var e=$(this);e.attr("id",e.attr("id")+"_clone")}),e},pauseInvisible:{visProp:null,init:function(){var e=m.pauseInvisible.getHiddenProp();if(e){var t=e.replace(/[H|h]idden/,"")+"visibilitychange";document.addEventListener(t,function(){m.pauseInvisible.isHidden()?a.startTimeout?clearTimeout(a.startTimeout):a.pause():a.started?a.play():a.vars.initDelay>0?setTimeout(a.play,a.vars.initDelay):a.play()})}},isHidden:function(){var e=m.pauseInvisible.getHiddenProp();return e?document[e]:!1},getHiddenProp:function(){var e=["webkit","moz","ms","o"];if("hidden"in document)return"hidden";for(var t=0;t<e.length;t++)if(e[t]+"Hidden"in document)return e[t]+"Hidden";return null}},setToClearWatchedEvent:function(){clearTimeout(l),l=setTimeout(function(){o=""},3e3)}},a.flexAnimate=function(e,t,i,r,o){if(a.vars.animationLoop||e===a.currentSlide||(a.direction=e>a.currentSlide?"next":"prev"),p&&1===a.pagingCount&&(a.direction=a.currentItem<e?"next":"prev"),!a.animating&&(a.canAdvance(e,o)||i)&&a.is(":visible")){if(p&&r){var l=$(a.vars.asNavFor).data("flexslider");if(a.atEnd=0===e||e===a.count-1,l.flexAnimate(e,!0,!1,!0,o),a.direction=a.currentItem<e?"next":"prev",l.direction=a.direction,Math.ceil((e+1)/a.visible)-1===a.currentSlide||0===e)return a.currentItem=e,a.slides.removeClass(n+"active-slide").eq(e).addClass(n+"active-slide"),!1;a.currentItem=e,a.slides.removeClass(n+"active-slide").eq(e).addClass(n+"active-slide"),e=Math.floor(e/a.visible)}if(a.animating=!0,a.animatingTo=e,t&&a.pause(),a.vars.before(a),a.syncExists&&!o&&m.sync("animate"),a.vars.controlNav&&m.controlNav.active(),u||a.slides.removeClass(n+"active-slide").eq(e).addClass(n+"active-slide"),a.atEnd=0===e||e===a.last,a.vars.directionNav&&m.directionNav.update(),e===a.last&&(a.vars.end(a),a.vars.animationLoop||a.pause()),v)s?(a.slides.eq(a.currentSlide).css({opacity:0,zIndex:1}),a.slides.eq(e).css({opacity:1,zIndex:2}),a.wrapup(f)):(a.slides.eq(a.currentSlide).css({zIndex:1}).animate({opacity:0},a.vars.animationSpeed,a.vars.easing),a.slides.eq(e).css({zIndex:2}).animate({opacity:1},a.vars.animationSpeed,a.vars.easing,a.wrapup));else{var f=c?a.slides.filter(":first").height():a.computedW,g,h,S;u?(g=a.vars.itemMargin,S=(a.itemW+g)*a.move*a.animatingTo,h=S>a.limit&&1!==a.visible?a.limit:S):h=0===a.currentSlide&&e===a.count-1&&a.vars.animationLoop&&"next"!==a.direction?d?(a.count+a.cloneOffset)*f:0:a.currentSlide===a.last&&0===e&&a.vars.animationLoop&&"prev"!==a.direction?d?0:(a.count+1)*f:d?(a.count-1-e+a.cloneOffset)*f:(e+a.cloneOffset)*f,a.setProps(h,"",a.vars.animationSpeed),a.transitions?(a.vars.animationLoop&&a.atEnd||(a.animating=!1,a.currentSlide=a.animatingTo),a.container.unbind("webkitTransitionEnd transitionend"),a.container.bind("webkitTransitionEnd transitionend",function(){clearTimeout(a.ensureAnimationEnd),a.wrapup(f)}),clearTimeout(a.ensureAnimationEnd),a.ensureAnimationEnd=setTimeout(function(){a.wrapup(f)},a.vars.animationSpeed+100)):a.container.animate(a.args,a.vars.animationSpeed,a.vars.easing,function(){a.wrapup(f)})}a.vars.smoothHeight&&m.smoothHeight(a.vars.animationSpeed)}},a.wrapup=function(e){v||u||(0===a.currentSlide&&a.animatingTo===a.last&&a.vars.animationLoop?a.setProps(e,"jumpEnd"):a.currentSlide===a.last&&0===a.animatingTo&&a.vars.animationLoop&&a.setProps(e,"jumpStart")),a.animating=!1,a.currentSlide=a.animatingTo,a.vars.after(a)},a.animateSlides=function(){!a.animating&&f&&a.flexAnimate(a.getTarget("next"))},a.pause=function(){clearInterval(a.animatedSlides),a.animatedSlides=null,a.playing=!1,a.vars.pausePlay&&m.pausePlay.update("play"),a.syncExists&&m.sync("pause")},a.play=function(){a.playing&&clearInterval(a.animatedSlides),a.animatedSlides=a.animatedSlides||setInterval(a.animateSlides,a.vars.slideshowSpeed),a.started=a.playing=!0,a.vars.pausePlay&&m.pausePlay.update("pause"),a.syncExists&&m.sync("play")},a.stop=function(){a.pause(),a.stopped=!0},a.canAdvance=function(e,t){var n=p?a.pagingCount-1:a.last;return t?!0:p&&a.currentItem===a.count-1&&0===e&&"prev"===a.direction?!0:p&&0===a.currentItem&&e===a.pagingCount-1&&"next"!==a.direction?!1:e!==a.currentSlide||p?a.vars.animationLoop?!0:a.atEnd&&0===a.currentSlide&&e===n&&"next"!==a.direction?!1:a.atEnd&&a.currentSlide===n&&0===e&&"next"===a.direction?!1:!0:!1},a.getTarget=function(e){return a.direction=e,"next"===e?a.currentSlide===a.last?0:a.currentSlide+1:0===a.currentSlide?a.last:a.currentSlide-1},a.setProps=function(e,t,n){var i=function(){var n=e?e:(a.itemW+a.vars.itemMargin)*a.move*a.animatingTo,i=function(){if(u)return"setTouch"===t?e:d&&a.animatingTo===a.last?0:d?a.limit-(a.itemW+a.vars.itemMargin)*a.move*a.animatingTo:a.animatingTo===a.last?a.limit:n;switch(t){case"setTotal":return d?(a.count-1-a.currentSlide+a.cloneOffset)*e:(a.currentSlide+a.cloneOffset)*e;case"setTouch":return d?e:e;case"jumpEnd":return d?e:a.count*e;case"jumpStart":return d?a.count*e:e;default:return e}}();return-1*i+"px"}();a.transitions&&(i=c?"translate3d(0,"+i+",0)":"translate3d("+i+",0,0)",n=void 0!==n?n/1e3+"s":"0s",a.container.css("-"+a.pfx+"-transition-duration",n),a.container.css("transition-duration",n)),a.args[a.prop]=i,(a.transitions||void 0===n)&&a.container.css(a.args),a.container.css("transform",i)},a.setup=function(e){if(v)a.slides.css({width:"100%","float":"left",marginRight:"-100%",position:"relative"}),"init"===e&&(s?a.slides.css({opacity:0,display:"block",webkitTransition:"opacity "+a.vars.animationSpeed/1e3+"s ease",zIndex:1}).eq(a.currentSlide).css({opacity:1,zIndex:2}):0==a.vars.fadeFirstSlide?a.slides.css({opacity:0,display:"block",zIndex:1}).eq(a.currentSlide).css({zIndex:2}).css({opacity:1}):a.slides.css({opacity:0,display:"block",zIndex:1}).eq(a.currentSlide).css({zIndex:2}).animate({opacity:1},a.vars.animationSpeed,a.vars.easing)),a.vars.smoothHeight&&m.smoothHeight();else{var t,i;"init"===e&&(a.viewport=$('<div class="'+n+'viewport"></div>').css({overflow:"hidden",position:"relative"}).appendTo(a).append(a.container),a.cloneCount=0,a.cloneOffset=0,d&&(i=$.makeArray(a.slides).reverse(),a.slides=$(i),a.container.empty().append(a.slides))),a.vars.animationLoop&&!u&&(a.cloneCount=2,a.cloneOffset=1,"init"!==e&&a.container.find(".clone").remove(),a.container.append(m.uniqueID(a.slides.first().clone().addClass("clone")).attr("aria-hidden","true")).prepend(m.uniqueID(a.slides.last().clone().addClass("clone")).attr("aria-hidden","true"))),a.newSlides=$(a.vars.selector,a),t=d?a.count-1-a.currentSlide+a.cloneOffset:a.currentSlide+a.cloneOffset,c&&!u?(a.container.height(200*(a.count+a.cloneCount)+"%").css("position","absolute").width("100%"),setTimeout(function(){a.newSlides.css({display:"block"}),a.doMath(),a.viewport.height(a.h),a.setProps(t*a.h,"init")},"init"===e?100:0)):(a.container.width(200*(a.count+a.cloneCount)+"%"),a.setProps(t*a.computedW,"init"),setTimeout(function(){a.doMath(),a.newSlides.css({width:a.computedW,"float":"left",display:"block"}),a.vars.smoothHeight&&m.smoothHeight()},"init"===e?100:0))}u||a.slides.removeClass(n+"active-slide").eq(a.currentSlide).addClass(n+"active-slide"),a.vars.init(a)},a.doMath=function(){var e=a.slides.first(),t=a.vars.itemMargin,n=a.vars.minItems,i=a.vars.maxItems;a.w=void 0===a.viewport?a.width():a.viewport.width(),a.h=e.height(),a.boxPadding=e.outerWidth()-e.width(),u?(a.itemT=a.vars.itemWidth+t,a.minW=n?n*a.itemT:a.w,a.maxW=i?i*a.itemT-t:a.w,a.itemW=a.minW>a.w?(a.w-t*(n-1))/n:a.maxW<a.w?(a.w-t*(i-1))/i:a.vars.itemWidth>a.w?a.w:a.vars.itemWidth,a.visible=Math.floor(a.w/a.itemW),a.move=a.vars.move>0&&a.vars.move<a.visible?a.vars.move:a.visible,a.pagingCount=Math.ceil((a.count-a.visible)/a.move+1),a.last=a.pagingCount-1,a.limit=1===a.pagingCount?0:a.vars.itemWidth>a.w?a.itemW*(a.count-1)+t*(a.count-1):(a.itemW+t)*a.count-a.w-t):(a.itemW=a.w,a.pagingCount=a.count,a.last=a.count-1),a.computedW=a.itemW-a.boxPadding},a.update=function(e,t){a.doMath(),u||(e<a.currentSlide?a.currentSlide+=1:e<=a.currentSlide&&0!==e&&(a.currentSlide-=1),a.animatingTo=a.currentSlide),a.vars.controlNav&&!a.manualControls&&("add"===t&&!u||a.pagingCount>a.controlNav.length?m.controlNav.update("add"):("remove"===t&&!u||a.pagingCount<a.controlNav.length)&&(u&&a.currentSlide>a.last&&(a.currentSlide-=1,a.animatingTo-=1),m.controlNav.update("remove",a.last))),a.vars.directionNav&&m.directionNav.update()},a.addSlide=function(e,t){var n=$(e);a.count+=1,a.last=a.count-1,c&&d?void 0!==t?a.slides.eq(a.count-t).after(n):a.container.prepend(n):void 0!==t?a.slides.eq(t).before(n):a.container.append(n),a.update(t,"add"),a.slides=$(a.vars.selector+":not(.clone)",a),a.setup(),a.vars.added(a)},a.removeSlide=function(e){var t=isNaN(e)?a.slides.index($(e)):e;a.count-=1,a.last=a.count-1,isNaN(e)?$(e,a.slides).remove():c&&d?a.slides.eq(a.last).remove():a.slides.eq(e).remove(),a.doMath(),a.update(t,"remove"),a.slides=$(a.vars.selector+":not(.clone)",a),a.setup(),a.vars.removed(a)},m.init()},$(window).blur(function(e){focused=!1}).focus(function(e){focused=!0}),$.flexslider.defaults={namespace:"flex-",selector:".slides > li",animation:"fade",easing:"swing",direction:"horizontal",reverse:!1,animationLoop:!0,smoothHeight:!1,startAt:0,slideshow:!0,slideshowSpeed:7e3,animationSpeed:600,initDelay:0,randomize:!1,fadeFirstSlide:!0,thumbCaptions:!1,pauseOnAction:!0,pauseOnHover:!1,pauseInvisible:!0,useCSS:!0,touch:!0,video:!1,controlNav:!0,directionNav:!0,prevText:"Previous",nextText:"Next",keyboard:!0,multipleKeyboard:!1,mousewheel:!1,pausePlay:!1,pauseText:"Pause",playText:"Play",controlsContainer:"",manualControls:"",sync:"",asNavFor:"",itemWidth:0,itemMargin:0,minItems:1,maxItems:0,move:0,allowOneSlide:!0,start:function(){},before:function(){},after:function(){},end:function(){},added:function(){},removed:function(){},init:function(){}},$.fn.flexslider=function(e){if(void 0===e&&(e={}),"object"==typeof e)return this.each(function(){var t=$(this),a=e.selector?e.selector:".slides > li",n=t.find(a);1===n.length&&e.allowOneSlide===!0||0===n.length?(n.fadeIn(400),e.start&&e.start(t)):void 0===t.data("flexslider")&&new $.flexslider(this,e)});var t=$(this).data("flexslider");switch(e){case"play":t.play();break;case"pause":t.pause();break;case"stop":t.stop();break;case"next":t.flexAnimate(t.getTarget("next"),!0);break;case"prev":case"previous":t.flexAnimate(t.getTarget("prev"),!0);break;default:"number"==typeof e&&t.flexAnimate(e,!0)}}}(jQuery);;
