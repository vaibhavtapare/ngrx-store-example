export class BillTo {
    constructor(
        public AccountID: number,
        public AccountCode: string,
        public FirstName: string,
        public LastName: string,
        public BusinessName: string,
        public Address: string,
        public Country: string,
        public State: string,
        public CityName: string,
        public Zip: string,
        public Phone: string,
        public Fax: string,
        public Email: string
    ) { }
}
