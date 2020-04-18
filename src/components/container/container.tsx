import React, { forwardRef, RefObject } from 'react';

interface ContainerProps {
    children: React.ReactNode;
    width?: number;
    height?: number;
}

const Container = forwardRef(({ children, width, height }: ContainerProps, ref?: RefObject<HTMLDivElement>) => {
    return (
        <div ref={ref} className="container" style={{ width, height }}>
            {children}
        </div>
    );
});

export default Container;
