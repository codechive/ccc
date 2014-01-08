//--------ת�����ַ����ĺ���--------//

//����λ��Ĵ�С��ת������ͬ5:08��ʱ���ʽ
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

//��Ԫ���
function yearStr(v){
  if(v<=0){
    return 'ǰ'+(-v+1);
  }
  else{
    return v;
  }
}

//����
function dayStr(v){
  return '��һ����������'.charAt(v%7);
}

function dayENStr(v){
  var s=new Array('SUNDAY','MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY');
  return s[v%7];
}

//����
function szodStr(v){
  return 'Ħ�ɱ�ƿ˫������ţ˫�Ӿ�зʨ�Ӵ�Ů�����Ы����'.substring(2*v,2*v+2)+'��';
}

//��֧
function gzStr(v){
  return '����ұ����켺������'.charAt(v%10)+'���ӳ���î������δ������'.charAt(v%12);
}

//��Ф
function zodStr(v){
  v%=12;
  return '����ţ������������Ｆ��'.charAt(v);
}

//ũ������
function lunMStr(v){
  var v0=abs(v);
  var str='һ�����������߰˾�ʮ';
  var vstr=str.charAt((v0-1)%10);
  if(v0>10)
    vstr='ʮ'+vstr;
  if(v0==1)
    vstr='��';
  if(v<0)
    vstr='��'+vstr;
  return vstr;
}

//ũ������
function lunDStr(v){
  var str='ʮһ�����������߰˾ų�ʮإ��';
  var vstr=str.charAt(floor(v/10)+10)+str.charAt(v%10);
  if(v==10)
    vstr='��ʮ';
  return vstr;
}

//����
function sStr(v){
  return 'С����������ˮ���ݴ���������������С��â������С��������ﴦ���¶��ֺ�¶˪������Сѩ��ѩ����'.substring(2*v-2,2*v);
}

//��������
function calTypeStr(v){
  if(v==1){
    return '����';
  }
  else if(v==2){
    return '������';
  }
  else{
    return '������';
  }
}

//�Ƿ�Ϊ������
function ifgStr(v){
  if(v==-1){
    alert('��������ȥ����1582��10��5����10��14�գ������ʮ������ʷ�ϲ����ڣ�');
    return('������');
  }
  else
    return (v)?'������':'������';
}

//˷��
function syzygyStr(syzygyType){
  if(syzygyType=='newMoon'){
    return '˷';
  }
  if(syzygyType=='fullMoon'){
    return '��';
   }
  return '';
}

//����ʳ
function ecliStr(v){
  var str='';
  if(v==1)
    str='��ʳ';
  if(v==2)
    str='��ȫʳ';
  if(v==3)
    str='��ƫʳ';
  return str;
}

//��ʮ����
function stars28Str(n){
  var s='�ǿ�ص����β����ţŮ��Σ�ұڿ�¦θ�ı����ξ�������������';
  return s.charAt(n);
}

//�´���С
function mLStr(mL){
  if(mL==31){
    return '��';
  }
  else if(mL==30){
    return 'С';  	
  }
  else{
    return 'ƽ';
  }
}
