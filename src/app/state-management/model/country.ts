import { States } from './state';
export class Country {
    constructor(
        public CountryName: string,         
        public States: States[] 
    ) { }
}
