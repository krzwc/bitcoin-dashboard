// credit: https://www.smashingmagazine.com/2020/03/infinite-scroll-lazy-image-loading-react/

import { useCallback, useEffect, RefObject, Dispatch, SetStateAction } from 'react';
import { State } from '../../containers/bitcoin-news-feed/bitcoin-news-feed';
import { Map } from 'immutable';

type SetState = Dispatch<SetStateAction<Map<string, State[keyof State]>>>;

const useInfiniteScroll = (
    scrollRef: RefObject<HTMLDivElement>,
    setState: SetState,
    state: Map<string, State[keyof State]>,
) => {
    const scrollObserver = useCallback(
        (node) => {
            new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.intersectionRatio > 0) {
                        // setState(state);
                        // console.log(entry.intersectionRatio);
                    }
                });
            }).observe(node);
        },
        [state],
    );
    useEffect(() => {
        if (scrollRef.current) {
            scrollObserver(scrollRef.current);
        }
    }, [scrollObserver, scrollRef]);
};

export default useInfiniteScroll;
