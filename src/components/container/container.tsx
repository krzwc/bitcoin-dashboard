import React from 'react';
/*import { withResizeDetector } from 'react-resize-detector';*/

interface ContainerProps {
    children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
    return <div className="container">{children}</div>;
};

export default Container;
