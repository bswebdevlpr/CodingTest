function solution(dirs) {
    /*
    GOAL - 처음 지나는 길의 길이 구하기
    
    IDEAS
    1. 좌표마다 활성화된 방향을 저장?
    2. 캐릭터에 지나온 길을 저장? => 이게 나을듯.
    
    PSEUDO CODE
    for direction in dirs
        캐릭터의 좌표를 파악
        해당 좌표에서 direction으로 이동한 적이 있는지 파악.
            없으면 카운트, 있으면 패스
        캐릭터를 이동
    */
    const UP = 1, DOWN = -1, RIGHT = 2, LEFT = -2
    
    var answer = 0;
    
    class Character {
        /*
        1. 현재 좌표에서의 이동기록을 초기화.
        2. 이동방향을 입력받고 pos를 변경시키고 history를 업데이트.
        */
        constructor(){
            this.pos = [0, 0]
            this.history = {}
            this.initHistory()
        }
        
        initHistory(){
            this.history[this.pos.toString()] = {
                [UP]: false,
                [DOWN]: false,
                [RIGHT]: false,
                [LEFT]: false
            }
        }
        move(dir){
            // key값은 "xPos,yPos"의 형태
            /*
            1. 이동이 가능하다면 
                1.1. 현재 좌표의 이동방향 값을 true로 설정, answer++
                1.2. 이동
            2. 불가하다면 return    
            */
            const originPos = this.pos.slice()
            let dirNum
            switch(dir){
                case 'U':
                    if(this.pos[1] === 5) return false
                    this.pos[1]++
                    dirNum = UP
                    break
                    
                case 'D':
                    if(this.pos[1] === -5) return false
                    this.pos[1]--
                    dirNum = DOWN
                    break
                    
                case 'L':
                    if(this.pos[0] === -5) return false
                    this.pos[0]--
                    dirNum = LEFT
                    break
                    
                case 'R':
                    if(this.pos[0] === 5) return false
                    this.pos[0]++
                    dirNum = RIGHT
                    break
            }
            
            const originKey = originPos.toString()
            if(!this.history[originKey][dirNum]) {
                this.history[originKey][dirNum] = true
                answer++
            }
            
            const key = this.pos.toString()
            if(!this.history[key]) this.initHistory()
            if(!this.history[key][-dirNum])
                this.history[key][-dirNum] = true
        }
    }
    
    let char = new Character()
    for(let i=0; i<dirs.length; i++){
        const dir = dirs[i]
        
        char.move(dir)
        // console.log(char)
        // console.log()
    }
    
    return answer;
}