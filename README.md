xBrowserVideo
=============

Cross browser video widget

xBrowserVideo
This widget creates a video element based on the browser being used.

Tested on Firefox 3, 3.6, 6, 7, 8, IE6,7,8,9, Chrome 11+, iOS 5+, Android 2+
videoPoster is buggy on IE9

simply do...
<script type="text/javascript" src="http://widgets.jpdmi.com/xbrowservideo.js"></script>
<div id="my_video" videoWidth="640" videoHeight="480" videoMp4="/path/to/video.mp4" videoWebm="/path/to/video.webm" videoOgg="/path/to/video.ogg" videoPoster="/path/to/poster.jpg" videoAutoplay="autoplay"><!-- video element will be placed here --></div>
xBrowserVideo('my_video');

The videoWidth, videoHeight, and videoMp4 attributes are required, all others are optional

Created by: Nathan Gardner <nathan@factory8.com>

MIT license http://www.opensource.org/licenses/mit-license.php

JarisFLVPlayer licensed under GPL and LGPL: http://jarisflvplayer.org/