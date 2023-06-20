import styles from "@/styles/Main.module.css";
import React from "react";
import Navbar from "../component/Navbar";
import SelectTool from "../component/SelectTool";
import Sidebar from "../component/Sidebar";

const Home = () => {

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <Sidebar isStudy={false} isSelected={true}/>
        <div className={styles.contents}>
          <h2 style={{color: '#6C5DD3'}}>Welcome!</h2>
          <h3 style={{fontSize: '18px'}}>필요한 툴의 단축키를 학습해보세요!</h3>
          <div className={styles.contents_container}>
            <SelectTool job_en="Developer" job_ko="개발자"/>
            <SelectTool job_en="Designer" job_ko="디자이너"/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
