$(document).ready(function(){


  
  // DO LIGHTBOXING
  
 
$('a').click(function(){

var lightbox = $(this).attr('rel');

// return if it's a different sort of rel
  
if(lightbox==undefined){lightbox="";}

if(lightbox.search("lightbox")==-1){return true;}
  
var url = $(this).attr('href');

if(typeof lightbox ==="undefined"){

// do nothing

return true;

}else{

// build a lightbox

  $('html').append('<div id="lightbox" style="z-index:9999; position:absolute; top:0; left:0; background:#000; background:rgba(0,0,0,0.9);"></div>')

$('#lightbox').css('height',$(document).height()+'px');
$('#lightbox').css('width',$(window).width()+'px');

//parse lightbox

lightboxsections = lightbox.split(" ");

lightboxdimensions = lightboxsections[1].split("x");

// add the content box

  $('#lightbox').append('<div id="lightboxcontent" style="z-index:10000; background:#fff; box-shadow: 0 0 10px rgba(0,0,0,0.3); padding: 7px; position:absolute; left:50%;"></div><div id="lightboxclose" style="position:absolute; left:50%; background:#fff; background:rgba(255,255,255,0.75); padding: 3px 10px; width: 70px; text-align:right; border-radius: 0.2em 0.2em 0 0; line-height: 20px;"><a href="#" style="text-decoration:none; font-family:arial; color:#004184; font-size: 12px; font-weight:bold;">close <span style="font-size: 17px; color:#ff4200;">×</span></a></div>');



var topfrom = $(window).scrollTop();

var ypos = ($(window).height()/2)-(lightboxdimensions[1]/2)+topfrom;
  

$('#lightboxcontent').css('width', lightboxdimensions[0]+'px');

$('#lightboxcontent').css('marginLeft', (-1*(lightboxdimensions[0]/2))+'px');

$('#lightboxcontent').css('height', lightboxdimensions[1]+'px');

$('#lightboxcontent').css('marginTop', ypos+'px');

$('#lightboxclose').css('marginLeft',((lightboxdimensions[0]/2)-76)+'px');

$('#lightboxclose').css('marginTop',(ypos-27)+'px');

// it's a youtube video

if(lightboxsections[2]=="youtube"){

// what's the id?

var youtubeid=url.split("=");

// use the iframe code

$('#lightboxcontent').append('<iframe width="'+lightboxdimensions[0]+'" height="'+lightboxdimensions[1]+'" src="http://www.youtube.com/embed/'+youtubeid[1]+'?rel=0" frameborder="0" allowfullscreen></iframe>');

// allow removal on click of lightbox

$('#lightbox').click(function(){

$(this).remove();

return false;

});

$('#lightboxclose a').click(function(){

$('#lightbox').remove();

return false;

});

// press esc to exit - only works if the lightbox doesn't have focus?

$(document).keyup(function(e) {
 //console.log(e.keyCode);
 if (e.keyCode == 27) { $('#lightbox').remove();}
});


}


return false;


}

})

  
   // DO SHOW HIDE (new 070812)

  $('.showhide').each(function(){

var shtype = $(this).find('.clickheading').length;

if(shtype>0){ $(this).addClass('custom'); }

else{ $(this).addClass('simple'); }

});


// this is the simple version

 $('.showhide.simple h4').each(function(){

  var wrap = $(this).nextUntil('h4');

  $(wrap).wrapAll('<div class="showhidecontent">');

  });

  // hide the new divs

  $('.simple .showhidecontent').hide();

    // do click things to h4

    $('.showhide.simple h4').hover(function(){

      $(this).addClass('showhidehover');

    }, function(){

      $(this).removeClass('showhidehover');

    });

    $('.showhide.simple h4').click(function(){

      $(this).nextUntil('h4').slideToggle('300');

    });

// this is the custom version

var getelements = $('.showhide.custom').find('.clickheading');

$(getelements).each(function(){

var wrap = $(this).nextUntil('.clickheading');

  $(wrap).wrapAll('<div class="showhidecontent">');

});


$('.custom .showhidecontent').hide();

    // do click things to h4

    $('.showhide.custom .clickheading').hover(function(){

      $(this).addClass('showhidehover');

    }, function(){

      $(this).removeClass('showhidehover');

    });

    $('.showhide.custom .clickheading').click(function(){

      $(this).nextUntil('.clickheading').slideToggle('300');

    });


// end custom version
   
  
  
  // MAKE SOME TABS
  
  if($('div.tabs').length>0){
  
$('.tabs').addClass('jqactive');
$('.tabs>ul li a:last').addClass('last');
    // how many tabs are there
var tabnumber = $('.tabs>ul li').length;
var ulwidth=$('.tabs>ul').width();
$('.tabs>ul li a').css({'width':(Math.round(ulwidth/tabnumber)-21)+'px'});
var horiztab = 0;
$('.tabs>ul li a').each(function(){
var checkheight=$(this).height();
if(checkheight>horiztab){horiztab=checkheight;}
});

$('.tabs>ul li a').css({'height':(horiztab+7)+'px'});
   
$('.tabs>ul li a').click(function(){
    $('.tabs>ul li a').removeClass('current');
    var showtab = $(this).attr('href');
    $(this).addClass('current');
    $('.tabs>div').hide();
    $('.tabs>div#'+showtab).show();
    return false;

});

    
// allow hyperlinking to particular tabs
    
    
if(window.location.hash!=""){
  
var hasclicked=0;
// is it a hash that's part of our tab structure?
$('.tabs>ul li a').each(function(){
if($(this).attr('href')==window.location.hash){
// yes
$(this).click(); hasclicked = 1;

}
// no
if(hasclicked==0){
 $('.tabs>ul li a').eq(0).click();
  
}
});
}else{ 
$('.tabs>ul li a').eq(0).click();
  
}
}
  
  // MAKE ME A GOOGLE MAP

// default map centre
  
  if($('#googlemap').length>0){

var mapcentre = "allsaints";

// map centre from googlemap div

var mapcentre = $('#googlemap').attr('class');

// possible campus locations

var campuslocations = new Array(
"allsaints,53.470977,-2.238159",
"crewe,53.092168516018766,-2.4219730496406555",
"didsbury,53.412002,-2.230477",
"gaskell,53.458998,-2.221293",
"hollings,53.446928,-2.218257");

// which one do we need?

var centreon=0;

for (var i = 0; i < campuslocations.length; i++){
var testfor = campuslocations[i].indexOf(mapcentre);
if(testfor!==-1){ centreon=i;}
}

var realmapcentre = campuslocations[centreon];

var mapcentrecode = realmapcentre.split(",");

map = new GMaps({
    div: '#googlemap',
    lat: mapcentrecode[1],
    lng: mapcentrecode[2]
});
map.addMarker({ lat: 53.470977,  lng: -2.238159, infoWindow: { content: "<div class=\"googlemapinfo\"><h3>All Saints Campus</h3><p>Oxford Road, Manchester M15 6BH</p><p class=\"subjectareas\">Our largest campus. You’ll be studying here if you are on a course in an art, design, humanities, law, science or engineering subject area.</p></div>"}});
       
              
map.addMarker({ lat: 53.092168516018766,  lng: -2.4219730496406555, infoWindow: { content: "<div class=\"googlemapinfo\"><h3>Crewe Campus</h3><p>Crewe Green Road, Crewe CW1 5DU</p><p class=\"subjectareas\">You’ll be studying here if you’ve enrolled in any course that runs at MMU Cheshire.</p></div>"}});
              
map.addMarker({ lat: 53.412002,  lng: -2.230477, infoWindow: { content: "<div class=\"googlemapinfo\"><h3>Didsbury Campus</h3><p>Wilmslow Road, Didsbury Manchester M20 2RR</p><p class=\"subjectareas\">You’ll be studying on the Didsbury campus if you are on a course in an education, social work or youth and community subject area.</p></div>"}});
              
map.addMarker({ lat: 53.458998,  lng: -2.221293, infoWindow: { content: "<div class=\"googlemapinfo\"><h3>Elizabeth Gaskell Campus</h3><p>Hathersage Road, Manchester M13 0JA</p><p class=\"subjectareas\">You’ll be studying here if you are on a course in a health, physiotherapy, psychology or speech pathology subject area.</p></div>"}});
            
map.addMarker({ lat: 53.446928,  lng: -2.218257, infoWindow: { content: "<div class=\"googlemapinfo\"><h3>Hollings Campus</h3><p>Old Hall Lane, Manchester M14 6HR</p><p class=\"subjectareas\">You’ll be studying here if you are on a course in food, tourism, hospitality management or clothing.</p></div>"}});
}
                  
  
  
// MAKE STICKY THINGS
  
if($('.sticky').length>0){

var stickywidth = $('.sticky').width();

var stickyposition = $('.sticky').offset();

var stickyleft = (stickyposition.left);

//var top = $('.sticky').offset().top - parseFloat($('.sticky').css('marginTop').replace(/auto/,0));
  
var top = $('#header').height();

var whattype = $('.sticky').attr("class");

var keepplace = 0;

if(whattype.indexOf('inplace')!=-1){ keepplace =1; }

if(keepplace == 0){

// do the meets the top version

$(window).scroll(function (event) {

	var y = $(this).scrollTop();

  
if (y > $('#header').height()) {
//if (y >= top) {
      $('.sticky').addClass('fixed');
      $('.sticky').css('width', stickywidth+"px"); // if width hasn't been set
      $('.sticky').css('left', stickyleft+"px");
  $('.sticky').css('top', top+"px");

    } else {
      // otherwise remove it
      $('.sticky').removeClass('fixed');
      $('.sticky').css('width', ''); // remove these css setting, they make no sense without the fixed class
      $('.sticky').css('left', '');
      $('.sticky').css('top', '');

    }
});


}

else{

  // lock the div in place

$('.sticky').addClass('fixed');
$('.sticky').css('top', top+"px");
$('.sticky').css('width', stickywidth+"px");
$('.sticky').css('left', stickyleft+"px");

}
    
}

// END STICKY
  
  // MAKE A SLIDESHOW

if($('.slideshow').length>0){

  	var minheight=0;

  	$('.slideshow .slide').each(function(){

  		var testheight = $(this).height();

  		if(testheight>minheight){ minheight=testheight; }

  	});

  	$('.slideshow').css({'minHeight':minheight+'px'});

	var slideshowdisplayed = 4500; // how long the slides are shown for if no 'd[time]' class is set

	var slideshowtransition = 900;

if($('.slideshow.custom').length>0)	{

var findspeed = $('.slideshow.custom').attr("class");

findspeed = findspeed.split(" ");

for( var i = 0; i < findspeed.length; i++)
	{
	
	if(findspeed[i].substring(0,1)=="d"){ 

	var getvariables = findspeed[i].split("_");

		slideshowdisplayed = getvariables[0].substring(1); 

		slideshowtransition = getvariables[1].substring(1); 

	}

	}

}

slideshowdisplayed = parseFloat(slideshowdisplayed);

slideshowtransition = parseFloat(slideshowtransition);
  
  //console.log("d"+slideshowdisplayed+ " t "+slideshowtransition);

$('.slideshow').cycle({ timeout:slideshowdisplayed, speed:slideshowtransition }); 

}

// END SLIDESHOW
  



  
  
if($('.htmltabs').length>0){

var hasfound = 0;
  
var findlast = $('#breadcrumbs p').text();

findlast = findlast.split('\u21E2'); //http://www.fileformat.info/info/unicode/char/21e2/index.htm

matchto = findlast[findlast.length-1];

$('ul.htmltabs li a').each(function(){

  var possibletext = $(this).text();
  
if(possibletext==matchto){

$(this).closest('li').addClass('current');
  hasfound++;

}
    
});

if(hasfound==0){
  
  // check for jQuery adjust variable and action on that.
   
//console.log('ok, it is going to be:'+jQueryAdjust);
   
if(typeof(jQueryAdjust) != "undefined" && jQueryAdjust !== null) {
      
  if(jQueryAdjust=='none'){ 
  // do nothing, all tabs available
  } else{ $('ul.htmltabs li.'+jQueryAdjust).addClass('current');}
      
}else{
       // it wasn't any of the breadcrumb options, jQuery adjust doesn't exist, so we'll assume it's the first one.
      $('ul.htmltabs li:first').addClass('current');
    }
  
}

}
  
// make simple show hide section
  
 if($('.showhidesimple').length>0){
   
   $('.showhidesimple').addClass('jq');
  
    $('.showhidesimple .shcopy').hide();
    
    var headinglevel="h4";

    var checkforheadinglevel = $('.showhidesimple').attr('class').split(/\s+/);

    $.each(checkforheadinglevel, function(index, item)
    {

    	if(item.substring(0,3)=="use"){

    		headinglevel=item.substring(3);
    

    	}

    });

  $('.showhidesimple>'+headinglevel).addClass('closed');
    $('.showhidesimple>'+headinglevel).click(function(){
    	
      var setheading = $(this);
      
      var clamshelltitle = $(this).text();
      
       _gaq.push(['_trackEvent', 'MoneyMattersClamshells', 'Click', clamshelltitle]);
      
      
      $(this).next('.shcopy').slideToggle('300', function() {
        if($(this).is(':hidden')){$(setheading).addClass('closed'); 
        $(setheading).removeClass('open');}else{
          $(setheading).addClass('open');
          $(setheading).removeClass('closed')
        }
  });
      
    });
    
    $('.showhidesimple>'+headinglevel).hover(function(){
     
      $(this).addClass('hover');
    }, function(){
     
      $(this).removeClass('hover');
    });
    
  }
  
  
});