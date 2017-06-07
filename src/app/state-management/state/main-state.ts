import { Batches } from './../model/workingbatches';
export interface State{
    counter: number; 
    displayText: string; 
    batches: Batches[]; 
}

export const initialState: State = {
    counter: 10, 
    displayText: 'loading...', 
    batches:[]
}; 