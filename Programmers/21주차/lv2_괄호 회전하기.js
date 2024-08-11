function solution(s) {
    var answer = 0;
    
    s = s.split('');
    
    for(let i=0; i<s.length-1; i++){
        // console.log(s);
        let openStack = [];
        
        let exit = false;
        for(let j=0; j<s.length; j++){
            if(exit) break;
            
            let comp = s[j];
            if(comp === '(' || comp === '[' || comp === '{'){
                openStack.push(comp);
            } else {
                const recentTag = openStack.pop();
                switch(comp){
                    case ')':
                        if(recentTag !== '(') exit = true;
                        break;

                    case ']':
                        if(recentTag !== '[') exit = true;
                        break;

                    case '}':
                        if(recentTag !== '{') exit = true;
                        break;
                }
            }
            
            // console.log("openStack: ", openStack)
            if(j === s.length-1 && !openStack.length) answer++;
        }
        
        // console.log(answer)
        // console.log()
        let head = s.shift();
        s.push(head);
    }
    
    return answer;
}