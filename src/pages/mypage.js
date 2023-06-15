import styles from '@/styles/MyPage.module.css';
import Navbar from '../component/Navbar';
import Sidebar from '../component/Sidebar';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

const MyPage = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user', {
          credentials: 'include', // 'connect.sid' 쿠키를 포함하도록 설정
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData)
        } else {
          // 오류 처리
        }
      } catch (error) {
        // 오류 처리
      }
    };
  
    fetchUserData();
  }, []);
  
  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include', // 'connect.sid' 쿠키를 포함하도록 설정
      });
      if (response.ok) {
        router.replace('/');
      } else {
        // 오류 처리
      }
    } catch (error) {
      // 오류 처리
    }
  };

  return (
    <>
      <Navbar/>
      <div className={styles.container}>
        <Sidebar isStudy={false} isSelected={true}/>
        <div>
          <p className={styles.text}>MY PAGE</p>
          <div className={styles.btn_container1}>
            <button className={styles.profile_btn}>프로필</button>
            <button className={styles.record_btn} onClick={() => router.push('/mypage/record')}>기록보기</button>
          </div>
          <div className={styles.profile_container}>
            <img className={styles.profile} src='/images/profile.png'/>
            <button className={styles.edit_btn}><img src='/images/edit.png'/></button>
          </div>
          <div className={styles.info_container}>
            <label className={styles.text}>닉네임</label>
            {/* <div className={styles.input_container}>{user.email}</div>  */}
            <button className={styles.edit_btn}><img src='/images/edit.png'/></button>
          </div>
          <div className={styles.info_container}>
            <label className={styles.text}>비밀번호</label>
            <div className={styles.pw_container} style={{paddingTop: "7px"}}><img src='/images/lock.png'/></div>
            <button className={styles.edit_btn}><img src='/images/edit.png'/></button>
          </div>
          <div className={styles.info_container}>
            <label className={styles.text}>이메일</label>
            {/* <div className={styles.input_container}>{user.nickname}</div> */}
            <button className={styles.edit_btn}><img src='/images/edit.png'/></button>
          </div>
          <div className={styles.btn_container2}>
            <button className={styles.logout_btn} onClick={handleLogout}>로그아웃<img src='/images/exit.png'/></button>
            <button className={styles.quit_btn}>계정탈퇴</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyPage;