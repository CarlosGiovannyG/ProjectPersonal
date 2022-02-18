import addNotification from 'react-push-notification';
import icon from '../../images/giovanny.jpg'

const notification = (title, subtitle, message) => {

  addNotification({
    title: `${title}`,
    subtitle:`${subtitle}`,
    message:`${message}`,
    theme: 'darkblue',
    native: true, // when using native, your OS will handle theming.
    duration: 4000,
    icon: `${icon}`,
  });
};


export default notification
