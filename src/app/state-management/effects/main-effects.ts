import { BillTo } from './../model/billto';
import { Country } from './../model/country';
import { State } from 'app/state-management/state/main-state';
import { Store } from '@ngrx/store';
import { Effect, Actions, toPayload } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import * as firebase from 'firebase';
// import { AngularFire } from 'angularfire2';
import { Http } from "@angular/http";
import * as xml2js from 'xml2js';


@Injectable()
export class MainEffects {
    constructor(private action$: Actions, private _http: Http, private store: Store<State>) {
    }

    @Effect() update$ = this.action$
        .ofType('SUPER_SIMPLE_EFFECT')
        .switchMap(() =>
            Observable.of({ type: "SUPER_SIMPLE_EFFECT_HAS_FINISHED" })
        );
    @Effect() effectWithPayloadExample$ = this.action$
        .ofType('SEND_PAYLOAD_TO_EFFECT')
        .map(toPayload)
        .switchMap(payload => {
            //console.log('the payload was : ' + payload.message);
            return Observable.of({ type: "PAYLOAD_EFFECT_RESPONDS", payload: { message: "The effect says hi !!!" } })
        });

    @Effect() timeEffect = this.action$
        .ofType('SET_TIMER')
        .map(toPayload)
        .switchMap(payload =>
            Observable.timer(payload.seconds * 1000)
                .switchMap(() =>
                    Observable.of({ type: "TIMER_FINISHED" })
                )
        )

    // @Effect() pullArrayFromFirebase$ = this.action$
    //     .ofType('PULL_ARRAY_FROM_FIREBASE')
    //     .switchMap(() => {
    //         return this.af.database.list('/samples/')
    //             .switchMap(result =>
    //                 ////console.log(result),
    //                 Observable.of({ type: "GOT_FIREBASE_ARRAY", payload: { pulledArray: result } })
    //             )
    //     });


    // @Effect() pullObjectFromFirebase$ = this.action$
    //     .ofType('PULL_OBJECT_FROM_FIREBASE')
    //     .switchMap(() => {
    //         return this.af.database.object('/samples/')
    //             .switchMap(result => {
    //                 ////console.log(result), 
    //                 return Observable.of({ type: "GOT_FIREBASE_OBJECT", payload: { pulledObject: result } })

    //             })
    //     })

    @Effect() getWorkingbatches$ = this.action$
        .ofType('PULL_WORKING_BATCHES')
        .do(() => this.store.dispatch({ type: "SHOW_LOADING" }))
        .switchMap(() => {
            return this._http.get('http://stgcvassamplemanagerservice.foragelab.com/SampleSubmission.svc/GetWorkingBatches/5ea5fd34-8259-4aaf-ab59-c6fb2a187c20/HAG')
                .switchMap(result => {
                    ////////debugger;;
                    return Observable.of({ type: "GOT_WORKING_BATCHES", payload: { workingBatchObject: result.json() } })
                })
        })

    @Effect() getSamplesForBatch$ = this.action$
        .ofType('PULL_SAMPLES_OF_BATCH')
        .do(() => this.store.dispatch({ type: "SHOW_LOADING" }))
        .map(toPayload)
        .switchMap(toPayload => {
            //////debugger;;
            return this._http.get('http://stgcvassamplemanagerservice.foragelab.com/SampleSubmission.svc/GetSamplesForUser/5ea5fd34-8259-4aaf-ab59-c6fb2a187c20/' + toPayload.Batch)
                .switchMap(result => {

                    return Observable.of({ type: "GOT_SAMPLES_OF_BATCH", payload: { workingBatchObject: result.json() } })
                })
        })


    @Effect() getSample$ = this.action$
        .ofType('PULL_SAMPLE_DETAILS')
        .do(() => this.store.dispatch({ type: "SHOW_LOADING" }))
        .map(toPayload)
        .switchMap(toPayload => {
            return this._http.get('http://stgcvassamplemanagerservice.foragelab.com/SampleSubmission.svc/GetSamplesDetails/' + toPayload.LabID + '/' + toPayload.affiliate)
                .switchMap(result => {
                    ////////debugger;;
                    return Observable.of({ type: "GOT_SAMPLE_DETAILS", payload: { sampleDetailsObject: result.json() } })
                })
        })

    @Effect() getBilltoAccounts$ = this.action$
        .ofType('PULL_BILLTO_ACCOUTS')
        .do(() => this.store.dispatch({ type: "SHOW_LOADING" }))
        .map(toPayload)
        .switchMap(toPayload => {
            return this._http.get('http://stgcvassamplemanagerservice.foragelab.com/SampleSubmission.svc/GetBillToAccountForAccount/5ea5fd34-8259-4aaf-ab59-c6fb2a187c20')
                .switchMap(result => {
                    //////debugger;;
                    return Observable.of({ type: "GOT_BILLTO_ACCOUTS", payload: { billtoListObject: result.json() } })
                })
        })

    @Effect() getCountries$ = this.action$
        .ofType('PULL_COUNTRIES')
        .do(() => this.store.dispatch({ type: "SHOW_LOADING" }))
        .map(toPayload)
        .switchMap(toPayload => {
            return this._http.get('app/assets/data/CountryState.xml')
                .switchMap(result => {
                    //////debugger;;
                    var outJson;
                    var xml = result.text();
                    xml2js.parseString(xml, function (err, result) {
                        //////debugger;;
                        outJson = result.countries.country;
                    });
                    return Observable.of({ type: "GOT_COUNTRIES", payload: { countriesObject: outJson } })
                })
        })


    @Effect() showLoader$ = this.action$
        .ofType('SHOW_LOADING')
        .map(toPayload)
        .switchMap(payload => {
            //console.log('Show loader start');
            return Observable.of({ type: "SHOW_LOADING_RESPOND", payload: { loading: true } })
        });


    @Effect() setBilltoDetailsToCurrentSample = this.action$
        .ofType('SET_ADD_SAMPLE_BILLTO')
        .map(toPayload)
        .do(() =>  this.store.dispatch({ type: "SHOW_LOADING" }))
        .switchMap(toPayload => {
            //console.log('the payload was : ' + payload.message);
            //debugger;;
            return Observable.of({ type: "GOT_ADD_SAMPLE_BILLTO", payload: { Billto: toPayload.Billto, nextIndex: toPayload.nextIndex } })
        });

     @Effect() setSelectedIndexOfTab = this.action$
        .ofType('SET_SELECTED_INDEX_OF_TAB')
        .map(toPayload)
        //.do(() => this.store.dispatch({ type: "SHOW_LOADING" }))
        .switchMap(toPayload => {
            //console.log('the payload was : ' + payload.message);
            //debugger;;
            return Observable.of({ type: "GOT_SELECTED_INDEX_OF_TAB", payload: { objIndex: toPayload.nextIndex } })
        });

    @Effect() setAddSample = this.action$
        .ofType('SET_ADD_SAMPLE')
        .map(toPayload)
        .do(() => this.store.dispatch({ type: "SHOW_LOADING" }))
        .switchMap(toPayload => {
            //console.log('the payload was : ' + payload.message);
            //debugger;;
            return Observable.of({ type: "GOT_ADD_SAMPLE", payload: { sampleObject: toPayload.Sample } })
        });


}

