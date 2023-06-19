import styles from "@/styles/Sidebar.module.css";
import React from "react";

const Sidebar = (props) => {
  
  return (
      <div className={styles.container}>
        <div className={styles.menu}>
        {
          props.isStudy ? 
          <div className={styles.exit_box}><a className={styles.selected_text}><img src='/images/leave.png'/>학습종료</a></div>
          :
          props.isGame ? 
            <div className={styles.exit_box}><a className={styles.selected_text}><img src='/images/leave.png'/>게임취소</a></div>
            :
          <div>
            <div className={props.isSelected ? styles.selected_box : styles.box}><a className={props.isSelected ? styles.selected_text : styles.text} href="/study/shortcut"><img src={props.isSelected ? '/images/selected-study.png' : '/images/study.png'}/>단축키 학습</a></div>
            <div className={props.isSelected ? styles.box : styles.selected_box}><a className={props.isSelected ? styles.text : styles.selected_text} href="/game/select"><img src={props.isSelected ? '/images/game.png' : '/images/selected-game.png'}/>단축키 게임</a></div>
          </div>
          }
        </div>
        <div className={styles.line}></div>
      </div>
  );
};

export default Sidebar;