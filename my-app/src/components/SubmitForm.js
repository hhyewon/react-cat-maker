import React from "react";

const SubmitForm = ({ updateMainCat }) => {
    // const counterState = React.useState(1);
    // const counter = counterState[0];
    // const setCounter = counterState[1];
    // >> const [counter, setCounter] = React.useState(1);

    const [value, setValue] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');

    const includesHangul = (text) => /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/i.test(text);

    function handleInputChange(e) {
        const userValue = e.target.value;

        setValue(userValue.toUpperCase());
        includesHangul(userValue) ? setErrorMessage('한글은 입력할 수 없습니다.') : setErrorMessage('');
    }

    function handleFormSubmit(e) {
        e.preventDefault();

        if (value === '') {
            setErrorMessage('빈 값은 전송할 수 없습니다.');
            return;
        } else {
            setErrorMessage('');
            updateMainCat(value);
        }
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <input type="text" name="name" placeholder="영어 대사를 입력해주세요"
                onChange={handleInputChange}
                value={value} />
            <p style={{ color: "red" }}>{errorMessage}</p>
            <button type="submit">생성</button>
        </form>
    )
}


export default SubmitForm;