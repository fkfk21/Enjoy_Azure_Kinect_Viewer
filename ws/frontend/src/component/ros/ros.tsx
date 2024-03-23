import { useEffect } from 'react';
import ROSLIB from 'roslib';

export type StringMessage = {
  data: string;
};
export type ImageMessage = {
  data: Uint8Array;
};

export enum RosConnectionStatus {
  SUCESSFUL = 'Successful',
  ERROR = 'Error',
  CLOSED = 'Closed',
}

export const RosConnection = ({
  reconnection_flag,
  setRos,
  setStatus,
}: {
  reconnection_flag: boolean;
  setRos: (ros: ROSLIB.Ros) => void;
  setStatus: (status: RosConnectionStatus) => void;
}) => {
  useEffect(() => {
    const rosInstance = new ROSLIB.Ros({
      url: 'ws://localhost:9090',
    });
    rosInstance.on('connection', () => {
      setStatus(RosConnectionStatus.SUCESSFUL);
      setRos(rosInstance);
      console.log('Connected to rosbridge server');
    });
    rosInstance.on('error', () => {
      setStatus(RosConnectionStatus.ERROR);
      console.log('Error connecting to rosbridge server');
    });
    rosInstance.on('close', () => {
      setStatus(RosConnectionStatus.CLOSED);
      console.log('Connection to rosbridge server closed');
    });

    const str_data = new ROSLIB.Topic<StringMessage>({
      ros: rosInstance,
      name: '/chatter',
      messageType: 'std_msgs/String',
    });

    str_data.subscribe((message) => {
      console.log(message.data);
    });
    return () => {
      rosInstance.close();
    };
  }, [reconnection_flag]);

  return <></>;
};
