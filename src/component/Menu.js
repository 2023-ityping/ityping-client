import styles from '@/styles/Menu.module.css';

const Menu = (props) => {
    return (
        <div className={styles.container}>
            <a href={props.isShortcut ? '/practice/shortcut' : '/practice/emmat'}><div className={styles.menu_btn}>연습</div></a>
            <a href={props.isShortcut ? '/training/shortcut' : '/training/emmat'}><div className={styles.menu_btn}>실습</div></a>
            <a href={'/game/select'}><div className={styles.menu_btn}>게임</div></a>
        </div>
    );
}

export default Menu;