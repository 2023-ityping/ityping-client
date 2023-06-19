import styles from '@/styles/RecordCard.module.css';
import { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const RecordCard = (props) => {
    const [num, setNum] = useState(null);
    const [completionRatio , setCompletionRatio ] = useState(null);

    useEffect(() => {
      const totalTasks = 31;
      const completedTasks = props.shortcut + props.emmat;
      const temp = ((completedTasks / totalTasks) * 100).toFixed(2);;
      setNum(props.shortcut + props.emmat);
      setCompletionRatio(temp);
      console.log(completionRatio);
  }, [props.shortcut, props.emmat]);
  

    return (
      <div className={styles.container}>
        <div className={styles.info_container}>
          <p className={styles.title}>Visual Studio Code_{props.type}</p>
          <div className={styles.tool}><img className={styles.tool_img} src='/images/vscode.png'/></div>
        </div>
        <div className={styles.progress_container}> 
          <CircularProgressbar value={completionRatio} text={`${completionRatio}%`} styles={buildStyles({
            pathColor: '#6C5DD3',
            textColor: '#FFFFFF',
            trailColor: '#F3EEFF'
          })}/>
        </div>
      </div>
    );
}

export default RecordCard;
