var map;
var myCenter = new google.maps.LatLng(40.7143528, -74.0059731);
var lstlg = new google.maps.LatLng(40.7143528, -74.0059731);
var tmplg = new google.maps.LatLng(40.7143528, -74.0059731);

var initPosition = new google.maps.Marker({
    position: myCenter,
    icon: 'images/car_ico_25.png',
    map: map,
});

var EARTH_RADIUS = 6378137.0; //单位M
var PI = Math.PI;

function getRad(d) {
    return d * PI / 180.0;
}

//知道两点经纬度后计算球面距离
function getGreatCircleDistance(lat1, lng1, lat2, lng2) {
    var radLat1 = getRad(lat1);
    var radLat2 = getRad(lat2);
    var a = radLat1 - radLat2;
    var b = getRad(lng1) - getRad(lng2);
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000.0;
    return s;
}

function savetodata(src) {
    data = src;
}

function getDestination(srclg) {
    //Get a user near srclg, and return the user's destination location
    //srclg: google,maps.LatLng object
    //return qpp: id index
    var min_dist = 10000;
    var qpp = 0;

    for (var i = 0; i < data.length; i += 1) {
        var temp = getGreatCircleDistance(data[i]["pickup_latitude"], data[i]["pickup_longitude"], srclg.lat(), srclg.lng());
        if (temp < min_dist) {
            min_dist = temp;
            qpp = i;
        }
    }
    console.log(temp, min_dist, qpp);
    console.log(data[qpp]);
    // var destlg = new google.maps.LatLng(data[qpp]["dropoff_latitude"], data[qpp]["dropoff_longitude"]);

    return qpp;
}

function displayLoc(lstlg) {
    function num(x){
    return Number.parseFloat(x).toFixed(3);
}
    return num(lstlg.lat()) + " N " + num(lstlg.lng()) + " W";
}

//主体函数
function initialize() {
    var mapProp = {
        center: myCenter,
        zoom: 15,
        disableDefaultUI: false, //hide the UI buttons
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControlOptions: {
            mapTypeIds: ['standard_style','retro_style','night_style','aube_style']
        }
    };

    map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
    //Associate the styled map with the MapTypeId and set it to display.
    //地图的不同样式
    map.mapTypes.set('standard_style', styledMapType1);
    map.mapTypes.set('retro_style', styledMapType2);
    map.mapTypes.set('night_style', styledMapType3);
    map.mapTypes.set('aube_style', styledMapType4);
    map.setMapTypeId('standard_style');

    directionsDisplay.setMap(map);

    dataVisualize();

    initPosition.setMap(map);
    warring.innerHTML = "本次行程花费   " + "时   " + "分   " + "秒"  ;
    money.innerHTML = "本次载客收入  "  + " 金币  " + "  总收入 "  +"  金币" ;

    google.maps.event.addListener(map, 'click', function(event) {



        if (!isListeningClick) {
            return;
        }
        // Freeze zoom when route
        directionsDisplay.setOptions({ preserveViewport: true });
        //根据行程计算花费的时间
        tmplg=event.latLng;
        initPosition.setMap(null);
		


        getemp();


        window.setTimeout(function(event) {
	     getpass();

        }, 3000);


        isListeningClick = false;
		
    });
	
	

	//使得图层也可以点击
	map.data.addListener('click',function(e){
		google.maps.event.trigger(this.getMap(),'click',e);
	});

     google.maps.event.addListener(directionsDisplay, 'directions_changed', function() {
        //When destination changes
        document.getElementById("current-location").innerHTML = displayLoc(lstlg);
        // displayLoc(lstlg.lat()) + " N " + displayLoc(lstlg.lng()) + " W";

    });
}

function getemp()
{

		var dis = getGreatCircleDistance(lstlg.lat(),lstlg.lng(),tmplg.lat(),tmplg.lng());
		dis = dis/1000.0;
		var spe=1000.0;
		var dishours = Math.floor(dis*spe / 60/60 ) ;
		var disminutes = Math.floor( (dis*spe - dishours*60*60) / 60);
		var disseconds = Math.floor( dis*spe % 60);
		warring.innerHTML = "本次空车行程花费 " +dishours+ "时 " + disminutes+ "分 " +disseconds+ "秒"  ;
		var tmptime = dis *spe;
		maxtime -= tmptime;
		pasttime += tmptime;
		map.panTo(tmplg);
        //calcRoute(lstlg,tmplg);
        draw_trip(lstlg,tmplg);
		document.getElementById("dest-location").innerHTML = displayLoc(tmplg);
        lstlg = tmplg;
	
}
function getpass()
{
	//载客
	tmplg=lstlg;
	var destIndex = getDestination(tmplg);
        var endlg = new google.maps.LatLng(data[destIndex]["dropoff_latitude"], data[destIndex]["dropoff_longitude"]);
        var dur = data[destIndex]["trip_duration"];
        
		//var dur=15*60;  //秒数
		//var endlg =new google.maps.LatLng(40.7143528, -74.0159731); //进行连接
		var montmp=100;
		var durhours = Math.floor(dur/ 60/60 ) ;
		var durminutes = Math.floor( (dur - durhours*60*60) / 60);
		var durseconds = Math.floor( dur % 60);
	   // var dis= 6370*accros[cos(lstlg.lat())*cos(tmplg.lat())*cos(lstlg.lng()-tmplg.lng())+sin(lstlg.lat())*sin(tmplg.lat())];
		//warring.innerHTML = "本次行程花费 " +dis * 60+ "秒";
		
		tmptime = dur;
		maxtime -= tmptime;
		pasttime += tmptime;

		warring.innerHTML = "本次载客行程花费 " +durhours+ "时 " + durminutes+ "分 " +durseconds+ "秒"  ;
		
		allmoney += dur/montmp;
		money.innerHTML = "本次载客收入 " + dur/montmp + " 金币 " + "  总收入" +allmoney +"  金币";
		
		
        //移动地图的中心点

            map.panTo(endlg);
	draw_trip(lstlg,endlg);
	document.getElementById("dest-location").innerHTML = displayLoc(tmplg);
    lstlg = endlg;
}
		
//放上小车

google.maps.event.addDomListener(window, 'load', initialize);

var maxtime = 60 * 60 * 8;
var pasttime = 0;
var allmoney= 0;

//时间的倒计时
function CountDown() {
    var ohours = Math.floor(pasttime / 60 / 60);
    var ominutes = Math.floor((pasttime - ohours * 60 * 60) / 60);
    var oseconds = Math.floor(pasttime % 60);
    var oDate = new Date();
    timer2.innerHTML = oDate.getFullYear() + "年 " + (oDate.getMonth() + 1) + "月 " + oDate.getDate() + "日 " + (ohours + 9) + "时" + ominutes + "分" + oseconds + "秒";
    pasttime = pasttime + 1;
    if (maxtime > 0) {
        hours = Math.floor(maxtime / 60 / 60);
        minutes = Math.floor((maxtime - hours * 60 * 60) / 60);
        seconds = Math.floor(maxtime % 60);
        msg = "距离下班还有" + hours + "时" + minutes + "分" + seconds + "秒";
        document.all["timer"].innerHTML = msg;
        --maxtime;
        if(maxtime<=6*3600 &&  maxtime>4*3600)
         map.setMapTypeId('retro_style');
     else if(maxtime<=4*3600 &&  maxtime>2*3600)
         map.setMapTypeId('night_style');
     else if(maxtime<=2*3600)
         map.setMapTypeId('aube_style');
 }
 else {
    maxtime = 0;
    warring.innerHTML = "时间到!";
    hours = Math.floor(maxtime / 60/60);
    minutes = Math.floor( (maxtime - hours*60*60) / 60);
    seconds = Math.floor(maxtime % 60);
    msg = "距离下班还有" + hours + "时"+ minutes + "分" + seconds + "秒";
    document.all["timer"].innerHTML = msg;

    pasttime = 8*60*60;
    oDate = new Date(); 
    ohours = Math.floor(pasttime / 60/60 ) ;
    ominutes = Math.floor( (pasttime - ohours*60*60) / 60);
    oseconds = Math.floor(pasttime % 60);
    timer2.innerHTML = oDate.getFullYear() +"年 " + (oDate.getMonth()+1) +"月 "  + oDate.getDate()+"日 " + (ohours+9) + "时"+ ominutes + "分" + oseconds + "秒";

    clearInterval(timer);
        //initialize();

    }
}

//自动倒计时
timer = setInterval("CountDown()", 1000);

function Calfee() {

}
