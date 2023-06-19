import styles from '@/styles/RecordCard.module.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const RecordCard = (props) => {
    return (
      <div className={styles.container}>
        <div className={styles.info_container}>
          <p className={styles.title}>Visual Studio Code_{props.type}</p>
          <div className={styles.tool}><img className={styles.tool_img} src='/images/vscode.png'/></div>
        </div>
        <div className={styles.progress_container}>
          <CircularProgressbar value={28} text={`28%`} styles={buildStyles({
            pathColor: '#6C5DD3',
            textColor: '#FFFFFF',
            trailColor: '#F3EEFF'
          })}/>
        </div>
      </div>
    );
}

export default RecordCard;