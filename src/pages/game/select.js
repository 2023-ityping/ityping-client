import Navbar from '@/src/component/Navbar';
import Sidebar from '@/src/component/Sidebar';
import styles from '@/styles/SelectGame.module.css'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios'; // axios import 추가

const SelectGame = (props) => {
	const router = useRouter();
	const [rank, setRank] = useState([])
	const [rank2, setRank2] = useState([])
	const [rank2_1, setRank2_1] = useState([])
	const [rank2_2, setRank2_2] = useState([])
	const [max, setMax] = useState()
	const [min, setMin] = useState()
	const [myrank, setMyrank] = useState()
	const [max2, setMax2] = useState()
	const [min2, setMin2] = useState()
	const [myrank2, setMyrank2] = useState()
	const handleButtonClick = () => {
		router.push('/game/shortcutsgames');
	};
	const emmatsgames = () => {
		router.push('/game/emmatsgames')
	}

    useEffect(() => {
        const fetchGameRank = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/game/rank");
				const data1 = response.data.results1
				const data2 = response.data.results2
				const arr1 = data1.slice(0, 10); // 1등부터 10등까지의 데이터만 추출
                const arr2 = data1.slice(10, 20);
				
				const arr2_1 = data2.slice(0, 10); // 1등부터 10등까지의 데이터만 추출
                const arr2_2 = data2.slice(10, 20);
                setRank(arr1);
				setRank2(arr2);
				setRank2_1(arr2_1);
				setRank2_2(arr2_2);
            } catch (error) {
                console.error("오류 발생:", error);
            }
        };
		fetchGameRank();
        const fetchMyGameRank = async () => {
            try {
				const response = await axios.get("http://localhost:5000/api/game/my-rank", {
					params: {
						email: localStorage.getItem('email'),
					},
				});				
				setMax(response.data.max1);
				setMin(response.data.min1);
				setMyrank(response.data.rank1);
				setMax2(response.data.max2);
				setMin2(response.data.min2);
				setMyrank2(response.data.rank2);
				
            } catch (error) {
                console.error("오류 발생:", error);
            }
        };
		fetchMyGameRank();
    }, []);

	return (
		<>  
			<Navbar/>
			<div className={styles.container}>
				<Sidebar isStudy={true} isSelected={true} handleEndStudy={() => router.push('/')}/>
				<div className={styles.right_container}>
					<p className={styles.title}>Visual Studio Code 게임</p>
					<div className={styles.game_container}>
						<div className={styles.match_container}>
							<p className={styles.match_text}>매칭게임</p>
							<div className={styles.rank_container}>
								<p className={styles.rank_text}>랭킹</p>
								<div className={styles.rank_box}>
									<div className={styles.left_box} style={{marginLeft: '-10px'}}W >
									{rank.map((item, index) => (
										<div className={styles.rank} key={index}>
											<span className={styles.numr} style={index < 3 ? { color: '#6C5DD3' } : null}>{index + 1}. </span>
											<span className={styles.text} style={index < 3 ? { color: '#6C5DD3' } : null}>{item.name}</span>
											<span className={styles.score} style={index < 3 ? { color: '#6C5DD3' } : null}>{item.score}점</span>
										</div>
									))}
									</div>
									<div className={styles.line}></div>
									<div className={styles.right_box} style={{marginLeft: '-10px'}}>
									{rank2.map((item, index) => (
										<div className={styles.rank} key={index}>
											<span className={styles.numr}>{index + 1 + 10}. </span>
											<span className={styles.text}>{item.name}</span>
											<span className={styles.score}>{item.score}점</span>
										</div>
									))}
									</div>
								</div>
							</div>
							<button className={styles.start_btn} onClick={handleButtonClick}>START</button>
							<div className={styles.record_box}>
								<p className={styles.record}>내기록</p>
								<p className={styles.record}>최고점수 : {max} 점</p>
								<p className={styles.record}>최근점수 : {min} 점</p>
							</div>
							<div style={{color: '#FDFDFD', fontWeight: 500, position:'absolute', top: '836px', left:'860px'}}>랭킹 : {myrank} 등</div>
						</div>
						
						<div className={styles.card_container}>
							<p className={styles.match_text}>카드 뒤집기</p>
							<div className={styles.card_rank_container}>
								<p className={styles.rank_text}>랭킹</p>
								<div className={styles.rank_box}>
									<div className={styles.left_box} style={{marginLeft: '-10px'}}W >
									{rank2_1.map((item, index) => (
										<div className={styles.rank} key={index}>
											<span className={styles.numr} style={index < 3 ? { color: '#6C5DD3' } : null}>{index + 1}. </span>
											<span className={styles.text} style={index < 3 ? { color: '#6C5DD3' } : null}>{item.name}</span>
											<span className={styles.score} style={index < 3 ? { color: '#6C5DD3' } : null}>{item.score}점</span>
										</div>
									))}
									</div>
									<div className={styles.line}></div>
									<div className={styles.right_box} style={{marginLeft: '-10px'}}>
									{rank2_2.map((item, index) => (
										<div className={styles.rank} key={index}>
											<span className={styles.numr}>{index + 1 + 10}. </span>
											<span className={styles.text}>{item.name}</span>
											<span className={styles.score}>{item.score}점</span>
										</div>
									))}
									</div>
								</div>
							</div>
							<button className={styles.start_btn} onClick={emmatsgames}>START</button>
							<div className={styles.record_box}>
								<p className={styles.record}>내기록</p>
								<p className={styles.record}>최고점수 : {max} 점</p>
								<p className={styles.record}>최근점수 : {min} 점</p>
							</div>
							<div style={{color: '#FDFDFD', fontWeight: 500, position:'absolute', top: '836px', left:'1571px'}}>랭킹 : {myrank} 등</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default SelectGame;