// 코딩테스트 연습
// 완전탐색
// 최소직사각형


function solution(sizes) {
    let minWidth = sizes[0][0], minHeight = sizes[0][1];
    
    sizes.map(size => {
        let width = size[0];
        let height = size[1];
        
        if(!((minWidth >= width && minHeight >= height) ||
          (minHeight >= width && minWidth >= height))){
            let taller, smaller;
            if(width > height){taller = width; smaller = height}
            else {taller = height; smaller = width;}
            
            if(minWidth > minHeight){
                if(minWidth < taller) minWidth = taller;
                if(minHeight < smaller) minHeight = smaller;
            } else {
                if(minHeight < taller)minHeight = taller;
                if(minWidth < smaller) minWidth = smaller;
            }
        }
        
        
    });

    var answer = minWidth*minHeight;
    return answer;
}