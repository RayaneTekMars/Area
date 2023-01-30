import React from 'react';

const SigninText = () => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: `<svg width="117" height="36" viewBox="0 0 117 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.2834 9.34801C15.1811 8.31676 14.7422 7.51562 13.9666 6.9446C13.1911 6.37358 12.1385 6.08807 10.8089 6.08807C9.90554 6.08807 9.14276 6.21591 8.5206 6.47159C7.89844 6.71875 7.42117 7.06392 7.08878 7.5071C6.76492 7.95028 6.60298 8.45312 6.60298 9.01562C6.58594 9.48438 6.68395 9.89347 6.89702 10.2429C7.11861 10.5923 7.42116 10.8949 7.80469 11.1506C8.18821 11.3977 8.63139 11.6151 9.13423 11.8026C9.63707 11.9815 10.174 12.1349 10.745 12.2628L13.0973 12.8253C14.2393 13.081 15.2876 13.4219 16.2422 13.848C17.1967 14.2741 18.0234 14.7983 18.7223 15.4205C19.4212 16.0426 19.9624 16.7756 20.3459 17.6193C20.7379 18.4631 20.9382 19.4304 20.9467 20.5213C20.9382 22.1236 20.5291 23.5128 19.7195 24.6889C18.9183 25.8565 17.7592 26.7642 16.2422 27.4119C14.7337 28.0511 12.9141 28.3707 10.7834 28.3707C8.66974 28.3707 6.82884 28.0469 5.26065 27.3991C3.70099 26.7514 2.48224 25.7926 1.6044 24.5227C0.735085 23.2443 0.279119 21.6634 0.236506 19.7798H5.59304C5.6527 20.6577 5.90412 21.3906 6.3473 21.9787C6.79901 22.5582 7.39986 22.9972 8.14986 23.2955C8.90838 23.5852 9.76491 23.7301 10.7195 23.7301C11.657 23.7301 12.4709 23.5937 13.1612 23.321C13.8601 23.0483 14.4013 22.669 14.7848 22.1832C15.1683 21.6974 15.3601 21.1392 15.3601 20.5085C15.3601 19.9205 15.1854 19.4261 14.8359 19.0256C14.495 18.625 13.9922 18.2841 13.3274 18.0028C12.6712 17.7216 11.8658 17.4659 10.9112 17.2358L8.06037 16.5199C5.85298 15.983 4.11009 15.1435 2.83168 14.0014C1.55327 12.8594 0.918324 11.321 0.926847 9.38636C0.918324 7.80114 1.3402 6.41619 2.19247 5.23153C3.05327 4.04688 4.23366 3.12216 5.73366 2.45739C7.23366 1.79261 8.93821 1.46023 10.8473 1.46023C12.7905 1.46023 14.4865 1.79261 15.9354 2.45739C17.3928 3.12216 18.5263 4.04688 19.3359 5.23153C20.1456 6.41619 20.5632 7.78835 20.5888 9.34801H15.2834ZM24.5678 28V8.36364H30.0138V28H24.5678ZM27.3036 5.83239C26.494 5.83239 25.7994 5.56392 25.2198 5.02699C24.6488 4.48153 24.3633 3.82954 24.3633 3.07102C24.3633 2.32102 24.6488 1.67756 25.2198 1.14062C25.7994 0.59517 26.494 0.322442 27.3036 0.322442C28.1133 0.322442 28.8036 0.59517 29.3746 1.14062C29.9542 1.67756 30.244 2.32102 30.244 3.07102C30.244 3.82954 29.9542 4.48153 29.3746 5.02699C28.8036 5.56392 28.1133 5.83239 27.3036 5.83239ZM43.223 35.7727C41.4588 35.7727 39.946 35.5298 38.6847 35.044C37.4318 34.5668 36.4347 33.9148 35.6932 33.0881C34.9517 32.2614 34.4702 31.3324 34.2486 30.3011L39.2855 29.6236C39.4389 30.0156 39.6818 30.3821 40.0142 30.723C40.3466 31.0639 40.7855 31.3366 41.331 31.5412C41.8849 31.7543 42.5582 31.8608 43.3509 31.8608C44.5355 31.8608 45.5114 31.571 46.2784 30.9915C47.054 30.4205 47.4418 29.4616 47.4418 28.1151V24.5227H47.2116C46.973 25.0682 46.6151 25.5838 46.1378 26.0696C45.6605 26.5554 45.0469 26.9517 44.2969 27.2585C43.5469 27.5653 42.652 27.7188 41.6122 27.7188C40.1378 27.7188 38.7955 27.3778 37.5852 26.696C36.3835 26.0057 35.4247 24.9531 34.7088 23.5384C34.0014 22.1151 33.6477 20.3168 33.6477 18.1435C33.6477 15.919 34.0099 14.0611 34.7344 12.5696C35.4588 11.0781 36.4219 9.96165 37.6236 9.22017C38.8338 8.47869 40.1591 8.10795 41.5994 8.10795C42.6989 8.10795 43.6193 8.29545 44.3608 8.67045C45.1023 9.03693 45.6989 9.49716 46.1506 10.0511C46.6108 10.5966 46.9645 11.1335 47.2116 11.6619H47.4162V8.36364H52.8239V28.1918C52.8239 29.8622 52.4148 31.2599 51.5966 32.3849C50.7784 33.5099 49.6449 34.3537 48.196 34.9162C46.7557 35.4872 45.098 35.7727 43.223 35.7727ZM43.3381 23.6278C44.2159 23.6278 44.9574 23.4105 45.5625 22.9759C46.1761 22.5327 46.6449 21.902 46.9688 21.0838C47.3011 20.2571 47.4673 19.2685 47.4673 18.1179C47.4673 16.9673 47.3054 15.9702 46.9815 15.1264C46.6577 14.2741 46.1889 13.6136 45.5753 13.1449C44.9616 12.6761 44.2159 12.4418 43.3381 12.4418C42.4432 12.4418 41.6889 12.6847 41.0753 13.1705C40.4616 13.6477 39.9972 14.3125 39.6818 15.1648C39.3665 16.017 39.2088 17.0014 39.2088 18.1179C39.2088 19.2514 39.3665 20.2315 39.6818 21.0582C40.0057 21.8764 40.4702 22.5114 41.0753 22.9631C41.6889 23.4062 42.4432 23.6278 43.3381 23.6278ZM62.6037 16.6477V28H57.1577V8.36364H62.348V11.8281H62.5781C63.0128 10.6861 63.7415 9.78267 64.7642 9.1179C65.7869 8.4446 67.027 8.10795 68.4844 8.10795C69.848 8.10795 71.0369 8.40625 72.0511 9.00284C73.0653 9.59943 73.8537 10.4517 74.4162 11.5597C74.9787 12.6591 75.2599 13.9716 75.2599 15.4972V28H69.8139V16.4688C69.8224 15.267 69.5156 14.3295 68.8935 13.6562C68.2713 12.9744 67.4148 12.6335 66.3239 12.6335C65.5909 12.6335 64.9432 12.7912 64.3807 13.1065C63.8267 13.4219 63.392 13.8821 63.0767 14.4872C62.7699 15.0838 62.6122 15.804 62.6037 16.6477ZM93.522 1.81818V28H87.9865V1.81818H93.522ZM103.42 16.6477V28H97.9741V8.36364H103.164V11.8281H103.395C103.829 10.6861 104.558 9.78267 105.581 9.1179C106.603 8.4446 107.843 8.10795 109.301 8.10795C110.664 8.10795 111.853 8.40625 112.868 9.00284C113.882 9.59943 114.67 10.4517 115.233 11.5597C115.795 12.6591 116.076 13.9716 116.076 15.4972V28H110.63V16.4688C110.639 15.267 110.332 14.3295 109.71 13.6562C109.088 12.9744 108.231 12.6335 107.14 12.6335C106.407 12.6335 105.76 12.7912 105.197 13.1065C104.643 13.4219 104.208 13.8821 103.893 14.4872C103.586 15.0838 103.429 15.804 103.42 16.6477Z" fill="#222222"/>
      </svg>
      ` }}
    />
    );
};

export default SigninText;