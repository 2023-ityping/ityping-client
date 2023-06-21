import Card from '@/src/component/Card';
import Menu from '@/src/component/Menu';
import Navbar from '@/src/component/Navbar';
import Progress from '@/src/component/Progress';
import Sidebar from '@/src/component/Sidebar';
import styles from '@/styles/Study.module.css';
import { useEffect, useState } from 'react';
import { shortcuts } from '@/public/shortcuts';

const StudyShortCut = () => {
    const [currentValue, setCurrentValue] = useState("단축키");
    const [showOptions, setShowOptions] = useState(false);
    const type = "shortcut"
    const handleOnChangeSelectValue = (e) => {
      setCurrentValue(e.target.getAttribute("value"));
    };
    return (
        <>  
            <Navbar/>
            <div className={styles.container}>
                <Sidebar isStudy={false} isSelected={true}/>
                <div className={styles.right_container}>
                    <Progress props={type}/>
                    <div className={styles.menu_container}>
                        <div className={styles.select} onClick={() => {
                                console.log(showOptions)
                                setShowOptions(!showOptions)
                            }}>
                            <div className={styles.selected}>
                                <div className={styles.label}>{currentValue}</div>
                                {
                                    showOptions ? 
                                    <img className={styles.btn} src='/images/select_up.png' alt='up'/>
                                    :
                                    <img className={styles.btn} src='/images/select_down.png' alt='down'/>
                                }
                            </div>
                            <div className={styles.option_container} style={{ display: showOptions ? 'block' : 'none'}}>
                                <div className={styles.option} onClick={handleOnChangeSelectValue} value='단축키'>단축키</div>
                                <a href='/study/emmat'><div className={styles.option} onClick={handleOnChangeSelectValue} value='단축어'>단축어</div></a>
                            </div>
                        </div>
                        <Menu isShortcut={true}/>
                    </div>
                    <div className={styles.content_container}>
                    {shortcuts.map((s) => <Card title={s.text} content={s.description}/>)}
                    </div>
                </div>
            </div>
        </>
    );
}

export default StudyShortCut;