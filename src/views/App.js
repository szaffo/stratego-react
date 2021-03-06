import React from 'react';

import { Header } from "./header/Header";
import { Stage1 } from './stages/Stage1';
import { Stage2 } from './stages/Stage2';
import { Stage3 } from './stages/Stage3';
import { Stage4 } from './stages/Stage4';

import { useSelector } from 'react-redux';

import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {ErrorPortal} from "./portals/ErrorPortal";

function App() {
	const stage = useSelector(state => state.stage);
	let stageComp;
	
	if (stage === 1) stageComp = <Stage1/>;
	if (stage === 2) stageComp = <Stage2/>;
	if (stage === 3) stageComp = <Stage3/>;
	if (stage === 4) stageComp = <Stage4/>;
	
	return (
		<DndProvider backend={HTML5Backend}>
			<div className="App stage-container">
				<Header/>
				<ErrorPortal/>
				{stageComp}
			</div>
		</DndProvider>
	);
}

export default App;
