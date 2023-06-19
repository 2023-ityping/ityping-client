import styles from '@/styles/Record.module.css';
import Navbar from '../../component/Navbar';
import Sidebar from '../../component/Sidebar';
import { useRouter } from 'next/router';
import RecordCard from '@/src/component/RecordCard';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Record = () => {
  const router = useRouter();
  const [pract, setPract] = useState(null) //vscode 연습 총 합
  const [study, setStudy] = useState(null) //vscode 실습 총 합
  const [stuemmat, setStuemmat] = useState(null) //단축어 학습 개수
  const [stushortcut, setStushortcut] = useState(null) // 단축키 학습 개수
  const [praemmat, setPraemmat] = useState(null) // 단축어 연습 개수 
  const [prashortcut, setPrashortcut] = useState(null) //단축키 연습 개수

  useEffect(() => {
    const getRecord = async () => {
      try {
        const email = localStorage.getItem('email'); // 로컬 스토리지에서 이메일 값을 가져옴
        const response = await axios.get(`http://localhost:5000/api/getrecord?email=${email}`);
        const { data } = response;
        console.log(data); // 받아온 데이터 확인
        setStuemmat(data.records.stu_emmat)
        setStushortcut(data.records.stu_shortcut)
        setPraemmat(data.records.pra_emmat)
        setPrashortcut(data.records.pra_shortcut)
      } catch (error) {
        console.error("오류 발생:", error);
      }
    };
    getRecord();
  }, []);
  

  return (
    <>
      <Navbar/>
      <div className={styles.container}>
        <Sidebar isStudy={false} isSelected={true}/>
        <div>
          <p className={styles.text}>MY PAGE</p>
          <div className={styles.btn_container1}>
            <button className={styles.profile_btn} onClick={() => router.push('/mypage')}>프로필</button>
            <button className={styles.record_btn}>기록보기</button>
          </div>
          <div className={styles.card_container}>
            <RecordCard type="연습" emmat={praemmat} shortcut={prashortcut}/>
            <RecordCard type="실습" emmat={stuemmat} shortcut={stushortcut}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default Record;