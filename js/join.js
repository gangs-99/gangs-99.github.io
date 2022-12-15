console.log('join.js 실행.........');


/**
 * 전체 선택 클릭 시 아래 체크박스 모두 선택되는 js
 */
function checkAll() {
    const checks = document.querySelectorAll("[name=checked]");
    const checkAll = document.getElementById("checkedAll");
    
    for (let i = 0; i < checks.length; i++) {
        const check = checks[i];
        check.checked = checkAll.checked;
    };
} // checkAll() end


/**
 * 하나라도 체크 해제하면 전체 선택도 해제되는 js
 */
function checkEach() {
    const checks = document.querySelectorAll("[name=checked]");

    for (let i = 0; i < checks.length; i++) {
        if (!checks[i].checked) {
            document.getElementById("checkedAll").checked = false;
            return;
        };
    };

    document.getElementById("checkedAll").checked = true;
} // checkEach() end


/**
 * div display none으로 변경
 */
const joinDisplayNone = (elem) => {
    const elemId = elem.id;
    const valId = elemId.substr(elemId.length - 2);

    const signDiv = document.querySelectorAll(".sign");
    for (let i = 0; i < signDiv.length; i++)
        signDiv[i].style.display = 'none';

    const hiddenId = document.querySelector(`div[id$=${valId}]`);
    hiddenId.style.display = 'block';
} // joinDisplayNone() end


/**
 * 생성자 클래스
 */
class MemberList {
    constructor(userId, userPw, userEmail, datetime = Date.now()) {
        this.userId = userId;
        this.userPw = userPw;
        this.userEmail = userEmail;
        this.datetime = datetime;
    };
};


/**
 * 로그인 기능
 */
const signInClick = () => {
    const membersList = JSON.parse(localStorage.getItem('membersList'));

    const userId = document.getElementById('userIdIn');
    const userPw = document.getElementById('userPwIn');

    const login = membersList.find((member) => {
        return member.userId === userId.value && member.userPw === userPw.value;
    });

    if (login) {
        alert(`${userId.value}님 방문해주셔서 감사합니다~`);
        location.href = 'index.html';
        return;
    }
    else {
        alert('아이디 및 비밀번호 등 입력하신 정보가 일치하지 않습니다. 다시 입력해주세요.');
        location.reload();
    };

};


/**
 * 아이디 및 비밀번호 찾을 때 membersList에 값이 없는 경우
 */
const equalLogin = () => {
    const membersList = JSON.parse(localStorage.getItem('membersList')) || [];

    if (membersList.length === 0) {
        alert('잘못된 입력값입니다. 확인 후 다시 입력해주세요.');
        // location.reload();
        return false;
    }
};


/**
 * findIndex함수 사용 후 결과값 비교하여 출력
 */
const findResult = (mode, compareVal, returnVal) => {
    if (compareVal >= 0) {
        alert(`${mode}는 [${returnVal}] 입니다.`);
        location.reload();
        return;
    }
    else {
        alert('잘못된 입력값입니다. 확인 후 다시 입력해주세요.');
        return;
    };
};


/**
 * 이메일 입력받아 아이디값 반환
 */
const findIdBtnClick = () => {
    const membersList = JSON.parse(localStorage.getItem('membersList')) || [];
    const userEmail = document.getElementById('findIduserEmail');

    equalLogin();

    const findId = membersList.findIndex((member) => {
        return member.userEmail === userEmail.value;
    });

    findResult('아이디', findId, findId >= 0 ? membersList[findId].userId : null);

};


/**
 * 아이디랑 이메일 입력받아 비밀번호 반환
 */
const findPwBtnClick = () => {
    const membersList = JSON.parse(localStorage.getItem('membersList')) || [];
    const userId = document.getElementById('findPwUserId');
    const userEmail = document.getElementById('findPwUserEmail');

    equalLogin();

    const findPw = membersList.findIndex((member) => {
        return member.userId === userId.value && member.userEmail === userEmail.value;
    });

    findResult('비밀번호', findPw, findPw >= 0 ? membersList[findPw].userPw : null);
    
};


/**
 * 중복검사 시 사용가능하다는 안내 창 띄우기
 */
const ableData = (mode, val) => {
    alert(`사용가능한 ${mode}입니다.`);
    val.style.border = '2px solid lightgray';
    return;
};


/**
 * 중복검사 시 사용불가하다는 안내 창 띄우기
 */
const notableData = (mode, val) => {
    alert(`중복된 ${mode}입니다. 다시 입력해주세요.`);
    val.style.border = '2px solid red';
    return;
};


/**
 * 회원 가입 시 유효성 검사하여 결과값 반환
 */
const regExpTest = (regExp, elem, msg) => {
    if (regExp.test(elem.value)) {
        elem.style.border = '2px solid lightgray';
        return true;
    }

    elem.style.border = '2px solid red';
    alert(msg);
    return false;
};


/**
 * 아이디 중복 검사
 */
const signUpIdCheck = () => {
    const membersList = JSON.parse(localStorage.getItem('membersList')) || [];
    const userId = document.getElementById('userIdUp');

    if (!userId.value) {
        alert('아이디를 입력해주세요.');
    }
    else {
        // 아이디 유효성 검사 (첫 글자는 영소문자로 시작하며 숫자 최소 하나 포함)
        const regExp1 = /^[a-z][a-z\d]{3,11}$/;
        const regExp2 = /\d/;
        if (!regExpTest(regExp2, userId, '아이디는 숫자를 하나 이상 포함해주셔야 합니다.'))
            return false;
        if (!regExpTest(regExp1, userId, '아이디는 영소문자로 시작하는 4글자 ~ 12글자 입력해주셔야 합니다.'))
            return false;

        // 회원목록이 없는 경우
        if (membersList.length === 0) {
            ableData('아이디', userId);
            return;
        };

        // 회원목록이 있는 경우 id값 비교
        const equalIdResult = membersList.find((member) => {
            return member.userId === userId.value;
        });

        if (equalIdResult) {
            notableData('아이디', userId);
            return;
        }
        else {
            ableData('아이디', userId);
            return;
        }
    };
};


/**
 * 이메일 중복 검사
 */
const signUpEmailCheck = () => {
    const membersList = JSON.parse(localStorage.getItem('membersList')) || [];
    const userEmail = document.getElementById('userEmailUp');

    if (userEmail.value) {
        // 이메일 유효성 검사
        if (!regExpTest(/^[\w]{4,}@[\w]+(\.[\w]+){1,3}$/, userEmail, 
        `이메일은 @앞에 영문자 숫자 4글자 ~ 12글자만 입력 가능합니다.
(예. test1@naver.com)`
        ))
            return false;
        
        // 회원 목록이 없는 경우
        if (membersList.length === 0) {
            ableData('이메일', userEmail);
            return;
        };

        // 회원 목록이 있는 경우 이메일 값 비교
        const equalEmailResult = membersList.find((member) => {
            return member.userEmail === userEmail.value;
        });

        if (equalEmailResult) {
            notableData('이메일', userEmail);
            return;
        }
        else {
            ableData('이메일', userEmail);
            return;
        };

    };
};


/**
 * 서버 저장 전 유효성 검사
 */
const signUpFrmCheck = (e) => {
    const userId = document.getElementById('userIdUp');
    const userPw = document.getElementById('userPwUp');
    const userPwCheck = document.getElementById('userPwCheckUp');
    const userEmail = document.getElementById('userEmailUp');


    // 1. 아이디 유효성 검사
    // 첫 글자는 영소문자로 시작
    const regExp1 = /^[a-z][a-z\d]{3,11}$/;
    const regExp2 = /\d/;
    if (!regExpTest(regExp2, userId, '아이디는 숫자를 하나 이상 포함해주셔야 합니다.'))
        return false;
    if (!regExpTest(regExp1, userId, '아이디는 영소문자로 시작하는 4글자 ~ 12글자 입력해주셔야 합니다.'))
        return false;


    // 2. 비밀번호 유효성 검사
    // 숫자/문자/특수문자 포함한 형태의 6~15자리 이내
    const regExpPwArr = [/^.{6,15}$/, /[a-z]/, /\d/, /[\\\.*!&_]/];
    for (let i = 0; i < regExpPwArr.length; i++) {
        if (!regExpTest(regExpPwArr[i], userPw,
                '비밀번호는 6글자 ~ 15글자 입력 가능하며\n영소문자, 숫자, 특수문자(.\\*!&)가 최소 하나 이상 포함되어야 합니다.')
        ) {
            return false;
        }
    };

    // 비밀번호 일치 검사
    if (userPw.value !== userPwCheck.value) {
        alert('비밀번호가 일치하지 않습니다.');
        userPw.select();
        return false;
    };


    // 3. 이메일 유효성 검사
    if (!regExpTest(/^[\w]{4,}@[\w]+(\.[\w]+){1,3}$/, userEmail, 
    `이메일은 @앞에 영문자 숫자 4글자 ~ 12글자만 입력 가능합니다.
(예. test1@naver.com)`
    ))
        return false;

};


/**
 * localStorage에 회원 정보 저장
 */
const saveMembers = () => {
    if (signUpFrmCheck() !== false) {
        const userId = document.getElementById('userIdUp');
        const userPw = document.getElementById('userPwUp');
        const userEmail = document.getElementById('userEmailUp');
    
        const memberList = new MemberList(userId.value, userPw.value, userEmail.value);
        const membersList = JSON.parse(localStorage.getItem('membersList')) || [];
    
        membersList.push(memberList);
    
        localStorage.setItem('membersList', JSON.stringify(membersList));
    
        document.signUpFrm.reset();
    
        alert('회원가입을 성공적으로 완료했습니다.');
    }
};


/**
 * localStorage에 저장된 회원 목록 조회
 */
const renderMemberList = (membersList = JSON.parse(localStorage.getItem('membersList'))) => {
    const tbody = document.querySelector('#membersLi tbody');
    tbody.innerHTML = '';

    membersList?.reverse();

    if (membersList) {
        membersList.forEach(({userId, userPw, userEmail, datetime}, index) => {
            tbody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${userId}</td>
                <td>${userPw}</td>
                <td>${userEmail}</td>
                <td>${datetimeFormatter(new Date(datetime))}</td>
            </tr>
            `;
        });
    } else {
        tbody.innerHTML = `
            <tr><td colspan='5', style='text-align: center;'>등록된 회원이 없습니다...</td></tr>
        `;
    };
};


/**
 * datetime 조회 시 포맷팅
 */
const datetimeFormatter = (date) => {
    const format = (n) => n < 10 ? '0' + n : n;

    const year = format(date.getFullYear());
    const month = format(date.getMonth() + 1);
    const day = format(date.getDate());
    const hour = format(date.getHours());
    const minutes = format(date.getMinutes());
    const second = format(date.getSeconds());
    return `${year}/${month}/${day} ${hour}:${minutes}:${second}`;
};
