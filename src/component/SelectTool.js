import styles from "@/styles/SelectTool.module.css";
import { useRouter } from "next/router";
import React from "react";

const SelectTool = (props) => {
  const router = useRouter();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.box} style={{backgroundImage: props.job_en === 'Developer' ? 'url("/images/developer.png")' : 'url("/images/designer.png")'}}>For {props.job_en}</div>
        <div className={styles.content_container}>
          <h4>{props.job_ko}를 위한 툴</h4>
          <div className={styles.tools_container}>
            {props.job_en === "Developer" ? (
            <div className={styles.tool_container} 
              key="Visual Studio Code" 
              onClick={() => router.push('/study/shortcut')}>
              <div className={styles.img_box} style={{backgroundColor:"#D0ECFF"}}><img className={styles.tool_img} src={`/images/vscode.png`} /></div>
              <div className={styles.tool_contents}>
                <h3>Visual Studio Code</h3>
                <p className={styles.tool_info}>마이크로소프트에서 개발한 윈도우, macOS, 리눅스용으로 개발한 소스 코드 편집기</p>
              </div>
              <img className={styles.move_img} src='/images/move.png'/>
            </div>
            ) : (
              <div className={styles.tool_container}>
                <img className={styles.locked_tool_img} src='/images/locked_tool.png'/>
                <div className={styles.tool_contents}>
                  <h3 className={styles.locked_text}>오픈 예정</h3>
                </div>
                <img className={styles.lockced_move_img} src='/images/locked_move.png'/>
              </div>
            )}
            <div className={styles.tool_container}>
              <img className={styles.locked_tool_img} src='/images/locked_tool.png'/>
              <div className={styles.tool_contents}>
                <h3 className={styles.locked_text}>오픈 예정</h3>
              </div>
              <img className={styles.lockced_move_img} src='/images/locked_move.png'/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectTool;
