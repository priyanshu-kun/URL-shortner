import React, { useState, useEffect, useRef } from 'react';
import { FaMagic, FaPaperPlane } from 'react-icons/fa';
import axios from 'axios';
import '../styles/content.css';
import SocialSharing from './social-sharing';

function Content() {
  const [value, setValue] = useState('');
  const [shortURL, setShortURL] = useState('');
  const [preloader, setPreloader] = useState(false);
  const [longURL, setLongURL] = useState('');
  const copyEle = useRef(null);

  const handleCopy = () => {
    copyEle.current.firstElementChild.style.background = '#28C98B';
    copyEle.current.firstElementChild.style.color = '#fff';
    navigator.clipboard.writeText(copyEle.current.innerText);
  };

  const handleReset = () => {
    setValue('');
    setShortURL('');
    setLongURL('');
    setPreloader(false);
  };

  const handleUrlSubmit = async () => {
    try {
      if (value !== '') {
        console.log(value);
        setPreloader(true);
        const res = await axios.post(
          'https://mern-urlshortner-app.herokuapp.com/setUrl',
          {
            longUrl: value,
          }
        );
        setTimeout(() => {
          setShortURL(res.data.domain);
          setLongURL(res.data.newlongUrl);
        }, 1000);
      } else {
        alert('Please! Enter a URL...');
      }
    } catch (e) {
      if (e.response) {
        if (e.response.status === 401) {
          alert('It is not a valid URL');
        } else if (e.response.status === 500) {
          alert('Internal Server Error');
        }
      }
      handleReset();
    }
  };

  useEffect(() => {
    setPreloader(false);
  }, [shortURL, setShortURL]);

  return (
    <div className="content-file">
      <div>
        <h1 className="sub-heading">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-link-2"
          >
            <path d="M15 7h3a5 5 0 0 1 5 5 5 5 0 0 1-5 5h-3m-6 0H6a5 5 0 0 1-5-5 5 5 0 0 1 5-5h3"></path>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
          {shortURL ? 'Take Your URL' : 'Enter a long URL to make Short'}
        </h1>
        {shortURL ? (
          <div
            className="url"
            style={{
              minHeight: '1.3rem',
              color: '#28C98B',
              boxShadow: '1px 1px 5px rgba(0,0,0,0.06)',
              wordWrap: 'break-word',
            }}
          >
            {longURL}
          </div>
        ) : (
          <input
            type="url"
            name="url"
            className="url"
            placeholder="URL..."
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        )}
      </div>
      <div style={{ display: shortURL ? 'block' : 'none' }}>
        <h1 className="sub-heading">
          <FaMagic className="magicstick" />
          Short URL
        </h1>
        <div
          ref={copyEle}
          className="url"
          id="copy"
          style={{
            minHeight: '1.3rem',
            color: '#28C98B',
            boxShadow: '1px 1px 5px rgba(0,0,0,0.06)',
          }}
        >
          {shortURL !== '' ? <span>{shortURL}</span> : ''}
        </div>
        <h1 className="share-it">
          <FaPaperPlane className="share-icon" />
          Share it
        </h1>
        <SocialSharing handleCopy={handleCopy} shortURL={shortURL} />
      </div>
      {shortURL === '' ? (
        <button className="submit-btn" onClick={handleUrlSubmit}>
          <svg
            fill="#ffffff"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            width="30px"
            height="30px"
            className={preloader && 'preloader'}
          >
            <path d="M 25.5 1 C 21.84127 1 18.652521 3.076865 17.068359 6.1210938 A 1.0001 1.0001 0 1 0 18.841797 7.0429688 C 20.091635 4.6411974 22.59673 3 25.5 3 C 29.653452 3 33 6.3465482 33 10.5 A 1.0001 1.0001 0 0 0 33.001953 10.558594 C 33.00202 10.559832 33.001882 10.561264 33.001953 10.5625 C 33.115953 12.6245 32.574313 14.690938 30.945312 15.960938 C 28.042313 18.223937 25.072359 18.414219 22.693359 17.449219 C 23.766359 18.342219 24.829141 19.040594 25.619141 19.558594 C 25.997141 19.806594 26.316641 20.016406 26.556641 20.191406 C 27.002641 20.517406 27.100391 21.141891 26.775391 21.587891 C 26.579391 21.855891 26.275797 21.998047 25.966797 21.998047 C 25.762797 21.998047 25.554953 21.935641 25.376953 21.806641 C 25.158953 21.647641 24.867437 21.456469 24.523438 21.230469 C 21.963438 19.551469 16.873906 16.204516 16.253906 10.353516 C 16.184906 9.7135156 15.470547 9.3372188 14.935547 9.6992188 C 12.418547 11.397219 11 13.985 11 17 C 11 18.459 11.461344 19.678516 12.152344 20.728516 C 12.902344 21.744516 13.806547 22.66125 14.810547 23.53125 C 15.080547 23.75525 15.350234 23.970688 15.615234 24.179688 C 15.613234 24.183688 15.611375 24.189359 15.609375 24.193359 C 16.768375 25.128359 18.026359 26.021594 19.318359 26.933594 C 21.517359 28.485594 23.791844 30.090828 25.714844 32.048828 C 26.101844 32.442828 26.094219 33.074891 25.699219 33.462891 C 25.505219 33.652891 25.253 33.748047 25 33.748047 C 24.741 33.748047 24.481156 33.649219 24.285156 33.449219 C 22.489156 31.621219 20.290062 30.067406 18.164062 28.566406 C 17.068062 27.793406 15.962391 27.007688 14.900391 26.179688 C 14.742391 27.003688 14.705359 27.899359 14.818359 28.818359 C 15.000359 30.299359 15.542281 31.686344 16.363281 32.902344 C 18.058281 34.823344 19.699359 35.579359 21.068359 36.193359 C 21.489359 36.381359 21.876656 36.557187 22.222656 36.742188 C 22.708656 37.003188 22.891859 37.608703 22.630859 38.095703 C 22.449859 38.431703 22.105047 38.623047 21.748047 38.623047 C 21.589047 38.623047 21.426391 38.585859 21.275391 38.505859 C 20.967391 38.340859 20.623047 38.185578 20.248047 38.017578 C 19.860047 37.843578 19.440047 37.653641 18.998047 37.431641 L 18.998047 48 C 18.998047 48.552 19.446047 49 19.998047 49 L 30.998047 49 C 31.550047 49 31.998047 48.552 31.998047 48 L 31.998047 36.634766 C 31.962047 35.061766 31.469125 33.559547 30.453125 32.060547 C 30.143125 31.603547 30.263703 30.981875 30.720703 30.671875 C 31.179703 30.361875 31.799375 30.483453 32.109375 30.939453 C 32.828375 32.000453 33.338344 33.097844 33.652344 34.214844 C 35.003344 32.879844 35.62725 31.488422 35.90625 30.357422 C 36.19625 28.379422 35.979641 26.902109 35.556641 25.787109 C 35.492641 25.634109 35.437281 25.475125 35.363281 25.328125 C 34.820281 24.167125 34.071312 23.448656 33.570312 22.972656 C 33.467312 22.874656 33.374922 22.786078 33.294922 22.705078 C 32.903922 22.314078 32.903922 21.683969 33.294922 21.292969 C 33.685922 20.901969 34.316031 20.901969 34.707031 21.292969 L 34.947266 21.521484 C 35.434266 21.983484 36.174547 22.692625 36.810547 23.765625 C 38.439547 22.020625 40 19.659 40 17 C 40 13.537218 38.128305 10.642759 34.871094 9.0058594 C 34.149499 4.4795905 30.224834 1 25.5 1 z M 6.7207031 3.2226562 A 1.0001 1.0001 0 0 0 6.0253906 4.9394531 L 9.5605469 8.4746094 A 1.0001 1.0001 0 1 0 10.974609 7.0605469 L 7.4394531 3.5253906 A 1.0001 1.0001 0 0 0 6.7207031 3.2226562 z M 43.248047 3.2226562 A 1.0001 1.0001 0 0 0 42.560547 3.5253906 L 39.025391 7.0605469 A 1.0001 1.0001 0 1 0 40.439453 8.4746094 L 43.974609 4.9394531 A 1.0001 1.0001 0 0 0 43.248047 3.2226562 z M 25.5 5 C 22.474423 5 20 7.4744232 20 10.5 A 1.0001 1.0001 0 1 0 22 10.5 C 22 8.5555768 23.555577 7 25.5 7 A 1.0001 1.0001 0 1 0 25.5 5 z M 1 16 A 1.0001 1.0001 0 1 0 1 18 L 6 18 A 1.0001 1.0001 0 1 0 6 16 L 1 16 z M 44 16 A 1.0001 1.0001 0 1 0 44 18 L 49 18 A 1.0001 1.0001 0 1 0 49 16 L 44 16 z M 10.248047 25.222656 A 1.0001 1.0001 0 0 0 9.5605469 25.525391 L 6.0253906 29.060547 A 1.0001 1.0001 0 1 0 7.4394531 30.474609 L 10.974609 26.939453 A 1.0001 1.0001 0 0 0 10.248047 25.222656 z M 39.720703 25.222656 A 1.0001 1.0001 0 0 0 39.025391 26.939453 L 42.560547 30.474609 A 1.0001 1.0001 0 1 0 43.974609 29.060547 L 40.439453 25.525391 A 1.0001 1.0001 0 0 0 39.720703 25.222656 z" />
          </svg>
          {!preloader ? 'Abra ka Dabra' : null}
        </button>
      ) : (
        <button className="submit-btn" onClick={handleReset}>
          Short New URL
        </button>
      )}
    </div>
  );
}

export default Content;
