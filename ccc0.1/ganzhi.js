//���
function gan(x){
  return x%10;
}

//��֧
function zhi(x){
  return x%12;
}

//���֧
function yGz(y,m,d,h,calType){
  if((D0(y,m,d,calType)+h/24)<S(y,3,1,calType)-1)  //�ж��Ƿ������
    y-=1;
  return round(rem(y-3-1,60)+1); 
}

//�¸�֧
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

  var jqDate=(sN1%2==1)?sDate1:sDate2;  //"����"(nΪ����)���ڵ���������

  var gzM=((d+h/24)<jqDate)?(m-2):(m-1);   //��֧��
  if(gzM<=0)  
    gzM+=12;
  return round(rem(12*gan(yGz(y,m,d,h,calType))+gzM-10-1,60)+1); 
}

//�ո�֧
function dGz(y,m,d,h,calType){
  var gzD=(h<23)?ESD(y,m,d,calType):ESD(y,m,d,calType)+1;
  return round(rem(gzD+15-1,60)+1); 
}

//ʱ��֧
function hGz(y,m,d,h,calType){
  var v=12*gan(dGz(y,m,d,h,calType))+floor((h+1)/2)-11;
  if(h==23)
    v-=12; 
  return round(rem(v-1,60)+1);
}

//��������
function GZNY(gz){
  var s=new Array(
          '���н�',
          '¯�л�',
          '����ľ',
          '·����',
          '�����',
          'ɽͷ��',
          '����ˮ',
          '��ǽ��',
          '������',
          '����ľ',
          'Ȫ��ˮ',
          '������',
          '���׻�',
          '�ɰ�ľ',
          '����ˮ',
          'ɳ�н�',
          'ɽ�»�',
          'ƽ��ľ',
          '������',
          '�𲭽�',
          '��ƻ�',
          '���ˮ',
          '������',
          '���˽�',
          'ɣ��ľ',
          '��Ϫˮ',
          'ɳ����',
          '���ϻ�',
          'ʯ��ľ',
          '��ˮ'
  );
  
  return s[floor((gz-1)/2)];
}

//��ʮ����
function stars28(y,m,d,calType){
  var v=ESD(y,m,d,calType);
  return round(rem(v-4-1,28)+1); 
}
