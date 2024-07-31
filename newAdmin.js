import React, { /* useRef, */  useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
// material-ui
import { Grid, Typography, Box,/* Drawer, useMediaQuery,  List, ListItem, ListItemText, */  /*  Divider,  ButtonBase */ } from '@mui/material';
/* import ArrowRightIcon from '@mui/icons-material/ArrowRight'; */

//import { useTheme } from '@mui/material/styles';
/* import PerfectScrollbar from 'react-perfect-scrollbar';
import { drawerWidth } from 'store/constant';
import { styled } from '@mui/material/styles'; */
/* import MenuList from '../../../../src/layout/MainLayout/Sidebar/MenuList/index'; */
import SideBar from './SideBar';

// ==============================|| PROJECT DETAILED VIEW ||============================== //

const AdminView = () => {
    const navigate = useNavigate();
    // const theme = useTheme();
    // const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
    const [selectedTab, setSelectedTab] = useState('Manage accounts');
    const [selectedSubTab, setSelectedSubTab] = useState('Industry news');

    /*     const handleTabClick = (tabName) => {
            setSelectedTab(tabName);
            if (tabName === 'Manage content') {
                setSelectedSubTab('Industry news');
    
            } else {
                setSelectedSubTab(null);
                     switch (tabName) {
                         case 'Manage accounts':
                             navigate('/admin/manageAccounts');
                             break;
                         case 'Manage projects':
                             navigate('/admin/manageProjects');
                             break;
         
                         default:
                             navigate('/admin/manageAccounts');
                             break;
                     }  
            }
        };
     */
    useEffect(() => {
        if (selectedTab) {
            console.log("selectedTab", selectedTab)
          //  navigateTabs(selectedTab)
        }
        /*    if (selectedTab === 'Manage accounts') {
               navigate('/admin/manageAccounts');
           } else if (selectedTab === 'Manage projects') {
               navigate('/admin/manageProjects');
           } */
        /*   switch (selectedTab) {
              case 'Manage accounts':
                  navigate('/admin/manageAccounts');
                  break;
              case 'Manage projects':
                  navigate('/admin/manageProjects');
                  break;
  
              default:
                  navigate('/admin/manageAccounts');
                  break;
          } */
    }, [selectedTab]);

    const navigateTabs = (selectedTab) => {
        console.log(selectedTab)
        navigate('/admin/manageProjects');
        /*  switch (selectedTab) {
             case 'Manage accounts':
                 navigate('/admin/manageAccounts');
                 break;
             case 'Manage projects':
                 navigate('/admin/manageProjects');
                 break;
 
             default:
                 navigate('/admin/manageAccounts');
                 break;
         } */
    }

    /*   const handleSubTabClick = (subTabName) => {
          setSelectedSubTab(subTabName);
              switch (subTabName) {
                 case 'Industry news':
                     navigate('/admin/manageIndustryNews');
                     break;
                 case 'Wins':
                     navigate('/admin/manageWins');
                     break;
                 case 'Releases':
                     navigate('/admin/manageReleases');
                     break;
                 case 'Appreciations':
                     navigate('/admin/manageAppreciations');
                     break;
                 case 'Bluebolt ideas':
                     navigate('/admin/manageBlueboltIdeas');
                     break;
                 case 'Work anniversaries':
                     navigate('/admin/manageWorkAnnivesaries');
                     break;
                 case 'Academy':
                     navigate('/admin/manageAcademy');
                     break;
                 case 'Operations':
                     navigate('/admin/manageOperations');
                     break;
                 default:
                     navigate('/admin/manageIndustryNews');
                     break;
             } - 
      }; */


    /*     const tabData = [
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
        })); */


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
                                <SideBar selectedTab={selectedTab} setSelectedTab={setSelectedTab} selectedSubTab={selectedSubTab} setSelectedSubTab={setSelectedSubTab} />
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
