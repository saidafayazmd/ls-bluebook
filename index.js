import React from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
// material-ui
import { Grid, Typography, Box, Drawer, useMediaQuery, List, ListItem, ListItemText } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import { useTheme } from '@mui/material/styles';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { drawerWidth } from 'store/constant';
import { styled } from '@mui/material/styles';


// ==============================|| PROJECT DETAILED VIEW ||============================== //

const AdminView = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
    const location = useLocation();

    const handleTabClick = (tabName) => {
        switch (tabName) {
            case 'Manage accounts':
                navigate('/admin/manageAccounts');
                break;
            case 'Manage projects':
                navigate('/admin/manageProjects');
                break;
            case 'Manage content':
                navigate('/admin/manageContent/manageIndustryNews');
                break;
            default:
                navigate('/admin/manageAccounts');
                break;
        }
    };


    const handleSubTabClick = (subTabName) => {

        switch (subTabName) {
            case 'Industry news':
                navigate('/admin/manageContent/manageIndustryNews');
                break;
            case 'Wins':
                navigate('/admin/manageContent/manageWins');
                break;
            case 'Releases':
                navigate('/admin/manageContent/manageReleases');
                break;
            case 'Appreciations':
                navigate('/admin/manageContent/manageAppreciations');
                break;
            case 'Bluebolt ideas':
                navigate('/admin/manageContent/manageBlueboltIdeas');
                break;
            case 'Work anniversaries':
                navigate('/admin/manageContent/manageWorkAnniversaries');
                break;
            case 'Academy':
                navigate('/admin/manageContent/manageAcademy');
                break;
            case 'Operations':
                navigate('/admin/manageContent/manageOperations');
                break;
            default:
                navigate('/admin/manageContent/manageIndustryNews');
                break;
        }
    };


    const tabData = [
        { name: 'Manage accounts', id: 'manageAccounts' },
        { name: 'Manage projects', id: 'manageProjects' },
        {
            name: 'Manage content',
            id: 'manageContent',
            subItems: [
                { name: 'Industry news', id: 'manageIndustryNews' },
                { name: 'Wins', id: 'manageWins' },
                { name: 'Releases', id: 'manageReleases' },
                { name: 'Appreciations', id: 'manageAppreciations' },
                { name: 'Bluebolt ideas', id: 'manageBlueboltIdeas' },
                { name: 'Work anniversaries', id: 'manageWorkAnniversaries' },
                { name: 'Academy', id: 'manageAcademy' },
                { name: 'Operations', id: 'manageOperations' },
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
                                        sx={{ color: location.pathname.includes(tab.id) ? '#208BA3' : 'inherit' }}
                                    >
                                        {location.pathname.includes(tab.id) && <ArrowRightIcon className="font-header" />}
                                        {location.pathname.includes(tab.id) ? (
                                            <CustomListItemTextSelected primary={tab.name} />
                                        ) : (
                                            <CustomListItemTextUnSelected primary={tab.name} />
                                        )}
                                    </ListItem>
                                    {location.pathname.includes(tab.id) && tab.subItems && (
                                        <List component="div" disablePadding>
                                            {tab.subItems.map((subItem) => (
                                                <ListItem
                                                    button
                                                    key={subItem.name}
                                                    sx={{ pl: 4, color: location.pathname.includes(subItem.id) ? '#208BA3' : 'inherit' }}
                                                    onClick={() => handleSubTabClick(subItem.name)}
                                                >
                                                    {location.pathname.includes(subItem.id) && <ArrowRightIcon className="font-header" />}
                                                    {location.pathname.includes(subItem.id) ? (
                                                        <CustomListItemTextSelected primary={subItem.name} />
                                                    ) : (
                                                        <CustomListItemTextUnSelected primary={subItem.name} />
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
        <Grid container direction="column">
            <Grid item xs={12}>
                <Grid container direction="row">
                    <Grid item xs={12}>
                        <Box
                            height={48}
                            width="100%"
                            my={3}
                            mb={0}
                            display="flex"
                            flexDirection="row"
                            alignItems="center"
                            gap={1}
                            sx={{
                                borderBottom: '1px solid #B0B0B0',
                                padding: '20px',
                                position: 'fixed',
                                top: '48px',
                                marginTop: '0px',
                                zIndex: 9999999,
                                maxWidth: '1024px',
                                backgroundColor: '#FFF'
                            }}
                        >
                            <Typography className="font-regular font-medium font-sub-header">Admin </Typography>
                            <Typography className="font-regular font-medium font-header">/ Project details</Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sx={{ position: 'absolute', top: '97px' }}>
                        <Grid container direction="row" sx={{ maxWidth: '1024px' }}>
                            <Grid item>
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
                            </Grid>
                            <Grid item sx={{ width: 'calc(100% - 280px)', marginBottom: 'auto' }}>
                                <Outlet />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default AdminView;
