export class WorkingBatchSamples {
    constructor(
        public Status: number,
        public LIMSStatus: string,
        public Code: string,
        public FarmName: string,
        public SampleDescription: string,
        public CompletedDate: string,
        public NIRClassID: string,
        public ChemClassID: string
    ) { }
}