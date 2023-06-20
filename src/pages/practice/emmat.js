import Navbar from '@/src/component/Navbar';
import Sidebar from '@/src/component/Sidebar';
import styles from '@/styles/Emmat.module.css';
import { emmats } from '@/public/emmats';
import { useState, useEffect, } from 'react';
import { useRouter } from "next/router";
import Modal from '@/src/component/Modal';
import JSConfetti from 'js-confetti';
import axios from 'axios';

const PracticeEmmat = () => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const router = useRouter();
  const [currentIdx, setCurrentIdx] = useState(0); //데이터베이스에 보낼 %값    n/12
  const [visible, setVisible] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [text, setText] = useState('');
  const emmat = emmats[currentIdx];

  const [jsConfetti, setJsConfetti] = useState(null);
  useEffect(() => {
    setJsConfetti(new JSConfetti());
  }, []);

  const handler = () => {
    console.log("dd");
    jsConfetti.addConfetti({
      confettiColors: ["#CAB0FF"],
      confettiNumber: 500,
    });
  };

  const handlerEmmat = (e) => {
    setText(e.target.value);
    if (e.target.value === emmats[currentIdx].emmat) {
      setIsDisable(!isDisable);
      setVisible(!visible);
    }
  };

  const praEmmat = async () => {
    try {
      const email = localStorage.getItem('email');
      const count = currentIdx;
      const response = await axios.get("http://localhost:5000/api/update", {
        params: {
          data: "pra_emmat", // 여기에 쿼리 매개변수 설정
          email: email,
          count: count
        }
      });
  
      if (response) {
        alert("성공");
        router.replace('/study/emmat');
      }
    } catch (error) {
      console.error("요청 중 오류 발생:", error);
    }
  }  

  const handleRetry = () => {
    setCurrentIdx(0);
    setCurrentKeyIdx(0);
    setVisible(false);
    setComplete(false);
  }

  const handleExit = () => {
    redirect('/study/emmat');
  }

  return (
    <>
      {showModal && (
        <div className={styles.modal}>
            <p className={styles.title2}>Visual Studio Code 단축어 연습</p>
          <div className={styles.modalContent}>
            <p className={styles.text}>22/28개 진행중입니다.
            <br/>저장하시겠습니까?</p>
          </div>
          <div className={styles.btn_container}>
            <button className={styles.btn} onClick={praEmmat}>저장하기</button>
            <button className={styles.btn} onClick={handleCloseModal}>계속하기</button>
          </div>
        </div>
      )}
      {currentIdx === emmats.length ? <Modal title="Visual Studio Code 단축어 연습" handleRetry={handleRetry} handleExit={handleExit}/> : ""}
      <div
        style={
          currentIdx === emmats.length || showModal
            ? { width: "100%", height: "100%", backgroundColor: "#D9D9D9", opacity: "50%" }
            : null
        }
      >
        <Navbar />
        <div className={styles.container}>
          <Sidebar isStudy={true} isSelected={true} handleEndStudy={() => setShowModal(true)}/>
          <div className={styles.right_container}>
            <div className={styles.title_container}>
              <p className={styles.title}>Visual Studio Code 단축키 연습</p>
              <p className={styles.title}>단축키와 의미를 익히고 따라쳐보며 암기해보세요!</p>
            </div>
            <div className={styles.page_container}>
              <div className={styles.current_page}>{currentIdx + 1}</div>
              <div className={styles.line}> | </div>
              <div className={styles.all_page}>{emmats.length}</div>
            </div>
            <div
              className={styles.card}
              style={{ backgroundImage: "url('/images/practice_card.png')" }}
            >
              {emmat && (<div className={styles.card_title}>{emmat.emmat}</div>)}
              {emmat && (<div className={styles.card_content}>{emmat.description}</div>)}
            </div>
            {emmat && (
            <div className={styles.input_container}>
              <label className={styles.text}>연습</label>
              <input
                className={styles.input}
                disabled={isDisable}
                value={text}
                placeholder={emmats[currentIdx].emmat}
                onChange={handlerEmmat}
              />
            </div>
            )}
            {visible && (
              <div className={styles.btn_container}>
                <button
                  className={styles.retry_btn}
                  onClick={() => {
                    setText('');
                    setIsDisable(false);
                    setCurrentIdx(idx => idx);
                    setVisible(false);
                  }}
                >
                  다시하기
                </button>
                <button
                  className={styles.next_btn}
                  onClick={() => {
                    setText('');
                    setIsDisable(false);
                    setCurrentIdx(idx => idx + 1);
                    setVisible(false);
                    currentIdx === emmats.length - 1 && handler();
                  }}
                >
                  넘어가기
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PracticeEmmat;
