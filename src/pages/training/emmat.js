import Navbar from '@/src/component/Navbar';
import Sidebar from '@/src/component/Sidebar';
import styles from '@/styles/Emmat.module.css';
import { emmats } from '@/public/emmats';
import { useState, useEffect } from 'react';
import Modal from '@/src/component/Modal';
import JSConfetti from 'js-confetti';
import { useRouter } from "next/router";
import axios from 'axios';

const TrainingEmmat = () => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

	const router = useRouter();
	const [currentIdx, setCurrentIdx] = useState(0);
	const [visible, setVisible] = useState(false);
	const [isDisable, setIsDisable] = useState(false);
	const [text, setText] = useState('');
	const [color, setColor] = useState('');
	const [correct, setCorrect] = useState(false);
	const emmat = emmats[currentIdx];

	const [jsConfetti, setJsConfetti] = useState(null);

  useEffect(() => {
      setJsConfetti(new JSConfetti());
  }, []);

  const handler = () => {
    console.log("dd")
      jsConfetti.addConfetti({
      confettiColors: [
          "#CAB0FF"
      ],
      confettiNumber: 500,
      });
  }

	const handlerEmmat = e => {
		setText(e.target.value);
		if(e.target.value === emmats[currentIdx].emmat) {
			setColor("#C9EEDC");
			setCorrect(true);
		} else {
			setColor("#FFDDDD");
			setCorrect(false);
		}
	}

	const stuEmmat = async () => {
    try {
      const email = localStorage.getItem('email');
      const count = currentIdx;
      const response = await axios.get("http://localhost:5000/api/update", {
        params: {
          data: "stu_emmat", // 여기에 쿼리 매개변수 설정
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

	return (
		<>
			{!showModal && (
        <div className={styles.modal}>
            <p className={styles.title2}>Visual Studio Code 단축어 연습</p>
          <div className={styles.modalContent}>
            <p className={styles.text}>22/28개 진행중입니다.
            <br/>저장하시겠습니까?</p>
          </div>
          <div className={styles.btn_container}>
            <button className={styles.btn} onClick={stuEmmat}>저장하기</button>
            <button className={styles.btn} onClick={handleCloseModal}>종료하기</button>
          </div>
        </div>
      )}
			{currentIdx === emmats.length-1 ? <Modal title="Visual Studio Code 단축어 실습"/> : ""}
			<div style={currentIdx === emmats.length-1 ? {width: "100%", height: "100%", backgroundColor: "#D9D9D9", opacity: "50%"} : null}>
				<Navbar/>
				<div className={styles.container}>
					<Sidebar isStudy={true} isSelected={true} handleEndStudy={() => setShowModal(true)}/>
					<div className={styles.right_container}>
						<div className={styles.title_container}>
							<p className={styles.title}>Visual Studio Code 단축어 실습</p>
							<p className={styles.title}>제시된 의미에 맞는 단축어를 입력하세요!</p>
						</div>
						<div className={styles.page_container}>
							<div className={styles.current_page}>{currentIdx + 1}</div>
							<div className={styles.line}> | </div>
							<div className={styles.all_page}>{emmats.length}</div>
						</div>
						<div className={styles.card} style={{backgroundImage: "url('/images/training_card.png')"}}>
							<div className={styles.card_content}>{emmat.description}</div>
						</div>
						<div className={styles.input_container}>
							<label className={styles.text}>답</label>
							<input className={styles.input} style={ visible ? {backgroundColor: color} : null} disabled={isDisable} value={text} onChange={handlerEmmat}/>
						</div>
						{
							!visible ?
							<button className={styles.enter_btn}
								onClick={() => {
									setVisible(true);
									setIsDisable(true);
							}}>입력완료</button>
							:
							correct ? 
							<button className={styles.next_btn}
								style={{marginTop: "40px"}}
								onClick={() => {
									setText('');
									setIsDisable(false);
									setCurrentIdx(idx => idx + 1);
									setVisible(false);	
								}}>넘어가기</button>
							:
							<button className={styles.retry_btn}
								style={{marginTop: "40px"}}
								onClick={() => {
									setText('');
									setIsDisable(false);
									setCurrentIdx(idx => idx + 1);
									setVisible(false);
									currentIdx === shortcuts.length-2 && handler();
								}}>나중에 한 번 더</button>
						}
						</div>
				</div>
			</div>
		</>
	);
}

export default TrainingEmmat;