import React, { /* useRef, */ useEffect, useState, useCallback } from 'react';
/* import { useNavigate, useParams } from 'react-router-dom'; */
// material-ui
import { Grid, Typography, Box, Select, MenuItem, Button } from '@mui/material';

import { styled } from '@mui/material/styles';

import { useForm, useFieldArray } from 'react-hook-form';
import { useInView } from 'react-intersection-observer';

import CustomerMobileView from './CustomerMobileView';
import CustomerBlock from './CustomerBlock';
import customerMasterfile from '../../../data/customerData.json';
import CustomDropDownIcon from '../../utilities/CustomDropDownIcon';

import StackholdersList from './StackholdersList';
// ==============================|| PROJECT DETAILED VIEW ||============================== //
const StyledSelectField = styled(Select)({
  background: '#FFF',
  width: '100%',
  flexWrap: 'wrap',
  '& .MuiOutlinedInput-notchedOutline': {
    border: '0'
  },
  '& .MuiOutlinedInput-input.MuiSelect-select': {
    height: '10px',
    minHeight: '0px',
    fontSize: '14px',
    fontFamily: 'GellixRegular',
    display: 'flex',
    alignItems: 'center',
    filter: 'drop-shadow(0px 1px 1px #2F78C4)',
    borderRadius: '8px !important'
  }
});

const CustomMenuItem = styled(MenuItem)(() => ({
  fontFamily: 'GellixRegular',
  fontSize: '12px',
  minHeight: '35.8px !important',
  paddingLeft: '10px',
  paddingRight: '10px',
  color: '#000'
}));

const dispositionFilterValues = ['All', 'Strong Detractor', 'Detractor', 'Neutral', 'Supporter', 'Coach / Strong Supporter'];

const CustomerView = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 750);
  const [groupedData, setGroupedData] = useState([]);
  const [selectOpen, setSelectOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedAccountIndex, setSelectedAccountIndex] = useState(null);
  const [stakeHoldersData, setStakeHoldersData] = useState(null);
  const [selectedDisposition, setSelectedDisposition] = useState('All');
  const [filteredData, setFilteredData] = useState(null);
  const [allExpanded, setAllExpanded] = useState(false);
  const [expanded, setExpanded] = useState({});
  const stakeHoldersRef = React.createRef();

  const [displayedCount, setDisplayedCount] = useState(5);
  const [visibleData, setVisibleData] = useState('');
  const { ref, inView } = useInView();
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 750);
    };
    window.addEventListener('resize', handleResize);
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    if (isMobile) {
      console.log('Executing mobile-specific code');
    } else {
      console.log('Executing desktop-specific code');
    }
  }, [isMobile]);

  useEffect(() => {
    setGroupedData(customerMasterfile);
  }, [customerMasterfile]);

  function getTotalProjectCount(accountName) {
    const accountNameObject = groupedData.find((item) => item[accountName]);
    if (!accountNameObject) {
      return 0;
    }
    const accountNameArray = accountNameObject[accountName];
    return accountNameArray.reduce((total, stakeholder) => {
      const key = Object.keys(stakeholder)[0];
      return total + stakeholder[key].length;
    }, 0);
  }

  const getHighestDisposition = (accountName) => {
    const accountNameObject = groupedData.find((item) => item[accountName]);
    if (!accountNameObject) {
      return 0;
    }
    const accountNameArray = accountNameObject[accountName];
    let totalScore = 0;
    accountNameArray.forEach((item) => {
      if (Object.values(item)[0][0]['Account Name'] == accountName) {
        const value = Object.values(item)[0][0].Disposition;
        switch (value) {
          case 'Detractor':
          case 'Strong Detractor':
            totalScore -= 1;
            break;
          case 'Neutral':
            // Neutral has a weight of 0, so no change to totalScore
            break;
          case 'Supporter':
          case 'Coach / Strong Supporter':
            totalScore += 1;
            break;
          default:
            break;
        }
      }
    });
    if (totalScore > 0) {
      return '#629809';
    } else if (totalScore < 0) {
      return '#E20017';
    } else {
      return '#EC7F00';
    }
  };

  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      const element = ref.current;
      const elementRect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const elementHeight = elementRect.height;
      // Calculate the scroll position to center the element vertically
      const scrollTop = elementRect.top + window.pageYOffset - (viewportHeight - elementHeight) / 2;
      // Scroll to the computed position
      window.scrollTo({ top: scrollTop, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    setGroupedData(customerMasterfile);
  }, [customerMasterfile]);

  const methods = useForm({
    defaultValues: {
      stakeHolderData: []
    }
  });

  const { control, reset } = methods;
  const { fields } = useFieldArray({ control, name: 'stakeHolderData' });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 750);
    };
    window.addEventListener('resize', handleResize);
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    if (isMobile) {
      console.log('Executing mobile-specific code');
    } else {
      console.log('Executing desktop-specific code');
    }
  }, [isMobile]);

  const handleOpen = () => {
    setSelectOpen(true);
  };

  const handleClose = () => {
    setSelectOpen(false);
  };

  useEffect(() => {
    if (selectedAccount) {
      const data = groupedData.find((item) => selectedAccount.includes(Object.keys(item)[0]));
      setStakeHoldersData(data[selectedAccount]);
      setSelectedDisposition('All');
      setFilteredData(data[selectedAccount]);
      console.log('data=========', data[selectedAccount]);
      sessionStorage.setItem('customer', JSON.stringify(data[selectedAccount]));
      sessionStorage.setItem('account', selectedAccount);
    }
  }, [selectedAccount]);

  useEffect(() => {
    if (sessionStorage.getItem('customer') && !selectedAccount) {
      setSelectedAccount(sessionStorage.getItem('account'));
      setStakeHoldersData(JSON.parse(sessionStorage.getItem('customer')));
      setSelectedDisposition('All');
      setFilteredData(JSON.parse(sessionStorage.getItem('customer')));
      console.log('JSON.parse(sessionStorage.getItem("customer"))', JSON.parse(sessionStorage.getItem('customer')));
    }
  }, []);

  const getStakeHolderName = (item) => {
    delete item['id'];
    return Object.keys(item)[0];
  };
  const getStakeHolderRole = (item) => {
    delete item['id'];
    const roleData = Object.values(item)[0][0].Role;
    return roleData;
  };
  const getStakeHolderDepartment = (item) => {
    delete item['id'];
    const department = Object.values(item)[0][0]['Customer Dept'];
    return department;
  };

  const handleTabClick = (event) => {
    console.log(event.target.value);
    setSelectedDisposition(event.target.value);
    filterData(event.target.value);
  };

  const filterData = (selectedDisposition) => {
    console.log(stakeHoldersData);
    if (selectedDisposition === 'All') {
      setFilteredData(stakeHoldersData);
    } else {
      const filteredStakeholders = stakeHoldersData
        .map((stakeholder) => {
          const stakeholderName = Object.keys(stakeholder)[0];
          const projects = stakeholder[stakeholderName];
          const filteredProjects = projects.filter((project) => project.Disposition === selectedDisposition);
          console.log(filteredProjects)
          return { [stakeholderName]: filteredProjects };
        })
        .filter((stakeholder) => {
          const stakeholderName = Object.keys(stakeholder)[0];
          return stakeholder[stakeholderName].length > 0;
        });
      console.log(filteredStakeholders);
      setFilteredData(filteredStakeholders);
    }
  };
  useEffect(() => {
    if (filteredData) {
      reset({ stakeHolderData: filteredData });
      scrollToSection(stakeHoldersRef);
    }
  }, [filteredData]);


  const handleProjectClick = (event) => {
    console.log(event.target.value);
    setSelectedProject(event.target.value);
    filterData(event.target.value);
  };


  /*   ============================================================================= */

  useEffect(() => {
    setVisibleData(fields.slice(0, displayedCount));
  }, [displayedCount, fields]);

  const toggleExpandAll = () => {
    const newExpandedState = !allExpanded;
    setAllExpanded(newExpandedState);
    setExpanded(
      fields.reduce((acc, _, index) => {
        acc[index] = newExpandedState;
        return acc;
      }, {})
    );
  };
  const handleAccordionChange = (index) => (event, isExpanded) => {
    setExpanded(
      fields.reduce((acc, _, fieldIndex) => {
        if (index === fieldIndex) {
          acc[index] = !isExpanded;
        }
        return acc;
      }, {})
    );
  };
  const loadMoreData = useCallback(() => {
    if (displayedCount < fields.length) {
      setDisplayedCount((prev) => prev + 5);
    }
  }, [displayedCount, fields.length]);
  useEffect(() => {
    if (inView) {
      loadMoreData();
    }
  }, [inView, loadMoreData]);

  /*   ============================================================================= */
  return (
    <Grid container direction="column" sx={{ mb: 4 }}>
      {!isMobile ? (
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
                  top: '48px',
                  marginTop: '0px',
                  maxWidth: '1024px',
                  backgroundColor: '#FFF'
                }}
              >
                <Typography class="font-bold font-medium-header font-header">Customer views</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sx={{ padding: '0 20px', mb: 0 }}>
              <Grid container direction="column">
                <Typography class="font-bold font-medium-header font-header" style={{ marginBottom: 0 }}>
                  Account Names
                </Typography>
                <Typography class="font-regular font-small font-black" style={{ marginTop: '10px' }}>
                  Select an Account to see the details
                </Typography>
              </Grid>
              <Grid container direction="row" item spacing={2} xs={12} md={12} lg={12} alignItems="center" sx={{ padding: '10px' }}>
                {groupedData.map((item, index) => (
                  <CustomerBlock
                    key={index}
                    index={index}
                    btnSelected={selectedAccountIndex === index ? true : false}
                    arrayItem={Object.keys(item)[0]}
                    count={getTotalProjectCount(Object.keys(item)[0])}
                    setSelectedAccount={setSelectedAccount}
                    setSelectedAccountIndex={setSelectedAccountIndex}
                    getHighestDisposition={getHighestDisposition(Object.keys(item)[0])}
                  />
                ))}
              </Grid>
            </Grid>
            {stakeHoldersData ? (
              <Grid item xs={12}>
                <Grid container direction="column">
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
                        borderTop: '1px solid #B0B0B0',
                        padding: '20px',
                        maxWidth: '1024px',
                        backgroundColor: '#FFF'
                      }}
                      ref={stakeHoldersRef}
                    >
                      <Typography class="font-bold font-medium-header font-sub-header">{selectedAccount}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sx={{ padding: '0 20px' }}>
                    <Grid container direction="row" spacing={3}>
                      <Grid item xs={4}>
                        <Typography class="font-regular font-medium font-black" style={{ marginTop: 0 }}>
                          Select Disposition
                        </Typography>

                        <StyledSelectField
                          variant="outlined"
                          labelId="demo-simple-select-label"
                          id="filter"
                          sx={{
                            width: '100%'
                          }}
                          value={selectedDisposition}
                          onChange={(e) => {
                            handleTabClick(e);
                          }}
                          IconComponent={(props) => <CustomDropDownIcon selectOpen={selectOpen} {...props} />}
                          onOpen={handleOpen}
                          onClose={handleClose}
                          displayEmpty
                          MenuProps={{
                            PaperProps: {
                              sx: {
                                backgroundColor: '#FFF',
                                borderRadius: '8px',
                                border: '1px solid #92BBE6',
                                '& .MuiMenuItem-root': {
                                  color: '#000048',
                                  fontSize: '15px'
                                },
                                '& .MuiMenuItem-root.Mui-selected': {
                                  backgroundColor: '#F7F7F5'
                                }
                              }
                            }
                          }}
                          renderValue={(selected) => {
                            if (selected.length === 0) {
                              return <span style={{ color: '#000048', fontSize: '15px', fontFamily: 'GellixRegular' }}>Select Value</span>;
                            }
                            return selected;
                          }}
                        >
                          {dispositionFilterValues.map((name) => (
                            <CustomMenuItem key={name} value={name}>
                              {name}
                            </CustomMenuItem>
                          ))}
                        </StyledSelectField>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography class="font-regular font-medium font-black" style={{ marginTop: 0 }}>
                          Select Project
                        </Typography>

                        <StyledSelectField
                          variant="outlined"
                          labelId="demo-simple-select-label"
                          id="filter"
                          sx={{
                            width: '100%'
                          }}
                          value={selectedProject}
                          onChange={(e) => {
                            handleProjectClick(e);
                          }}
                          IconComponent={(props) => <CustomDropDownIcon selectOpen={selectOpen} {...props} />}
                          onOpen={handleOpen}
                          onClose={handleClose}
                          displayEmpty
                          MenuProps={{
                            PaperProps: {
                              sx: {
                                backgroundColor: '#FFF',
                                borderRadius: '8px',
                                border: '1px solid #92BBE6',
                                '& .MuiMenuItem-root': {
                                  color: '#000048',
                                  fontSize: '15px'
                                },
                                '& .MuiMenuItem-root.Mui-selected': {
                                  backgroundColor: '#F7F7F5'
                                }
                              }
                            }
                          }}
                        /*    renderValue={(selected) => {
                             if (selected.length === 0) {
                               return <span style={{ color: '#000048', fontSize: '15px', fontFamily: 'GellixRegular' }}>Select Value</span>;
                             }
                             return selected;
                           }} */
                        >
                          {dispositionFilterValues.map((name) => (
                            <CustomMenuItem key={name} value={name}>
                              {name}
                            </CustomMenuItem>
                          ))}
                        </StyledSelectField>
                      </Grid>
                    </Grid>
                    <Grid container direction="column">
                      <Grid item sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography class="font-bold font-medium-header font-sub-header">Customer Stakeholders</Typography>
                        <Button
                          variant="outlined"
                          sx={{
                            mr: 0,
                            height: '41px',
                            borderRadius: '1000px',
                            background: '#26EFE9',
                            ':hover': {
                              background: '#06C7CC'
                            }
                          }}
                          onClick={toggleExpandAll}
                        >
                          <Typography
                            className="font-regular font-s"
                            style={{
                              color: '#000048',
                              fontSize: '15px',
                              fontWeight: 600
                            }}
                          >
                            {' '}
                            {allExpanded ? 'Collapse All' : 'Expand All'}{' '}
                          </Typography>
                        </Button>
                      </Grid>
                      {visibleData.map((item, index) => (
                        <StackholdersList
                          key={index}
                          index={index}
                          item={item}
                          getStakeHolderName={getStakeHolderName}
                          getStakeHolderRole={getStakeHolderRole}
                          getStakeHolderDepartment={getStakeHolderDepartment}
                          expanded={expanded[index]}
                          handleAccordionChange={handleAccordionChange(index)}
                        />
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
                <div ref={ref} />
              </Grid>
            ) : null}
          </Grid>
        </Grid>
      ) : (
        <Grid item xs={12}>
          <CustomerMobileView
            groupedData={groupedData}
            getTotalProjectCount={getTotalProjectCount}
            setSelectedAccount={setSelectedAccount}
            selectedAccount={selectedAccount}
            fields={fields}
            getStakeHolderName={getStakeHolderName}
            getStakeHolderRole={getStakeHolderRole}
            getStakeHolderDepartment={getStakeHolderDepartment}
            stakeHoldersData={stakeHoldersData}
            selectedDisposition={selectedDisposition}
            setSelectOpen={setSelectOpen}
            selectOpen={selectOpen}
            handleTabClick={handleTabClick}
            getHighestDisposition={getHighestDisposition}
            selectedAccountIndex={selectedAccountIndex}
            setSelectedAccountIndex={setSelectedAccountIndex}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default CustomerView;
