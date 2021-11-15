import React, { useState, useEffect } from "react";
import Board from "../Board/Board";

const BoardContainer = (props) => {

	return (

		<div className="board-section">
			<Board />
		</div>
		
	)
}

export default BoardContainer;