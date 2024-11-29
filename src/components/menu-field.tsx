export interface MenuFieldProps {
    label: string;
    name: string;
    visible: boolean;
}

interface MenuFieldTableProps {
    menuFields: MenuFieldProps[];
    onCheck: (name: string, visible: boolean) => void;
}

const MenuFieldTable: React.FC<MenuFieldTableProps> = ({ menuFields, onCheck }) => {
    return (
        <div
            style={{
                width: "400px",
                padding: "10px",
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "flex-start",
            }}
        >
            {menuFields.map((field, index) => (
                <label
                    key={index}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        width: "48%", // Chiếm 50% chiều ngang trừ khoảng cách
                        margin: "5px 0",
                    }}
                >
                    <input
                        type="checkbox"
                        defaultChecked={field.visible}
                        style={{ marginRight: "5px" }}
                        onChange={(e) => onCheck(field.name, e.target.checked)}
                    />
                    {field.label}
                </label>
            ))}
        </div>
    );
};

export default MenuFieldTable;