function solution(clothes) {
    // (x+a)(x+b)(x+c) = x3 + (a+b+c)x2 + (ab+bc+ca)x + (abc)
    let answer = 1; 
    
    let clothIdx = {};
    clothes.map(([name, kind]) => {
        if(!clothIdx[kind]) clothIdx[kind] = [name];
        else clothIdx[kind].push(name);
    });
    // console.log(clothIdx);
    let entries = Object.entries(clothIdx);
    for(let [key, val] of entries){
        answer *= (1 + val.length);
    }
    answer--;
    
    return answer;
}