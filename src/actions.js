import {RNS_SHOW_NOTIFICATION, RNS_HIDE_NOTIFICATION} from './const';

//Example opts
// {
//   title: 'Hey, it\'s good to see you!',
//   message: 'Now you can see how easy it is to use notifications in React!',
//   position: 'tr',
//   autoDismiss: 0,
//   action: {
//     label: 'Awesome!',
//     callback: function() {
//       console.log('Clicked');
//     }
//   }
// }

export function show(opts, level = 'success') {
  return {
    type: RNS_SHOW_NOTIFICATION,
    ...opts,
    level
  };
}

export function success(opts) {
  return show(opts, 'success');
}

export function error(opts) {
  return show(opts, 'error');
}

export function warning(opts) {
  return show(opts, 'warning');
}

export function info(opts) {
  return show(opts, 'info');
}

export function hide(uid) {
  return {
    type: RNS_HIDE_NOTIFICATION,
    uid
  };
}
