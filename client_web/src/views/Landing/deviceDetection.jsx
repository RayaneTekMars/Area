export function getOS() {
  let platform = window.navigator.userAgentData ? window.navigator.userAgentData.platform : window.navigator.platform;
  let os = '';
  platform = platform.toLowerCase();

  if (platform.indexOf('win') > -1) {
    os = 'Windows';
  } else if (platform.indexOf('mac') > -1) {
    os = 'MacOS';
  } else if (platform.indexOf('linux') > -1) {
    os = 'Linux'; 
  } else if (platform.indexOf('android') > -1) {
    os = 'Android';
  } else if (platform.indexOf('iphone') > -1) {
    os = 'iOS';
  }

  return os;
}

export function getDevice() {
  const userAgent = navigator.userAgent;
  let device = '';

  if (userAgent.indexOf('Mobile') > -1) {
    device = 'Mobile';
  } else {
    device = 'Desktop';
  }

  return device;
}

export function getBrowser() {
  const userAgent = navigator.userAgent;
  let browser = '';

  if (userAgent.indexOf('Chrome') > -1) {
    browser = 'Google Chrome';
  } else if (userAgent.indexOf('Firefox') > -1) {
    browser = 'Mozilla Firefox';
  } else if (userAgent.indexOf('Safari') > -1) {
    browser = 'Apple Safari';
  } else if (userAgent.indexOf('Opera') > -1 || userAgent.indexOf('OPR') > -1) {
    browser = 'Opera';
  } else if (userAgent.indexOf('Edge') > -1) {
    browser = 'Microsoft Edge';
  } else if (userAgent.indexOf('Trident') > -1) {
    browser = 'Microsoft Internet Explorer';
  } else {
    browser = 'unknown';
  }

  return browser;
}
