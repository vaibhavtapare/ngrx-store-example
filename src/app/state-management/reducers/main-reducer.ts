import { BillTo } from './../model/billto';
import { Country } from './../model/country';
import { Sample } from './../model/sample';
import { WorkingBatchSamples } from './../model/workingBatchSamples';
import { ServiceResponce } from './../model/service-responce';
import { Batches } from './../model/workingbatches';
import { INCREMENT, EVENT_FROM_EFFECT } from './../actions/main-action-creator';
import { State, initialState } from './../state/main-state';
import { ActionReducer, Action } from '@ngrx/store';
import * as deepFreeze from 'deep-freeze-strict';
import { deserialize, serialize } from 'json-typescript-mapper';
import update from 'react-addons-update';

export const mainStoreReducer: ActionReducer<State> =
    (state = initialState, action: Action) => {

        // deepFreeze(state);

        //console.log('Action came in! ' + action.type);
        //////////debugger;;
        switch (action.type) {
            case INCREMENT: {
                //console.log('the payload string is: ' + action.payload.innerObj.text);
                return {
                    counter: state.counter + 1
                }
            }
            case EVENT_FROM_EFFECT: {
                //console.log('we cheesin in the reducer over here!');
                return {
                    counter: 4
                }
            }
            case "PAYLOAD_EFFECT_RESPONDS": {
                //console.log("got array payload from effect: " + action.payload.pulledArray);
            }


            case "GOT_FIREBASE_ARRAY": {
                ////////debugger;;
                //console.log("got array payload from effect: " + action.payload.pulledArray);
                if (action.payload.pulledArray != undefined) {
                    ////////debugger;;
                    let payloadArray = <Batches[]>action.payload.pulledArray;
                    //console.log("got payload from effect: " + payloadArray);
                    //console.log("first element is: " + payloadArray[0]['Batch']);
                    return {
                        displayText: payloadArray['Batch'],
                        counter: state.counter + 100,
                        batches: payloadArray,
                        defaultSelectedIndex:0
                    };
                }
                return Object.assign(state);
            }

            case "GOT_FIREBASE_OBJECT": {
                ////////debugger;;
                if (action.payload.pulledObject != undefined) {
                    let payloadObject = <Batches[]>action.payload.pulledObject;
                    //console.log("got object payload from effect: " + payloadObject);
                    // //console.log("first element is: " + payloadObject);


                    return {
                        displayText: payloadObject['Batch'],
                        counter: state.counter + 100,
                        batches: [...state.batches, payloadObject],
                        defaultSelectedIndex:0

                    };
                }
                else {
                    return state;
                }
            }

            case "GOT_WORKING_BATCHES": {
                if (action.payload.workingBatchObject != undefined) {
                    let serviceResponce: ServiceResponce;
                    let payloadObject = <Batches[]>action.payload.workingBatchObject;
                    //console.log("got object payload from effect: " + payloadObject);
                    // //console.log("first element is: " + payloadObject);
                    ////////debugger;; 
                    this.getData = JSON.stringify(payloadObject || null)
                    this.serviceResponce = <ServiceResponce>JSON.parse(this.getData);
                    this.samplesData = this.serviceResponce.Data.toString();
                    this.jsonArray = JSON.parse(this.samplesData);


                    return {
                        displayText: payloadObject['Batch'],
                        counter: state.counter + 100,
                        batches: this.jsonArray,
                        affiliate: 'HAG',
                        currentBillTo: state.currentBillTo,
                        loading: false,
                        defaultSelectedIndex:0
                    };
                }
                else {
                    return state;
                }
            }


            case "GOT_SAMPLES_OF_BATCH": {
                if (action.payload.workingBatchObject != undefined) {
                    let serviceResponce: ServiceResponce;
                    let payloadObject = <WorkingBatchSamples[]>action.payload.workingBatchObject;
                    //console.log("got object payload from effect: " + payloadObject);
                    // //console.log("first element is: " + payloadObject);
                    ////////debugger;; 
                    this.getData = JSON.stringify(payloadObject || null)
                    this.serviceResponce = <ServiceResponce>JSON.parse(this.getData);
                    this.samplesData = this.serviceResponce.Data.toString();
                    this.jsonArray = JSON.parse(this.samplesData);

                    return {
                        displayText: payloadObject['Batch'],
                        counter: state.counter + 100,
                        samples: this.jsonArray,
                        batches: state.batches,
                        affiliate: 'HAG',
                        currentBillTo: state.currentBillTo,
                        selectedTabIndex: state.selectedTabIndex,
                        loading: false,
                        defaultSelectedIndex:0
                    };
                }
                else {
                    return state;
                }
            }


            case "GOT_SAMPLE_DETAILS": {
                //////debugger;; 
                if (action.payload.sampleDetailsObject != undefined) {
                    let serviceResponce: ServiceResponce;
                    let payloadObject = <Sample[]>action.payload.sampleDetailsObject;
                    //console.log("got object payload from effect: " + payloadObject);
                    // //console.log("first element is: " + payloadObject);
                    ////debugger;;
                    this.getData = JSON.stringify(payloadObject || null)
                    this.serviceResponce = <ServiceResponce>JSON.parse(this.getData);
                    this.samplesData = this.serviceResponce.Data;
                    this.jsonArray = <Sample>JSON.parse(this.samplesData);

                    return {
                        displayText: payloadObject['Batch'],
                        counter: state.counter + 100,
                        samples: state.samples,
                        batches: state.batches,
                        affiliate: 'HAG',
                        sample: this.jsonArray,
                        currentBillTo: state.currentBillTo,
                        selectedTabIndex: state.selectedTabIndex,
                        loading: false,
                        defaultSelectedIndex:0
                    };
                }
                else {
                    return state;
                }
            }

            case "GOT_ADD_SAMPLE": {
                //debugger; 
                if (action.payload.sampleObject != undefined) {
                    return {
                        displayText: state.displayText,
                        counter: state.counter + 100,
                        samples: state.samples,
                        batches: state.batches,
                        affiliate: 'HAG',
                        sample: action.payload.sampleObject,
                        currentBillTo: state.currentBillTo,
                        selectedTabIndex: state.selectedTabIndex,
                        loading: false,
                        defaultSelectedIndex:0
                    };
                }
                else {
                    return state;
                }
            }

            case "GOT_BILLTO_ACCOUTS": {
                if (action.payload.billtoListObject != undefined) {
                    let serviceResponce: ServiceResponce;
                    let payloadObject = <Sample[]>action.payload.billtoListObject;
                    //console.log("got object payload from effect: " + payloadObject);
                    // //console.log("first element is: " + payloadObject);
                    //debugger;;
                    this.getData = JSON.stringify(payloadObject || null)
                    this.serviceResponce = <ServiceResponce>JSON.parse(this.getData);
                    this.samplesData = this.serviceResponce.Data.toString();
                    this.jsonArray = JSON.parse(this.samplesData);


                    return {
                        displayText: payloadObject['Batch'],
                        counter: state.counter + 100,
                        samples: state.samples,
                        batches: state.batches,
                        affiliate: 'HAG',
                        sample: state.sample,
                        billto: this.jsonArray,
                        countries: state.countries,
                        currentBillTo: state.currentBillTo,
                        selectedTabIndex: state.selectedTabIndex,
                        loading: false,
                        defaultSelectedIndex:0
                    };
                }
                else {
                    return state;
                }

            }

            case "GOT_COUNTRIES": {
                if (action.payload.countriesObject != undefined) {
                    let serviceResponce: ServiceResponce;
                    let countriesList: Country[];
                    let payloadObject = <Sample[]>action.payload.countriesObject;
                    //console.log("got object payload from effect: " + payloadObject);
                    // //console.log("first element is: " + payloadObject);
                    //////debugger;; 
                    this.getData = JSON.stringify(payloadObject || null)
                    this.jsonArray = <Country>JSON.parse(this.getData);
                    //this.samplesData = this.serviceResponce.Data.toString();
                    //this.jsonArray = JSON.parse(this.serviceResponce);

                    return {
                        displayText: payloadObject['Batch'],
                        counter: state.counter + 100,
                        samples: state.samples,
                        batches: state.batches,
                        affiliate: 'HAG',
                        sample: state.sample,
                        billto: state.billto,
                        countries: this.jsonArray,
                        currentBillTo: state.currentBillTo,
                        selectedTabIndex: state.selectedTabIndex,
                        loading: false,
                        defaultSelectedIndex:0
                    };
                }
                else {
                    return state;
                }

            }
            case "GOT_ADD_SAMPLE_BILLTO": {
                debugger;

                if (action.payload.Billto != undefined) {
                    let nextTabIndex = 0; 
                    this.nextIndex = action.payload.nextIndex;
                    const newCollection = update(state.sample, { BillTo: { $set: action.payload.Billto } });
                    //state.sample = new Sample(); 
                    ///setTimeout(()=> nextTabIndex=1, 5000);
                    return {
                        counter: state.counter + 100,
                        samples: state.samples,
                        batches: state.batches,
                        affiliate: 'HAG',
                        sample: newCollection,
                        currentBillTo: action.payload.Billto,
                        countries: state.countries,
                        billto: state.billto,
                        selectedTabIndex: 1,
                        loading: false,
                        defaultSelectedIndex:0
                        //currentSample: state.currentSample.BillTo
                    };
                }
                else {
                    return state;
                }
            }
            case "GOT_SELECTED_INDEX_OF_TAB": {
                if (action.payload.objIndex != undefined) {
                    return {
                        counter: state.counter + 100,
                        samples: state.samples,
                        batches: state.batches,
                        affiliate: 'HAG',
                        sample: state.sample,
                        currentBillTo: action.payload.Billto,
                        countries: state.countries,
                        billto: state.billto,
                        selectedTabIndex: action.payload.objIndex,
                        loading: false,
                        defaultSelectedIndex:0
                        //currentSample: state.currentSample.BillTo
                    };
                }
                else {
                    return state;
                }
            }
            case "SHOW_LOADING_RESPOND": {
                //////debugger;;
                if (action.payload.loading != undefined) {
                    return {
                        displayText: 'Loading',
                        counter: state.counter + 1,
                        samples: state.samples,
                        batches: state.batches,
                        affiliate: 'HAG',
                        sample: state.sample,
                        billto: state.billto,
                        countries: state.countries,
                        currentBillTo: state.currentBillTo,
                        selectedTabIndex: state.selectedTabIndex,
                        loading: true,
                        defaultSelectedIndex:0

                    };
                }
                else {
                    return state;
                }
            }


            default: {
                return state;
            }
        }
    }