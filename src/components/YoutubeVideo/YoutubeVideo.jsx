import React from "react";
import youtubeIcon from "../../assets/icons/youtube-svg.svg";

const YoutubeVideo = (props) => {
		
	return (

		<div className="video-player">
			<div className="icon-youtube-video">
				<img src={youtubeIcon} className="play-square-outlined" />
			</div>
			<iframe 
				width="560" 
				height="315"
				style={{display: 'none'}}
				id="video-url" 
				src={props.videoSrcUrl} 
				title="YouTube video player" 
				frameborder="0"
				className="youtube-video" 
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
				allowFullScreen></iframe>
		</div>
	)		
}

export default YoutubeVideo;