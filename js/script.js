function reverseStr(str){
    let listOfChar = str.split('');
    let reverseListOfChar = listOfChar.reverse();
    let reversedStr = reverseListOfChar.join('');
    return reversedStr;
}

function isPalindrome(str){
    let reverse = reverseStr(str);
    return str === reverse;
}

function convertDateToStr(date){
    let dateStr = {day: '', month: '', year: ''};

    if(date.day < 10){
        dateStr.day = '0' + date.day;
    }else{
        dateStr.day = date.day.toString();
    }

    if(date.month < 10){
        dateStr.month = '0' + date.month;
    }else{
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();

    return dateStr;
}

function getAllDateFormats(date){
    let dateStr = convertDateToStr(date);

    let ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    let mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    let yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    let ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    let mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    let yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormats(date){
    let listOfPalindromes = getAllDateFormats(date);
    let flag = false;

    for(let i=0; i < listOfPalindromes.length; i++){
        if(isPalindrome(listOfPalindromes[i])){
            flag = true;
            break;
        }
    }

    return flag;
}

function isLeapYear(year) {
    if(year % 400 === 0) {
        return true;
    }
    if(year % 100 === 0) {
        return false;
    }
    if(year % 4 === 0) {
        return true;
    }
    return false;
} 

function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if(month === 2) {
        if(isLeapYear(year)) {
            if(day > 29) {
                day = 1;
                month++;
            }
        }
        else {
            if(day > 28) {
                day = 1;
                month++;
            }
        }
    }
    else{
        if(day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }

    if(month > 12){
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year
    };
}

function getNextPalindromeDate(date) {
    var ctr = 0;
    var nextDate = getNextDate(date);

    while(1){
        ctr++;
        var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
        if(isPalindrome){
            break;
        }
        nextDate = getNextDate(nextDate);
    }

    return [ctr, nextDate];
}


const dateInputRef = document.querySelector("#bday-input");
const showBtnRef = document.querySelector("#show-btn");
const resultRef = document.querySelector("#result");

function clickHandler(e) {
    let bdayStr = dateInputRef.value;

    if(bdayStr !== '') {
        let listOfDate = bdayStr.split('-');
        let date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        }

        let isPalindrome = checkPalindromeForAllDateFormats(date);

        if(isPalindrome){
            resultRef.innerText = 'Yay! Your Birthday is Palindrome 🥳🥳'
        }else {
            let [ctr, nextDate] = getNextPalindromeDate(date);
            resultRef.innerText = `The next Palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${ctr} days! 😞😞`
        }
    }   
}

showBtnRef.addEventListener('click', clickHandler);


// console.log(getNextPalindromeDate(date));