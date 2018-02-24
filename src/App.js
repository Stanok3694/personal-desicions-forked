import React from 'react';
import { Link, Route } from "react-router-dom";
import { Navbar, Nav, NavItem } from "react-bootstrap";


import { Workers, Profile, Create } from './components/workers';
import Dashboard from './components/Dashboard';

const App = () => (
	<div>
		<Navbar>
			<Navbar.Header>
				<Navbar.Brand>
					<Link to="/">Главная</Link>
				</Navbar.Brand>
			</Navbar.Header>
			<Nav>
				<NavItem>
					<Link to="/workers">Рабочие</Link> <br />
				</NavItem>
				<NavItem>
					<Link to="/createWorker">Создать рабочего</Link>
				</NavItem>
			</Nav>
		</Navbar>
		<div>
			<Route exact path="/" component={Dashboard} />
			<Route path="/workers" component={Workers} />
			<Route path="/createWorker" component={Create} />
			<Route path="/worker/:workerId" component={Profile} />
		</div>
	</div>
);

export default App;