//拼图游戏区域
var gamearea=document.getElementById('gamearea');
//拼图图片
var IMG=new Image();
//获取开始游戏按钮
var btnStartgame=document.getElementById('startgame');
//获取更改图片按钮
var btnchangeimg=document.getElementById('changeimg');
//游戏难度n*n
var n=parseInt(document.getElementById('diff').value);
//当前图片数组中的下标索引
var cur=1;
//获取提示按钮
var btntishi=document.getElementById('tishi');
//提示图
var tishitu=document.getElementById('tishitu');
//获取步数更新标签
var step=document.getElementById('step');
//当前已走步数
var curstep=0;
//获取难度确认按钮
var btnOk=document.getElementById('ok');
function init(){
    //设置游戏区域大小
    gamearea.style.width=600+"px";
    gamearea.style.height=600+"px";
    //初始化为第一张图片显示
    IMG.src="./images/01.jpg";
    ready(IMG.src,n);
    //点击改变图片
    btnchangeimg.onclick=changeImg;
    //点击确认难度
    btnOk.onclick=diff;
    //提示功能
    btntishi.onclick=tiShi;
    
}
// 确认难度
function diff(){
    //步数重置0
    curstep=0;
    step.innerHTML=curstep;
    gamearea.innerHTML="";
    btnStartgame.innerHTML="开始游戏吧~";
    n=parseInt(document.getElementById('diff').value);
    if(n>2){
        ready(IMG.src,n);
    }else{
        alert("请输入大于等于3的数字哦~");
    }
}
//更改图片
function changeImg(){
    //步数重置0
    curstep=0;
    step.innerHTML=curstep;
    gamearea.innerHTML="";
    btnStartgame.innerHTML="开始游戏吧~";
    //所有图片路径
    var imgUrl=["./images/01.jpg","./images/02.jpg","./images/03.jpg","./images/04.jpg","./images/05.jpg","./images/06.jpg","./images/07.jpg","./images/08.jpg","./images/09.jpg","./images/10.jpg","./images/11.jpg","./images/12.jpg","./images/13.jpg"];
    if(cur!=imgUrl.length-1){
        IMG.src=imgUrl[cur];
        cur++;
    }else{
        IMG.src=imgUrl[cur];
        cur=0;
    }
    ready(IMG.src,n);
}
//点击提示按钮显示全图
function tiShi(){
    tishitu.style.background="url("+IMG.src+")";
    tishitu.style.display="block";
    setTimeout(function(){
        tishitu.style.display="none";
    },3000);
}
//游戏准备
function ready(url,n){
    //需要剪裁的宽高等于拼图游戏区域的1/n
    var w=parseFloat(gamearea.style.width)/n;
    var h=parseFloat(gamearea.style.height)/n;
    //展示图片并开始将图片剪成n*n
    var imgDiv=new Array();
    for(var i=0;i<n;i++){
        imgDiv[i]=new Array();
        for(var j=0;j<n;j++){
            if(i==(n-1)&&j==(n-1)){
                imgDiv[i][j]=document.createElement("div");
                imgDiv[i][j].style.width=w+"px";
                imgDiv[i][j].style.height=h+"px";
                imgDiv[i][j].style.position="absolute";
                imgDiv[i][j].style.left=w*j+"px";
                imgDiv[i][j].style.top=h*i+"px";
                gamearea.appendChild(imgDiv[i][j]);
            }else{
                imgDiv[i][j]=document.createElement("div");
                imgDiv[i][j].style.width=w+"px";
                imgDiv[i][j].style.height=h+"px";
                imgDiv[i][j].style.backgroundImage="url("+url+")";
                imgDiv[i][j].style.backgroundPosition="-"+w*j+"px -"+h*i+"px";
                imgDiv[i][j].style.position="absolute";
                imgDiv[i][j].style.left=w*j+"px";
                imgDiv[i][j].style.top=h*i+"px";
                gamearea.appendChild(imgDiv[i][j]);
            }
        }
    }
    //提示开始游戏
    gamearea.onclick=function(){alert("还没点开始游戏啦~");}
    //点击按钮出发开始游戏函数
    btnStartgame.onclick=startGame;
    function startGame(){
        //步数重置0
        curstep=0;
        step.innerHTML=curstep;
        //取消提示的点击事件
        gamearea.onclick="";
        btnStartgame.innerHTML="重新生成~";
        //开始游戏并打乱小图片顺序
        //随机生成数字
        var numI,numJ;
        //存放下标的数组
        var p=new Array(n);
        var q=new Array(n);
        //存放下标0,1,2,...,n-1
        for(var i=0;i< p.length;i++){
            p[i]=i;
            q[i]=i;
        }
        //开始打乱小图片顺序
        for(var i=0;i<n;i++){
            numI=Math.floor(Math.random()*p.length);
            for(var j=0;j<n;j++){
                numJ=Math.floor(Math.random()*q.length);
                imgDiv[p[numI]][q[numJ]].style.left=w*j+"px";
                imgDiv[p[numI]][q[numJ]].style.top=h*i+"px";
                q.splice(numJ,1);
            }
            p.splice(numI,1);
            for(var j=0;j<n;j++){
                q[j]=j;
            }
        }
    }
    //给所有小图片添加点击事件
    for(var i=0;i<n;i++){
        for(var j=0;j<n;j++){
            imgDiv[i][j].addEventListener('click',imgMove,false);
        }
    }
    //点击事件触发函数
    function imgMove(event){
        //点击一次步数加一并更新步数显示
        curstep++;
        step.innerHTML=curstep;
        var l=parseFloat(imgDiv[n-1][n-1].style.left);
        var t=parseFloat(imgDiv[n-1][n-1].style.top);
        var curImgL=parseFloat(this.style.left);
        var curImgT=parseFloat(this.style.top);
        var subT=Math.abs(Math.abs(curImgT-t)-h);
        var subL=Math.abs(Math.abs(l-curImgL)-w);
        //如果小图片位于空白区域四周则点击时交换
        if((subT<h&&l==curImgL)||(subL<w&&t==curImgT)){
            this.style.left=l+"px";
            this.style.top=t+"px";
            imgDiv[n-1][n-1].style.left=curImgL+"px";
            imgDiv[n-1][n-1].style.top=curImgT+"px";
            //检查是否拼图完成
            check();
        }
    }
    function check(){
        var suc=0;
        for(var i=0;i<n;i++){
            for(var j=0;j<n;j++){
                if(Math.abs(parseFloat(imgDiv[i][j].style.left)-w*j)<w&&Math.abs(parseFloat(imgDiv[i][j].style.top)-h*i)<h){
                    suc++;
                }
                if(suc==n*n){
                    alert("恭喜完成~");
                    btnStartgame.innerHTML="开始游戏吧~";
                }
            }
        }
    }
}
window.addEventListener('load',init,false);