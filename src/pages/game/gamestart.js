import Navbar from '@/src/component/Navbar';
import Sidebar from '@/src/component/Sidebar';
import styles from '@/styles/GameStart.module.css'
import { shortcuts } from '@/public/shortcuts';
import { useState,useEffect } from 'react';
import ModalResult from '@/src/component/GameResultModal';
import Modal from '@/src/component/GameModal';

const SelectGame = (props) => {
  const [score, setScore] = useState(0);
  const [timer, setTime] = useState(30);
  const [cards, setCards] = useState([]);
  const [cards2, setCards2] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenResult, setIsModalOpenResult] = useState(false);
  const [modalStyle, setModalStyle] = useState(true);
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  //랜덤으로 단축키 4개 선택 
  useEffect(() => {
    const selectedShortcuts = getRandomShortcuts(shortcuts, 4); // Select 4 random shortcuts
    console.log(selectedShortcuts)
    const shuffledTexts = shuffle(selectedShortcuts)
    const shuffledDescriptions = shuffle(selectedShortcuts.map((shortcuts) => shortcuts.description))
    setCards(shuffledTexts);
    setCards2(shuffledDescriptions);
  }, []);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTime((prevTimer) => prevTimer - 1);
    }, 1000);
    if(timer === 0){
      ResultopenModal()
      clearInterval(timerInterval)
    }
    //컴포넌트가 
    return () => clearInterval(timerInterval)
  })

  //결과 모달창
  const ResultopenModal = () => {
    setIsModalOpenResult(true);
  }

  // 점수 모달창 띄우기
  const openModal = () => {
    setIsModalOpen(true);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 2000)
  }

  // 클릭했을 때 정답인지 아닌지 확인하기 
  const handleCardClick = (index) => {
    if (flippedCards.length < 2) {
      const newFlippedCards = [...flippedCards, index];
      setFlippedCards(newFlippedCards);

      if (newFlippedCards.length === 2) {
        const [cardIndex1, cardIndex2] = newFlippedCards;
        const card1 = cards[cardIndex1];
        const card2 = cards2[cardIndex2];

        if (card1.description === card2) {
          setMatchedCards([...matchedCards, cardIndex1, cardIndex2]);

          //일치하는 카드 숨기기
          const updatedCade = cards.filter((_, i) => i !== cardIndex1)
          setCards(updatedCade)
          const updatedCade2 = cards2.filter((_, i) => i != cardIndex2)
          setCards2(updatedCade2)
          setScore((score) => score + 100);
          setModalStyle(true)
          openModal()
          if(cards.length == 1 || card2.length == 2){
            setTimeout(() => {
              //새로운 카드 생성
              const selectedShortcuts = getRandomShortcuts(shortcuts, 4); // Select 4 random shortcuts
              console.log(selectedShortcuts)
              const shuffledTexts = shuffle(selectedShortcuts)
              const shuffledDescriptions = shuffle(selectedShortcuts.map((shortcuts) => shortcuts.description))
              setCards(shuffledTexts);
              setCards2(shuffledDescriptions);
              setFlippedCards([])
            }, 1000);
          }
        } else {
          setScore((score) => score - 50);
          setModalStyle(false)
          setDescription(card1.description)
          openModal()
        }

        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const getRandomShortcuts = (shortcuts, count) => {
    const shuffledShortcuts = shuffle(shortcuts);
    return shuffledShortcuts.slice(0, count);
  };

  const shuffle = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };
  
	return (
		<>  
			<Navbar/>
			<div className={styles.container}>
				<Sidebar isStudy={false} isSelected={true} isGame={true}/>
				<div className={styles.right_container}>
					<p className={styles.title}>Visual Studio Code 게임</p>
          <div className={styles.title_group}>
              <p className={styles.score }>점수 : {score}점</p>
              <p className={styles.score  }>{timer}초</p>
          </div>
					<div className={styles.game_container}>
            {isModalOpen && (
              <Modal style={modalStyle} text={title} description={description}/>
            )}
            {isModalOpenResult && (
              <ModalResult score = {score} />
            )}
						<div className={styles.card_container}>
              {cards.map((card, index) => (
                <div
                  className={styles.card}
                  isFlipped={flippedCards.includes(index) || matchedCards.includes(index)}
                  key={index}
                  onClick={() => {
                    handleCardClick(index)
                    setTitle(card.text)
                  }}>
                  <div>{card.text}</div>
              </div>
              ))}
            </div>
            <div className={styles.card_container}>
              {cards2.map((card, index) => (
                  <div
                    className={styles.card2}
                    key={index}
                    isFlipped={flippedCards.includes(index) || matchedCards.includes(index)}
                    onClick={() => {
                      handleCardClick(index)
                      setDescription(card)
                      }}>
                    <div>{card}</div>
                </div>
                ))}
            </div>
            {isModalOpenResult && (
              <div className={styles.modal_back}></div>
            )}
					</div>
				</div>
			</div>
		</>
	);
}

export default SelectGame;