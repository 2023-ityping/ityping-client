import styles from '@/styles/Navbar.module.css';
import React from "react";
import { useState, useEffect } from 'react';

const Navbar = () => {
	const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/user', {
          credentials: 'include', // 'connect.sid' 쿠키를 포함하도록 설정
        });
        if (response.ok) {
          const userData = await response.json();
          setUserData(userData); // 사용자 데이터 설정
		  localStorage.setItem('email', userData.email)
		  localStorage.setItem('pw', userData.pw)
		  localStorage.setItem('nickname', userData.nickname)
        } else {
          // 오류 처리
        }
      } catch (error) {
        // 오류 처리
      }
    };

    fetchUserData();
  }, []);
	return (
		<>
			<header className={styles.header}>
				<div className={styles.logo}><a href='/'><img src='/images/logo.png'/></a></div>
				<div className={styles.container}>
					{
						userData ? 
						<a href='/mypage'>
							<div className={styles.profile_container}>
								<img className={styles.profile} src='/images/profile.png'/>
								<div className={styles.user_container}>
									<p className={styles.name}>{userData.nickname}</p>
									<p className={styles.email}>{userData.email}</p>
								</div>
							</div>
						</a>
						:
						<>
							<div className={styles.login}><a href='/login'>로그인</a></div>
							<div className={styles.sign_up}><a href='/signup'>회원가입</a></div>
						</>
					}
				</div>
			</header>
		</>
	)
}

export default Navbar;