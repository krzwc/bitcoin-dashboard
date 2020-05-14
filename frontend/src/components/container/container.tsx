import React, { forwardRef, RefObject } from 'react';

interface ContainerProps {
    children: React.ReactNode;
    width?: number;
    height?: number;
}

const Container = forwardRef(({ children, width, height }: ContainerProps, ref?: RefObject<HTMLDivElement>) => {
    return (
        <div className="container" style={{ width, height }}>
            <div className="wrapper">
                {children}
                {ref && <div style={{ width, height: '1px' }} ref={ref} />}
            </div>
        </div>
    );
});

export default Container;
