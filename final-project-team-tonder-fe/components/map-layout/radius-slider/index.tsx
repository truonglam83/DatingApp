import sliderIcon from '@/public/images/map/sliderIcon.png';
import { Alert, Button, Image, InputNumber } from 'antd';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import sliderStyle from './radius-slider.module.scss';

type RadiusProp = {
  radius: number;
  setRadius: Dispatch<SetStateAction<number>>;
};

const RadiusSlider: React.FC<RadiusProp> = ({ radius, setRadius }) => {
  const [currentValue, setCurrentValue] = useState<number>(radius);
  const [isInput, setIsInput] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const [isDisable, setIsDisable] = useState<boolean>(false);

  const onChange = (value: number | null) => {
    if (value) {
      setCurrentValue(value);
    }
  };

  const onSearch = () => {
    if (currentValue >= 200 && currentValue <= 3000) {
      setRadius(currentValue);
    } else {
      setCurrentValue(radius);
      setIsAlert(true);
    }
  };

  // if current value is equal radius, disable button
  useEffect(() => {
    if (currentValue === radius) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [currentValue, radius]);

  return (
    <>
      {isAlert && (
        <Alert
          description="Bạn chỉ có thể tìm kiếm người dùng trong phạm vi bán kính từ 200 - 3000m"
          type="warning"
          showIcon
          closable
          onClose={() => setIsAlert(!isAlert)}
          className={sliderStyle['slider__alert']}
        />
      )}
      <div className={sliderStyle['slider__container']}>
        <Image
          preview={false}
          src={sliderIcon.src}
          alt="dialog-slider"
          onClick={() => setIsInput(!isInput)}
        />
        <div
          className={sliderStyle['slider__container--dialog']}
          style={{ display: isInput ? 'flex' : 'none' }}
        >
          <InputNumber
            className={sliderStyle['slider__container--input']}
            value={radius}
            onChange={onChange}
          />
          <Button
            type="ghost"
            // className={sliderStyle['slider__container--btn']}
            className={
              isDisable
                ? sliderStyle['slider__container--btn--disable']
                : sliderStyle['slider__container--btn']
            }
            onClick={onSearch}
            disabled={isDisable}
          >
            Lưu
          </Button>
        </div>
      </div>
    </>
  );
};

export default RadiusSlider;
