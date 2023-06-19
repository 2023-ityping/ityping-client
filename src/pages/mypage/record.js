import styles from '@/styles/Record.module.css';
import Navbar from '../../component/Navbar';
import Sidebar from '../../component/Sidebar';
import { useRouter } from 'next/router';
import RecordCard from '@/src/component/RecordCard';

const Record = () => {
  const router = useRouter();

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
            <RecordCard type="연습"/>
            <RecordCard type="실습"/>
          </div>
        </div>
      </div>
    </>
  );
}

export default Record;