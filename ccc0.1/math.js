//-------��ѧ����------//

function PI(){
  return Math.PI;
}

function sin(x){
  return Math.sin(x);
}

function cos(x){
  return Math.cos(x);
}

function abs(x){
  return Math.abs(x);
}

function floor(x){
  return Math.floor(x);
}

function round(x){
  return Math.round(x);
}

function tail(x){
  return x-floor(x);
}

function rem(x,w){  //��������
  return tail(x/w)*w;
}

function nnr(x,w){  //�Ǹ�����
  if(x<0){
    x+=(-x*w);
  }
  return x%w;	
}