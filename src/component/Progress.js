import styles from '@/styles/Progress.module.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Progress = (props) => {
    const [num, setNum] = useState(null);
    const [completionRatio , setCompletionRatio ] = useState(null);
    const [emmat, setEmmat] = useState(0) //단축어 학습 개수
    const [shortcut, setShortcut] = useState(0) // 단축키 학습 개수
    useEffect(() => {
        const getRecord = async () => {
          try {
            const email = localStorage.getItem('email'); // 로컬 스토리지에서 이메일 값을 가져옴
            const response = await axios.get(`http://localhost:5000/api/study/record?email=${email}`);
            const { data } = response;
            console.log(data); // 받아온 데이터 확인
            console.log("data : ", data.records.pra_shortcut + data.records.stu_shortcut)
            if(props.props == "shortcut"){
                setShortcut(data.records.pra_shortcut + data.records.stu_shortcut)
                console.log("short : ", shortcut)
            }else{
                setEmmat(data.records.pra_emmat + data.records.stu_emmat)
            }
            const totalTasks = 20;
            let temp = 0;
            // const completedTasks = emmat + shortcut;
            if(props.props == "shortcut"){
                temp = ((shortcut / totalTasks) * 100).toFixed(2);
            }else{
                temp = ((emmat / totalTasks) * 100).toFixed(2);
            }
            setCompletionRatio(temp);
            console.log("e, s : ", emmat, shortcut)
            console.log(completionRatio);
          } catch (error) {
            console.error("오류 발생:", error);
          }
        };
        getRecord();

      });

    return (
        <div className={styles.container}>
            <div className={styles.left_container}>
                <div className={styles.tool_img}>
                    <img src='/images/vscode.png'/>
                </div>
                <div className={styles.text_box}>
                    <div className={styles.title}>
                        Visual Studio Code
                    </div>
                    <div className={styles.tag}>
                        개발 코드
                    </div>
                </div>
            </div>
            <div className={styles.right_container}>
                <CircularProgressbar value={completionRatio} text={`${completionRatio}%`} styles={buildStyles({
                    pathColor: '#6C5DD3',
                    textColor: '#FFFFFF',
                    trailColor: '#F3EEFF'
                })}/>
            </div>
        </div>
    );
}

export default Progress;