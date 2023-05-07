import { Form, Tag } from 'antd';
import { memo } from 'react';
import memoStyle from './memozized.module.scss';
import { CloseOutlined } from '@ant-design/icons';

type CustomTagProps = {
  tagKey: number;
  children: string;
  color: string;
  checked: boolean;
  onClick?: () => void;
  view: string;
};

const MemoizedTag: React.FC<CustomTagProps> = memo(
  ({ tagKey, children, color, onClick, view }) => {
    return (
      <Form.Item name="hobbies" className={memoStyle['form__tag']}>
        <Tag
          key={tagKey}
          closable={false}
          className={memoStyle['tag__container']}
          color={color}
        >
          <p>#{children}</p>
          {view === 'modal' && (
            <CloseOutlined
              className={memoStyle['tag__icon']}
              onClick={onClick}
            />
          )}
        </Tag>
      </Form.Item>
    );
  }
);

MemoizedTag.displayName = 'Memoized';

export default MemoizedTag;
