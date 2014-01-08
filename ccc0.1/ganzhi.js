//天干
function gan(x){
  return x%10;
}

//地支
function zhi(x){
  return x%12;
}

//年干支
function yGz(y,m,d,h,calType){
  if((D0(y,m,d,calType)+h/24)<S(y,3,1,calType)-1)  //判断是否过立春
    y-=1;
  return round(rem(y-3-1,60)+1); 
}

//月干支
function mGz(y,m,d,h,calType){

  var sN0=2*m-2;
  var sDt0=S(y,sN0,1,calType);
  var sD0=revD0(y,floor(sDt0),calType);
  var sM0=floor(sD0/100);
  var sDate0=sD0%100+tail(sDt0);

  var sN1=2*m-1;
  var sDt1=S(y,sN1,1,calType);
  var sD1=revD0(y,floor(sDt1),calType);
  var sM1=floor(sD1/100);
  var  sDate1=sD1%100+tail(sDt1);

  var sN2=2*m;
  var sDt2=S(y,sN2,1,calType);
  var sD2=revD0(y,floor(sDt2),calType);
  var sM2=floor(sD2/100);
  var  sDate2=sD2%100+tail(sDt2);

  var sN3=2*m+1;
  if(sN3>24)
    sN3-=24;
  var sDt3=S(y,sN3,1,calType);
  var sD3=revD0(y,floor(sDt3));
  var sM3=floor(sD3/100);
  var  sDate3=sD3%100+tail(sDt3);

  if(sM0==m){
    sN2=sN1; sN1=sN0;
    sDt2=sDt1; sDt1=sDt0; 
    sDate2=sDate1; sDate1=sDate0; 
  }

  if(sM3==m){
    sN1=sN2; sN2=sN3;
    sDt1=sDt2; sDt2=sDt3; 
    sDate1=sDate2; sDate2=sDate3; 
  }

  sN1=rem(sN1-1,24)+1;
  sN2=rem(sN2-1,24)+1;

  var mL=D0(y,m,31,calType)-D0(y,m,0,calType);
  if(sDate2>mL)
    sDate2-=mL;

  var jqDate=(sN1%2==1)?sDate1:sDate2;  //"节气"(n为奇数)所在的阳历日数

  var gzM=((d+h/24)<jqDate)?(m-2):(m-1);   //干支月
  if(gzM<=0)  
    gzM+=12;
  return round(rem(12*gan(yGz(y,m,d,h,calType))+gzM-10-1,60)+1); 
}

//日干支
function dGz(y,m,d,h,calType){
  var gzD=(h<23)?ESD(y,m,d,calType):ESD(y,m,d,calType)+1;
  return round(rem(gzD+15-1,60)+1); 
}

//时干支
function hGz(y,m,d,h,calType){
  var v=12*gan(dGz(y,m,d,h,calType))+floor((h+1)/2)-11;
  if(h==23)
    v-=12; 
  return round(rem(v-1,60)+1);
}

//甲子纳音
function GZNY(gz){
  var s=new Array(
          '海中金',
          '炉中火',
          '大林木',
          '路旁土',
          '剑锋金',
          '山头火',
          '洞下水',
          '城墙土',
          '白腊金',
          '杨柳木',
          '泉中水',
          '屋上土',
          '霹雷火',
          '松柏木',
          '常流水',
          '沙中金',
          '山下火',
          '平地木',
          '壁上土',
          '金箔金',
          '佛灯火',
          '天河水',
          '大驿土',
          '钗钏金',
          '桑松木',
          '大溪水',
          '沙中土',
          '天上火',
          '石榴木',
          '大海水'
  );
  
  return s[floor((gz-1)/2)];
}

//二十八宿
function stars28(y,m,d,calType){
  var v=ESD(y,m,d,calType);
  return round(rem(v-4-1,28)+1); 
}
