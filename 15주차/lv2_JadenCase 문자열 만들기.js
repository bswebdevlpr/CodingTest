function solution(s) {
    var answer = '';
    
    s = s.split('');
    
    if(97 <= s[0].charCodeAt() && s[0].charCodeAt() <= 122) 
        s[0] = s[0].toUpperCase();
    
    for(let i=1; i<s.length; i++){
        let ascii = s[i].charCodeAt();
        // console.log(ascii, 97 <= ascii && ascii <= 122);
        
        if(s[i-1] === ' '){
            if(65 <= ascii && ascii <= 90) continue;
            else if(97 <= ascii && ascii <= 122) s[i] = s[i].toUpperCase();
        }
        else if(65 <= ascii && ascii <= 90)
            s[i] = s[i].toLowerCase();
        // console.log(s)
    }
    
    // console.log(s.join(''));
    return s.join('');
}