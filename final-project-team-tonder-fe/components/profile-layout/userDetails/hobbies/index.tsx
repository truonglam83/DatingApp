import { Button, FormInstance, Input, Modal, message } from 'antd';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import detailsStyle from '../../userDetails/userDetails.module.scss';
import MemoizedTag from '../MemoizedTag/index';

type CustomTagProps = {
  tagKey: number;
  children: string;
  color: string;
  checked: boolean;
  onClick?: () => void;
};

type HobbySectionProps = {
  form: FormInstance;
  hobbiesProp: string[];
  setIsChange: Dispatch<SetStateAction<boolean>>;
};

const tagColors = [
  'magenta',
  'red',
  'volcano',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'purple',
];

const HobbySection: React.FC<HobbySectionProps> = ({
  form,
  hobbiesProp,
  setIsChange,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [hobbies, setHobbies] = useState<string[]>(hobbiesProp);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [hobbyInput, setHobbyInput] = useState<string>('');

  const [messError, setMessError] = useState<string>('');

  useEffect(() => {
    if (hobbies) {
      form.setFieldsValue({
        hobbies: [...hobbies],
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hobbies]);

  const addHobby = (value: string) => {
    setHobbies([...hobbies, value]);
    setIsChange(true);
    setHobbyInput('');
  };

  const removeHobby = (hobby: string) => {
    setHobbies(hobbies.filter((item) => item !== hobby));
    setIsChange(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getRandomColor = () => {
    const availableColors = tagColors.filter(
      (color) => !selectedColors.includes(color)
    );
    const randomIndex = Math.floor(Math.random() * availableColors.length);
    const selectedColor = availableColors[randomIndex];
    setSelectedColors([...selectedColors, selectedColor]);
    return selectedColor;
  };

  const renderHobbies = (hobbiesToRender: string[], view: string) => {
    return hobbiesToRender?.map((hobby, index) => {
      const tagProps: CustomTagProps = {
        tagKey: index,
        children: hobby,
        color: selectedColors[index] || getRandomColor(),
        checked: false,
        onClick: () => view === 'modal' && removeHobby(hobby),
      };
      return <MemoizedTag {...tagProps} key={index} view={view} />;
    });
  };

  const handleSearch = (value: string): void => {
    if (value.trim() === '') {
      setMessError('Vui lòng nhập sở thích của bạn');
      return;
    }
    if (hobbies.length >= 10) {
      setMessError('Số lượng sở thích tối đa bạn có thể đặt là 10');
      return;
    }

    if (
      hobbies.some((h) => {
        const words1 = h.toLowerCase().trim().split(/\s+/);
        const words2 = value.toLowerCase().trim().split(/\s+/);
        if (words1.length !== words2.length) {
          return false;
        }
        return words1.every(
          (w1, i) =>
            w1.slice(0, 1).toLowerCase() ===
              words2[i].slice(0, 1).toLowerCase() &&
            w1.slice(1) === words2[i].slice(1)
        );
      })
    ) {
      setMessError('Bạn đã thêm sở thích này rồi');
      return;
    }

    hobbies.length < 10 && !messError.length && addHobby(value);
  };

  return (
    <div className={detailsStyle['user__details--interest']}>
      <div className={detailsStyle['user__details--interest']}>
        <div className={detailsStyle['user__details--interest__title']}>
          <span>Sở thích</span>
          <span
            className={detailsStyle['user__details--interest__title--edit']}
            onClick={() => setIsModalVisible(true)}
          >
            Chỉnh sửa
          </span>

          <Modal
            title="Thêm sở thích"
            open={isModalVisible}
            closable={false}
            footer={null}
            onCancel={handleCancel}
          >
            <Input.Search
              placeholder="Nhập sở thích của bạn"
              enterButton={
                <Button
                  style={{
                    backgroundColor: '#7a56fe',
                    color: '#fff',
                    border: 'none',
                  }}
                >
                  Thêm
                </Button>
              }
              value={hobbyInput}
              onSearch={(value) => handleSearch(value)}
              onChange={(e) => {
                setHobbyInput(e.target.value);
                if (e.target.value.length <= 15) {
                  setMessError('');
                } else {
                  setMessError('Sở thích tối đa chứa 15 ký tự');
                }
              }}
            />

            <p className={detailsStyle['message__error']}>{messError}</p>

            <div
              className={detailsStyle[`list__hobbies`]}
              style={{
                marginTop: '1rem',
                display: 'flex',
                flexWrap: 'wrap',
              }}
            >
              {renderHobbies(hobbies, 'modal')}
            </div>
          </Modal>
        </div>
      </div>

      <div className={detailsStyle[`list__hobbies`]}>
        {renderHobbies(hobbies, 'profile')}
      </div>
    </div>
  );
};

export default HobbySection;
