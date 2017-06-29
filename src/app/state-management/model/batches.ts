export class Batches {
    constructor(
        public Batch: Number, 
        public  Code: Number, 
        public BatchDate: String,
        public TotalSamples:  Number,
        public NIRTotal:  Number,
        public NIROpen:  Number,
        public NIRTurnAround:  Number,
        public ChemTotal:  Number,
        public ChemOpen:  Number,
        public ChemTurnAround:  Number
    ){}
}
