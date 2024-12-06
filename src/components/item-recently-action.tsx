import FileCopyIcon from "@mui/icons-material/FileCopy";
import {bg_blue_400, bg_grey_500, color_green_primary} from "../common/constant.ts";
import {AuditLogDTO} from "../dtos/AuditLogDTO.ts";

interface ItemRecentlyActionProps {
    auditLog: AuditLogDTO;
}

const ItemRecentlyAction: React.FC<ItemRecentlyActionProps> = ({auditLog}) => {
    return(
        <div className={'flex flex-row items-center p-4 gap-3'}>
            <div
                className={"flex items-center justify-center"}
                style={{
                    height: 36, width: 36, borderRadius: 36,
                    backgroundColor: auditLog.action === 'Create' ? color_green_primary : auditLog.action === 'Update' ? bg_blue_400 : auditLog.action === 'Add'? color_green_primary : 'red'
            }}
            >
                <FileCopyIcon fontSize="small" sx={{color: 'white'}}/>
            </div>
            <div className={'flex flex-col flex-1'}>
                <span style={{textWrap: 'wrap'}}>{auditLog.description}</span>
                <span style={{fontSize: '0.8rem', color: bg_grey_500}}>{auditLog.createdAt.format("DD/MM/YYYY HH:mm")}</span>
            </div>
        </div>
    )
}

export default ItemRecentlyAction