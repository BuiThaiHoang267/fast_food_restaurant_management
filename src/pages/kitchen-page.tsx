import {Divider, IconButton, InputAdornment, TextField, Typography} from "@mui/material";
import {color_white} from "../common/constant.ts";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";

const KitchenPage = () => {
    return (
        <div className="flex h-screen">
            {/*Left section*/}
            <div className="flex flex-col flex-1">
                <div className="flex flex-row justify-between items-center bg-blue-800 h-12 px-4">
                    <Typography
                        variant="subtitle1"
                        sx={{
                            color: '#fff',
                            fontWeight: 'bold',
                        }}
                    >
                        Chờ chế biến
                    </Typography>
                    <div className="w-1/2 h-7 px-4">
                        <TextField
                            variant="standard"
                            placeholder="Tìm món"
                            slotProps={{
                                input: {
                                    sx: {
                                        color: color_white,
                                        fontSize: '0.875rem',
                                    },
                                    endAdornment: ( // Move the icon to the end of the input
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => console.log('Search clicked')} edge="end">
                                                <SearchIcon sx={{color: color_white}} fontSize="small"/>
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            sx={{
                                backgroundColor: 'transparent',
                                color: '#fff',
                                borderRadius: '4px',
                                paddingLeft: '8px',
                                paddingRight: '8px',
                                width: '100%',
                                '& .MuiInput-underline:before': {
                                    borderBottomColor: color_white,
                                },
                                '& .MuiInput-underline:after': {
                                    borderBottomColor: color_white,
                                },
                                '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                                    borderBottomColor: color_white,
                                },
                            }}
                        />
                    </div>
                </div>
            </div>

            <Divider/>

            {/*Right section*/}
            <div className="flex flex-col flex-1">
                <div
                    className="flex flex-row justify-between items-center bg-blue-800 h-12 px-4"
                >
                    <Typography
                        variant="subtitle1"
                        sx={{
                            color: '#fff',
                            fontWeight: 'bold',
                        }}
                    >
                        Đã xong/chờ cung ứng
                    </Typography>
                </div>
            </div>
        </div>
    )
}

export default KitchenPage;