import ACTIONS from './actions';

export interface State {
    result: any;
    loading: boolean;
    error: string;
}

export interface Action {
    type: ACTIONS;
    payload?: {
        result?: number;
        error?: string;
    };
}

export type EnhancedDispatch = (action: any) => void;
