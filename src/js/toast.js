import { notification } from 'antd';

export const openNotification = (title, text) => {
  notification.open({
    message: title,
    description: text,
  });
};
