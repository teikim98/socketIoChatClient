import { useState, useCallback } from "react";

function NicknameForm({ handleSubmitNickname }) {
  const [nickname, setNickname] = useState("");

  const handleChangeNickname = useCallback((event) => {
    setNickname(event.target.value);
  }, []);

  const handleSubmit = useCallback(() => {
    handleSubmitNickname(nickname);
    setNickname("");
  }, [handleSubmitNickname, nickname]);

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="d-flex" onSubmit={onSubmit}>
      <div className="card d-flex flex-row align-items-center">
        <label htmlFor="user-name-input" style={{ width: 60 }}>
          닉네임
        </label>
        <input
          type="text"
          className="form-control w300"
          id="user-name-input"
          maxLength={12}
          value={nickname}
          onChange={handleChangeNickname}
          onKeyPress={(event) => {
            if (event.code === "Enter") {
              event.preventDefault();
              handleSubmit();
            }
          }}
        />
        <button
          type="button"
          className="btn btn-primary send-btn"
          value="확인"
          onClick={handleSubmit}
        >
          확인
        </button>
      </div>
    </form>
  );
}

export default NicknameForm;
