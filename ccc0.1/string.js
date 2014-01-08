//--------转换成字符串的函数--------//

//将单位天的纯小数转换成如同5:08的时间格式
function dToStr(dv){
  var h=floor(dv*24);
  var min=floor((dv*24-h)*60);
  if(h<10){
    h='0'+h;
  }
  if(min<10){
    min='0'+min;
  }
  return h+':'+min;
}

//公元年份
function yearStr(v){
  if(v<=0){
    return '前'+(-v+1);
  }
  else{
    return v;
  }
}

//星期
function dayStr(v){
  return '日一二三四五六'.charAt(v%7);
}

function dayENStr(v){
  var s=new Array('SUNDAY','MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY');
  return s[v%7];
}

//星座
function szodStr(v){
  return '摩羯宝瓶双鱼白羊金牛双子巨蟹狮子处女天秤天蝎射手'.substring(2*v,2*v+2)+'座';
}

//干支
function gzStr(v){
  return '癸甲乙丙丁戊己庚辛壬'.charAt(v%10)+'亥子丑寅卯辰巳午未申酉戌'.charAt(v%12);
}

//生肖
function zodStr(v){
  v%=12;
  return '猪鼠牛虎兔龙蛇马羊猴鸡狗'.charAt(v);
}

//农历月数
function lunMStr(v){
  var v0=abs(v);
  var str='一二三四五六七八九十';
  var vstr=str.charAt((v0-1)%10);
  if(v0>10)
    vstr='十'+vstr;
  if(v0==1)
    vstr='正';
  if(v<0)
    vstr='闰'+vstr;
  return vstr;
}

//农历日数
function lunDStr(v){
  var str='十一二三四五六七八九初十廿三';
  var vstr=str.charAt(floor(v/10)+10)+str.charAt(v%10);
  if(v==10)
    vstr='初十';
  return vstr;
}

//节气
function sStr(v){
  return '小寒大寒立春雨水惊蛰春分清明谷雨立夏小满芒种夏至小暑大暑立秋处暑白露秋分寒露霜降立冬小雪大雪冬至'.substring(2*v-2,2*v);
}

//公历类型
function calTypeStr(v){
  if(v==1){
    return '公历';
  }
  else if(v==2){
    return '格里历';
  }
  else{
    return '儒略历';
  }
}

//是否为格里历
function ifgStr(v){
  if(v==-1){
    alert('公历历法去掉了1582年10月5日至10月14日，因而这十天在历史上不存在！');
    return('不存在');
  }
  else
    return (v)?'格里历':'儒略历';
}

//朔望
function syzygyStr(syzygyType){
  if(syzygyType=='newMoon'){
    return '朔';
  }
  if(syzygyType=='fullMoon'){
    return '望';
   }
  return '';
}

//日月食
function ecliStr(v){
  var str='';
  if(v==1)
    str='日食';
  if(v==2)
    str='月全食';
  if(v==3)
    str='月偏食';
  return str;
}

//二十八宿
function stars28Str(n){
  var s='角亢氐房心尾箕斗牛女虚危室壁奎娄胃昴毕觜参井鬼柳星张翼轸';
  return s.charAt(n);
}

//月大月小
function mLStr(mL){
  if(mL==31){
    return '大';
  }
  else if(mL==30){
    return '小';  	
  }
  else{
    return '平';
  }
}
