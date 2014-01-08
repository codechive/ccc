//引用基本日历函数库
document.write(
'<script src="ccc0.1/math.js"></script>'+
'<script src="ccc0.1/solar.js"></script>'+
'<script src="ccc0.1/sterm.js"></script>'+
'<script src="ccc0.1/ganzhi.js"></script>'+
'<script src="ccc0.1/lunar.js"></script>'+
'<script src="ccc0.1/string.js"></script>'+
'<script src="ccc0.1/ftvl.js"></script>'+
'<script src="ccc0.1/era.js"></script>'+
'<script src="ccc0.1/timezone.js"></script>'
);

//节气子类
function sTermClass(year,month,date,time,zone,calType,monthLength){
   var sN0=2*month-2;
   var sDt0=S(year,sN0,1,calType);
   var sD0=revD0(year,floor(sDt0),calType);
   var sM0=floor(sD0/100);
   sDate0=sD0%100;

   var sN1=2*month-1;
   var sDt1=S(year,sN1,1,calType);
   var sD1=revD0(year,floor(sDt1),calType);
   var sM1=floor(sD1/100);
   var sDate1=sD1%100;

   var sN2=2*month;
   var sDt2=S(year,sN2,1,calType);
   var sD2=revD0(year,floor(sDt2),calType);
   var sM2=floor(sD2/100);
   var sDate2=sD2%100;

   var sN3=2*month+1;
   if(sN3>24)
      sN3-=24;
   var sDt3=S(year,sN3,1,calType);
   var sD3=revD0(year,floor(sDt3),calType);
   var sM3=floor(sD3/100);
   var sDate3=sD3%100;

   if(sM0==month){
     sN2=sN1; sN1=sN0;
     sDt2=sDt1; sDt1=sDt0; 
     sDate2=sDate1; sDate1=sDate0; 
   }

   if(sM3==month){
     sN1=sN2; sN2=sN3;
     sDt1=sDt2; sDt2=sDt3; 
     sDate1=sDate2; sDate2=sDate3; 
   }

   sN1=rem(sN1-1,24)+1;
   sN2=rem(sN2-1,24)+1;

   if(sDate2>monthLength){
     sDate2-=monthLength;
   }

   var sT1=sStr(sN1)+':'+month+'月'+sDate1+'日'+dToStr(tail(sDt1));
   var sT2=sStr(sN2)+':'+month+'月'+sDate2+'日'+dToStr(tail(sDt2));

   this.sTermInMonth=new Array(sT1,sT2);

   if(date==sDate1){
     this.sTermName=sStr(sN1);
     this.sTermTime=dToStr(tail(sDt1));
   }
   else if(date==sDate2){
     this.sTermName=sStr(sN2);
     this.sTermTime=dToStr(tail(sDt2));
   }
   else{
     this.sTermName='';
     this.sTermTime='';
   }
}

//农历子类
function lunarClass(year,month,date,calType){
   var lunarInfo=new lunarCal(year,month,date,calType);

   this.lunarDate=lunarInfo.date;
   this.lunarDate_Str=lunDStr(this.lunarDate);
   this.lunarMonth=lunarInfo.month;
   this.lunarMonth_Str=lunMStr(this.lunarMonth);
   this.syzygyType=lunarInfo.syzygyType;
   this.syzygyTime=lunarInfo.syzygyTime;
   this.syzygyTime_Str=(this.syzygyTime==-1)?'':dToStr(this.syzygyTime);
   this.syzygyName=syzygyStr(this.syzygyType);
   this.ecliType=lunarInfo.ecliType;
   this.ecliType_Str=ecliStr(lunarInfo.ecliType);
   this.ecliTime=lunarInfo.ecliTime;
   this.ecliTime_Str=(this.ecliTime==-1)?'':dToStr(this.ecliTime);
   
   this.lunFtvl=function (){
     return lunFtvl(this.lunarMonth,this.lunarDate);
   }
}


//中国日历类（Chinese Calendar Class（CCC））

function CCC(year,month,date,time,zone,calType){

  ////////////////////////////函数参数兼容处理////////////////////////////
  //三参数: CCC(year,month,date)
  if(calType==undefined&&zone==undefined&&time==undefined){
      time="0:0:0:0";  //默认为零时
      zone=8;  //默认为北京时间
      calType=1;  //默认为Gregorian
  }

  //四参数
  else if(calType==undefined&&zone==undefined){
    //四参数1:  CCC(year,month,date,time)
    if(isNaN(time)){
      zone=8;  //默认为北京时间
      calType=1;  //默认为Gregorian
    }

    //四参数2:  CCC(year,month,date,calType)
    else{
      calType=time;
      zone=8;  //默认为北京时间
      time="0:0:0:0";  //默认为零时
    }
  }

  //五参数: CCC(year,month,date,time,calType)
  else if(calType==undefined){
    calType=zone;
    zone=8;  //默认为北京时间
  }

   ///////////////////////////////////////////////////////////////////////

   //////////////////////////  公历属性  //////////////////////////////

   this.year=function (){
     return year;	
   }
   this.month=function (){
     return month;	
   }
   this.date=function (){
     return date;	
   }
   this.time=function (){
     return time;	
   }
   this.zone=function (){
     return zone;	
   }
   this.calType=function (){
     return calType;	
   }
   
   this.calType_Str=function (){
     return calTypeStr(this.calType());	
   }

   var timeArray=time.split(':');

   this.hour=function (){
     return parseInt(timeArray[0]);	
   }
   this.minute=function (){
     return parseInt(timeArray[1]);	
   }
   this.second=function (){
     return parseInt(timeArray[2]);
   }

   this.JulianDay=function (){
     return JD(this.year(),this.month(),this.date(),this.hour(),this.minute(),this.second(),this.zone(),this.calType());
   }

   this.day=function (){
     return Day(this.year(),this.month(),this.date(),this.calType());
   }
   this.day_Str=function (){
     return dayStr(this.day());
   }
   this.day_ENStr=function (){
     return dayENStr(this.day());
   }

   this.solarZodiac=function (){
     return sZod(this.month(),this.date());
   }
   this.solarZodiac_Str=function (){
     return szodStr(this.solarZodiac());
   }
   
   this.yGz=function (){
     return yGz(this.year(),this.month(),this.date(),this.hour(),this.calType());
   }
   this.yGz_Str=function (){
     return gzStr(this.yGz());
   }
   this.mGz=function (){
     return mGz(this.year(),this.month(),this.date(),this.hour(),this.calType());
   }
   this.mGz_Str=function (){
     return gzStr(this.mGz());
   }
   this.dGz=function (){
     return dGz(this.year(),this.month(),this.date(),this.hour(),this.calType());
   }
   this.dGz_Str=function (){
     return gzStr(this.dGz());
   }
   this.hGz=function (){
     return hGz(this.year(),this.month(),this.date(),this.hour(),this.calType());
   }
   this.hGz_Str=function (){
     return gzStr(this.hGz());
   }   

   this.stars28=function (){
     return stars28(this.year(),this.month(),this.date(),this.calType());
   }
   this.stars28_Str=function (){
     return stars28Str(this.stars28());
   }      
   
   this.sFtvl=function (){
     return sFtvl(this.year(),this.month(),this.date(),this.calType());
   }
   this.jqFtvl=function (){
     return jqFtvl(this.year(),this.month(),this.date(),this.calType());
   }
   
   this.monthLength=function (){
     return D0(this.year(),this.month()+1,1,this.calType())-D0(this.year(),this.month(),1,this.calType());
   } 
   this.monthLength_Str=function (){
     return mLStr(this.monthLength());
   } 

   this.chineseZodiacName=function (){
     return zodStr(this.yGz());
   }
   
   this.chineseEra=function (){
     return chineseEra(this.year());	
   }
   
   
   ///////////////////////所在阳历月的两个节气日期和交节时刻/////////////////////////
   this.solarTerm=function (){
     return new sTermClass(year,month,date,time,zone,calType,this.monthLength());
   }


   
   //////////////////////////  农历属性  //////////////////////////////
  this.lunar=function (){
    return new lunarClass(year,month,date,calType);
  }


}




