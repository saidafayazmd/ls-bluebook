import React, { useState } from 'react';
import { Grid, Typography, /* Button, */ Select, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import CustomDropDownIcon from '../../../utilities/CustomDropDownIcon';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';

const CustomMenuItem = styled(MenuItem)(() => ({
    fontFamily: 'GellixRegular',
    fontSize: '12px',
    minHeight: '35.8px !important',
    paddingLeft: '10px',
    paddingRight: '10px',
    color: '#000'
}));

const StyledSelectField = styled(Select)({
    background: '#FFF',
    '& .MuiOutlinedInput-input.MuiSelect-select': {
        height: '10px',
        minHeight: '0px',
        borderRadius: '8px',
        fontSize: '14px',
        fontFamily: 'GellixRegular',
        display: 'flex',
        alignItems: 'center'
    },
    '& .MuiOutlinedInput-notchedOutline': {
        border: '0'
    },
    [`& .${outlinedInputClasses.input}`]: {
        color: '#000048',
        background: '#FFF !important',
        fontSize: '15px',
        fontFamily: 'GellixRegular',
        height: '0px',
        minHeight: '0px',
        border: 'none',
        filter: 'drop-shadow(0px 1px 1px #2F78C4)'
    },
    '& .MuiSelect-icon': {
        display: 'none'
    }
});
const accountList = [];

const AddAccount = () => {
    const [selectedAccount /* , setSelectedAccount */] = useState('All');
    const [selectOpen, setSelectOpen] = useState(false);

    const handleTabClick = (event) => {
        setSelectedAccount(event.target.value);
    };
    const handleOpen = () => {
        setSelectOpen(true);
    };

    const handleClose = () => {
        setSelectOpen(false);
    };
    return (
        <Grid container direction="column"  >
            <Grid item xs={12}>
                <Grid container direction="row">
                    <Grid item xs={12}>
                        <Grid
                            container
                            direction="row"
                            sx={{
                                display: 'flex',
                                height: '48px',
                                alignItems: 'center',
                                borderBottom: '1px solid #B0B0B0',
                                padding: '10px 20px',
                                justifyContent: 'space-between'

                            }}
                        >
                            <Typography className="font-bold font-medium-header font-header">Add new account</Typography>
                            <Typography className="font-regular font-s font-black">
                                Fields marked with <span style={{ color: '#B81F2D' }}>*</span> are mandatory
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{ padding: '10px 20px', mt: 4 }}>
                        <Grid container direction="row">
                            <Grid item xs={12}>
                                <Grid container direction="row" spacing={2}>
                                    <Grid item xs={4}>
                                        <Typography sx={{ marginBottom: '10px' }} className="font-regular font-medium-sub font-black">
                                            Select account <span style={{ color: '#B81F2D' }}>*</span>
                                        </Typography>
                                        <StyledSelectField
                                            variant="outlined"
                                            labelId="demo-simple-select-label"
                                            id="filter"
                                           
                                            value={selectedAccount}
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
                                            {accountList.map((name) => (
                                                <CustomMenuItem key={name} value={name}>
                                                    {name}
                                                </CustomMenuItem>
                                            ))}
                                        </StyledSelectField>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default AddAccount;
