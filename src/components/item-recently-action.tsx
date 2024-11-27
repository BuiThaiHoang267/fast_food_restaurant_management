import FileCopyIcon from "@mui/icons-material/FileCopy";
import {bg_blue_400, bg_grey_500} from "../common/constant.ts";

const ItemRecentlyAction = () => {
    return(
        <div className={'flex flex-row items-center p-4 gap-3'}>
            <div
                className={"flex items-center justify-center"}
                style={{height: 36, width: 36, borderRadius: 36, backgroundColor: bg_blue_400}}
            >
                <FileCopyIcon fontSize="small" sx={{color: 'white'}}/>
            </div>
            <div className={'flex flex-col'}>
                <span style={{textWrap: 'wrap'}}>TN-1 vừa bán đơn hàng trị giá 99,000</span>
                <span style={{fontSize: '0.8rem', color: bg_grey_500}}>2 hours ago</span>
            </div>
        </div>
    )
}

export default ItemRecentlyAction