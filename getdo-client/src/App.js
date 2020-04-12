import React from "react";
import Main from "./layout/Main/Main";

import SidebarState from "./context/sidebar/sidebarState";
import ItemsState from "./context/items/itemsState";
import TagsState from "./context/tags/tagsState";

function App() {
	return (
		<SidebarState>
			<ItemsState>
				<TagsState>
					<Main />
				</TagsState>
			</ItemsState>
		</SidebarState>
	);
}
export default App;
