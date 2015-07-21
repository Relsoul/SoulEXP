define(["jquery"],function($){
	 function ScrollTo(opts){
	 	this.opts=$.extend({},ScrollTo.DEFAULTS,opts);
	 	this.$el=$("html,body")
	 }
	 ScrollTo.prototype.move=function(){
	 	var opts=this.opts
	 	if($(window).scrollTop()!=opts.dest){
	 		if(!this.$el.is(":animated")){
	 			this.$el.animate({
			scrollTop:opts.dest,
		},opts.speed)
	 		}
	 	}
	 	
	 }
	 ScrollTo.prototype.go=function(){
	 	var opts=this.opts
	 	if($(window).scrollTop()!=opts.dest){
	 		this.$el.scrollTop(opts.dest)
	 	}
	 	
	 }
	 ScrollTo.DEFAULTS={
	 	dest:0,
	 	speed:800
	 }
	 return {
	 	ScrollTo:ScrollTo
	 }
})