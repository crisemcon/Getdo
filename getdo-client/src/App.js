import React from "react";
import Main from "./layout/Main/Main";

import SidebarState from "./context/sidebar/sidebarState";
import ItemsState from "./context/items/itemsState";
import TagsState from "./context/tags/tagsState";
import AuthState from "./context/auth/authState";
import AlertState from "./context/alerts/alertsState";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./layout/Auth/Login";
import Register from "./layout/Auth/Register";
import PrivateRoute from "./routes/PrivateRoute";

import tokenAuth from "./config/token";

//revisar si tenemos un token (tal vez hay que hacerlo dentro de main o maincontent)
const token = localStorage.getItem("token");
if (token) {
	tokenAuth(token);
}

function App() {
	return (
		<SidebarState>
			<ItemsState>
				<TagsState>
					<AlertState>
						<AuthState>
							<Router>
								<Switch>
									<Route exact path="/" component={Login} />
									<Route
										exact
										path="/register"
										component={Register}
									/>
									<Route //should be privateRoute
										exact
										path="/app"
										component={Main}
									/>
								</Switch>
							</Router>
						</AuthState>
					</AlertState>
				</TagsState>
			</ItemsState>
		</SidebarState>
	);
}
export default App;
