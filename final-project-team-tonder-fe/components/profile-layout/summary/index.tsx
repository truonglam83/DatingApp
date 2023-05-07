import defaultAvatar from '@/public/images/profile/user-avatar/default-avatar.png';
import { UploadOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  DatePicker,
  Form,
  Image,
  Input,
  Modal,
  Spin,
  Upload,
  UploadFile,
  message,
} from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { IUser } from '../../../interface/user-interface';
import profileStyle from '../../../pages/profile/profile.module.scss';
import store, { AppDispatch } from '../../../redux/configStore';
import { updateInfoUser } from '../../../redux/reducers/userReducer';
import { IFormUpdateInfo } from '../../../types/profileType/index';
import FormItem from './form-item';
import ImgCrop from 'antd-img-crop';
dayjs.extend(customParseFormat);

type RangeValue = [Dayjs | null, Dayjs | null] | null;
interface ProfileSummaryProps {
  profile: IUser;
}
type ImageFile = UploadFile<{
  preview?: string;
}>;

const ProfileSummary: React.FC<ProfileSummaryProps> = ({ profile }) => {
  const initialInfo: IFormUpdateInfo = {
    name: profile.name,
    age: profile.age,
    avatar: profile.avatar,
  };

  const userProfile: IUser | null = store.getState().userReducer.userProfile;
  const [infoUser, setInfoUser] = useState<IFormUpdateInfo>(initialInfo);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [subTitle, setSubTitle] = useState<string | null>(
    userProfile ? userProfile?.reason : null
  );
  const [inputName, setInputName] = useState<string | null>(profile.name);
  const [dates, setDates] = useState<RangeValue>(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [age, setAge] = useState<number>();

  const regexName = /^[a-zA-Z\u00C0-\u1EF9]+$/;

  const [preFile, setPreFile] = useState<Array<ImageFile> | undefined>(
    undefined
  );
  const router = useRouter();

  const [file, setFile] = useState<File | undefined>(undefined);

  useEffect(() => {
    const handleAge = (birthday: string | undefined) => {
      if (!birthday) return 0;
      const now = moment();
      const birth = moment(birthday, 'DD/MM/YYYY');
      const data = now.diff(birth, 'years');
      setAge(data);
    };
    if (infoUser.age) handleAge(infoUser.age);
  }, [infoUser]);

  const dispatch: AppDispatch = useDispatch();

  const handleUploadInfo = async (values: any): Promise<void> => {
    setIsLoading(true);

    const dateString = values.birthday.$d;

    const dateObject = new Date(dateString);

    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();

    const formattedDate = `${day.toString().padStart(2, '0')}/${month
      .toString()
      .padStart(2, '0')}/${year}`;

    const formData = new FormData();
    if (file) formData.append('avatar', file);
    formData.append('birthday', formattedDate);
    formData.append('name', values.name);

    try {
      const data: any = await dispatch(updateInfoUser(formData));
      setInfoUser({
        avatar: data.avatar,
        age: data.age,
        name: data.name,
      });
      messageApi.open({
        type: 'success',
        content: 'Đã cập nhật thông tin thành công',
      });
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: 'Cập nhật thông tin thất bại',
      });
    }
    setIsChangeSummary(false);
    setPreFile([]);
    setIsLoading(false);
    setOpenForm(false);
  };

  const disabledDate = (current: Dayjs) => {
    if (!dates) {
      return false;
    }
    const today = moment();
    return current && current >= today;
  };

  const onOpenChange = (open: boolean) => {
    if (open) {
      setIsChangeSummary(true);
      setDates([null, null]);
    } else {
      setDates(null);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push('/');
  };

  const [isChangeSummary, setIsChangeSummary] = useState<boolean>(false);

  const modalProps = {
    title: 'Hồ sơ của bạn',
    content: (
      <Form onFinish={handleUploadInfo}>
        {isLoading && (
          <Spin tip="Loading">
            <div className="content" />
          </Spin>
        )}
        <FormItem
          message="Hãy chọn ảnh đại diện!"
          name="avatar"
          initialValue={profile?.avatar}
          label="Ảnh đại diện"
          required={false}
        >
          <ImgCrop
            rotationSlider
            modalTitle="Chỉnh sửa hình ảnh"
            modalOk="Lưu"
            modalCancel="Hủy"
            resetText="Hủy thay đổi"
            showReset
            beforeCrop={(file) => {
              const fileSize = file.size / 1024 / 1024;
              if (fileSize > 5) {
                message.error('Hình ảnh chỉ có kích thước tối đa 5MB!');
                return false || Upload.LIST_IGNORE;
              }
              const isValid =
                file.type === 'image/png' ||
                file.type === 'image/jpeg' ||
                file.type === 'image/jpg';
              if (!isValid) {
                message.error(`${file.name} phải là định dạng hình ảnh tĩnh`);
                return false || Upload.LIST_IGNORE;
              }
              return (isValid && fileSize < 5) || Upload.LIST_IGNORE;
            }}
          >
            <Upload
              accept=".jpg,.jpeg,.png"
              name="avatar"
              disabled={isLoading}
              maxCount={1}
              fileList={preFile}
              defaultFileList={[]}
              listType="picture"
              onChange={(info) => {
                const { file, fileList } = info;
                file.status = 'done';
                setIsChangeSummary(true);
                setPreFile(fileList);
                setFile(file.originFileObj);
              }}
            >
              <Button
                type="ghost"
                className={profileStyle['edit__info']}
                icon={<UploadOutlined />}
              >
                Chỉnh sửa ảnh đại diện
              </Button>
            </Upload>
          </ImgCrop>
        </FormItem>

        <FormItem
          message={
            inputName && inputName.length > 20
              ? 'Độ dài tên không vượt quá 20 ký tự'
              : 'Hãy nhập tên!'
          }
          name="name"
          label="Tên"
          initialValue={profile.name}
          required={true}
        >
          <Input
            bordered={false}
            className={profileStyle['edit__info']}
            placeholder={profile?.name}
            disabled={isLoading}
            onChange={(e) => {
              if (regexName.test(e.target.value)) {
                setInputName(e.target.value);
                setIsChangeSummary(true);
              }
            }}
          />
        </FormItem>
        <FormItem
          message="Hãy nhập ngày sinh!"
          name="birthday"
          label="Ngày sinh"
          initialValue={profile.age && dayjs(profile.age, 'DDMMYYYY')}
          required={true}
        >
          <DatePicker
            placeholder="Hãy nhập ngày sinh"
            className={profileStyle['edit__info']}
            format={'DD/MM/YYYY'}
            disabledDate={disabledDate}
            onOpenChange={onOpenChange}
            defaultPickerValue={dayjs()}
            disabled={isLoading}
          />
        </FormItem>

        <Form.Item className={profileStyle['update__footer']}>
          <Button
            htmlType="submit"
            type="ghost"
            className={
              profileStyle[
                `custom__button--${
                  isLoading || !isChangeSummary ? 'disabled' : 'purple'
                }`
              ]
            }
            disabled={isLoading || !isChangeSummary}
          >
            {isLoading ? 'Đang cập nhật...' : 'Cập nhật'}
          </Button>
          <Button
            type="ghost"
            className={profileStyle['logout__button']}
            onClick={handleLogout}
          >
            Đăng xuất
          </Button>
        </Form.Item>
      </Form>
    ),
    open: openForm,
    onCancel: () => setOpenForm(false),
    footer: false,
  };

  useEffect(() => {
    if (userProfile) {
      switch (userProfile.reason) {
        case 'Muốn hẹn hò':
          setSubTitle('Muốn hẹn hò');
          break;
        case 'Muốn tâm sự':
          setSubTitle('Muốn tâm sự');
          break;
        case 'Đang tìm một mối quan hệ mới':
          setSubTitle('Đang tìm một mối quan hệ mới');
          break;
        default:
          break;
      }
    }
  }, [userProfile]);

  return (
    <div className={profileStyle['profile__layout']}>
      {contextHolder}
      <div className={profileStyle['profile__container--summary']}>
        <Avatar
          className={profileStyle['avatar__container']}
          size="large"
          icon={
            <Image
              src={infoUser.avatar ? infoUser.avatar : defaultAvatar.src}
              alt=""
              className={profileStyle['avatar__container--item']}
            />
          }
        />
        <div
          className={profileStyle['profile__container--info']}
          onClick={() => setOpenForm(true)}
        >
          <div className={profileStyle['profile__container--name']}>
            <p>{infoUser.name},</p>&nbsp;<p>{age}t</p>
          </div>
          <div className={profileStyle['profile__container--purpose']}>
            {userProfile?.reason ? subTitle : `"Hãy cho biết lý do bạn ở đây"`}
          </div>
        </div>
      </div>

      <Modal {...modalProps}>{modalProps.content}</Modal>
    </div>
  );
};

export default ProfileSummary;
