import styles from '@/styles/GameModal.module.css';

const Modal = (props) => {
    console.log(props.style)
    return (
        <div className={props.style == true ? styles.answer : styles.wrong}>
            <div className={styles.text}>{props.style == true ? '+100' : '-50'}</div>
            <div className={styles.title}>{props.text}</div>
            <div className={styles.desc}>{props.description}</div>
        </div>
    );
}

export default Modal;