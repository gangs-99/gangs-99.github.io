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
 * 로그인 기능
 */
const signInClick = () => {
    const membersList = JSON.parse(localStorage.getItem('membersList'));

    const userId = document.getElementById('userIdIn');
    const userPw = document.getElementById('userPwIn');

    for (let i = 0; i < membersList.length; i++) {
        const {userId : equalId, userPw : equalPw} = membersList[i];

        if (userId.value === equalId && userPw.value === equalPw) {
            alert(`${userId.value}님 방문해주셔서 감사합니다~`);
            location.href = 'index.html';
            return;
        };

        if (i === membersList.length - 1) {
            alert('아이디 및 비밀번호 등 입력하신 정보가 일치하지 않습니다. 다시 입력해주세요.');
            location.reload();
            // return;
        };
    };
};


/**
 * 이메일 입력받아 아이디값 반환
 */
const findIdBtnClick = () => {
    const membersList = JSON.parse(localStorage.getItem('membersList')) || [];
    const userEmail = document.getElementById('findIduserEmail');

    equalLogin();
    
    for (let i = 0; i < membersList.length; i++) {
        const {userId : equalId, userEmail : equalEmail} = membersList[i];

        if (userEmail.value === equalEmail) {
            alert(`아이디는 [${equalId}] 입니다.`);
            userEmail.value = '';
            return;
        };

        if (i === membersList.length - 1) {
            alert('잘못된 입력값입니다. 확인 후 다시 입력해주세요.');
            return;
        };
    };
};


/**
 * 아이디랑 이메일 입력받아 비밀번호 반환
 */
const findPwBtnClick = () => {
    const membersList = JSON.parse(localStorage.getItem('membersList')) || [];
    const userId = document.getElementById('findPwUserId');
    const userEmail = document.getElementById('findPwUserEmail');

    equalLogin();
    
    for (let i = 0; i < membersList.length; i++) {
        const {userId : equalId, userPw : equalPw, userEmail : equalEmail} = membersList[i];

        if (userId.value === equalId && userEmail.value === equalEmail) {
            alert(`비밀번호는 [${equalPw}] 입니다.`);
            userId.value = '';
            userEmail.value = '';
            return;
        };

        if (i === membersList.length - 1) {
            alert('잘못된 입력값입니다. 확인 후 다시 입력해주세요.');
            return;
        };
    };
};


/**
 * membersList에 값이 없는 경우
 */
const equalLogin = () => {
    const membersList = JSON.parse(localStorage.getItem('membersList')) || [];

    if (membersList.length === 0) {
        alert('잘못된 입력값입니다. 확인 후 다시 입력해주세요.');
        // location.reload();
        return false;
    }
}


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
 * 아이디 중복 검사
 */
const signUpIdCheck = () => {
    const membersList = JSON.parse(localStorage.getItem('membersList')) || [];
    const userId = document.getElementById('userIdUp');

    if (!userId.value) {
        alert('아이디를 입력해주세요.');
    }
    else {
        if (membersList.length === 0) {
            alert('사용가능한 아이디입니다.');
            userId.style.border = '2px solid lightgray';
            return;
        };

        for (let i = 0; i < membersList.length; i++) {
            const {userId : savedId} = membersList[i];
            
            if (userId.value === savedId) {
                alert('중복된 아이디입니다. 다시 입력해주세요.');
                userId.style.border = '2px solid red';
                return;
            }
    
            if (i == membersList.length - 1) {
                alert('사용가능한 아이디입니다.');
                userId.style.border = '2px solid lightgray';
                return;
            }
        };
    }  
};


/**
 * 이메일 중복 검사
 */
const signUpEmailCheck = () => {
    const membersList = JSON.parse(localStorage.getItem('membersList')) || [];
    const userEmail = document.getElementById('userEmailUp');

    if (userEmail.value) {
        if (membersList.length === 0) {
            alert('사용가능한 이메일입니다.');
            userId.style.border = '2px solid lightgray';
            return;
        };

        for (let i = 0; i < membersList.length; i++) {
            const {userEmail : savedEmail} = membersList[i];
            
            if (userEmail.value === savedEmail) {
                alert('중복된 이메일입니다. 다시 입력해주세요.');
                userEmail.style.border = '2px solid red';
                return;
            }
    
            if (i == membersList.length - 1) {
                alert('사용가능한 이메일입니다.');
                userEmail.style.border = '2px solid lightgray';
                return;
            }
        };
    }  
};


const signUpFrmCheck = (e) => {
    const userId = document.getElementById('userIdUp');
    const userPw = document.getElementById('userPwUp');
    const userPwCheck = document.getElementById('userPwCheckUp');
    const userEmail = document.getElementById('userEmailUp');

    const regExpTest = (regExp, elem, msg) => {
        if (regExp.test(elem.value))
            return true;
        alert(msg);
        return false;
    };

    
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