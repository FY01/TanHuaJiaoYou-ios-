import Toast from 'react-native-root-toast';
import Icon from 'react-native-vector-icons/FontAwesome';

interface ToastType {
  toastObj: {id: string; manager: {}};
  show: Function;
  hide: Function;
}

type PType = 'center' | 'top' | 'bottom';
export default class toast<ToastType> {
  toastObj: {id: string; manager: {}} = {id: '', manager: {}};
  show(text: string, positions: PType = 'center'): void {
    this.toastObj = Toast.show(text, {
      duration: Toast.durations.LONG,
      position:
        positions === 'center'
          ? Toast.positions.CENTER
          : positions === 'top'
          ? Toast.positions.TOP
          : Toast.positions.BOTTOM,
    });
  }
  hide(toastObject = this.toastObj): void {
    Toast.hide(toastObject);
  }
}
