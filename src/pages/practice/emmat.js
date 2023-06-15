import Navbar from '@/src/component/Navbar';
import Sidebar from '@/src/component/Sidebar';
import styles from '@/styles/Emmat.module.css';
import { emmats } from '@/public/emmats';
import { useState } from 'react';
import Modal from '@/src/component/Modal';
import JSConfetti from 'js-confetti';

const PracticeEmmat = () => {
	const [currentIdx, setCurrentIdx] = useState(0);
	const [visible, setVisible] = useState(false);
	const [isDisable, setIsDisable] = useState(false);
	const [text, setText] = useState('');
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
			setIsDisable(!isDisable);
			setVisible(!visible);
		}
	}

	return (
		<>
			{currentIdx === emmats.length-1 ? <Modal title="Visual Studio Code 단축어 연습"/> : ""}
			<div style={currentIdx === emmats.length-1 ? {width: "100%", height: "100%", backgroundColor: "#D9D9D9", opacity: "50%"} : null}>
				<Navbar/>
				<div className={styles.container}>
					<Sidebar isStudy={false} isSelected={true}/>
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
						<div className={styles.card} style={{backgroundImage: "url('/images/practice_card.png')"}}>
							<div className={styles.card_title}>{emmat.emmat}</div>
							<div className={styles.card_content}>{emmat.description}</div>
						</div>
						<div className={styles.input_container}>
							<label className={styles.text}>연습</label>
							<input className={styles.input} disabled={isDisable} value={text} placeholder={emmats[currentIdx].emmat} onChange={handlerEmmat}/>
						</div>
						{
							visible &&
							<div className={styles.btn_container}>
							<button className={styles.retry_btn} 
								onClick={() => {
									setText('');	
									setIsDisable(false)
									setCurrentIdx(idx => idx);
									setVisible(false);
								}}>다시하기</button>
							<button className={styles.next_btn}
								onClick={() => {
									setText('');
									setIsDisable(false);
									setCurrentIdx(idx => idx + 1);
									setVisible(false);
									currentIdx === shortcuts.length-2 && handler();
								}
							}>
							넘어가기
							</button>
						</div>
						}
					</div>
				</div>
			</div>
		</>
	);
}

export default PracticeEmmat;