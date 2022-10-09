class ScorePanel{
    // 分数与等级
    score = 0
    level = 1
    // 分数与等级所在的元素
    scoreEle: HTMLElement
    levelEle: HTMLElement
    // 设置变量限制等级
    maxLevel: number
    // 设置多少分升一级
    upScore: number

    constructor(maxLevel: number = 10, upScore:number = 10){
        this.scoreEle = document.getElementById('score')!
        this.levelEle = document.getElementById('level')!
        this.maxLevel = maxLevel
        this.upScore = upScore
    }

    // 设置一个加分的方法
    addScore(){
        this.scoreEle.innerText = ++this.score + '';
        // 判断分数是多少
        if(this.score % this.upScore === 0){
            this.levelUp()
        }
    }

    // 等级提示方法
    levelUp(){
        if(this.level < this.maxLevel){
            this.levelEle.innerText = ++this.level + '';
        }
    }
} 

export default ScorePanel