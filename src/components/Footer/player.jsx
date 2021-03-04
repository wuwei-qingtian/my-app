import React, { useState, useRef } from "react";
import { Image, Progress, Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../redux/actions";
import {
  HeartOutlined,
  RetweetOutlined,
  StepBackwardOutlined,
  PlayCircleOutlined,
  StepForwardOutlined,
  SendOutlined,
  PauseCircleOutlined,
  SmileOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import "./player.scss";
export default function Player() {
  const [show, setShow] = useState(true);
  const [jdW, setJdw] = useState(0);
  const [endOffsetX, setEndOffsetX] = useState(0);
  const [visible, setVisible] = useState(false);
  const bgRef = useRef();
  const dispatch = useDispatch();
  const changePlayer = (status) => {
    setShow(!status);
  };
  const mouseDown = ($event) => {
    let { target } = $event;
    let startX = $event.nativeEvent.clientX;
    let startOffsetX = $event.nativeEvent.layerX;
    let endx = 0;
    let bgW = bgRef.current.clientWidth; //容器宽度
    document.onmousemove = function (event) {
      event.preventDefault();
      endx = event.clientX;
      let moveX = endx - startX;
      let distancemove = moveX + startOffsetX - 0;
      if (moveX > 0) {
        setEndOffsetX(distancemove > bgW ? bgW : distancemove);
      } else {
        setEndOffsetX(distancemove <= 0 ? 0 : distancemove);
      }
      setEndOffsetX((endOffsetX) => {
        setJdw(endOffsetX);
      });
    };
    document.onmouseup = function (event) {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  };
  const setBar = ($event) => {
    let { layerX } = $event.nativeEvent;
    setJdw(layerX);
    setEndOffsetX(layerX);
  };
  const openDrawer = () => {
    setVisible(!visible);
    visible ? dispatch(actions.open(true)) : dispatch(actions.close(false));
  };
  return (
    <div className="player">
      <audio id="audio"></audio>
      <div className="left">
        <Image
          width={60}
          height={60}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
        <div className="left-text">
          <p>
            玩具(吉他版) <HeartOutlined />
          </p>
          <p>就是南方凯</p>
        </div>
      </div>
      <div className="centre">
        <div className="icon-btn">
          <div className="btn-box">
            <RetweetOutlined />
            <StepBackwardOutlined />
            {show ? (
              <PlayCircleOutlined onClick={() => changePlayer(true)} />
            ) : (
              <PauseCircleOutlined onClick={() => changePlayer(false)} />
            )}
            <StepForwardOutlined />
            <SendOutlined />
          </div>
        </div>
        <div className="progress-bar">
          <span className="start-time">0.00</span>
          <div className="bg-bar" ref={bgRef} onClick={setBar}>
            <div className="jd-bar" style={{ width: jdW + "px" }}></div>
            <SmileOutlined
              className="ball"
              onMouseDown={mouseDown}
              style={{ transform: `translateX(${endOffsetX + "px"})` }}
            />
          </div>
        </div>
      </div>
      <div className="right">
        <div className="f-zone">
          <UnorderedListOutlined className="drawer" onClick={openDrawer} />
        </div>
      </div>
    </div>
  );
}