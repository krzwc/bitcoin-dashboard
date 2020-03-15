import ACTIONS from './actions';

export interface State {
    result: number;
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
