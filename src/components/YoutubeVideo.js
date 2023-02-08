import React from 'react';

export default function YoutubeVideo(url) {
  return (
    <div data-testid="video">
      <iframe
        width="500"
        height="500"
        src={ `https://www.youtube.com/embed/${url}` }
        frameBorder="0"
        allow="accelerometer;
        autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
}
