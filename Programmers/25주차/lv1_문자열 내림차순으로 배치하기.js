function solution(s) {
    
    s = s.split("").sort((alp2, alp1) => alp1.charCodeAt() - alp2.charCodeAt()).join("")
    
    return s;
}