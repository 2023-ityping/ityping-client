import styles from '@/styles/ResultModal.module.css';
import { useRouter } from "next/router";
import axios from 'axios';

const Modal = (props) => {
    const router = useRouter();
    const nickname = localStorage.getItem('nickname');
    const name = nickname ? nickname : '비회원'

    const GameScore = async () => {
        console.log(nickname, props.score)
        try {
          const response = await axios.post("http://localhost:5000/api/game", {
            params: {
              email : localStorage.getItem('email'), 
              name: localStorage.getItem('nickname'), 
              score: props.score,
              gametype: props.gametype
            }
          }, { withCredentials: true });
          if(response) {
            alert("성공")
            router.replace('/game/select');
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
                <button className={styles.btn}><a href={props.gametype}>다시하기</a></button>
                <button className={styles.btn} onClick={GameScore}>랭킹 보러가기</button>
            </div>
        </div>
    );
}

export default Modal;