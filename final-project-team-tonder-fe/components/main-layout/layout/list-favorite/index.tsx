import { IMatchedUser } from '@/interface/chat-interface';
import { getMatchedUserApi } from '@/redux/reducers/chatReducer';
import { dislikeUserApi } from '@/redux/reducers/userReducer';
import { Modal, message } from 'antd';
import React, { useEffect, useState } from 'react';
import FavoriteItem from '../favorite-item';
import style from './list-favorite.module.scss';

export function ListFavorite({ onChange }: { onChange: (id: string) => void }) {
  const [messageApi, contextHolder] = message.useMessage();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blockUser, setBlockUser] = useState<string>('');
  const [users, setUsers] = useState<IMatchedUser[]>([]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      onChange(blockUser);
      const data = await dislikeUserApi(blockUser);
      if (data) {
        const usersFilter = users?.filter((user) => user.id !== blockUser);
        setUsers(usersFilter);
        messageApi.open({
          type: 'success',
          content: 'Bạn đã không thích người này',
        });
      }
    } catch (error) {
      return error;
    }
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleClickUnfriend = (userId: string) => {
    showModal();
    setBlockUser(userId);
  };

  useEffect(() => {
    const fetchData = async () => {
      const matchedUsers = await getMatchedUserApi();
      if (matchedUsers) {
        setUsers(matchedUsers);
      } else {
        setUsers([]);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {!users.length ? (
        <div className={style.no__match}>
          <p>Lêu lêu! Không có ai thích nè!</p>
        </div>
      ) : (
        <div className={style.favorite__list}>
          {users &&
            users.map((user) => (
              <React.Fragment key={user?.id}>
                <FavoriteItem
                  OnClick={() => handleClickUnfriend(user?.id)}
                  id={user?.id}
                  img={user?.avatar}
                />
              </React.Fragment>
            ))}

          <Modal
            title="Confirmation"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>Bạn có thật sự muốn xóa người này?</p>
          </Modal>
        </div>
      )}
    </>
  );
}

export default ListFavorite;
