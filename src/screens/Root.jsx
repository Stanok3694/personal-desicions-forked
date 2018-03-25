import React from 'react';
import { Link, Route, Switch } from "react-router-dom";
import { Navbar, Nav, NavItem, NavDropdown } from "react-bootstrap";

import {WorkersProfile, WorkersForm } from '../components/Workers';
import { Dashboard } from '../components/Dashboard';
import { ScreensWorkers } from "./";

const ScreensRoot = () => (
	<div>
		{/* menu frame: */}
		<Navbar>
			<Navbar.Header>
				<Navbar.Brand>
					<Link to="/">Главная</Link>
				</Navbar.Brand>
			</Navbar.Header>
			<Nav>
				<NavDropdown title = "Рабочие" id = "1">
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
				<Route path="/workers" component={ScreensWorkers} />
				<Route path="/createWorker" component={WorkersForm} />
				<Route path="/worker/:workerId" component={WorkersProfile} />
				<Route path="/changeWorker/:workerId" component={WorkersForm} />
			</Switch>
		</div>
	</div>
);

export default ScreensRoot;