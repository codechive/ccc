//---------公历--------//

//判断Gregorian历还是Julian历  
function ifGr(y,m,d,calType){  //阳历y年m月(1,2,..,12,下同)d日,calType=1,2,3分别表示标准日历,Gregorge历和Julian历，下同，其中所谓“标准日历是指：1582-10-4之前采用Julian，1582-10-15以后采用Gregorian，1582-10-5 ~ 1582-10-14为空”

  switch(calType){
    case 1:
      if(y>1582||(y==1582&&m>10)||(y==1582&&m==10&&d>14))
        return 1;  //Gregorian
      else 
        if(y==1582&&m==10&&d>=5&&d<=14)
          return -1;  //空
        else 
          return 0;  //Julian
      break;
  
    case 2:
      return 1;  //Gregorian
      break;
    
    case 3:
      return 0;  //Julian
      break;    
  }

}

//日差天数
function D0(y,m,d,calType){
  var ifG=ifGr(y,m,d,calType);
  var monL=new Array(0,31,28,31,30,31,30,31,31,30,31,30,31);
  
  if(ifG==-1){
    return Infinity;  
  }
  
  if(ifG==1){
    if((y%100!=0&&y%4==0)||(y%400==0)){
      monL[2]+=1;
    }
    else ;
  }
  else{
    if(y%4==0){
      monL[2]+=1;
    }
    else ;
  }
    
  var v=0;
  for(var i=0;i<=m-1;i++){
    v+=monL[i];
  }
  v+=d;
  
  return v;
}

//反日差天数
function revD0(y,x,calType){  // y年日差天数D0为x
  var j,m,mL;
  
  for(j=1;j<=12;j++){
    mL=D0(y,j+1,1,calType)-D0(y,j,1,calType);
    
    if(x<=mL||j==12){
      m=j;
      break;
    }
    else{
       x-=mL;        
    }
    
  }
  
  if((calType==1)&&(y==1582&&m==10&&x>=5&&x<=14)){
    return Infinity;	
  }
  
  return 100*m+x;
}

//年差天数
function D(y,calType){
  v=(y-1)*365+floor((y-1)/4);  //Julian的年差天数
  if(ifGr(y,12,1,calType)==1)
    v+=-floor((y-1)/100)+floor((y-1)/400);  //Gregorian的年差天数
  return v;
}

//标准天数(Standard Days)(y年m月d日距该历制的1年1月0日的天数)
function SD(y,m,d,calType){
  if(ifGr(y,m,d,calType)==-1)
    return Infinity;
  
  if(ifGr(y,m,d,calType)==1)
    return (y-1)*365+floor((y-1)/4)-floor((y-1)/100)+floor((y-1)/400)+D0(y,m,d,calType);   //Gregorian的标准天数
    
  else
    return (y-1)*365+floor((y-1)/4)+D0(y,m,d,calType);                                     //Julian的标准天数 

}

//等效标准天数(Equivalent Standard Days)(y年m月d日距该历制的1年1月0日的天数)
function ESD(y,m,d,calType){
  if(ifGr(y,m,d,calType)==-1)
    return Infinity;
  
  if(ifGr(y,m,d,calType)==1)
    return SD(y,m,d,calType);   //Gregorian的标准天数
    
  else
    return SD(y,m,d,calType)-2;   //Julian的标准天数 

}

//儒略日
function JD(y,m,d,h,min,sec,zone,calType){
  var ifG=ifGr(y,m,d,calType);
  var jt=(h+(min+sec/60)/60)/24-0.5-zone/24;
  var jd=(ifG)?(SD(y,m,d,calType)+1721425+jt):(SD(y,m,d,calType)+1721423+jt);//儒略日

  return jd;
}

//反标准天数
function revSD(x,calType,ifG){  //当calType==1且x==577736或x<=577737时，ifG才起作用，ifG=1表示返回的是标准日历的10-15和10-16日（是Gregorian），ifG=0表示返回的是标准日历的10-3和10-4日（是Julian）
	
  var u0=floor(x/365.25)+1;  //试探一个最小估计的年份值
  
  var u0D0=x-D(u0,calType);  //x的日差天数
  
  if((calType==1&&ifG==0)&&(x>=577461&&x<=577737)){
    u0D0-=12;	
  }

  var u0L=D0(u0,12,31,calType);  //u0年的长度
  
  if(u0D0>u0L){
    u0D0-=u0L;
    u0++;
  }
  
  return u0*10000+revD0(u0,u0D0,calType);
} 

//反儒略日
function revJD(x,zone,calType){

  var jt=tail(x)+0.5+zone/24;
  var ymd,h,min,sec;
  
  var x0=x;  //备份x
  
  x=floor(x);
  
  if(jt>=1){
    jt-=1;
    x++;	
  }
  
  h=floor(jt*24);
  min=floor(tail(jt*24-h)*60);
  sec=floor(tail(jt*24*60-h*60-min)*60);
	
  if(calType==2){
    ymd=revSD(x-1721425,calType,1);
  }
  
  if(calType==3){
    ymd=revSD(x-1721423,calType,1);
  }
  
  if(calType==1){
    if(x0<2299160.5-zone/24){
      ymd=revSD(x-1721423,calType,0);
    }
    else{
      ymd=revSD(x-1721425,calType,1);
    }
  }
  
  return ymd*1000000+h*10000+min*100+sec;
}

//======儒略历与格里历相互转化的函数======
//儒略历转换成格里历
function Ju2Gr(y,m,d){
  return floor(revJD(JD(y,m,d,12,0,0,0,3),0,2)/1000000);
}

//格里历转换成儒略历
function Gr2Ju(y,m,d){
  return floor(revJD(JD(y,m,d,12,0,0,0,2),0,3)/1000000);
}

//儒略历转换成标准历
function Ju2No(y,m,d){
  return floor(revJD(JD(y,m,d,12,0,0,0,3),0,1)/1000000);
}

//标准历转换成儒略历
function No2Ju(y,m,d){
  return floor(revJD(JD(y,m,d,12,0,0,0,1),0,3)/1000000);
}

//格里历转换成标准历
function Gr2No(y,m,d){
  return floor(revJD(JD(y,m,d,12,0,0,0,2),0,1)/1000000);
}

//标准历转换成格里历
function No2Gr(y,m,d){
  return floor(revJD(JD(y,m,d,12,0,0,0,1),0,2)/1000000);
}



//星期
function Day(y,m,d,calType){
  return nnr(ESD(y,m,d,calType),7);
}

//星座
function sZod(m,d){
  var zodd=new Array(1222,122,222,321,421,522,622,722,822,922,1022,1122,1222);
  if((100*m+d)>=zodd[0]||(100*m+d)<zodd[1])
    var i=0;
  else
    for(var i=1;i<12;i++){
    if((100*m+d)>=zodd[i]&&(100*m+d)<zodd[i+1])
      break;
    }
  return i;
}
