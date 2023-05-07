import { IChatContent } from '@/interface/chat-interface';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styles from './messages.module.scss';

type IMessages = {
  own?: boolean;
  data: IChatContent;
  setReceiverId: Dispatch<SetStateAction<string>>;
};

const Messages = ({ own, data, setReceiverId }: IMessages) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  useEffect(() => {
    setReceiverId(data.receiver);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const [isLongPress, setIsLongPress] = useState(false);
  // const [lastMouseDownTime, setLastMouseDownTime] = useState<number>(0);

  // const handleMouseDown = () => {
  //   setLastMouseDownTime(Date.now());
  // };

  // const handleMouseUp = () => {
  //   if (lastMouseDownTime && Date.now() - lastMouseDownTime > 2000) {
  //     setIsLongPress(true);
  //   } else {
  //     setIsLongPress(false);
  //   }
  // };

  // const handleDelete = () => {
  //   // handle delete message
  // };

  return (
    <div className={own ? `${styles.message} ${styles.own}` : styles.message}>
      <div className={styles.message__top}>
        {data.type === 'image' ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className={styles.message__img}
            src={`${data.content}`}
            alt=""
            onLoad={() => setLoaded(true)}
            style={{ display: loaded ? 'block' : 'none' }}
            // onMouseDown={handleMouseDown}
            // onMouseUp={handleMouseUp}
          />
        ) : (
          <p
            className={styles.message__text}
            // onMouseDown={handleMouseDown}
            // onMouseUp={handleMouseUp}
          >
            {data?.content}
          </p>
        )}
        {/* {isLongPress && <button onClick={handleDelete}>Xóa</button>} */}
      </div>
    </div>
  );
};

export default Messages;
