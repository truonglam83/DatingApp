import { Select } from "antd";
import { RightOutlined } from "@ant-design/icons";

interface HeightFieldProps {
    value: number;
    onChange: (value: number) => void;
}

const HeightField: React.FC<HeightFieldProps> = ({ value, onChange }) => {
    const handleSelectChange = (value: number) => {
        onChange(value);
    };

    const heightOptions = [];
    for (let i = 100; i <= 300; i++) {
        heightOptions.push({ label: `${i} cm`, value: i });
    }

    return (
        <div>
            <Select
                defaultValue={value}
                value={value}
                options={heightOptions}
                onChange={handleSelectChange}
                bordered={false}
                style={{ width: 90 }}
                suffixIcon={<RightOutlined />}
            />
        </div>
    );
};

export default HeightField;
