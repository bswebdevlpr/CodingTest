function solution(n) {
    var answer = 0;
    
    function toBinary(num, nOneCnt=-1){
        let biNum = [];
        let oneCnt = 0;
        
        while(num !== 0){
            if(nOneCnt !== -1 && oneCnt > nOneCnt) return -1;
                
            let remainder = num % 2;
            if(remainder === 1) oneCnt++;
            biNum.push(remainder);
            num = Math.floor(num/2);
        }
        biNum = biNum.reverse();
        return [biNum.join(""), oneCnt];
    }
    let [nBinary, nOneCnt] = toBinary(n);
    // console.log(nBinary, nOneCnt);
    
    while(true){
        let next = toBinary(++n, nOneCnt);
        
        if(nOneCnt === next[1]) return n;
    }
}