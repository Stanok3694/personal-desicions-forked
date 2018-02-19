import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Menu, } from "semantic-ui-react";

import { Dashboard, Workers, Objects, Home  } from "./components";

const routes = [
	{
		path: "/",
		exact: true,
		main: Home,
	},
	{
		path: "/dashboard",
		main: Dashboard,
	},
	{
		path: "/workers",
		main: Workers,
	},
	{
		path: "/objects",
		main: Objects,
	}
];

const SidebarExample = () => (
	<Router>
		<div>
			<Menu>
				<Menu.Item as={Link} to="/">
					Главная
				</Menu.Item>
				<Menu.Item as = { Link } to = "/dashboard">
					Смены
				</Menu.Item>
				<Menu.Item as = { Link } to = "/workers">
					Рабочие
				</Menu.Item>
				<Menu.Item as = { Link } to = "/objects">
					Объекты
				</Menu.Item>
			</Menu>
			<div style={{ flex: 1, padding: "10px" }}>
				{
					routes.map((route, index) => (
						<Route
							key={index}
							path={route.path}
							exact={route.exact}
							component={route.main}
						/>
					))
				}
			</div>
		</div>
	</Router>
);

export default SidebarExample;