import React from 'react';
import { Link } from "react-router-dom";

 const App = () => (
		<div>
			<Link to = "/workers">Рабочие</Link> <br />
			<Link to = "/createWorker">Создать рабочего</Link>
		</div>
);

export default App;