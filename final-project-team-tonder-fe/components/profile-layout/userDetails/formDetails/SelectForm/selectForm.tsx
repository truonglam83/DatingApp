import { Form } from 'antd';
import Image, { StaticImageData } from 'next/image';
import formStyle from '../formDetails.module.scss';

export interface ISelectForm {
  image: StaticImageData | string;
  title: string;
  value: string | number | boolean | undefined;
  children: any;
  name: string;
}

const SelectForm = ({ value, image, title, children, name }: ISelectForm) => {
  return (
    <div className={formStyle['form__item']}>
      <div>
        <Image src={image} alt={`${title}`} /> <span>{title}</span>
      </div>
      <Form.Item
        name={name}
        className={formStyle['form__item--detail']}
        initialValue={value}
      >
        {children}
      </Form.Item>
    </div>
  );
};

export default SelectForm;
