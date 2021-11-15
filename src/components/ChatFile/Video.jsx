import React, { useState, useEffect, useRef } from 'react';

function Video(props) {
	const [videoSrc, setVideoSrc] = useState("");

	const vidRef = useRef(null);
	
	const handlePlayVideo = () => {
	  vidRef.current.play();
	}

	useEffect(() => {
		const reader = new FileReader();
		reader.readAsDataURL(props.blob);
		reader.onloadend = function () {
			setVideoSrc(reader.result);
		}
	}, [props.blob]);

	return (
		<video ref={vidRef} style={{ width: '80%', borderRadius: '4px', height: 150 }}>
			<source src={props.url} type={props.videoType}/>
			Your browser does not support the video tag.
		</video>
	);
};

export default Video;