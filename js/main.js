console.log('main.js 실행.........');


/**
 * 버튼 클릭 시 아래 내용 변경
 */
function changeWant(elem) {
    btnAllOpacity0();
    allButtonClassDel();

    const btnClass = elem.classList.value;
    console.log(btnClass);

    const pClass = document.querySelector(`#want p[class^=${btnClass}]`);
    // divId.style.display = 'block';
    pClass.style.opacity = '1';
    elem.classList.add('clicked');
    console.log(elem);
} // changeWant() end


/**
 * 버튼 opacity 0.0으로 변경
 */
function btnAllOpacity0() {
    const pAll = document.querySelectorAll("#want p");
    for (let i = 0; i < pAll.length; i++) {
        pAll[i].style.opacity = '.0';
    }
} // btnAllOpacity0() end


/**
 * 버튼의 clicked 클래스 지우기
 */
function allButtonClassDel() {
    const btnAll = document.querySelectorAll("#want button[type=button]");
    for (let i = 0; i < btnAll.length; i++) {
        btnAll[i].classList.remove('clicked');
    }
} // allButtonClassDel() end


/**
 * 숨겨져 있는 div요소 나타내기
 */
function visibilityDiv(element) {
    allVisibleHidden();

    const wantDiv = element.title;
    // wantDiv === 'want' && (allDisplayNone());
    
    const change = document.querySelector(`div[id=${wantDiv}]`);
    if (change.id === 'want' || change.id === 'like')
        change.style.display = 'flex';
    else
        change.style.display = 'block';
} // visibilityDiv() end


/**
 * 모든 div요소 숨기기
 */
function allVisibleHidden() {
    const divAll = document.querySelectorAll('div.mainDiv');
    for (let i = 0; i < divAll.length; i++) {
        // divAll[i].style.visibility = 'hidden';
        divAll[i].style.display = 'none';
    }
} // allVisibleHidden() end


/**
 * TMI 클릭 시 div display 변경
 */
const tmiClick = () => {
    const tmi = document.querySelector('#aboutTmi');
    console.log(tmi);
    tmi.style.display = 'inline-block';
}

const tmiClose = () => {
    aboutTmi.style.display = 'none';
}