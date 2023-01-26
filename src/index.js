module.exports = function check(str, bracketsConfig) {
    let positive = [];
    let negative = [];
    let expLen = str.length;
    let stack = [];
    let objBrackets = {};
    let same = [];

    objBrackets = Object.fromEntries(bracketsConfig)

    for (key in objBrackets) {
        if (objBrackets[key] == key) {
            same.push(key)
        }
    }


    for (let key of bracketsConfig) {
        positive.push(key[0]);
        negative.push(key[1]);
    }
    for (let i = 0; i < expLen; i++) {
        let x = str[i]

        if (positive.includes(x)) {
            stack.push(x);
            continue;
        }


        if (stack.length === 0) {
            return false;
        }

        if (stack[stack.length - 1] == stack[stack.length - 2] && same.includes(stack[stack.length - 1])) {
            stack.splice(stack.length - 1, 1);
            stack.splice(stack.length - 1, 1);
        }

        let check = stack.pop();
        if (objBrackets[check] != x) {
            return false;
        }

    }
    stack.sort();
    for (let i = 0; i < stack.length; i++) {
        if (stack[stack.length - 1] == stack[stack.length - 2]) {
            stack.splice(stack.length - 1, 1);
            stack.splice(stack.length - 1, 1);
        }
    }
    return stack.length === 0;
}