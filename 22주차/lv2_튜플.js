function solution(s) {
    var answer = [];
    
    s = s.substring(1,s.length-1);
    // console.log(s);
    let sets = [];
    let set = [];
    let num = [];
    
    let setEnable = false;
    for(let i=0; i<s.length; i++){
        let c = s[i];
        
        if(c === '}'){
            set.push(parseInt(num.join('')));
            num = [];
            
            // console.log(set);
            setEnable = false;
            sets.push(set);
            set = [];
        }
        else if(setEnable){
            if(c !== ',') num.push(c);
            else {
                let temp = num.join('');
                // console.log(temp)
                set.push(parseInt(temp));
                num = [];
            }
        }
        else if(c === '{'){
            setEnable = true;
        }
    }
    // console.log(set);
    
    sets = sets.sort((arr1, arr2) => arr1.length - arr2.length);
    // console.log(sets);
    
    sets.map(arr => {
        arr.map(num => {
            if(!answer.includes(num)) answer.push(num);
        })
    })
    // console.log(answer)
    
    
    return answer;
}