/**
 *  xBrowserVideo
 *  This widget creates a video element based on the browser being used.
 *
 *  Tested on Firefox 3, 3.6, 6, 7, 8, IE6,7,8,9, Chrome 11+, iOS 5+, Android 2+
 *  videoPoster is buggy on IE9
 *  
 *  simply do...
 *  <script type="text/javascript" src="http://widgets.jpdmi.com/xbrowservideo.js"></script>
 *  <div id="my_video" videoWidth="640" videoHeight="480" videoMp4="/path/to/video.mp4" videoWebm="/path/to/video.webm" videoOgg="/path/to/video.ogg" videoPoster="/path/to/poster.jpg" videoAutoplay="autoplay"><!-- video element will be placed here --></div>
 *  xBrowserVideo('my_video');
 *
 *  The videoWidth, videoHeight, and videoMp4 attributes are required, all others are optional
 *  
 *  Created by: Nathan Gardner <nathan@factory8.com>
 *
 *  MIT license http://www.opensource.org/licenses/mit-license.php
 */

function xBrowserVideo(selectorId) {
    
    var containerElement = document.getElementById(selectorId);
    
    var XBVdetectVideoSupport = function () {
        var detect = document.createElement('video') || false;
        this.html5 = detect && typeof detect.canPlayType !== "undefined";
        this.mp4 = this.html5 && (detect.canPlayType("video/mp4") === "maybe" || detect.canPlayType("video/mp4") === "probably");
        this.webm = this.html5 && (detect.canPlayType("video/webm") === "maybe" || detect.canPlayType("video/webm") === "probably");
        this.ogg = this.html5 && (detect.canPlayType("video/ogg") === "maybe" || detect.canPlayType("video/ogg") === "probably");
        return this;
    }
    
    var XBVuseFlashPlayer = function(vid,width,height,poster,autoplay) {
        
        if(autoplay == 'autoplay') {
            autoplay = 'true';
        } else {
            autoplay = 'false';
        }
        
        var posterCode = '';
        
        if(poster) {
            posterCode = '&amp;poster='+poster;
        }
        
        var videoCode = '\
        <object width="'+width+'" height="'+height+'" type="application/x-shockwave-flash" data="JarisFLVPlayer.swf" wmode="transparent">\
            <param name="wmode" value="transparent" />\
            <param name="movie" value="JarisFLVPlayer.swf" />\
            <param name="flashvars" value="autostart='+autoplay+'&amp;controltype=1&amp;source='+vid+posterCode+'" />\
        </object>';
        
        return videoCode;
        
    }
    
    var XBVuseHTML5Player = function(vidmp4,vidwebm,vidogg,width,height,poster,autoplay) {
        
        if(poster) {
            var posterHtml = 'poster="' + poster + '"';
        } else {
            var posterHtml = '';
        }
        
        if(autoplay != 'autoplay') {
            autoplay = '';
        }
        
        var videoCode = '<video preload="none" id="video" width="'+width+'" height="'+height+'" '+posterHtml+' controls '+autoplay+'>';
        if(vidmp4) { videoCode += '<source src="'+vidmp4+'" type="video/mp4" />'; }
        if(vidwebm) { videoCode += '<source src="'+vidwebm+'" type="video/webm" />'; }
        if(vidogg) { videoCode += '<source src="'+vidogg+'" type="video/ogg" />'; }
        videoCode += '</video>';
        
        return videoCode;
        
    }
    
    // make sure container exists
    if(!containerElement) {
        alert('Unknown ID ' + selectorId);
        return;
    }
    
    // get all the attributes from container
    var htmlCode = '';
    var videoSupport = XBVdetectVideoSupport();
    var videoWidth = containerElement.getAttribute('videoWidth');
    var videoHeight = containerElement.getAttribute('videoHeight');
    var videoMp4 = containerElement.getAttribute('videoMp4');
    var videoWebm = containerElement.getAttribute('videoWebm');
    var videoOgg = containerElement.getAttribute('videoOgg');
    var videoPoster = containerElement.getAttribute('videoPoster');
    var videoAutoplay = containerElement.getAttribute('videoAutoplay');
    
    // videos default to empty string
    if(videoMp4 == null) { videoMp4 = ''; }
    if(videoWebm == null) { videoWebm = ''; }
    if(videoOgg == null) { videoOgg = ''; }
    
    // videoMp4 is required
    if(!videoMp4) {
        alert('videoMp4 attribute is required');
        return;
    }
    
    // videoWidge and videoHeight are required
    if(!videoWidth || !videoHeight) {
        alert('videoWidth and videoHeight attributes are required');
        return;
    }
    
    // autoplay defaults to false
    if(!videoAutoplay) {
        videoAutoplay = false;
    } else {
        videoAutoplay = 'autoplay';
    }
    
    // use flash or html5?
    if((!videoSupport.mp4) && (videoWebm == '' || !videoSupport.webm) && (videoOgg == '' || !videoSupport.Ogg)) {
        // dont have a video format that browser supports, use Flash
        htmlCode = XBVuseFlashPlayer(videoMp4,videoWidth,videoHeight,videoPoster,videoAutoplay);
    } else {
        // html5 video is supported
        htmlCode = XBVuseHTML5Player(videoMp4,videoWebm,videoOgg,videoWidth,videoHeight,videoPoster,videoAutoplay);
    }
    
    // create the element
    containerElement.innerHTML = htmlCode;
    
}