// credit: https://www.smashingmagazine.com/2020/03/infinite-scroll-lazy-image-loading-react/

import { useCallback, useEffect, RefObject, Dispatch, SetStateAction } from 'react';
import { isNull } from 'lodash-es';

const useInfiniteScroll = (
    scrollRef: RefObject<HTMLDivElement>,
    setState: Dispatch<SetStateAction<string>>,
    state: string,
) => {
    const scrollObserver = useCallback(
        (node) => {
            const intObs = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.intersectionRatio > 0) {
                        if (!isNull(state)) {
                            setState(state);
                            intObs.unobserve(node);
                        }
                    }
                });
            });
            intObs.observe(node);
        },
        [setState, state],
    );
    useEffect(() => {
        if (scrollRef.current) {
            scrollObserver(scrollRef.current);
        }
    }, [scrollObserver, scrollRef]);
};

export default useInfiniteScroll;
