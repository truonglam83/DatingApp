import { Form } from 'antd';
import { Dayjs } from 'dayjs';
import formItemStyle from './form-item.module.scss';

type Props = {
  children: any;
  message?: string;
  name: string;
  initialValue?: string | null | Dayjs;
  label: string | null;
  required?: boolean;
};

type Rule = {
  required?: boolean;
  message?: string;
  max?: number;
};

const FormItem = ({
  name,
  children,
  message,
  initialValue,
  label,
  required,
}: Props) => {
  const rules: Rule[] = [{ required: required, message: message }];

  if (name === 'name') {
    rules.push({ max: 20, message: message });
  }

  return (
    <Form.Item
      initialValue={initialValue}
      rules={rules}
      label={<p className={formItemStyle['item__label']}>{label}</p>}
      name={name}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 24 }}
      className={formItemStyle['item__wrapper']}
    >
      {children}
    </Form.Item>
  );
};

export default FormItem;
