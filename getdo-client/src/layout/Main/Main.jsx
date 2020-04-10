import React from "react";
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

import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

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

const useStyles = makeStyles((theme) => ({
	fab: {
		position: "fixed",
		bottom: 20,
		right: 20,
		zIndex: 10,
		[theme.breakpoints.up("sm")]: {
			bottom: 40,
			right: 40,
			height: 70,
			width: 70,
		},
		[theme.breakpoints.up("md")]: {
			bottom: 60,
			right: 60,
			height: 80,
			width: 80,
		},
	},
	fabIcon: {
		fontSize: "default",
		[theme.breakpoints.up("md")]: {
			fontSize: 32,
		},
	},
}));

const Main = () => {
	const classes = useStyles();

	return (
		<Root config={config}>
			{({ headerStyles, sidebarStyles, collapsed, opened }) => (
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
							<MainNavContent />
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
						<Fab
							classes={{ root: classes.fab }}
							color="default"
							aria-label="add"
						>
							<AddIcon classes={{ root: classes.fabIcon }} />
						</Fab>
					</Content>
				</>
			)}
		</Root>
	);
};

export default Main;
