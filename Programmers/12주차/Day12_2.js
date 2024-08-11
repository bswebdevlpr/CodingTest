// 코딩테스트 연습
// 완전탐색
// 전력망을 둘로 나누기


function solution(n, wires) {
    /*
        ==Pseudo Code==
        1. wires의 wire 정보에 대해 해당 wire의 노드정보를 가지는 networ1과 networ2로 분산.
        2. 1.에서 분리되지 않은 wire 정보를 unknown에 할당.
        3. unknown의 모든 wire를 network1과 network2에 대해 1.을 진행.
        4. wires의 다음 wire에 대해 1.으로 돌아감.
    */
    let min = n;
    
    for(let i=0; i<n-1; i++){
        let disconnected = wires[i];
        let network1 = [], network2 = [];
        let unknown = [];
        // console.log("Disconnected Wire: "+disconnected);
        
        for(let j=0; j<n-1; j++){
            if(j===i) continue;
            
            if(wires[j].find(elem => elem === disconnected[0])) 
                network1.push(wires[j]);
            else if(wires[j].find(elem => elem === disconnected[1])) 
                network2.push(wires[j]);
            else 
                unknown.push(wires[j])
        }
        
        while(unknown.length > 0){
            let wire = unknown.shift();
            // 여기 효율성 안나올수도 있음.
            
            let isKnown = false;
            // k => unknown node info ,i => wire, j => node
            (() => {for(let k=0; k<wire.length; k++){
                for(let i=0; i<network1.length; i++){
                    for(let j=0; j<network1[i].length; j++){
                        if(network1[i][j] === wire[k]){
                            network1.push(wire);
                            isKnown = true;
                            // console.log(wire, "is network1");
                            return;
                        }
                    }
                }
            }})();
            
            if(!isKnown){
                (() => {
                    for(let k=0; k<wire.length; k++){
                        for(let i=0; i<network2.length; i++){
                            for(let j=0; j<network2[i].length; j++){
                                if(network2[i][j] === wire[k]){
                                    network2.push(wire);
                                    isKnown = true;
                                    // console.log(wire, "is network2");
                                    return;
                                }
                            }
                        }
                    }
                })();
            }
            
            if(!isKnown){
                unknown.push(wire);
                
                // console.log(wire, "is still unknown");
            }
        }
        
        let diff = Math.abs(network1.length - network2.length);
        if(min > diff) min = diff;
        
        // console.log("min="+min, "diff="+diff);
        // console.log("network1: ", network1,'\n', "network2: ", network2,'\n',
        //            "unknown: ", unknown,'\n');
    }
    
    // console.log(min);
    return min;
}


solution(	9, [[1, 3], [2, 3], [3, 4], [4, 5], [4, 6], [4, 7], [7, 8], [7, 9]]);