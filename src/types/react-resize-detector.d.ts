declare module 'react-resize-detector' {
    import { Component, ReactNode } from 'react';

    export const withResizeDetector = (WrappedComponent: ReactNode, props?: ReactResizeDetectorProps) => Component;

    export default class ResizeDetector extends Component<{
        handleWidth?: boolean;
        handleHeight?: boolean;
        onResize?(width?: number, height?: number): void;
    }> {}
}
