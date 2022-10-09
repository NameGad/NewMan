class Food{
    // 定义一个属性表示食物所对应的元素
    element: HTMLElement;

    constructor(){
        this.element = document.querySelector('.food')!;
    }

    // 获取食物坐标的方法
    get x(){
        return this.element.offsetLeft
    }
    get y(){
        return this.element.offsetTop
    }

    // 修改食物位置
    change(){
        // 随机生成：食物的位置最小是0，最大290
        // 蛇移动一格是10，所有要求食物必须是10的倍数
        let top = Math.round(Math.random() * 29) * 10
        let left = Math.round(Math.random() * 29) * 10
        this.element.style.left = left + 'px'
        this.element.style.top= top + 'px'
    }
}
export default Food