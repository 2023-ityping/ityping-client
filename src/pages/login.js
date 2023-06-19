import Cookies from 'js-cookie';
import styles from "@/styles/Login.module.css";
import React, { useState, useSyncExternalStore } from "react";
import axios from 'axios';
import Navbar from "../component/Navbar";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from 'next-auth/react';

const Login = () => {
  const {data: session} = useSession()
  const router = useRouter();
  const [id, setId] = useState("");
  const [pw, setPw] = useState(""); 

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handlePwChange = (e) => {
    setPw(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // 서버로 로그인 요청을 보냄
      const response = await axios.post("/api/login", {
        email: id,
        password: pw
      });
  
      // 응답의 상태 코드를 확인하여 로그인 성공 여부를 판단
      if (response.status === 200) {
        const user = response.data.user;
        const message = response.data.message;
  
        alert(message); // 로그인 성공 출력
        router.replace('/');
      } else {
        // 로그인 실패 처리
        alert('로그인 실패: 이메일 또는 비밀번호가 잘못되었습니다.');
      }
    } catch (error) {
      console.error("로그인 중 오류 발생:", error.message);
    }
  };
  
  return (
    <>
    <Navbar/>
      <div className={styles.container}>
        <h1 className={styles.welcome}>Welcome!</h1>
        <p className={styles.text}>STUDY KEY 로그인하기</p>
        <form className={styles.form} onSubmit={handleLogin}>
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
          <button
            className={styles.login_btn}
            disabled={id.length === 0 || pw.length === 0}
            type="submit"
          >
            로그인
          </button>
        </form>
        <div className={styles.or}>OR</div>
        <button className={styles.google_btn} onClick={(e)=> signIn('google')}>
          <img className={styles.google_img} src="/images/google.png" />
          Sign in with Google
        </button>
      </div>
    </>
  );
};
export default Login;