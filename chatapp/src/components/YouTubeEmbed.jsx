// YouTubeEmbed.jsx
import React from 'react';

function YouTubeEmbed({ videoId }) {
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;
  return (
    <div className="youtube-embed">
      <iframe
        src={embedUrl}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default YouTubeEmbed;
