import { Country } from './../model/country';
import { BillTo } from './../model/billto';
import { Sample } from './../model/sample';
import { WorkingBatchSamples } from './../model/workingBatchSamples';

import { Batches } from './../model/workingbatches';
export interface State{
    counter: number; 
    displayText: string; 
    batches: Batches[];
    samples: WorkingBatchSamples[];  
    sample: Sample; 
    affiliate:string; 
    loading:boolean;
    billto:BillTo[];
    countries:Country[];
    currentBillTo:BillTo; 
    selectedTabIndex: number; 
}

export const initialState: State = {
    counter: 10, 
    displayText: 'loading...', 
    batches:[], 
    samples:[], 
    sample:null,
    affiliate:'', 
    loading:false,
    billto: [], 
    countries:[],
    currentBillTo:null, 
    selectedTabIndex:0
}; 