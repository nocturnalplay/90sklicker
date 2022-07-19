
const findlist = (num) => {
    for (const key in numberlist) {
        if (num == key) return numberlist[key]
    }
}

const tens = (num) => { //for 1 to 99 this will print the string list
    let word = ""

    if (num <= 20) {
        return findlist(num)
    }
    for (let i = 0; i < num.length; i++) {
        if (num[i] == "0") {
            continue
        } else if (i == 0) {
            word += findlist(`${num[i]}0`)
        }
        else {
            word += ` ${findlist(num[i])}`
        }
    }
    return word;
}

function itos(num) {

    let number = num
    let word = ""
    let active = 1
    for (let i = 0; i < number.length; i++) {
        if (active % 2 == 0) {
            active += 1
            continue
        }
        if (number[i] == "0") continue;
        const length = number.slice(i).length
        if (length == 9 || length == 7 || length == 5) {
            active += 1
        }
        if (length == 8 || length == 9) {
            word += ` ${number.length == 9 ? tens(`${number.slice(i)[0]}${number.slice(i)[1]}`) : tens(number.slice(i)[0])}`
            word += ` ${findlist("10000000")}`
        }
        else if (length == 6 || length == 7) {
            word += ` ${number.length == 7 ? tens(`${number.slice(i)[0]}${number.slice(i)[1]}`) : tens(number.slice(i)[0])}`
            word += ` ${findlist("100000")}`
        }
        else if (length == 4 || length == 5) {
            word += ` ${number.length == 5 ? tens(`${number.slice(i)[0]}${number.slice(i)[1]}`) : tens(number.slice(i)[0])}`
            word += ` ${findlist("1000")}`
        }
        else if (length == 3) {
            word += ` ${tens(number.slice(i)[0])}`
            word += ` ${findlist("100")}`
        }
        else if (length <= 2) {
            word += ` ${tens(number.slice(i))}`
            return word
        }
    }
    return word
}