//获取元素对象
var modal = document.querySelector(".modal");
var close = document.querySelector(".close");
var login = document.querySelector(".login-header");
var bg =  document.querySelector(".login-bg");

//点击弹出遮罩层
login.addEventListener('click' , function() {
    modal.style.display = 'block';
    bg.style.display = 'block';
    modal.style.backgroundColor = 'white';
});
//点击关闭关闭模态框
close.addEventListener('click',function(){
    modal.style.display = 'none';
    bg.style.display = 'none';
});
//拖拽模态框
modal.addEventListener('mousedown',function(e){
    //当指针按下，获取鼠标在模态框中的坐标;(因为是拖拽，所以接下来（x，y）不变！)
    var x = e.pageX - modal.offsetLeft;
    var y = e.pageY - modal.offsetTop;
    //定义回调函数
    var move = function(e){
        modal.style.left = e.pageX - x +'px';
        modal.style.top = e.pageY -y +'px';
    };  
    //鼠标指针按下，触发鼠标指针移动事件
    document.addEventListener('mousemove',move);
    //鼠标左键抬起,移除鼠标指针移动事件
    document.addEventListener('mouseup',function(e){
        document.removeEventListener('mousemove',move);
    })
});
