import { Effect, Actions, toPayload } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import * as firebase from 'firebase';
import { AngularFire } from 'angularfire2';
import { Http } from "@angular/http";



@Injectable()
export class MainEffects {
    constructor(private action$: Actions, private af: AngularFire, private _http: Http) {
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
            console.log('the payload was : ' + payload.message);
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

    @Effect() pullArrayFromFirebase$ = this.action$
        .ofType('PULL_ARRAY_FROM_FIREBASE')
        .switchMap(() => {
            return this.af.database.list('/samples/')
                .switchMap(result =>
                    //console.log(result),
                    Observable.of({ type: "GOT_FIREBASE_ARRAY", payload: { pulledArray: result } })
                )
        });


    @Effect() pullObjectFromFirebase$ = this.action$
        .ofType('PULL_OBJECT_FROM_FIREBASE')
        .switchMap(() => {
            return this.af.database.object('/samples/')
                .switchMap(result => {
                    //console.log(result), 
                    return Observable.of({ type: "GOT_FIREBASE_OBJECT", payload: { pulledObject: result } })

                })
        })

    @Effect() getWorkingbatches$ = this.action$
        .ofType('PULL_WORKING_BATCHES')
        .switchMap(() => {
            return this._http.get('http://stgcvassamplemanagerservice.foragelab.com/SampleSubmission.svc/GetWorkingBatches/5ea5fd34-8259-4aaf-ab59-c6fb2a187c20/HAG')
                .switchMap(result => {
                    //debugger;
                    return Observable.of({ type: "GOT_WORKING_BATCHES", payload: { workingBatchObject: result.json() } })
                })
        })

    @Effect() getSamplesForBatch$ = this.action$
        .ofType('PULL_SAMPLES_OF_BATCH')
        .map(toPayload)
        .switchMap(toPayload => {
            return this._http.get('http://stgcvassamplemanagerservice.foragelab.com/SampleSubmission.svc/GetSamplesForUser/5ea5fd34-8259-4aaf-ab59-c6fb2a187c20/' + toPayload.Batch)
                .switchMap(result => {
                    //debugger;
                    return Observable.of({ type: "GOT_SAMPLES_OF_BATCH", payload: { workingBatchObject: result.json() } })
                })
        })

}

