jQuery(document).ready(function(){	
	
	//Default Action
	jQuery(".jbtab_content").hide(); //Hide all content
	jQuery("ul.jbtabs li:first").addClass("active").show(); //Activate first tab
	jQuery(".jbtab_content:first").show(); //Show first tab content
	
	// js for jbtabs
	jQuery("ul.jbtabs li").click(function(){
			jQuery("ul.jbtabs li").removeClass("active");
			jQuery(this).addClass("active");
			jQuery(".jbtab_content").hide();
			var activeTab=jQuery(this).find("a").attr("href");
			jQuery(activeTab).fadeIn(1000);
			return false});
			
	
	// Check for logo settings and create toggle behavior
	var logoTypeField = jQuery('#paramslogoType');
	if (logoTypeField)
	{
		logoTypeField.change(logoOptionsToggle);
		logoOptionsToggle();
	}

	function logoOptionsToggle()
	{
		var logoTextOptions  = jQuery('#jbtemplate div table tbody tr td .logo_as_text_fields').parent().parent();
		    logoImageOptions = jQuery('#jbtemplate div table tbody tr td .logo_as_image_fields').parent().parent();
		    fadeIn           = [];
		    fadeOut          = [];

		var logoTypeFieldValue = logoTypeField.val();

		if (logoTypeFieldValue == 'image')
		{
			fadeIn  = logoImageOptions;
			fadeOut = logoTextOptions;
		}
		else if (logoTypeFieldValue == 'text')
		{
			fadeIn  = logoTextOptions;
			fadeOut = logoImageOptions;
		}

		jQuery.each(fadeOut, function(key, item) { jQuery(item).fadeOut(); });
		jQuery.each(fadeIn, function(key, item) { jQuery(item).fadeIn(); });
	}
});

tmpBtn = {};
tmpOldValue = {};

function zenClearCache(btn, cache, msgWaiting, msgDone, msgError, msgNoCache)
{
	if (cache == 'css' || cache == 'js')
	{
		var oldValue = jQuery(btn).val();
		jQuery(btn).val(msgWaiting);
		jQuery(btn).attr('disabled','disabled');
		
		var url = parseURL(window.location.href);
		url.params.push({'name': 'clearcache', 'value': cache});
		url = buildURL(url);
		
		jQuery.ajax({
			'url': url,
			'success': function(response)
			{
				response = jQuery.parseJSON(response);
				
				if (response.result == 1)
				{
					jQuery(btn).val(msgDone);
				}
				else if (response.result == -1)
				{
					jQuery(btn).val(msgNoCache);
				}
				else if (response.result == 0)
				{
					jQuery(btn).val(msgError);
				}
				
				tmpBtn[cache] = btn;
				tmpOldValue[cache] = oldValue;
				var t = setTimeout("jQuery(tmpBtn['"+cache+"']).val(tmpOldValue['"+cache+"']).removeAttr('disabled');", 2000);
			}
		});
	}
}

/*
 * Parse URL
 *
 * @author Anderson Grudtner Martins
 */
function parseURL(urlString)
{
	var url = urlString.split('?');
	var tmp = url[0].split('://');
	
	var urlObj = {
		'completeUrl' : urlString,
		'protocol'    : tmp[0],
		'url'         : url[0],
		'queryString' : url[1],
		'params'      : [],
		'hash'        : null
	};
	
	if (url.length > 1)
	{
		// Hash
		var queryString = url[1].split('#');
		if (queryString.length > 1)
		{
			urlObj.hash = queryString[1];
		}
		
		// GET
		queryString = queryString[0].split('&');
		for (i = 0; i < queryString.length; i++)
		{
			var param = queryString[i].split('=');
			urlObj.params[i] = {
				'name'  : param[0],
				'value' : param[1]
			}
		}
	}
	
	return urlObj;
}

/*
 * Build URL
 *
 * @author Anderson Grudtner Martins
 */
function buildURL(parsedURL)
{
	var url = parsedURL.url;
	
	if (parsedURL.params.length > 0)
	{
		url += '?';
		
		var param;
		for (var i = 0; i < parsedURL.params.length; i++)
		{
			if (i > 0) url += '&';
			
			param = parsedURL.params[i];
			url += param.name + '=' + param.value;
		}
	}
	
	if (parsedURL.hash != null)
	{
		url += '#' + parsedURL.hash;
	}
	
	return url;
}