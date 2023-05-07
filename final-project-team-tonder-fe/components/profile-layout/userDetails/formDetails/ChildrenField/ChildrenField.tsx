import { Select } from 'antd';
import React from 'react';
import { RightOutlined } from '@ant-design/icons';

interface ChildrenFieldProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

const { Option } = Select;

const ChildrenField: React.FC<ChildrenFieldProps> = ({ value, onChange }) => {
  return (
    <Select
      style={{
        width: '95vw',
        textAlign: 'right',
        position: 'absolute',
        top: 0,
        right: 0,
      }}
      value={value}
      onChange={onChange}
      bordered={false}
      placeholder={value === null && 'Chưa đặt'}
      suffixIcon={<RightOutlined />}
    >
      <Option value={true}>Đã có</Option>
      <Option value={false}>Chưa có</Option>
    </Select>
  );
};

export default ChildrenField;
