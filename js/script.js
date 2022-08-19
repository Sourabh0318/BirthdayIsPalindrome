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

let date ={
    day: 5,
    month: 11,
    year: 2020
};

console.log(checkPalindromeForAllDateFormats(date));