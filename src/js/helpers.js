import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config.js';

const timeout = function (second) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(
        new Error(`Request took too long! Timeout after ${second} second`)
      );
    }, second * 1000);
  });
};

export const AJAX = async function (url, uploadData = false) {
  try {
    const fetchpro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const response = await Promise.race([fetchpro, timeout(TIMEOUT_SEC)]);

    if (!response.ok) throw new Error(`${data.message}, ${response.status}`);
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
