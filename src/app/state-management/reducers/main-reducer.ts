import { Component } from '@angular/core';
import { PackageTypes } from 'app/state-management/model/packagetype';
import { FeedType } from './../model/feedtypes';
import { UserFarms } from './../model/userfarm';
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
        //////////////////////////debugger;;;
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
                ////////////////////////debugger;;;
                //console.log("got array payload from effect: " + action.payload.pulledArray);
                if (action.payload.pulledArray != undefined) {
                    ////////////////////////debugger;;;
                    let payloadArray = <Batches[]>action.payload.pulledArray;
                    //console.log("got payload from effect: " + payloadArray);
                    //console.log("first element is: " + payloadArray[0]['Batch']);
                    return {
                        displayText: payloadArray['Batch'],
                        counter: state.counter + 100,
                        batches: payloadArray,
                        defaultSelectedIndex: 0
                    };
                }
                return Object.assign(state);
            }

            case "GOT_FIREBASE_OBJECT": {
                ////////////////////////debugger;;;
                if (action.payload.pulledObject != undefined) {
                    let payloadObject = <Batches[]>action.payload.pulledObject;
                    //console.log("got object payload from effect: " + payloadObject);
                    // //console.log("first element is: " + payloadObject);


                    return {
                        displayText: payloadObject['Batch'],
                        counter: state.counter + 100,
                        batches: [...state.batches, payloadObject],
                        defaultSelectedIndex: 0

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
                    debugger;;; 
                    this.getData = JSON.stringify(payloadObject || null)
                    this.serviceResponce = <ServiceResponce>JSON.parse(this.getData);
                    this.samplesData = this.serviceResponce.Data.toString().toLocaleLowerCase();;
                    this.jsonArray = JSON.parse(this.samplesData);
                    //return Object.assign({}, state, { billto: this.jsonArray, loading: false, counter: state.counter - 1 });
                    return Object.assign({}, state, { batches: this.jsonArray, loading: false,counter: state.counter - 1, });
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
                    ////////////////////////debugger;;; 
                    this.getData = JSON.stringify(payloadObject || null)
                    this.serviceResponce = <ServiceResponce>JSON.parse(this.getData);
                    this.samplesData = this.serviceResponce.Data.toString().toLocaleLowerCase();
                    this.jsonArray = JSON.parse(this.samplesData);

                     return Object.assign({}, state, { samples: this.jsonArray, loading: false,counter: state.counter - 1, });
                }
                else {
                    return state;
                }
            }


            case "GOT_SAMPLE_DETAILS": {
                //////////////////////debugger;;; 
                if (action.payload.sampleDetailsObject != undefined) {
                    let serviceResponce: ServiceResponce;
                    let payloadObject = <Sample[]>action.payload.sampleDetailsObject;
                    //console.log("got object payload from effect: " + payloadObject);
                    // //console.log("first element is: " + payloadObject);
                    ////////////////////debugger;;;
                    this.getData = JSON.stringify(payloadObject || null)
                    this.serviceResponce = <ServiceResponce>JSON.parse(this.getData);
                    this.samplesData = this.serviceResponce.Data;
                    this.jsonArray = <Sample>JSON.parse(this.samplesData);

                     return Object.assign({}, state, { sample: this.jsonArray, loading: false,counter: state.counter - 1, });
                }
                else {
                    return state;
                }
            }

            case "GOT_ADD_SAMPLE": {
                //////////////////debugger;; 
                if (action.payload.sampleObject != undefined) {

                    return Object.assign({}, state, { sample: action.payload.sampleObject, loading: false,counter: state.counter - 1, });
                    // return {
                    //     displayText: state.displayText,
                    //     counter: state.counter + 100,
                    //     samples: state.samples,
                    //     batches: state.batches,
                    //     affiliate: 'HAG',
                    //     sample: action.payload.sampleObject,
                    //     currentBillTo: state.currentBillTo,
                    //     selectedTabIndex: state.selectedTabIndex,
                    //     loading: false,
                    //     defaultSelectedIndex: 0
                    // };
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
                    //////////////////debugger;;;
                    this.getData = JSON.stringify(payloadObject || null)
                    this.serviceResponce = <ServiceResponce>JSON.parse(this.getData);
                    this.samplesData = this.serviceResponce.Data.toString();
                    this.jsonArray = JSON.parse(this.samplesData);
                    //////////////debugger;; 
                    return Object.assign({}, state, { billto: this.jsonArray, loading: false, counter: state.counter - 1 });
                    // return {
                    //     displayText: payloadObject['Batch'],
                    //     counter: state.counter + 100,
                    //     samples: state.samples,
                    //     batches: state.batches,
                    //     affiliate: 'HAG',
                    //     sample: state.sample,
                    //     billto: this.jsonArray,
                    //     countries: state.countries,
                    //     currentBillTo: state.currentBillTo,
                    //     selectedTabIndex: state.selectedTabIndex,
                    //     loading: false,
                    //     defaultSelectedIndex: 0
                    // };
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
                    ////////////////debugger;;;
                    this.getData = JSON.stringify(payloadObject || null)
                    this.jsonArray = <Country>JSON.parse(this.getData);

                    return Object.assign({}, state, { countries: this.jsonArray, loading: false, counter: state.counter - 1, });
                    // return {
                    //     displayText: payloadObject['Batch'],
                    //     counter: state.counter + 100,
                    //     samples: state.samples,
                    //     batches: state.batches,
                    //     affiliate: 'HAG',
                    //     sample: state.sample,
                    //     billto: state.billto,
                    //     countries: this.jsonArray,
                    //     currentBillTo: state.currentBillTo,
                    //     selectedTabIndex: state.selectedTabIndex,
                    //     loading: false,
                    //     defaultSelectedIndex: 0
                    // };
                }
                else {
                    return state;
                }

            }
            case "GOT_ADD_SAMPLE_BILLTO": {
                //////////////debugger;;

                if (action.payload.Billto != undefined) {
                    let nextTabIndex = 0;
                    this.nextIndex = action.payload.nextIndex;
                    const newCollection = update(state.sample, { BillTo: { $set: action.payload.Billto } });
                    //state.sample = new Sample(); 
                    ///setTimeout(()=> nextTabIndex=1, 5000);
                    return Object.assign({}, state, { sample: newCollection, loading: false, selectedTabIndex: 1,counter: state.counter - 1, });
                    // counter: state.counter + 100,
                    // samples: state.samples,
                    // batches: state.batches,
                    // affiliate: 'HAG',
                    // sample: newCollection,
                    // currentBillTo: action.payload.Billto,
                    // countries: state.countries,
                    // billto: state.billto,
                    // selectedTabIndex: 1,
                    // loading: false,
                    // defaultSelectedIndex: 0
                    //currentSample: state.currentSample.BillTo
                    //state;
                    //};
                }
                else {
                    return state;
                }
            }
            case "GOT_SELECTED_INDEX_OF_TAB": {
                if (action.payload.objIndex != undefined) {
                    return Object.assign({}, state, { selectedTabIndex: action.payload.objIndex, loading: false, counter: state.counter - 1,});
                    // return {
                    //     counter: state.counter + 100,
                    //     samples: state.samples,
                    //     batches: state.batches,
                    //     affiliate: 'HAG',
                    //     sample: state.sample,
                    //     currentBillTo: action.payload.Billto,
                    //     countries: state.countries,
                    //     billto: state.billto,
                    //     selectedTabIndex: action.payload.objIndex,
                    //     loading: false,
                    //     defaultSelectedIndex: 0
                    //     //currentSample: state.currentSample.BillTo
                    // };
                }
                else {
                    return state;
                }
            }
            case "SHOW_LOADING_RESPOND": {
                //////////////////////debugger;;;
                if (action.payload.loading != undefined) {
                    //////////////debugger;; 
                    var cueerntValue = state.counter;
                    return Object.assign({}, state, { loading: true, counter: cueerntValue + 1 });
                    // return {
                    //     displayText: 'Loading',
                    //     counter: state.counter + 1,
                    //     samples: state.samples,
                    //     batches: state.batches,
                    //     affiliate: 'HAG',
                    //     sample: state.sample,
                    //     billto: state.billto,
                    //     countries: state.countries,
                    //     currentBillTo: state.currentBillTo,
                    //     selectedTabIndex: state.selectedTabIndex,
                    //     loading: true,
                    //     defaultSelectedIndex: 0

                    // };
                }
                else {
                    return state;
                }
            }


            case "GOT_USER_FARMS": {
                if (action.payload.userFarmsObject != undefined) {
                    let serviceResponce: ServiceResponce;
                    let payloadObject = action.payload.userFarmsObject;
                    ////////////debugger;; 
                    this.getData = JSON.stringify(payloadObject || null)
                    this.serviceResponce = <ServiceResponce>JSON.parse(this.getData);
                    this.samplesData = this.serviceResponce.Data.toString();
                    this.jsonArray = JSON.parse(this.samplesData);

                    ////////////debugger;; 

                    return Object.assign({}, state, { UserFarms: this.jsonArray, counter: state.counter - 1,});
                    // return {
                    // };
                }
                else {
                    return state;
                }

            }


            case "GOT_FEED_TYPES": {
                if (action.payload.feedTypesObject != undefined) {
                    ////////////debugger;; 
                    let serviceResponce: ServiceResponce;
                    let payloadObject = action.payload.feedTypesObject;
                    ////////////debugger;; 
                    this.getData = JSON.stringify(payloadObject || null)
                    this.serviceResponce = <ServiceResponce>JSON.parse(this.getData);
                    this.samplesData = this.serviceResponce.Data.toString();
                    this.jsonArray = JSON.parse(this.samplesData);



                    //////////debugger;; 

                    return Object.assign({}, state, { feedTypes: this.jsonArray,counter: state.counter - 1, });
                    // return {
                    // };
                }
                else {
                    return state;
                }

            }

            case "GOT_NIR_PACKAGES": {
                if (action.payload.nirPackageObject != undefined) {
                    //////debugger;;
                    let serviceResponce: ServiceResponce;
                    let payloadObject = action.payload.nirPackageObject;
                    ////////////debugger;; 
                    this.getData = JSON.stringify(payloadObject || null)
                    this.serviceResponce = <ServiceResponce>JSON.parse(this.getData);
                    this.samplesData = this.serviceResponce.Data.toString();
                    this.jsonArray = JSON.parse(this.samplesData);

                    //////////debugger;; 
                    return Object.assign({}, state, { nirPackages: this.jsonArray,counter: state.counter - 1,});
                    // return {
                    // };
                }
                else {
                    return state;
                }

            }

            case "GOT_CHEM_PACKAGES": {
                if (action.payload.chemPackageObject != undefined) {
                    //////debugger;;
                    let serviceResponce: ServiceResponce;
                    let payloadObject = action.payload.chemPackageObject;
                    ////////////debugger;; 
                    this.getData = JSON.stringify(payloadObject || null)
                    this.serviceResponce = <ServiceResponce>JSON.parse(this.getData);
                    this.samplesData = this.serviceResponce.Data.toString();
                    this.jsonArray = JSON.parse(this.samplesData);

                    //////////debugger;; 
                    return Object.assign({}, state, { chemPackages: this.jsonArray,counter: state.counter - 1, });
                    // return {
                    // };
                }
                else {
                    return state;
                }

            }

            case "GOT_ANALYSIS_OPTIONS": {

                if (action.payload != undefined) {
                    //debugger;;
                    let serviceResponce: ServiceResponce;
                    let payloadObject = action.payload.chemPackageObject;
                    ////////////debugger;; 
                    this.getData = JSON.stringify(payloadObject || null)
                    this.serviceResponce = <ServiceResponce>JSON.parse(this.getData);
                    this.samplesData = this.serviceResponce.Data.toString();
                    this.jsonArray = JSON.parse(this.samplesData);
                    //debugger;;    
                    switch (action.payload.PackageType) {
                        case PackageTypes.Options:
                            return Object.assign({}, state, { optionsAnalysis: this.jsonArray , counter: state.counter - 1,});

                        case PackageTypes.Components:
                            return Object.assign({}, state, { componentAnalysis: this.jsonArray , counter: state.counter - 1,});

                        case PackageTypes.Insitu:
                            return Object.assign({}, state, { insituAnalysis: this.jsonArray , counter: state.counter - 1,});

                        case PackageTypes.Invitro:
                            return Object.assign({}, state, { invitroAnalysis: this.jsonArray , counter: state.counter - 1,});

                        case PackageTypes.Starch:
                            return Object.assign({}, state, { starchAnalysis: this.jsonArray , counter: state.counter - 1,});

                        case PackageTypes.Proximate:
                            return Object.assign({}, state, { proximateAnalysis: this.jsonArray , counter: state.counter - 1,});

                        case PackageTypes.Amino:
                            return Object.assign({}, state, { aminoAnalysis: this.jsonArray , counter: state.counter - 1,});

                        case PackageTypes.Mycotoxins:
                            return Object.assign({}, state, { mycoToxineAnalysis: this.jsonArray , counter: state.counter - 1,});

                        case PackageTypes.Water:
                            return Object.assign({}, state, { waterAnalysis: this.jsonArray , counter: state.counter - 1,});

                        case PackageTypes.Manure:
                            return Object.assign({}, state, { manureAnalysis: this.jsonArray , counter: state.counter - 1,});

                        case PackageTypes.Plant:
                            return Object.assign({}, state, { plantTissuAnalysis: this.jsonArray , counter: state.counter - 1,});

                        default:
                            return state
                    }
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