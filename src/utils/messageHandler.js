import { notification } from 'antd';

export const showMessage = (type, title, description) => {
  let messageDuration = type === 'error' ? 5 : 2;
  notification[type]({
    message: title,
    description: description,
    duration: messageDuration,
    placement: 'topRight',
  });
};
