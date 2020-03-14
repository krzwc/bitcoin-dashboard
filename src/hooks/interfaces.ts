import ACTIONS from './actions';

export interface State {
    result: string;
    loading: boolean;
    error: string;
}

export interface Action {
    type: ACTIONS;
    payload?: {
        result?: string;
        error?: string;
    };
}

export type EnhancedDispatch = (action: any) => void;
