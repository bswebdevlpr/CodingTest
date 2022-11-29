let input = [3, 'good', 'Time', 'Big'];

let stack = [];

for(let i=1; i<=input[0]; i++){
    let word = input[i];

    for(let j=word.length-1; j>=0; j--){
        stack.push(word[j]);
    }
    console.log(stack.join(""));
    stack = [];
}
