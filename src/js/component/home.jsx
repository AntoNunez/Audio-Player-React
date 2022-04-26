//create your first component

import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPlay,
	faPause,
	faForward,
	faBackward,
	faCircleDot,
} from "@fortawesome/free-solid-svg-icons";

function Home() {
	const [state, setState] = useState([]);

	const getListApi = () => {
		fetch("https://assets.breatheco.de/apis/sound/songs")
			.then((responses) => {
				return responses.json(); //convierte a .json
			})
			.then((data) => {
				setState(data);
			})
			.catch((error) => {
				console.log(error.message);
			});
	};

	useEffect(() => {
		getListApi();
	}, []);

	const [songsActive, setsongsActive] = useState(null);
	let nombreRef = useRef(null);
	const setSingleSong = (x, i) => {
		nombreRef.src = `https://assets.breatheco.de/apis/sound/${x}`;
		setsongsActive(i);
	};
	const play = () => {
		if (nombreRef !== null) nombreRef.play();
	};
	const pause = () => {
		nombreRef.pause();
	};
	const adelantar = () => {
		let position =
			songsActive !== null
				? songsActive == state.length - 1
					? 0
					: songsActive + 1
				: 0;
		setSingleSong(state[position].url, position);
	};
	const atras = () => {
		let position =
			songsActive !== null
				? songsActive == 0
					? state.length - 1
					: songsActive - 1
				: 0;
		setSingleSong(state[position].url, position);
		play();
	};

	return (
		<div className="principal content-center">
			<div className="Camera d-flex justify-content-center">
				<span>
					<FontAwesomeIcon icon={faCircleDot} />
				</span>
			</div>
			<div className="container mt-3 p-0 bg-white">
				<div className="row mx-auto">
					<div className="col md-12 text-center bg-white p-0">
						<ol>
							{state.length > 0 &&
								state.map((valor, j) => {
									return (
										<li
											key={valor.i}
											className={
												"list-group-item list-group-item" +
												(songsActive === j)
											}
											onClick={() =>
												setSingleSong(valor.url, j)
											}>
											{valor.name}
										</li>
									);
								})}
						</ol>
					</div>

					<div className="row mx-auto p-0">
						<div className="col d-flex justify-content-center m-0 pe-5 pb-2 pt-2 bg-dark">
							<button className="backward-btn" onClick={atras}>
								<FontAwesomeIcon icon={faBackward} />
							</button>
							<button className="pause-btn" onClick={pause}>
								<FontAwesomeIcon icon={faPause} />
							</button>
							<button className="play-btn" onClick={play}>
								<FontAwesomeIcon icon={faPlay} />
							</button>
							<button className="forward-btn" onClick={adelantar}>
								<FontAwesomeIcon icon={faForward} />
							</button>
							<audio ref={(r) => (nombreRef = r)} />{" "}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

//podria usar autoplay//
//no OLVIDAR importar FontAwesome para los Icons//

export default Home;
