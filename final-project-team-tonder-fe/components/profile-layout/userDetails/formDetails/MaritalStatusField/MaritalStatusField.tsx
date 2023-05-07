import React, { Dispatch, SetStateAction } from 'react';
import { Select } from 'antd';
import { RightOutlined } from '@ant-design/icons';

interface MaritalStatusFieldProps {
  value: boolean;
  onChange: Dispatch<SetStateAction<boolean>>;
}

const MaritalStatusField: React.FC<MaritalStatusFieldProps> = ({
  value,
  onChange,
}) => {
  return (
    <Select
      style={{
        width: '95vw',
        textAlign: 'right',
        position: 'absolute',
        top: 0,
        right: 0,
      }}
      defaultValue={value}
      onChange={onChange}
      bordered={false}
      suffixIcon={<RightOutlined />}
      placeholder={value === null && 'Chưa đặt'}
      options={[
        { value: true, label: 'Đã kết hôn' },
        { value: false, label: 'Độc thân' },
      ]}
    />
  );
};

export default MaritalStatusField;
