let count = 0;

// HTML -> JS
// const resultH1 = document.querySelectorAll("h1")[0];
// const resultH1 = document.querySelector("h1");
// const resultH1 = document.getElementsByTagName("h1")[0];
// const plusButton = document.getElementsByTagName("button")[0];
const resultH1 = document.getElementById("result");
// const resultH1 = document.querySelector("#result");
// const resultH1 = resultH1;

// plusButton.addEventListener("click", () => {
//     // 숫자 증가하자
//     count++;    //count += 1;   // count = count + 1;
    
//     // 숫자 표시하자
//     resultH1.innerHTML = count;
// });
function plus(number=1) {
    // 숫자 증가하자
    count += number;    //count += 1;   // count = count + 1;
    
    // 숫자 표시하자
    resultH1.innerHTML = count;
}

// (함수정의)();
// (function () {

// })()
