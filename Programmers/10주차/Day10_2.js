// 코딩테스트 연습
// 2020 KAKAO BLIND RECRUITMENT
// 괄호 변환


function solution(p) {
    /*
        1. 개수가 맞으면 균형잡힌 괄호 문자열.
        2. 개수랑 짝이 다 맞으면 올바른 괄호 문자열.
    */
    var answer = '';
    
    function step1_2_3(p){
        // step 1.
        if(p.length === 0) return ''; 

        // step 2.
        let here = 0;
        let u = '', v = '';
        let leftCnt = 0, rightCnt = 0;

        p[here] === '(' ? leftCnt++ : rightCnt++;
        here++;
        while(leftCnt != rightCnt){
            p[here] === '(' ? leftCnt++ : rightCnt++;
            here++;
        }
        u = p.substring(0, here), v = p.substring(here, p.length);
        // console.log(u, v);
        
        // step 3.
        let isUright = true;
        leftCnt = 0, rightCnt = 0;
        for(let c of u){
            c === '(' ? leftCnt++ : rightCnt++;
            if(rightCnt > leftCnt) {
                isUright = false;
                break;
            }
        }
        if(isUright){
            return u += step1_2_3(v);
        } else{
            let newStr = '(';
            newStr += step1_2_3(v);
            newStr += ')';
            u = u.substring(1, u.length-1);
            let newU = '';
            for(let c of u){
                c === '(' ? newU += ')' : newU += '(';
            }
            newStr += newU;
            return newStr;
        }
    }
    
    answer = step1_2_3(p);
    // console.log(answer);
    
    return answer;
}