console.log('like.js 실행.........');

let sliderIndex = 1;

window.onload = () => {
    const sliderWrap = document.querySelector('.slider-wrap');
    const likeSlider = sliderWrap.querySelector('.like-slider');
    const likeSliderList = likeSlider.querySelectorAll('li');
    const sliderIndexMax = likeSliderList.length;
    
    likeSlideDiv(sliderIndexMax);
    likeBtnChange(sliderIndex);
};


/**
 * li 개수대로 버튼 생성
 */
const likeSlideDiv = (sliderIndexMax) => {
    for (let i = 0; i <= sliderIndexMax; i++) {
        const btn = document.createElement('button');
        btn.className = 'moveBtn';
        btn.id = ` btn${i + 1}`;
        btn.type = 'button';
        btn.onclick = `${likeBtnClickChange(sliderIndexMax)}`;

        if (i !== sliderIndexMax)
            document.querySelector('#slideBtn').append(btn);
    }
};


/**
 * '<', '>' 버튼 클릭 시 실행
 */
const likeList = (elem) => {
    console.log('likeList() 실행.........');
        
    const sliderWrap = document.querySelector('.slider-wrap');
    const likeSlider = sliderWrap.querySelector('.like-slider');
    const likeSliderList = likeSlider.querySelectorAll('li');
    const sliderIndexMax = likeSliderList.length;

    const elemClassName = elem.className;

    if (elemClassName === 'next') {
        if (sliderIndex < 0) {
            sliderIndex = 1;
            return;
        }
        else if (sliderIndex < sliderIndexMax) {
            sliderIndex += 1;
            likeLiDisplayBlock(sliderIndex);
            likeBtnChange(sliderIndex);
            return;
        }
        else {
            sliderIndex = sliderIndexMax;
            return;
        }
    };

    if (elemClassName === 'prev') {
        if (sliderIndex <= 1) {
            sliderIndex = 1;
            return;
        }
        else if (sliderIndex <= sliderIndexMax) {
            sliderIndex -= 1;
            likeLiDisplayBlock(sliderIndex);
            likeBtnChange(sliderIndex);
            return;
        }
        else if (sliderIndex > sliderIndexMax) {
            sliderIndex = sliderIndexMax;
            return;
        }
    };
};


/**
 * 모든 li의 display none으로 변경
 */
const likeLiDisplayNone = (sliderIndex) => {
    const likeAllLi = document.querySelectorAll('.like-slider li');

    likeAllLi.forEach((elem) => {
        elem.style.display = 'none';
    });
};


/**
 * 해당하는 li의 display block으로 변경
 */
const likeLiDisplayBlock = (sliderIndex) => {
    likeLiDisplayNone();
    
    const sliderWrap = document.querySelector('.slider-wrap');
    const liList = sliderWrap.querySelectorAll(`.like-slider li:nth-of-type(${sliderIndex})`);

    liList.forEach((li) => {
        li.style.display = 'block';
    });
};


/**
 * 모든 버튼 스타일 처음 스타일로 변경
 */
const likeBtnDefault = () => {
    const likeBtnAll = document.querySelectorAll('#slideBtn button');

    likeBtnAll.forEach((likeBtn) => {
        likeBtn.style.backgroundColor = '#7d645b';
        likeBtn.style.boxShadow = 'none';
    });
};


/**
 * 슬라이드 바뀌면 같이 변경
 */
const likeBtnChange = (sliderIndex) => {
    likeBtnDefault();

    const choiceBtn = document.querySelector(`#slideBtn button:nth-of-type(${sliderIndex})`);
    
    choiceBtn.style.backgroundColor = '#431f1f';
    choiceBtn.style.boxShadow = '0px 1px 2px #7d645b';
};


/**
 * 버튼 클릭 시 li 및 버튼 스타일 변경
 */
const likeBtnClickChange = (sliderIndexMax) => {
    const likeBtn = document.querySelectorAll('#slideBtn .moveBtn');

    likeBtn.forEach((btn) => {
        btn.onclick = (e) => {
            sliderIndex = Number(e.target.id.slice(-1));
                
            likeLiDisplayBlock(sliderIndex);
            likeBtnChange(sliderIndex);
        };
    });
};