// 코딩테스트 연습
// 2021 KAKAO BLIND RECRUITMENT
// 메뉴 리뉴얼

function solution(orders, course) {
    
    /*
    RULES
    1. 가장 많이 함께 주문한 단품메뉴들을 코스요리 메뉴로 구성
    2. 코스요리 메뉴는 최소 2가지 이상의 단품메뉴로 구성하려고 합니다. 
    3. 최소 2명 이상의 손님으로부터 주문된 단품메뉴 조합에 대해서만 코스요리 메뉴 후보에 포함하기로 했습니다.
    
    PSEUDO CODE
    1. orders 내 메뉴별 각 오름차순으로 정렬
    2. course 내 원소별로 for문 돌리며 메뉴개수당 가장 많이 조합된 경우의수 탐색
        2.1) 횟수가 중복이면 중복되는 경우의수 모두 해당하도록
    3. result를 오름차순으로 정렬
    */
    
    // orders 내의 문자열들을 오름차순으로 정렬
    let sortedOrders = [];
    for(let order of orders){
        const split = order.split("");
        sortedOrders.push(split.sort().join(""));
    }
    // console.log(sortedOrders);
    
    let caseIndex = {};
    /*
        caseIndex = {
            AB: 몇개,
            AC: 몇개, ...
        }
    */
    
    // 경우의수 구현
    // 참고 - https://velog.io/@devjade/JavaScript%EB%A1%9C-%EC%88%9C%EC%97%B4%EA%B3%BC-%EC%A1%B0%ED%95%A9-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0
    // 입력된 order에 대하여 menuLen의 길이를 가지는 메뉴조합을 전부 찾아 Array로 return
    function findCases(arr, selectedNumber){
        const results = [];
        if(selectedNumber == 1){
            return arr.map((elem) => [elem]);
        }
        
        arr.forEach((fixed, index, origin) => {
            const rest = origin.slice(index + 1);
            const combinations = findCases(rest, selectedNumber-1);
            const attached = combinations.map((el) => [fixed, ...el].join(""));
            results.push(...attached);
        });
        return results;
    }
    // course 내 menuLen에 대하여
    for(let menuLen of course){
        // orders의 각 메뉴조합에서 menuLen의 길이를 가지는 경우의수를 추출
        for(let order of sortedOrders){
            let allCases = findCases(order.split(""), menuLen);// 찾은 모든 경우의 수에 대하여 caseIndex에 있으면 +1
            // 없으면 생성
            // console.log(allCases);
            for(let oneCase of allCases){
                if(!caseIndex[oneCase]){
                    caseIndex[oneCase] = 1;
                } else{
                    caseIndex[oneCase] += 1;
                }
            }
        }
    }
    // console.log(caseIndex);
    
    const caseEntries = Object.entries(caseIndex);
    console.log("caseEntries: ",caseEntries);
    let returnArr = [];
    for(let menuLen of course){
        console.log("menuLen="+menuLen);
        let maxCount = 0;
        let arrToFindMax = [];
        
        for(let [key, val] of caseEntries){
            // 최대 등장횟수를 먼저 찾고
            // menuLen과 key.length가 같은 경우, val > 2인 경우를 arrToFindMax에 추가
            if((key.length == menuLen) && val >= 2){
                arrToFindMax.push([key, val]);
                if(maxCount < val){
                    maxCount = val;
                }
            }
        }
        console.log("arrToFindMax: ",arrToFindMax, "maxCount="+maxCount);
        // arrToFindMax에서 value 값이 가장 높은 경우(중복가능) 결과값에 추가
        for(let [key, val] of arrToFindMax){
            if(val == maxCount){
                returnArr.push(key);
            }
        }
    }
    
    console.log(returnArr.sort());
    
    var answer = returnArr.sort();
    return answer;
}