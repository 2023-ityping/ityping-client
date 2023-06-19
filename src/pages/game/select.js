import Navbar from '@/src/component/Navbar';
import Sidebar from '@/src/component/Sidebar';
import styles from '@/styles/SelectGame.module.css'
import { useState } from 'react';
import { useRouter } from 'next/router';

const SelectGame = (props) => {
	const router = useRouter();

	const handleButtonClick = () => {
		router.push('/game/gamestart');
	};
	return (
		<>  
			<Navbar/>
			<div className={styles.container}>
				<Sidebar isStudy={true} isSelected={true}/>
				<div className={styles.right_container}>
					<p className={styles.title}>Visual Studio Code 게임</p>
					<div className={styles.game_container}>
						<div className={styles.match_container}>
							<p className={styles.match_text}>매칭게임</p>
							<div className={styles.rank_container}>
								<p className={styles.rank_text}>랭킹</p>
								<div className={styles.rank_box}>
									<div className={styles.left_box}>
										<div className={styles.rank}><span className={styles.text}>1. 1test</span><span className={styles.score}>2432435점</span></div>
										<div className={styles.rank}><span className={styles.text}>2. 2test</span><span className={styles.score}>2432435점</span></div>
									</div>
									<div className={styles.line}></div>
									<div className={styles.right_box}>
										<div className={styles.rank}><span className={styles.text}>11. 11test</span><span className={styles.score}>2432435점</span></div>
										<div className={styles.rank}><span className={styles.text}>12. 12test</span><span className={styles.score}>2432435점</span></div>
									</div>
								</div>
							</div>
							<button className={styles.start_btn} onClick={handleButtonClick}>START</button>
							<div className={styles.record_box}>
								<p className={styles.record}>내기록</p>
								<p className={styles.record}>최고점수 : 0</p>
								<p className={styles.record}>최근점수 : 0</p>
							</div>
						</div>
						<div><img src='/images/game_back.png'/></div>
					</div>
				</div>
			</div>
		</>
	);
}

export default SelectGame;