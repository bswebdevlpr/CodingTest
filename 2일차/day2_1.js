// 코딩테스트 연습
// 2021 Dev-Matching: 웹 백엔드 개발자(상반기)
// 행렬 테두리 회전하기


function solution(rows, cols, queries) {
    /*
    queries = [
        [x1, y1, x2, y2],
        ...
    ];
    */
    
    // Create a matrix
    let matrix = new Array(rows);
    let matrixElem = 1;
    for (var row=0; row<rows; row++){
        matrix[row] = new Array(cols);
        for (var col=0; col<cols; col++){
            matrix[row][col] = matrixElem;
            matrixElem++;
        }
    }
    const min = matrix[matrix.length-1][matrix[0].length-1];
    
    // Function to rotate the part of matrix
    function rotate(query){
        /*
        query = [x1, y1, x2, y2];
        */
        const x1 = query[0]-1, y1 = query[1]-1, x2 = query[2]-1, y2 = query[3]-1;
        let elems = [];
        
        let inVal = matrix[x1][y1];
        elems.push(inVal);
        for(var colLoop1=y1; colLoop1<y2; colLoop1++){
            const outVal = matrix[x1][colLoop1+1];
            matrix[x1][colLoop1+1] = inVal;
            inVal = outVal;
            elems.push(inVal);
        }
        for(var rowLoop1=x1; rowLoop1<x2; rowLoop1++){
            const outVal = matrix[rowLoop1+1][y2];
            matrix[rowLoop1+1][y2] = inVal;
            inVal = outVal;
            elems.push(inVal);
        }
        for(var colLoop2=y2; colLoop2>y1; colLoop2--){
            const outVal = matrix[x2][colLoop2-1];
            matrix[x2][colLoop2-1] = inVal;
            inVal = outVal;
            elems.push(inVal);
        }
        for(var rowLoop2=x2; rowLoop2>x1; rowLoop2--){
            const outVal = matrix[rowLoop2-1][y1];
            matrix[rowLoop2-1][y1] = inVal;
            inVal = outVal;
            elems.push(inVal);
        }    
        
        let innerMin = min;
        for(var elem of elems){
            if(innerMin > elem)
                innerMin = elem;
        }
        
        return innerMin;
    }
    
    let answer = [];
    // Rotate a matrix n times
    for (var query of queries){
        answer.push(rotate(query));
    }
    console.log(matrix);
    
    return answer;
}