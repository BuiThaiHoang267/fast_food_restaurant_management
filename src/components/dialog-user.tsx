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

interface DialogUserProps {
    open: boolean;
    onClose: () => void;
    user: UserDTO;
    isAdd: boolean;
}

const DialogUser: React.FC<DialogUserProps> = ({open, onClose, user, isAdd}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
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
                    <InputText label={'Tên người dùng'} placeholder={'Nhập tên người dùng'} value={user.name} onChange={() => {
                    }}/>
                    <InputText label={'Tài khoản'} placeholder={'Nhập tài khoản'} value={user.name} onChange={() => {
                    }}/>
                    <InputText label={'Mật khẩu'} placeholder={'Nhập nhật khẩu'} value={user.name} onChange={() => {
                    }}/>
                    <InputText label={'Số điện thoại'} placeholder={'Nhập số điện thoại'} value={user.name} onChange={() => {
                    }}/>
                    <InputText label={'Email'} placeholder={'Nhập Email'} value={user.name} onChange={() => {
                    }}/>
                    <InputDropdown label={'Vai trò'} value={user.branchName} options={[]} onChange={() => {
                    }}/>
                    <InputDropdown label={'Chi nhánh'} value={user.branchName} options={[]} onChange={() => {
                    }}/>
                </div>
                <div className="flex justify-end gap-2 mt-6">
                    {isAdd && <Button
                        variant="contained"
                        color="primary"
                        onClick={onClose}
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
                            onClick={onClose}
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
                            onClick={onClose}
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
                        onClick={onClose}
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

