import { PackageAnalysis } from './../model/packageAnalysis';
import { FeedType } from './../model/feedtypes';
import { UserFarms } from './../model/userfarm';
import { Country } from './../model/country';
import { BillTo } from './../model/billto';
import { Sample } from './../model/sample';
import { WorkingBatchSamples } from './../model/workingBatchSamples';

import { Batches } from './../model/workingbatches';
export interface State {
    counter: number;
    displayText: string;
    batches: Batches[];
    samples: WorkingBatchSamples[];
    sample: Sample;
    affiliate: string;
    loading: boolean;
    billto: BillTo[];
    countries: Country[];
    currentBillTo: BillTo;
    selectedTabIndex: number;
    defaultSelectedIndex: number;
    userFarm: UserFarms[];
    feedTypes: FeedType[];
    nirPackages: PackageAnalysis[];
    chemPackages: PackageAnalysis[];
    optionsAnalysis: PackageAnalysis[];
    componentAnalysis: PackageAnalysis[];
    insituAnalysis: PackageAnalysis[];
    invitroAnalysis: PackageAnalysis[];
    starchAnalysis: PackageAnalysis[];
    proximateAnalysis: PackageAnalysis[];
    aminoAnalysis: PackageAnalysis[];
    mycoToxineAnalysis: PackageAnalysis[];
    waterAnalysis: PackageAnalysis[];
    manureAnalysis: PackageAnalysis[];
    plantTissuAnalysis: PackageAnalysis[];
}

export const initialState: State = {
    counter: 0,
    displayText: 'loading...',
    batches: [],
    samples: [],
    sample: null,
    affiliate: '',
    loading: false,
    billto: [],
    countries: [],
    currentBillTo: null,
    selectedTabIndex: 0,
    defaultSelectedIndex: 0,
    userFarm: [],
    feedTypes: [],
    nirPackages: [],
    chemPackages: [],
    optionsAnalysis: [],
    componentAnalysis: [],
    insituAnalysis: [],
    invitroAnalysis: [],
    starchAnalysis: [],
    proximateAnalysis: [],
    aminoAnalysis: [],
    mycoToxineAnalysis: [],
    waterAnalysis: [],
    manureAnalysis: [],
    plantTissuAnalysis: []
}; 