// 코딩테스트 연습
// 2022 KAKAO BLIND RECRUITMENT
// 신고 결과 받기


function solution(id_list, reports, k) {
    /*
    id_list: 이용자 ID
    report: 각 이용자가 신고한 이용자의 ID 정보가 담긴 문자열 배열
    k: 정지기준이 되는 신고횟수
    
    
    ==== RULES =======
    1. 2<=id_list.length<=1000
        1.1) 1<=id_list.elem<=10
        1.2) id_list.elem: String, 알파벳 소문자
        1.3) id_list.elem은 고유한 값임
    2. 1<=report.length<=200000
        2.1) 3<=report.elem<=21
        2.2) report.elem은 "이용자ID 신고한ID" 형태의 String
        2.3) 자기 자신을 신고하는 경우는 없음
    3. 1<=k<=200
    4. return 배열은 id_list에 담긴 id 순서대로 각 유저가 받은 결과 메일 수를 담음.

    Steps
    1. Check how many the user is reported 
    2. If the user is reported k times, the user who reported is counted.
    3. After the step1,2 is finished, return the result.
   
   
    ====== Pseudo Code ======
    reportedCountObj = {
        id: reportedCount,
        ...
    } defines how many reported the user is
    reportListObj = {
        id: {report userId1, report userId2, ...}
        ...
    } defines who the user reported
    resultObj = {} defines how many the user received the mail
    
    for id of id_list
        reportedCountObj.id = 0;
        resultObj.id = 0;
        reportListObj.id = [];
        for report of reports
            reportDiv = report.split(" ")
            if reportDiv[0] is same as id
                if reportDiv[1] is not in reportList  // Check there is duplicate
                    reportList.id.push(reportDiv[1])
                    
    
    for id in reportedCountObj
        if reportedCountObj[id] >= k
            resultObj.id++;
        
            

    */
    let reportedCountObj = {}; //defines how many reported the user is
    let reportListObj = {}; //defines who the user reported
    let result =[]; //defines how many the user received the mail
    
    for (id of id_list){
        reportListObj[id] = [];
        result.push(0);
        
        for (report of reports){
            const reportDiv = report.split(" ");
            if (reportDiv[0] == id){
                if(reportListObj[id].length == 0){  // 비어있어
                    reportListObj[id].push(reportDiv[1]);
                    
                    if(reportedCountObj[reportDiv[1]] != null)
                        reportedCountObj[reportDiv[1]]++;
                    else
                        reportedCountObj[reportDiv[1]] = 1;
                }
                else {// 안비어있어
                    if(!reportListObj[id].find(elem => elem == reportDiv[1])){  // Check there is duplicate
                        reportListObj[id].push(reportDiv[1]);
                        if(reportedCountObj[reportDiv[1]] != null)
                            reportedCountObj[reportDiv[1]]++;
                        else
                            reportedCountObj[reportDiv[1]] = 1;
                    }
                }
            }
        }
    }
    
    for (id in reportedCountObj){
        if (reportedCountObj[id] >= k){  // If id is reported more than or same as k
            let innerCount = 0;
            for (reporter in reportListObj){  // Find satisfied id from reportListObj and count one's reporters' result.
                if(reportListObj[reporter].find(reportee => reportee == id)){ // If reporter has samd id with reportee
                    if (result[innerCount])
                        result[innerCount]++;
                    else
                        result[innerCount] = 1;
                }
                innerCount++;
            }
        }
    }
    
    return result;
}