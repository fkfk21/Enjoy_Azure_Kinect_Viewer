import React, { useEffect, useRef } from 'react';
import ROSLIB from 'roslib';
import { ImageMessage } from './ros';

export type ImageSubscriberProps = {
  ros: ROSLIB.Ros | null;
  topic_name: string;
  caption?: string;
};

export const ImageSubscriber = React.memo(({ ros, topic_name, caption }: ImageSubscriberProps) => {
  if (!ros) {
    return <></>;
  }

  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const image_sub = new ROSLIB.Topic<ImageMessage>({
      ros: ros,
      name: topic_name,
      messageType: 'sensor_msgs/CompressedImage',
    });

    image_sub.subscribe((message) => {
      if (imgRef.current) {
        imgRef.current.src = `data:image/jpeg;base64,${message.data}`;
      }
    });

    return () => {
      image_sub.unsubscribe();
    };
  }, [ros, topic_name]);

  return (
    <figure>
      <img ref={imgRef} className="h-auto max-w-full rounded-lg mx-auto" />
      {caption && <figcaption className="text-center text-lg">{caption}</figcaption>}
    </figure>
  );
});
