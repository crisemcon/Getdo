import React from "react";
import Main from "./layout/Main/Main";

import SidebarState from "./context/sidebar/sidebarState";
import ItemsState from "./context/items/itemsState";

function App() {
	return (
		<SidebarState>
			<ItemsState>
				<Main />
			</ItemsState>
		</SidebarState>
	);
}
export default App;
