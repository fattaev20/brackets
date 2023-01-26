module.exports = function check(str, bracketsConfig) {
    let positive = [];
    let negative = [];
    let expLen = str.length;
    let stack = [];
    let objBrackets = {};
    let same = [];

    objBrackets = Object.fromEntries(bracketsConfig)

    for (let key of bracketsConfig) {
        positive.push(key[0]);
        negative.push(key[1]);
        if (positive.includes(key[1]) && negative.includes(key[0])) {
            positive.pop(key[0]);
            negative.pop(key[1]);
            same.push(key[0]);
        }
    }


    for (let i = 0; i < expLen; i++) {
        let x = str[i]

        if (positive.includes(x)) {
            stack.push(x);
            continue;
        }

        if (same.includes(x)) {
            if (stack[stack.length - 1] != x || stack.length == 0) {
                stack.push(x);
                continue;
            } else if (stack[stack.length - 1] == x) {
                negative.push(x);
            }
        }


        if (stack.length === 0) {
            return false;
        }

        if (stack[stack.length - 1] == stack[stack.length - 2] && same.includes(stack[stack.length - 1])) {
            stack.splice(stack.length - 1, 1);
            stack.splice(stack.length - 1, 1);
        }

        let check;
        if (negative.includes(x)) {
            check = stack.pop();
            if (objBrackets[check] != x) {
                return false;
            }
        }




    }
    return stack.length === 0;
}