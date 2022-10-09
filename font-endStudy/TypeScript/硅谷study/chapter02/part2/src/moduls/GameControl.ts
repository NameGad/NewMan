// 游戏控制器，控制其他的所有类
import Food from "./Foods";
import ScorePanel from "./ScorePanel";
import Snake from "./Snake";

class GameControl{
    // 定义属性
    snake: Snake
    Food: Food
    // 计分板
    scorePanel: ScorePanel
    // 创建一个属性来存储蛇
    direction: string = 'ArrowRight'
    // 判断蛇是否还存活
    isLive = true

    constructor(){
        this.snake = new Snake()
        this.Food = new Food()
        this.scorePanel = new ScorePanel(10,1)

        this.init()
    }

    // 游戏初始化方法，调用后游戏开始
    init(){
        // 绑定键盘按键按下的事件
        document.addEventListener('keydown',this.keydownHandler.bind(this))
        // 调用run，使蛇移动
        this.run()
    }
    // 创建一个键盘按下的响应函数
    keydownHandler(event:KeyboardEvent){
        this.direction = event.key        
    }
    // 控制蛇移动方法
    run(){
        // 根据方向（this.direction）
        /* 
            向上 top 减少
            向左 left 减少
        */
        // 获取蛇现在的坐标
        let x = this.snake.x
        let y = this.snake.y
        // 根据按键的方向修改x和y值
        switch(this.direction){
            case 'ArrowUp':
                y -= 10
                break;
            case 'ArrowDown':
                y += 10
                break;
            case 'ArrowLeft':
                x -= 10
                break;
            case 'ArrowRight':
                x += 10
                break;
        }
        // 蛇吃食物
        this.checkEat(x,y)
        // 修改蛇的x和y值
        try {
            this.snake.x = x
            this.snake.y = y
        } catch (e: any) {
            // 进入catch，说明出现了异常，游戏结束，弹出一个提示信息
            alert(e.message)
            this.snake.x = 0
            this.snake.y = 0
            this.isLive = false
        }
        // 开启定时器
        this.isLive && setTimeout(this.run.bind(this),500 - (this.scorePanel.level-1) * 50)
    }

    // 定义一个方法，用来检查蛇是否吃到食物
    checkEat(x: number, y: number){
        if(x === this.Food.x && y === this.Food.y){
            // 食物位置重置
            this.Food.change()
            // 分数增加
            this.scorePanel.addScore()
            // 蛇要增加一节
            this.snake.addBody()
        }
    }
}

export default GameControl