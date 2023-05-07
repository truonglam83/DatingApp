import React, { Dispatch, SetStateAction } from 'react';
import { Select } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { ALCOHOL } from '@/types/user-types';

interface AlcoholFieldProps {
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
}

const AlcoholField: React.FC<AlcoholFieldProps> = ({ value, onChange }) => {
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
        { value: ALCOHOL.NEVER, label: ALCOHOL.NEVER },
        { value: ALCOHOL.YES, label: ALCOHOL.YES },
        { value: ALCOHOL.SOMETIMES, label: ALCOHOL.SOMETIMES },
        { value: ALCOHOL.MORE, label: ALCOHOL.MORE },
      ]}
    />
  );
};

export default AlcoholField;
