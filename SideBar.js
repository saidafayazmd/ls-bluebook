import React, { /* useRef, */  /* useEffect, useState */ } from 'react';
//import { useNavigate, Outlet } from 'react-router-dom';
// material-ui
import { Grid,/*  Typography,  */Box, Drawer, useMediaQuery, List, ListItem, ListItemText,  /*  Divider,  ButtonBase */ } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import { useTheme } from '@mui/material/styles';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { drawerWidth } from 'store/constant';
import { styled } from '@mui/material/styles';
/* import MenuList from '../../../../src/layout/MainLayout/Sidebar/MenuList/index'; */

// ==============================|| PROJECT DETAILED VIEW ||============================== //

const SideBar = ({ selectedTab, setSelectedTab, selectedSubTab, setSelectedSubTab }) => {
    /*    const navigate = useNavigate(); */
    const theme = useTheme();
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

    const tabData = [
        { name: 'Manage accounts' },
        { name: 'Manage projects' },
        {
            name: 'Manage content',
            subItems: [
                { name: 'Industry news' },
                { name: 'Wins' },
                { name: 'Releases' },
                { name: 'Appreciations' },
                { name: 'Bluebolt ideas' },
                { name: 'Work anniversaries' },
                { name: 'Academy' },
                { name: 'Operations' },
            ],
        },
    ];

    const CustomListItemTextUnSelected = styled(ListItemText)(() => ({
        '& .MuiListItemText-primary': {
            color: '#000',
            fontSize: '16px',
            fontFamily: 'GellixBold'
        }
    }));
    const CustomListItemTextSelected = styled(ListItemText)(() => ({
        '& .MuiListItemText-primary': {
            color: '#208BA3',
            fontSize: '16px',
            fontFamily: 'GellixBold'
        }
    }));

    const handleTabClick = (tabName) => {
        setSelectedTab(tabName);
        if (tabName === 'Manage content') {
            setSelectedSubTab('Industry news');

        } else {
            setSelectedSubTab(null);

        }
    };

    const handleSubTabClick = (subTabName) => {
        setSelectedSubTab(subTabName);
    };

    const drawer = (
        <>
            <PerfectScrollbar
                component="div"
                style={{
                    height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 65px)'
                }}
            >
                <Grid container direction="row" sx={{ height: '86vh', mb: 2 }}>
                    <Box sx={{ px: 1 }}>
                        <List sx={{ color: '#208BA3 !important' }}>
                            {tabData.map((tab) => (
                                <React.Fragment key={tab.name}>
                                    <ListItem
                                        button
                                        onClick={() => handleTabClick(tab.name)}
                                        sx={{ color: selectedTab === tab.name ? '#208BA3' : 'inherit' }}
                                    >
                                        {selectedTab === tab.name && <ArrowRightIcon className="font-header" />}
                                        {selectedTab === tab.name ? (
                                            <CustomListItemTextSelected primary={tab.name} />
                                        ) : (
                                            <CustomListItemTextUnSelected primary={tab.name} />
                                        )}
                                    </ListItem>
                                    {selectedTab === 'Manage content' && selectedTab === tab.name && tab.subItems && (
                                        <List component="div" disablePadding>
                                            {tab.subItems.map((subItem) => (
                                                <ListItem
                                                    button
                                                    key={subItem.name}
                                                    sx={{ pl: 4, color: selectedSubTab === subItem.name ? '#208BA3' : 'inherit' }}
                                                    onClick={() => handleSubTabClick(subItem.name)}
                                                >
                                                    {selectedSubTab === subItem.name && <ArrowRightIcon className="font-header" />}
                                                    {selectedTab === tab.name ? (
                                                        <CustomListItemTextSelected primary={subItem.name} />
                                                    ) : (
                                                        <CustomListItemTextUnSelected primary={tab.name} />
                                                    )}
                                                </ListItem>
                                            ))}
                                        </List>
                                    )}
                                </React.Fragment>
                            ))}
                        </List>

                    </Box>
                </Grid>
            </PerfectScrollbar>
        </>
    );

    return (
        <Box component="nav" sx={{ flexShrink: { md: 0 }, width: drawerWidth, background: '#D4FFFC' }} aria-label="mailbox folders">
            <Drawer
                variant="persistent"
                anchor="left"
                open={true}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        background: '#D4FFFC',
                        maxWidth: '1024px',
                        margin: '0 auto',
                        left: 'unset',
                        color: theme.palette.text.primary,
                        borderRight: 'none',
                        top: '98px'
                    }
                }}
                ModalProps={{ keepMounted: true }}
                color="inherit"
            >
                {drawer}
            </Drawer>
        </Box>
    );
};

export default SideBar;
