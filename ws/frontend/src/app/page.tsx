import { useCallback, useMemo, useState } from 'react';

import { ImageSubscriber } from '@/component/ros/subscriber';
import { RosConnection, RosConnectionStatus } from '@/component/ros/ros';
import ROSLIB from 'roslib';
import { Button, Label } from 'flowbite-react';
import { FaSquareTwitter } from 'react-icons/fa6';
import { FaGithubSquare } from 'react-icons/fa';
import { QRCodeSVG } from 'qrcode.react';

enum ImageTopic {
  DEPTH = '/depth/image_raw/compressed',
  DEPTH_TO_RGB = '/depth_to_rgb/image_raw/compressed',
  IR = '/ir/image_raw/compressed',
  RGB = '/rgb/image_raw/compressed',
  RGB_TO_DEPTH = '/rgb_to_depth/image_raw/compressed',
}

const TopicPickAndDisplay = ({ ros }: { ros: ROSLIB.Ros | null }) => {
  const [topic, setTopic] = useState<string>(ImageTopic.RGB);

  /* 
    /depth/image_raw [sensor_msgs/msg/Image]
    /depth_to_rgb/image_raw [sensor_msgs/msg/Image]
    /ir/image_raw [sensor_msgs/msg/Image]
    /rgb/image_raw [sensor_msgs/msg/Image]
    /rgb/image_raw/compressed [sensor_msgs/msg/CompressedImage]
    /rgb_to_depth/image_raw [sensor_msgs/msg/Image]
  */
  console.log(topic);

  return (
    <>
      <Label htmlFor="topic_name" className="text-xl">
        Choose a topic to display
      </Label>
      <select
        id="topic_name"
        value={topic}
        onChange={(e) => setTopic(e.target.value as ImageTopic)}
        className="block m-2 p-2 border border-gray-300 rounded-md"
      >
        {Object.values(ImageTopic).map((topic) => (
          <option key={topic} value={topic}>
            {topic}
          </option>
        ))}
      </select>
      <div className="max-w-xl">
        <ImageSubscriber ros={ros} topic_name={topic} />
      </div>
    </>
  );
};

export function Page() {
  const [ros, setRos] = useState<ROSLIB.Ros | null>(null);
  const [status, setStatus] = useState<RosConnectionStatus>(RosConnectionStatus.CLOSED);
  const [reconnection_flag, setReconnectionFlag] = useState<boolean>(false);
  const ToggleReconnectionFlag = useCallback(
    () => setReconnectionFlag((flag) => !flag),
    [setReconnectionFlag],
  );

  const status_color = useMemo(() => {
    switch (status) {
      case RosConnectionStatus.SUCESSFUL:
        return 'blue-700';
      case RosConnectionStatus.ERROR:
        return 'red-700';
      case RosConnectionStatus.CLOSED:
        return 'gray-700';
    }
  }, [status]);

  return (
    <>
      <RosConnection reconnection_flag={reconnection_flag} setRos={setRos} setStatus={setStatus} />
      <div className="absolute right-6 flex m-3 gap-5">
        <div className="flex p-2 border-2 gap-3 border-blue-300 rounded-lg">
          <FaSquareTwitter size={50} color="#1DA1F2" />
          <QRCodeSVG value="https://twitter.com/fkfk21_18" size={50} />
        </div>
        <div className="flex p-2 border-2 border-gray-300 rounded-lg gap-3">
          <QRCodeSVG value="https://github.com/fkfk21/Enjoy_Azure_Kinect" size={50} />
          <FaGithubSquare size={50} color="#030303" />
          <QRCodeSVG value="https://github.com/fkfk21/Enjoy_Azure_Kinect_Viewer" size={50} />
        </div>
      </div>

      <h1 className="text-5xl font-serif">Enjoy Azure Kinect</h1>
      <p className="m-2 text-lg font-sans">2023年工大祭で展示したものの再展示です</p>
      <hr className="m-3" />
      <p className="text-center text-7xl font-sans">手を叩いて！！！</p>

      <div className="flex justify-center">
        <div className="max-w-2xl m-3 p-3 border-[3px] border-red-300 rounded-md">
          <ImageSubscriber
            ros={ros}
            topic_name="/rgb/image_raw/compressed"
            caption="Azure Kinect Raw Image"
          />
        </div>
        <div className="max-w-2xl m-3 p-3 border-[3px] border-blue-300 rounded-md">
          <ImageSubscriber
            ros={ros}
            topic_name="/rgb/image_raw/compressed"
            caption="Result Image"
          />
        </div>
      </div>

      <hr className="my-5" />

      <hr className="my-5" />

      <h2 className="text-4xl font-serif my-2">Debug Tools</h2>
      <div className="flex flex-wrap">
        <div className="m-2 p-3 border-4 rounded-lg w-auto border-green-200">
          <TopicPickAndDisplay ros={ros} />
        </div>
        <div className="m-2 p-3 border-4 rounded-lg w-auto border-green-200">
          <TopicPickAndDisplay ros={ros} />
        </div>
        <div className={`m-2 p-3 border-4 rounded-lg w-auto h-auto border-${status_color}`}>
          <h4 className="text-4xl font-serif">Status</h4>
          <p className="text-lg font-sans">
            ROS Server Connection:{' '}
            <span id="status" className={`font-bold text-${status_color}`}>
              {status}
            </span>
          </p>
          <Button
            onClick={ToggleReconnectionFlag}
            className="m-2"
            outline
            gradientDuoTone="greenToBlue"
            disabled={status == RosConnectionStatus.SUCESSFUL}
          >
            Try Reconnection
          </Button>
        </div>
      </div>
    </>
  );
}

export default Page;
