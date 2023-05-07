import React, { Dispatch, SetStateAction } from 'react';
import { Checkbox, Select } from 'antd';
import { RightOutlined } from '@ant-design/icons';

interface ReligionFieldProps {
  value: boolean;
  onChange: Dispatch<SetStateAction<boolean>>;
}

const ReligionField: React.FC<ReligionFieldProps> = ({ value, onChange }) => {
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
      suffixIcon={<RightOutlined />}
      placeholder={value === null && 'Chưa đặt'}
      options={[
        { value: true, label: 'Có' },
        { value: false, label: 'Không' },
      ]}
    />
  );
};

export default ReligionField;
