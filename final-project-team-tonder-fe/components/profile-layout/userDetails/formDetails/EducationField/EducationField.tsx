import { EDUCATION } from '@/types/user-types';
import { RightOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import React, { Dispatch, SetStateAction } from 'react';

interface EducationFieldProps {
  value: string | undefined;
  onChange: Dispatch<SetStateAction<string | undefined>>;
}

const EducationField: React.FC<EducationFieldProps> = ({ value, onChange }) => {
  return (
    <Select
      style={{
        width: '93vw',
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
        { value: EDUCATION.NO, label: EDUCATION.NO },
        { value: EDUCATION.SECONDARY, label: EDUCATION.SECONDARY },
        { value: EDUCATION.UNIVERSITY, label: EDUCATION.UNIVERSITY },
        { value: EDUCATION.GRADUATED, label: EDUCATION.GRADUATED },
      ]}
    />
  );
};

export default EducationField;
