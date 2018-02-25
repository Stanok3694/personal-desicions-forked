import React from 'react';
import { Link, Route, Switch } from "react-router-dom";
import { Navbar, Nav, NavItem, NavDropdown } from "react-bootstrap";

import { Workers, Profile, Create } from './components/workers';
import Dashboard from './components/Dashboard';

const App = () => (
	<div>
		{/* menu frame: */}
		<Navbar>
			<Navbar.Header>
				<Navbar.Brand>
					<Link to="/">Главная</Link>
				</Navbar.Brand>
			</Navbar.Header>
			<Nav>
				<NavDropdown title = "Рабочие">
					<NavItem href="/workers">
						Список рабочих
					</NavItem>
					<NavItem href = "/createWorker">
						Создать рабочего
					</NavItem>
				</NavDropdown>
			</Nav>
		</Navbar>
		{/* content frame: */}
		<div>
			<Switch>
				<Route exact path="/" component={Dashboard} />
				<Route path="/workers" component={Workers} />
				<Route path="/createWorker" component={Create} />
				<Route path="/worker/:workerId" component={Profile} />
			</Switch>
		</div>
	</div>
);

export default App;