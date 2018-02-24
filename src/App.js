import React from 'react';
import { Link } from "react-router-dom";
import { Navbar, Nav, NavItem } from "react-bootstrap";

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
						<Link to = "/workers">Рабочие</Link> <br />
					</NavItem>
					<NavItem>
						<Link to = "/createWorker">Создать рабочего</Link>
					</NavItem>
				</Nav>
			</Navbar>
		</div>
);

export default App;