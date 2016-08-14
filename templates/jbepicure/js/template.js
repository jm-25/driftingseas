jQuery(document).ready(function(){
	
	// Create the dropdown base
	jQuery("<select />").appendTo("#mobilemenu");
	var mobileMenuTitle = jQuery("#mobilemenu").attr("title");
	
	// Create default option "Go to..."
	jQuery("<option />", {
	   "selected": "selected",
	   "value"   : "",
	   "text"    : mobileMenuTitle
	}).appendTo("#mobilemenu select");
	
	// Populate dropdown with menu items
	jQuery("#nav ul.menu>li>a, #nav ul.menu>li>span.mainlevel,#nav ul.menu>li>span.separator").each(function() {
	 var el = jQuery(this);
	 jQuery("<option />", {
		 "value"   : el.attr("href"),
		 "text"    : el.text()
		 
	 }).appendTo("#mobilemenu select");
	getSubMenu(el);
	});
	
	function getSubMenu(el){
		var subMenu = jQuery('~ ul>li>a',el);
		var tab = "- ";
		if (!(subMenu.length === 0)){
			subMenu.each(function(){
				var sel = jQuery(this);
				var nodeval = tab + sel.text();
				 jQuery("<option />", {
					 "value"   : sel.attr("href"),
					 "text"    : nodeval
	
				 }).appendTo("#mobilemenu select");
				getSubMenu(sel);
			});
		}
	}
	// To make dropdown actually work
	
	// To make more unobtrusive: http://css-tricks.com/4064-unobtrusive-page-changer/
	jQuery("#mobilemenu select").change(function() {
		window.location = jQuery(this).find("option:selected").val();
	});
		
});

//Function to animate anchor links, just add class="animatedAnchor" to link
//home should be "href="#"
jQuery('a.animatedAnchor').click(function(){
   	if(jQuery.attr(this, 'href') == "#"){
   		scroll_to = 0; 
   	}else{
       	scroll_to = jQuery( jQuery.attr(this, 'href') ).offset().top - 45;
   	}	
    jQuery('html, body').animate({
        	scrollTop: scroll_to
    }, 500);
    return false;
});
// Change menu active when scroll through sections
var sections = jQuery('a.animatedAnchor');
    sections.each(function() {
		    	jQuery(this).addClass('foundyou');    	

      });

jQuery(window).scroll(function() {
    var currentPosition = jQuery(this).scrollTop();
    sections.each(function() {
    	this_link = jQuery(this).attr('href');
    	next_link = jQuery(this).parent().next().find('a').attr('href');
    	offset_fix = 0;	
    	    	

    	if (jQuery(this).parent().prev().length) {
       		var top = jQuery(this_link).position().top - offset_fix;
       	}else{
       		var top = 0;
       	}
    	if (jQuery(this).parent().next().length) {
        	var bottom = jQuery(next_link).position().top - offset_fix;
       	}else{
       		var bottom = jQuery('#main-container').height();
       	}
       	        
        if (currentPosition >= top && currentPosition <= bottom) {
            jQuery(this).addClass('current');
        }
    });
});

//Make home link scroll to top (add title="home" for it to work)
//jQuery('a.animatedAnchor').click(function(event) {
//	alert(">");
//    event.preventDefault();
//    event.stopPropagation();
//    jQuery('html, body').animate({scrollTop: 0}, duration);
//    return false;
//})

function getSubMenu(el){
	var subMenu = jQuery('~ ul>li>a',el);
	var tab = "- ";
	if (!(subMenu.length === 0)){
		subMenu.each(function(){
			var sel = jQuery(this);
			var nodeval = tab + sel.text();
			 jQuery("<option />", {
			     "value"   : sel.attr("href"),
			     "text"    : nodeval

			 }).appendTo("#mobilemenu select");
			getSubMenu(sel);
		});
	}
}
