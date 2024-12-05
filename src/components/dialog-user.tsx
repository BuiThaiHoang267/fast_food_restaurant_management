import {UserDTO} from "../dtos/UserDTO.ts";
import {Button, Dialog} from "@mui/material";
import {InputDropdown, InputText} from "./input.tsx";
import {
    bg_blue_500,
    bg_grey_500,
    bg_grey_600,
    color_green_primary,
    Error500,
    Error600,
    success_700
} from "../common/constant.ts";
import {useEffect, useState} from "react";
import {UserService} from "../services/UserService.ts";

interface DialogUserProps {
    open: boolean;
    onClose: (isRerender: boolean) => void;
    user: UserDTO;
    isAdd: boolean;
    branches: {id: number, label: string, checked: boolean}[];
    roles: {id: number, label: string, checked: boolean}[];
}

const DialogUser: React.FC<DialogUserProps> = ({open, onClose, user, isAdd, branches, roles}) => {
    const [userReq, setUserReq] = useState<UserDTO>(new UserDTO(0, '', '', '', '', '', 0, '', '', 0, '', true));
    const [branchOptions, setBranchOptions] = useState<string[]>([]);
    const [roleOptions, setRoleOptions] = useState<string[]>([]);

    useEffect(() => {
        if(isAdd)
        {
            if(!open)
            {
                setUserReq(new UserDTO(0, '', '', '', '', '', 0, '', '', 0, '', true));
            }
        }
        else{
            if(!open)
            {
                setUserReq(new UserDTO(0, '', '', '', '', '', 0, '', '', 0, '', true));
            }
            else {
                console.log("Bat dialog",user);
                setUserReq(user);
            }
        }
    }, [open]);

    useEffect(() => {
        setBranchOptions(branches.map(branch => branch.label));
    }, [branches]);

    useEffect(() => {
        setRoleOptions(roles.map(role => role.label));
    }, [roles]);

    const registerUserReq = async () => {
        try{
            const response = await UserService.register(userReq);
            console.log(response);
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }

    const updateUserReq = async () => {
        try{
            const response = await UserService.updateUser(userReq);
            console.log(response);
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }

    const deleteUserReq = async () => {
        try{
            const response = await UserService.deleteUser(userReq.id);
            console.log(response);
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }


    const handleClickAddUser = () => {
        registerUserReq()
            .then(
                () => {
                    onClose(true);
                }
            )
            .catch(
                (error) => {
                    console.error(error);
                }
            );
    }

    const handleUpdateUser = () => {
        console.log("update", userReq);
        updateUserReq()
            .then(
                () => {
                    onClose(true);
                }
            )
            .catch(
                (error) => {
                    console.error(error);
                }
            );
    }

    const handleDeleteUser = () => {
        deleteUserReq()
            .then(
                () => {
                    onClose(true);
                }
            )
            .catch(
                (error) => {
                    console.error(error);
                }
            );
    }

    const handleChangeUserReq = (label: string, value: string) => {
        setUserReq({...userReq, [label]: value});
        if(label === 'branchName'){
            const branch = branches.find(branch => branch.label === value);
            if(branch){
                setUserReq({...userReq,branchName: value, branchId: branch.id});
            }
        }
        if(label === 'roleName'){
            const role = roles.find(role => role.label === value);
            if(role){
                setUserReq({...userReq, roleName: value, roleId: role.id});
            }
        }
    }


    return (
        <Dialog
            open={open}
            onClose={() => onClose(false)}
            maxWidth={false}

            sx={{
                '& .MuiDialog-paper': {
                    borderRadius: '8px',
                    width: '500px',
                },
            }}
        >
            <div className={'flex flex-col p-4 pl-6 pr-6'}>
                <div>
                    {isAdd &&<span style={{fontWeight: 'bold', fontSize: '1.2rem', color: bg_blue_500}}>Thêm mới người dùng</span>}
                    {!isAdd &&<span style={{fontWeight: 'bold', fontSize: '1.2rem', color: bg_blue_500}}>Cập nhật người dùng</span>}
                </div>
                <div className={'flex flex-col mt-4 gap-3'}>
                    <InputText label={'Tên người dùng'} placeholder={'Nhập tên người dùng'} value={userReq.name}
                               onChange={(value) => {handleChangeUserReq('name', value)}}
                    />
                    <InputText label={'Tài khoản'} placeholder={'Nhập tài khoản'} value={userReq.username}
                               onChange={(value) => {handleChangeUserReq('username', value)}}
                    />
                    <InputText label={'Mật khẩu'} placeholder={'Nhập nhật khẩu'} value={userReq.password}
                               onChange={(value) => {handleChangeUserReq('password', value)}}
                    />
                    <InputText label={'Số điện thoại'} placeholder={'Nhập số điện thoại'} value={userReq.phone}
                               onChange={(value) => {handleChangeUserReq('phone', value)}}
                    />
                    <InputText label={'Email'} placeholder={'Nhập Email'} value={userReq.email}
                               onChange={(value) => {handleChangeUserReq('email', value)}}
                    />
                    <InputDropdown label={'Vai trò'} value={userReq.roleName} options={roleOptions}
                               onChange={(value) => {handleChangeUserReq('roleName', value)}}
                    />
                    <InputDropdown label={'Chi nhánh'} value={userReq.branchName} options={branchOptions}
                               onChange={(value) => {handleChangeUserReq('branchName', value)}}
                    />
                </div>
                <div className="flex justify-end gap-2 mt-6">
                    {isAdd && <Button
                        variant="contained"
                        color="primary"
                        onClick={handleClickAddUser}
                        sx={{
                            textTransform: 'none',
                            borderRadius: '8px',
                            fontWeight: 'bold',
                            backgroundColor: color_green_primary,
                            '&:hover': {
                                backgroundColor: success_700,
                            },
                        }}
                    >
                        Thêm mới
                    </Button>}
                    {!isAdd && <div className={'flex flex-row gap-2'}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleUpdateUser}
                            sx={{
                                backgroundColor: color_green_primary,
                                textTransform: 'none',
                                borderRadius: '8px',
                                fontWeight: 'bold',
                                '&:hover': {
                                    backgroundColor: success_700,
                                },
                            }}
                        >
                            Cập Nhật
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleDeleteUser}
                            sx={{
                                backgroundColor: Error500,
                                textTransform: 'none',
                                borderRadius: '8px',
                                fontWeight: 'bold',
                                '&:hover': {
                                    backgroundColor: Error600,
                                },
                            }}
                        >
                            Xóa
                        </Button>
                    </div>}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => onClose(false)}
                        sx={{
                            backgroundColor: bg_grey_500,
                            textTransform: 'none',
                            fontWeight: 'bold',
                            borderRadius: '8px',
                            '&:hover': {
                                backgroundColor: bg_grey_600,
                            },
                        }}
                    >
                        Bỏ qua
                    </Button>
                </div>
            </div>
        </Dialog>
    )
}

export default DialogUser;

