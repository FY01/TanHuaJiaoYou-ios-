import Toast from 'react-native-root-toast';

let toastObj: {id: string; manager: {}} = {id: '', manager: {}};
const toast = {
  // You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
  show: (text: string): void => {
    toastObj = Toast.show(text, {
      duration: Toast.durations.LONG,
      position: Toast.positions.CENTER,
    });
  },

  hide: (toastObject = toastObj): void => {
    Toast.hide(toastObject);
  },
};

export default toast;
