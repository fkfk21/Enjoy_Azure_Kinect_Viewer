# Enjoy Azure Kinect Viewer

This is viewer for [Enjoy Azure Kinect](https://github.com/fkfk21/Enjoy_Azure_Kinect)

## Frontend
React + Typescript + Vite + TailwindCSS

linter -> ESLint
formatter -> Prettier

[環境構築参考](https://zenn.dev/sikkim/articles/93bf99d8588e68)

### ROS Connection
in frontend container, install client
```
npm i roslib
npm i -D @types/roslib
```

terminal
```
sudo apt install ros-$ROS_DISTRO-rosbridge-suite
ros2 launch rosbridge_server rosbridge_websocket_launch.xml

```

main program
```
ros2 launch azure_kinect_ros_driver driver.launch.py depth_mode:=NFOV_UNBINNED color_resolution:=720P fps:=15
ros2 run target_extractor target_extractor
ros2 launch enjoy_azure_kinect start.launch.py
```




## Backend
Express + Typescript

## Development

frontend
```
./login_frontend.sh
npm i
npm run dev
```

backend
```
./login_backend.sh
npm i
npm run dev
```