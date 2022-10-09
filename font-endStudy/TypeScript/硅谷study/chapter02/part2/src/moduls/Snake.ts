class Snake{
    // 表示蛇头的元素
    head: HTMLElement
    // 蛇的身体(包括蛇头)
    bodies: HTMLCollectionOf<HTMLElement>
    // 获取蛇的容器
    element: HTMLElement

    constructor(){
        this.element = document.querySelector('.snake')!
        this.head = document.querySelector('.snake > div')!
        this.bodies = this.element.getElementsByTagName('div')
    }

    // 获取蛇头坐标
    get x(){
        return this.head.offsetLeft
    }
    // 获取蛇的y轴坐标
    get y(){
        return this.head.offsetTop
    }
    // 设置蛇的坐标
    set x(value:number){
        if(this.x === value){
            return
        }
        // 判断蛇是否死亡
        if(value < 0 || value > 290){
            throw new Error('你蛇没了~')
        }
        // 修改x时，是在修改水平坐标，蛇在左右移动，蛇在向左移动时，不能向右掉头，反之亦然
        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value){
            // 如果掉头，让蛇向反方向继续移动
            if(value > this.x){
                // 如果新值value大于旧值x（原本向左），则说明要蛇掉头向右走，应使蛇继续向左走
                value = this.x - 10
            }else{
                value = this.x + 10
            }
        }
        // 移动身体
        this.moveBody()
        this.head.style.left = value + 'px'
        // 检查蛇是否发生撞自己
        this.checkHeadBody()
    }
    set y(value:number){
        if(this.y === value){
            return
        }
        // 判断蛇是否死亡
        if(value < 0 || value > 290){
            throw new Error('你蛇没了~')
        }
        // 修改x时，是在修改垂直坐标，蛇在上下移动，蛇在向上移动时，不能向下掉头，反之亦然
        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value){
            // 如果掉头，让蛇向反方向继续移动
            if(value > this.y){
                // 如果新值value大于旧值y（原本向上），则说明要蛇掉头向下走，应使蛇继续向上走
                value = this.y - 10
            }else{
                value = this.y + 10
            }
        }
        // 移动身体
        this.moveBody()
        this.head.style.top = value + 'px'
        // 检查蛇是否发生撞自己
        this.checkHeadBody()
    }

    // 蛇增加身体
    addBody(){
        // 向element中添加一个div
        this.element.insertAdjacentHTML('beforeend',"<div></div>")
    }

    // 蛇身体移动的方法
    moveBody(){
        // 蛇每一节的位置等于上一节的位置
        for(let i = this.bodies.length -1; i > 0; i--){
            // 获取前边身体的位置
            let x = (this.bodies[i-1] as HTMLElement).offsetLeft;
            let y = (this.bodies[i-1] as HTMLElement).offsetTop;
            // 将值设置到当前身体上
            (this.bodies[i] as HTMLElement).style.left = x + 'px';
            (this.bodies[i] as HTMLElement).style.top = y + 'px'
        }
    }

    // 检查蛇是否相撞
    checkHeadBody(){
        // 遍历蛇的所有身体，检测其是否和蛇头的坐标发送重叠
        for(let i = 1; i<this.bodies.length; i++){
            if(this.x === this.bodies[i].offsetLeft && this.y === this.bodies[i].offsetTop){
                // 说明蛇发送车祸了，游戏结束
                throw new Error('你蛇没了~')
            }
        }
    }
}

export default Snake