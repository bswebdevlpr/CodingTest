function solution(n, words) {
    let spitted = {};
    
    let order = 0;
    let lastAlp = words[0][words[0].length-1];
    
    for(let i=0; i<words.length; i++){
        order++;
        let word = words[i];
        // console.log(order, word);
        
        if(i !== 0 && lastAlp.valueOf() !== word[0].valueOf()) {
            let remainder = order % n;
            if(remainder === 0) return [n, order/n];
            else return [order%n, Math.floor(order/n)+1]; 
        }
        
        if(!spitted[word]) {
            spitted[word] = true;
        }
        else {
            let remainder = order % n;
            if(remainder === 0) return [n, order/n];
            else return [order%n, Math.floor(order/n)+1];
        }
        
        lastAlp = word[word.length-1];
    }
    
    return [0, 0];
}