import { AppDispatch } from '@/redux/configStore';
import { uploadImageApi } from '@/redux/reducers/userReducer';
import {
  DeleteFilled,
  HeartFilled,
  HeartOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import {
  Button,
  Col,
  Image,
  Modal,
  Row,
  Space,
  Spin,
  Upload,
  message,
} from 'antd';
import { UploadFile, UploadProps } from 'antd/es/upload';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { IPhoto } from '../../../interface/photo-interface';
import { getAllPhotos } from '../../../redux/reducers/photoReducer';
import { http } from '../../../utils/config';
import profileStyle from './profilePicture.module.scss';

const { Dragger } = Upload;

type ImageFile = UploadFile<{
  preview?: string;
}>;

const ProfilePicture = () => {
  const dispatch: AppDispatch = useDispatch();
  const [file, setFile] = useState<File[] | undefined>(undefined);
  const [preFile, setPreFile] = useState<Array<ImageFile> | undefined>(
    undefined
  );
  const [isFetchImg, setIsFetchImg] = useState<boolean>(false);
  const [images, setImages] = useState<IPhoto[] | null>();
  const [open, setOpen] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [isPreview, setIsPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [leftImg, setLeftImg] = useState<number | undefined>(file?.length);

  useEffect(() => {
    const getAllPhoto = async () => {
      try {
        const data: IPhoto[] = (await dispatch(getAllPhotos())) as IPhoto[];
        const showFavoriteImageFirst = (images: IPhoto[]): IPhoto[] => {
          const listSortImg = [...images];
          listSortImg?.sort(
            (a, b) => (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0)
          );
          return listSortImg;
        };
        const result = showFavoriteImageFirst(data);
        const leftImg = 10 - result.length;
        setLeftImg(leftImg);
        setImages(result);
      } catch (error) {
        message.open({
          type: 'error',
          content: 'Đã xảy ra lỗi khi đăng tải hình ảnh',
        });
      }
    };
    getAllPhoto();
  }, [dispatch, isFetchImg]);

  const handleUpload = async () => {
    setIsLoading(true);
    const formData = new FormData();
    if (file && file.length > 0) {
      for (let i = 0; i < file.length; i++) {
        formData.append('files', file[i]);
      }
    }

    const data = await dispatch(uploadImageApi(formData));
    setIsLoading(false);
    if (data) {
      setIsFetchImg(!isFetchImg);
      messageApi.open({
        type: 'success',
        content: 'Đăng tải hình ảnh thành công',
      });
      setFile([]);
      setPreFile([]);
      setIsFetchImg(!isFetchImg);
    } else {
      messageApi.open({
        type: 'error',
        content: 'Đăng tải hình ảnh thất bại',
      });
    }
    setOpen(false);
  };

  const props: UploadProps = {
    name: 'file',
    multiple: true,
    disabled: isLoading,
    accept: '.png,.jpg,.jpeg',
    defaultFileList: [],
    listType: 'picture',
    beforeUpload: (file) => {
      const fileSize = file.size / 1024 / 1024;
      if (fileSize > 5) {
        message.error('Hình ảnh chỉ có kích thước tối đa 5MB!');
        // return false;
      }
      const isValid =
        file.type === 'image/png' ||
        file.type === 'image/jpeg' ||
        file.type === 'image/jpg';

      if (!isValid) {
        message.error(`${file.name} phải là định dạng hình ảnh tĩnh`);
        // return false;
      }

      return (isValid && fileSize < 5) || Upload.LIST_IGNORE;
    },
    onChange(info) {
      const { fileList } = info;
      Array.from(fileList).map((file) => {
        file.status = 'done';
      });
      setPreFile(fileList);
      const files = Array.from(fileList)
        .filter((file) => file.originFileObj)
        .map((file) => file.originFileObj as File);
      setFile(files);
    },
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      size: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
  };

  const handleDeleteImage = async (image: IPhoto): Promise<void> => {
    try {
      await http.delete(`photo/${image.id}`);
      messageApi.open({
        type: 'success',
        content: 'Xóa hình ảnh thành công',
      });
      setIsFetchImg(!isFetchImg);
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: 'Xóa hình ảnh thất bại',
      });
    }
  };

  const handleFavoriteImage = async (image: IPhoto): Promise<void> => {
    try {
      await http.put(`photo/set-favorite/${image.id}`);
      messageApi.open({
        type: 'success',
        content: `${
          image.isFavorite
            ? 'Đã hủy ảnh yêu thích'
            : 'Đã đặt ảnh yêu thích thành công'
        }`,
      });
      setIsFetchImg(!isFetchImg);
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: 'Đặt ảnh yêu thích thất bại',
      });
    }
  };

  const [isEdit, setIsEdit] = useState(false);
  const handleToggleEdit = () => setIsEdit(!isEdit);

  const handleMouseEnter = () => {
    if (!isEdit) {
      setIsEdit(true);
    }
  };

  const handleMouseLeave = () => {
    if (isEdit) {
      setIsEdit(false);
    }
  };

  return (
    <div className={profileStyle['profile__picture']}>
      {contextHolder}
      <Modal
        title={
          <div className={profileStyle['edit__modal']}>
            <span className={profileStyle['edit__modal--title']}>
              Chỉnh sửa hình ảnh
            </span>
            <span className={profileStyle['edit__modal--desc']}>
              Điều chỉnh ảnh thích hợp để hiển thị
            </span>
          </div>
        }
        open={isPreview}
        onCancel={() => setIsPreview(false)}
        width={'100vw'}
        footer={false}
      >
        <div className={profileStyle['photo-gallery']}>
          {images?.map((image, index) => (
            <div
              key={index}
              className={profileStyle['photo-gallery__photo']}
              onClick={handleToggleEdit}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {image?.link && (
                <div className={profileStyle['image__preview']}>
                  <Image
                    preview={false}
                    onClick={() => {
                      setIsPreview(true);
                    }}
                    src={image.link}
                    alt=""
                    className={profileStyle['image__preview--item']}
                  />
                </div>
              )}
              {!isEdit && (
                <div className={profileStyle['photo-gallery__actions']}>
                  <DeleteFilled
                    className={profileStyle['actions__delete']}
                    onClick={() => handleDeleteImage(image)}
                  />

                  {!image.isFavorite ? (
                    <HeartOutlined
                      onClick={() => handleFavoriteImage(image)}
                      className={profileStyle['actions__favorite']}
                    />
                  ) : (
                    <HeartFilled
                      onClick={() => handleFavoriteImage(image)}
                      className={profileStyle['actions__favorite']}
                    />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            className={profileStyle['close--btn']}
            type="ghost"
            onClick={() => setIsPreview(false)}
          >
            Đóng
          </Button>
        </div>
      </Modal>
      <Image.PreviewGroup>
        {!images?.length ? (
          <Row gutter={[13, 13]}>
            <Col span={8}>
              <div
                className={profileStyle.picture__add}
                onClick={() => setOpen(true)}
              >
                <div className={profileStyle['overlay']}>
                  <div className="add-file">
                    <label className={profileStyle['add--icon']}>+</label>
                    <div className={profileStyle['add--desc']}>
                      Thêm ảnh mới
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        ) : (
          <>
            <Row gutter={[13, 13]}>
              {images?.slice(0, 1).map((image: IPhoto, index: number) => (
                <Col key={index} span={images.length === 1 ? 24 : 16}>
                  {image.link && (
                    <Image
                      preview={false}
                      onClick={() => setIsPreview(true)}
                      src={image.link}
                      alt=""
                      className={profileStyle['profile__picture--first']}
                    />
                  )}
                </Col>
              ))}

              <Col span={8}>
                <Row gutter={[13, 13]}>
                  {images?.slice(1, 2).map((image: IPhoto, index: number) => (
                    <Col key={index} span={24}>
                      {image.link && (
                        <Image
                          preview={false}
                          onClick={() => setIsPreview(true)}
                          src={image.link}
                          alt="profile-image"
                          className={profileStyle['profile__picture--other']}
                        />
                      )}
                    </Col>
                  ))}
                  {images?.length && images?.length === 2 && (
                    <Col span={24}>
                      <div
                        className={profileStyle.picture__add}
                        onClick={() => setOpen(true)}
                      >
                        <div className={profileStyle['overlay']}>
                          <div className="add-file">
                            <label className={profileStyle['add--icon']}>
                              +
                            </label>
                            <div className={profileStyle['add--desc']}>
                              Thêm ảnh mới
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                  )}
                  {images?.slice(2, 3).map((image: IPhoto, index: number) => (
                    <Col key={index} span={24}>
                      {image.link && (
                        <Image
                          preview={false}
                          onClick={() => setIsPreview(true)}
                          src={image.link}
                          alt="profile-image"
                          className={profileStyle['profile__picture--other']}
                        />
                      )}
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>

            <div style={{ marginTop: '0.625rem' }}></div>

            <Row gutter={[13, 13]}>
              {images?.slice(3, 4).map((image: IPhoto, index: number) => (
                <Col key={index} span={8}>
                  {image.link && (
                    <Image
                      preview={false}
                      onClick={() => setIsPreview(true)}
                      src={image.link}
                      alt=""
                      className={profileStyle['profile__picture--other']}
                    />
                  )}
                </Col>
              ))}

              {images && images.length > 5 && (
                <Col span={8}>
                  <div className={profileStyle['image--container']}>
                    <div className={profileStyle['overlay']}>
                      {images[5].link && (
                        <Image
                          preview={false}
                          onClick={() => setIsPreview(true)}
                          src={images[5].link}
                          className={profileStyle['profile__picture--other']}
                          alt=""
                        />
                      )}
                      <div className={profileStyle['more--icon']}>
                        <span style={{ color: 'white' }}>
                          +{images.length - 5}
                        </span>
                      </div>
                    </div>
                  </div>
                </Col>
              )}
              {images?.slice(6).map((image: IPhoto, index: number) => (
                <div key={index} style={{ display: 'none' }}>
                  {image.link && (
                    <Image
                      preview={false}
                      onClick={() => setIsPreview(true)}
                      src={image.link}
                      alt=""
                      className={profileStyle['profile__picture--other']}
                    />
                  )}
                </div>
              ))}

              {images?.length && images?.length !== 2 && (
                <Col span={8}>
                  <div
                    className={profileStyle.picture__add}
                    onClick={() => setOpen(true)}
                  >
                    <div className={profileStyle['overlay']}>
                      <div className="add-file">
                        <label className={profileStyle['add--icon']}>+</label>
                        <div className={profileStyle['add--desc']}>
                          Thêm ảnh mới
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              )}
            </Row>
          </>
        )}
      </Image.PreviewGroup>
      <Modal
        title={
          <div className={profileStyle['dialog__title']}>
            {`${
              leftImg && leftImg > 0
                ? ` Bạn có thể đăng thêm tối đa ${leftImg} hình ảnh`
                : 'Bạn chỉ có thể đăng tối đa 10 hình ảnh'
            }`}
          </div>
        }
        open={open}
        onCancel={() => {
          setOpen(false);
        }}
        footer={null}
      >
        {isLoading && (
          <Space
            direction="vertical"
            className={profileStyle['profile__picture--loading']}
          >
            <Spin tip="Loading" size="large" style={{ display: 'block' }}>
              <div className="content" />
            </Spin>
          </Space>
        )}

        {leftImg && leftImg > 0 ? (
          <>
            <Dragger
              {...props}
              maxCount={leftImg}
              fileList={preFile}
              className={profileStyle['edit_info']}
            >
              <Button type="ghost" icon={<UploadOutlined />}>
                Thêm ảnh từ thiết bị của bạn
              </Button>
            </Dragger>
            <Button
              type="ghost"
              disabled={
                !isLoading && file?.length && file.length > 0 ? false : true
              }
              onClick={() => handleUpload()}
              className={profileStyle['profile__picture--upload-btn']}
            >
              Thêm ảnh
            </Button>
          </>
        ) : (
          ''
        )}
      </Modal>
    </div>
  );
};

export default ProfilePicture;
