import {Divider} from "@mui/material";
import ItemRecentlyAction from "./item-recently-action.tsx";
import {AuditLogDTO} from "../dtos/AuditLogDTO.ts";

interface CardRecentlyActionProps {
    auditLogs: AuditLogDTO[];
}

const CardRecentlyAction: React.FC<CardRecentlyActionProps> = ({auditLogs}) => {
    return (
        <div
            className="flex flex-col relative"
            style={{
                height: "100%", // Đảm bảo thẻ chứa sẽ chiếm đầy chiều cao của cha nếu cần
                overflow: "hidden", // Ẩn nội dung tràn bên ngoài
            }}
        >
            <span style={{ fontSize: "1rem", fontWeight: "bold", padding: "0 16px" }}>
                CÁC HOẠT ĐỘNG GẦN ĐÂY
            </span>

            <Divider
                orientation="horizontal"
                flexItem
                sx={{
                    margin: "8px 0",
                }}
            />

            {/* Nội dung có thể scroll */}
            <div
                className="flex flex-col flex-1"
                style={{
                    overflowY: "auto", // Thêm scroll dọc
                }}
            >
                {auditLogs.map((auditLog, index) => (
                    <ItemRecentlyAction key={index} auditLog={auditLog} />
                ))}

            </div>
        </div>
    );
};



export default CardRecentlyAction;