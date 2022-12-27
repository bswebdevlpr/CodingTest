function solution(skill, skill_trees) {
    var answer = 0;
    
    skill_trees.map(skillTree => {
        let stack = skill.split("")
        skillTree = skillTree.split("")
        // console.log("skill stack:",stack, "skilltree stack:",skillTree)
        
        let flag = true
        while(flag){
            if(stack.length === 0 || skillTree.length === 0) {
                answer++
                break
            }

            const nowSkill = skillTree[0]
            
            if(nowSkill === stack[0]){
                skillTree.shift()
                stack.shift()
            } else {
                for(let i=stack.length-1; i>0; i--){
                    if(stack[i] === nowSkill){
                        flag = false
                        break
                    }  
                }
                skillTree.shift()
            }
        }
        
    })
    
    return answer;
}