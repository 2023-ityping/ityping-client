import styles from '@/styles/ResultModal.module.css';
import { useState } from 'react';
import axios from 'axios';

const Modal = (props) => {
    const nickname = localStorage.getItem('nickname');
    const name = nickname ? nickname : '비회원'
    const GameScore = async () => {
        console.log(nickname, props.score)
        try {
          const response = await axios.post("localhost:5000/api/game", {
            nickname: name,
            score: props.score
          });
          if(response) {
            alert("성공")
            // router.push('/select')
          }
        } catch (error) {
          console.error("게임 점수 입력 중 오류 발생:", error);
        }
      };
    return (
        <div className={styles.container}>
            <div className={styles.title}>Visual Studio Code 게임</div>
            <div className={styles.text}>{name} 님</div>
            <div className={styles.text}>점수 : {props.score}</div>
            <div className={styles.btn_container}>
                <button className={styles.btn}><a href='gamestart'>다시하기</a></button>
                <button className={styles.btn} onClick={GameScore}>랭킹 보러가기</button>
            </div>
        </div>
    );
}

export default Modal;