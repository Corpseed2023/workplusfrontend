import React from 'react';
import {
  UndoOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons';
import { Image, Space } from 'antd';

const FullScreenImageViewer = ({src}) => {
  return (
    <Image
      width={335}
      src={src}
      preview={{
        toolbarRender: (
          _,
          {
            transform: { scale },
            actions: {
              onFlipY,
              onFlipX,
              onRotateLeft,
              onRotateRight,
              onZoomOut,
              onZoomIn,
              onReset,
            },
          },
        ) => (
          <Space  className="toolbar-wrapper">
            <SwapOutlined height={50} width={50} rotate={90} onClick={onFlipY} />
            <SwapOutlined height={30} width={30} onClick={onFlipX} />
            <RotateLeftOutlined height={30} width={30} onClick={onRotateLeft} />
            <RotateRightOutlined height={30} width={30} onClick={onRotateRight} />
            <ZoomOutOutlined height={30} width={30} disabled={scale === 1} onClick={onZoomOut} />
            <ZoomInOutlined height={30} width={30} disabled={scale === 50} onClick={onZoomIn} />
            <UndoOutlined height={30} width={30} onClick={onReset} />
          </Space>
        ),
      }}
    />
  );
};
export default FullScreenImageViewer;
