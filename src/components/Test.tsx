import React from 'react';

const requestOptions = {
  method: 'GET',
  redirect: 'follow',
};

const request = new Request(
  '/google-drive/uc?id=10ZKzj_ihTSxDvnk-Yt9QE61vaD-q4d-v',
  // requestOptions
  {
    method: 'GET',
    redirect: 'follow',
  }
);

const handleOnClick = event => {
  event.preventDefault();
  fetch(request)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
};

const Test = () => {
  return <button onClick={handleOnClick}>Test</button>;
};

export default Test;
