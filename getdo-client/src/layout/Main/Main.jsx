import React, {useContext, useEffect} from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import {
	Root,
	Header,
	Sidebar,
	Content,
	CollapseBtn,
	SidebarTrigger,
} from "@mui-treasury/layout";
import MainHeader from "./MainHeader";
import MainNavContent from "./MainNavContent";
import MainContent from "./MainContent";
import NewItemFab from "../../components/NewItemFab";

import itemsContext from "../../context/items/itemsContext";
import AuthContext from '../../context/auth/authContext';


const config = {
	autoCollapseDisabled: false,
	collapsedBreakpoint: "sm",
	heightAdjustmentDisabled: false,
	xs: {
		sidebar: {
			anchor: "left",
			hidden: false,
			inset: false,
			variant: "temporary",
			width: 240,
			collapsible: false,
			collapsedWidth: 64,
		},
		header: {
			position: "relative",
			clipped: true,
			offsetHeight: 56,
			persistentBehavior: "fit",
		},
		content: {
			persistentBehavior: "fit",
		},
		footer: {
			persistentBehavior: "fit",
		},
	},
	sm: {
		sidebar: {
			anchor: "left",
			hidden: false,
			inset: false,
			variant: "persistent",
			width: 256,
			collapsible: false,
			collapsedWidth: 64,
		},
		header: {
			position: "relative",
			clipped: true,
			offsetHeight: 64,
			persistentBehavior: "fit",
		},
		content: {
			persistentBehavior: "fit",
		},
		footer: {
			persistentBehavior: "fit",
		},
	},
	md: {
		sidebar: {
			anchor: "left",
			hidden: false,
			inset: false,
			variant: "permanent",
			width: 256,
			collapsible: true,
			collapsedWidth: 64,
		},
		header: {
			position: "relative",
			clipped: true,
			offsetHeight: 64,
			persistentBehavior: "fit",
		},
		content: {
			persistentBehavior: "fit",
		},
		footer: {
			persistentBehavior: "fit",
		},
	},
};

const Main = () => {

	const authContext = useContext(AuthContext);
	const {userAuthenticated} = authContext;

	useEffect(() => {
		async function fetchData(){
			await userAuthenticated();
		}
		fetchData();
		//eslint-disable-next-line
	}, [])

	return (
		<Root config={config}>
			{({ headerStyles, sidebarStyles, collapsed, opened, setOpened}) => (
				<>
					<CssBaseline />
					<Header>
						<Toolbar>
							<SidebarTrigger
								className={headerStyles.leftTrigger}
							>
								{opened ? <ChevronLeftIcon /> : <MenuIcon />}
							</SidebarTrigger>
							<MainHeader />
						</Toolbar>
					</Header>
					<Sidebar>
						<div className={sidebarStyles.container}>
							<MainNavContent setOpened={setOpened}/>
						</div>
						<CollapseBtn className={sidebarStyles.collapseBtn}>
							{collapsed ? (
								<ChevronRightIcon />
							) : (
								<ChevronLeftIcon />
							)}
						</CollapseBtn>
					</Sidebar>
					<Content>
						<MainContent />
						<NewItemFab />

					</Content>
				</>
			)}
		</Root>
	);
};

export default Main;
