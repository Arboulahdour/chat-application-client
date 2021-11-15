import React, { useState, useEffect } from "react";
import YoutubeVideo from "../YoutubeVideo/YoutubeVideo";

const YoutubeContainer = (props) => {

	return (

		<div className="youtube-section">
			<YoutubeVideo videoSrcUrl={props.videoUrl} />
		</div>
		
	)
}

export default YoutubeContainer;