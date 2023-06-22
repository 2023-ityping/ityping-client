import styles from "@/styles/SignUp.module.css";
import axios from 'axios';
import { useRouter } from "next/router";
import React, { useState } from "react";
import Navbar from "../component/Navbar";

const SignUp = () => {
  const router = useRouter();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [nickname, setNickname] = useState("");

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handlePwChange = (e) => {
    setPw(e.target.value);
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/signup", {
        email: id,
        password: pw,
        nickname: nickname
      });
      if(response) {
        if(response.data.message == '중복된 email 입니다.'){
          alert(response.data.message)
        }else{
          alert("성공")
          router.push('/login')
        }
      }
    } catch (error) {
      alert("중복된 아이디입니다.", error);
    }
  };

  return (
    <>
    <Navbar/>
      <div className={styles.container}>
        <h1 className={styles.welcome}>Welcome!</h1>
        <p className={styles.text}>STUDY KEY 회원가입하기</p>
        <form className={styles.form} onSubmit={handleSignUp}>
          <label className={styles.label}>Email</label>
          <input
            className={styles.input}
            type="email"
            placeholder="Email을 입력해주세요"
            onChange={handleIdChange}
          />
          <label className={styles.label}>Password</label>
          <input
            className={styles.input}
            type="password"
            placeholder="Password를 입력해주세요"
            onChange={handlePwChange}
          />
          <label className={styles.label}>닉네임</label>
          <input
            className={styles.input}
            type="text"
            maxLength="6"
            placeholder="닉네임을 입력해주세요(최대 6글자)"
            onChange={handleNicknameChange}
          />
          <button
            className={styles.sign_up_btn}
            disabled={id.length === 0 || pw.length === 0 || nickname.length === 0}
            type="submit"
          >
            회원가입
          </button>
        </form>
        <div className={styles.or}>OR</div>
        <button className={styles.google_btn}>
          <img className={styles.google_img} src="/images/google.png" alt="Google" />
          Sign Up with Google
        </button>
      </div>
    </>
  );
};

export default SignUp;
