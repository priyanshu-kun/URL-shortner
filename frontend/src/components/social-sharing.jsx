import React from 'react';
import {
  LinkedinIcon,
  FacebookIcon,
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TwitterIcon,
  EmailIcon,
} from 'react-share';
import { FaCopy } from 'react-icons/fa';
import '../styles/content.css';

function SocialSharing(props) {
  const { shortURL } = props.shortURL;
  //   const { handleCopy } = props.handleCopy;
  return (
    <div className="social-handles">
      <button
        onClick={() => {
          props.handleCopy();
        }}
      >
        <FaCopy className="social-icons" />
      </button>
      <LinkedinShareButton url={shortURL}>
        <LinkedinIcon
          size={40}
          borderRadius={10}
          bgStyle={{ fill: '#12181B' }}
        />
      </LinkedinShareButton>
      <TwitterShareButton url={shortURL}>
        <TwitterIcon
          size={40}
          borderRadius={10}
          bgStyle={{ fill: '#12181B' }}
        />
      </TwitterShareButton>

      <EmailShareButton url={shortURL}>
        <EmailIcon size={40} borderRadius={10} bgStyle={{ fill: '#12181B' }} />
      </EmailShareButton>
      <FacebookShareButton url={shortURL}>
        <FacebookIcon
          size={40}
          borderRadius={10}
          bgStyle={{ fill: '#12181B' }}
        />
      </FacebookShareButton>
    </div>
  );
}

export default SocialSharing;
