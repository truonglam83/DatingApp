import { RightOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import React, { Dispatch, SetStateAction } from 'react';

interface GenderFieldProps {
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
}

const GenderField: React.FC<GenderFieldProps> = ({ value, onChange }) => {
  return (
    <Select
      value={value}
      style={{
        width: '95vw',
        textAlign: 'right',
        position: 'absolute',
        top: 0,
        right: 0,
      }}
      onChange={onChange}
      bordered={false}
      suffixIcon={<RightOutlined />}
      placeholder={value === null && 'Chưa đặt'}
      options={[
        { value: 'male', label: 'Nam' },
        { value: 'female', label: 'Nữ' },
        { value: 'other', label: 'Khác' },
      ]}
    ></Select>
  );
};

export default GenderField;
