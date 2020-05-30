import React from 'react';
import downArrowSvg from 'assets/svg/down-arrow.svg';

interface DownArrowProps {
    className: string;
}

const DownArrow = ({ className }: DownArrowProps) => {
    return (
        <div className={['down-arrow', className].join(' ')}>
            <span dangerouslySetInnerHTML={{ __html: downArrowSvg }} />
        </div>
    );
};

export default DownArrow;
