const input = ['KKHSSSSSSSE', 'KSTTTSEEKFKKKDJJGG'];

function solution(input){
    let stack = [];
    let cnt = 0;

    for(let i=0; i<input.length; i++){
        if(stack.length === 0) {
            stack.push(input[i]);
            cnt++;
        }
        else {
            let rear = stack[stack.length-1];

            if(input[i] === rear){
                cnt++;
            } else{
                if(cnt !== 1)stack.push(cnt);
                stack.push(input[i]);
                cnt = 1;
            }
        }
    }
    stack.push(cnt);

    console.log(stack.join(""));
}

for(let i=0; i<input.length; i++) solution(input[i]);