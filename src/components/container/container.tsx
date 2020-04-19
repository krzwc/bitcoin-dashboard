import React, { forwardRef, RefObject } from 'react';

interface ContainerProps {
    children: React.ReactNode;
    width?: number;
    height?: number;
}

const Container = forwardRef(({ children, width, height }: ContainerProps, ref?: RefObject<HTMLDivElement>) => {
    return (
        <div className="container" style={{ width, height }}>
            {children}
            <div style={{ backgroundColor: 'red', width, height: '1px' }} ref={ref} />
        </div>
    );
});

export default Container;
