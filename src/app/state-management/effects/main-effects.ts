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
import { PackageTypes } from "app/state-management/model/packagetype";


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
        .map(toPayload)
        .switchMap(toPayload => {
           debugger;
            return this._http.get('http://stgcvassamplemanagerservice.foragelab.com/SampleSubmission.svc/GetWorkingBatches/' + toPayload.UserID + "/" + toPayload.AffiliateCode)
                .switchMap(result => {
                    //////////////////////debugger;;
                    return Observable.of({ type: "GOT_WORKING_BATCHES", payload: { workingBatchObject: result.json() } })
                })
        })

    @Effect() getSamplesForBatch$ = this.action$
        .ofType('PULL_SAMPLES_OF_BATCH')
        .do(() => this.store.dispatch({ type: "SHOW_LOADING" }))
        .map(toPayload)
        .switchMap(toPayload => {
            //////////debugger;;
            return this._http.get('http://stgcvassamplemanagerservice.foragelab.com/SampleSubmission.svc/GetSamplesForUser/' + toPayload.UserID + '/' + toPayload.Batch)
                .switchMap(result => {
                    return Observable.of({ type: "GOT_SAMPLES_OF_BATCH", payload: { workingBatchObject: result.json() } })
                })
        })


    @Effect() getSample$ = this.action$
        .ofType('PULL_SAMPLE_DETAILS')
        .do(() => this.store.dispatch({ type: "SHOW_LOADING" }))
        .map(toPayload)
        .switchMap(toPayload => {
            //////////debugger;;
            return this._http.get('http://stgcvassamplemanagerservice.foragelab.com/SampleSubmission.svc/GetSamplesDetails/' + toPayload.LabID + '/' + toPayload.affiliate)
                .switchMap(result => {
                    //////////debugger;;
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
                    ////////////////////debugger;;
                    return Observable.of({ type: "GOT_BILLTO_ACCOUTS", payload: { billtoListObject: result.json() } })
                })
        })



    @Effect() getFeedTypes$ = this.action$
        .ofType('PULL_FEED_TYPES')
        .do(() => this.store.dispatch({ type: "SHOW_LOADING" }))
        .map(toPayload)
        .switchMap(toPayload => {
            //////////debugger; 
            return this._http.get('http://stgcvassamplemanagerservice.foragelab.com/SampleSubmission.svc/GetFeedTypes/5ea5fd34-8259-4aaf-ab59-c6fb2a187c20')
                .switchMap(result => {
                    //////////debugger;;
                    return Observable.of({ type: "GOT_FEED_TYPES", payload: { feedTypesObject: result.json() } })
                })
        })

    @Effect() getNIRPackages$ = this.action$
        .ofType('PULL_NIR_PACKAGES')
        .do(() => this.store.dispatch({ type: "SHOW_LOADING" }))
        .map(toPayload)
        .switchMap(toPayload => {
            var NIRPackage = PackageTypes[PackageTypes.NIR];
            ////debugger;;
            return this._http.get('http://stgcvassamplemanagerservice.foragelab.com/SampleSubmission.svc/GetPackageAnalysis/' + NIRPackage.toString() + '/HAG')
                .switchMap(result => {
                    ////debugger;;
                    return Observable.of({ type: "GOT_NIR_PACKAGES", payload: { nirPackageObject: result.json() } })
                })
        })


    @Effect() getCHEMPackages$ = this.action$
        .ofType('PULL_CHEM_PACKAGES')
        .do(() => this.store.dispatch({ type: "SHOW_LOADING" }))
        .map(toPayload)
        .switchMap(toPayload => {
            var CHEMPackage = PackageTypes[PackageTypes.Chemistry];
            ////debugger;;
            return this._http.get('http://stgcvassamplemanagerservice.foragelab.com/SampleSubmission.svc/GetPackageAnalysis/' + CHEMPackage + '/HAG')
                .switchMap(result => {
                    ////debugger;;
                    return Observable.of({ type: "GOT_CHEM_PACKAGES", payload: { chemPackageObject: result.json() } })
                })
        })

    @Effect() getOptions$ = this.action$
        .ofType('PULL_OPTIONS_ANALYSIS')
        .do(() => this.store.dispatch({ type: "SHOW_LOADING" }))
        .map(toPayload)
        .switchMap(toPayload => {
            var Package = PackageTypes[toPayload.PackageTypes];
            ////debugger;;
            return this._http.get('http://stgcvassamplemanagerservice.foragelab.com/SampleSubmission.svc/GetPackageAnalysis/' + Package + '/HAG')
                .switchMap(result => {
                    ////debugger;;
                    return Observable.of({ type: "GOT_ANALYSIS_OPTIONS", payload: { chemPackageObject: result.json(), PackageType: toPayload.PackageTypes } })
                });
        })


    @Effect() getComponentsAnalysis$ = this.action$
        .ofType('PULL_COMPONENT_ANALYSIS')
        .do(() => this.store.dispatch({ type: "SHOW_LOADING" }))
        .map(toPayload)
        .switchMap(toPayload => {
            var Package = PackageTypes[toPayload.PackageTypes];
            ////debugger;;
            return this._http.get('http://stgcvassamplemanagerservice.foragelab.com/SampleSubmission.svc/GetPackageAnalysis/' + Package + '/HAG')
                .switchMap(result => {
                    ////debugger;;
                    return Observable.of({ type: "GOT_ANALYSIS_OPTIONS", payload: { chemPackageObject: result.json(), PackageType: toPayload.PackageTypes } })
                });
        })



    @Effect() getInsituAnalysis$ = this.action$
        .ofType('PULL_INSITU_ANALYSIS')
        .do(() => this.store.dispatch({ type: "SHOW_LOADING" }))
        .map(toPayload)
        .switchMap(toPayload => {
            var Package = PackageTypes[toPayload.PackageTypes];
            ////debugger;;
            return this._http.get('http://stgcvassamplemanagerservice.foragelab.com/SampleSubmission.svc/GetPackageAnalysis/' + Package + '/HAG')
                .switchMap(result => {
                    ////debugger;;
                    return Observable.of({ type: "GOT_ANALYSIS_OPTIONS", payload: { chemPackageObject: result.json(), PackageType: toPayload.PackageTypes } })
                });
        })




    @Effect() getInvitroAnalysis$ = this.action$
        .ofType('PULL_INVITRO_ANALYSIS')
        .do(() => this.store.dispatch({ type: "SHOW_LOADING" }))
        .map(toPayload)
        .switchMap(toPayload => {
            var Package = PackageTypes[toPayload.PackageTypes];
            ////debugger;;
            return this._http.get('http://stgcvassamplemanagerservice.foragelab.com/SampleSubmission.svc/GetPackageAnalysis/' + Package + '/HAG')
                .switchMap(result => {
                    ////debugger;;
                    return Observable.of({ type: "GOT_ANALYSIS_OPTIONS", payload: { chemPackageObject: result.json(), PackageType: toPayload.PackageTypes } })
                });
        })




    @Effect() getStarchAnalysis$ = this.action$
        .ofType('PULL_STARCH_ANALYSIS')
        .do(() => this.store.dispatch({ type: "SHOW_LOADING" }))
        .map(toPayload)
        .switchMap(toPayload => {
            var Package = PackageTypes[toPayload.PackageTypes];
            ////debugger;;
            return this._http.get('http://stgcvassamplemanagerservice.foragelab.com/SampleSubmission.svc/GetPackageAnalysis/' + Package + '/HAG')
                .switchMap(result => {
                    ////debugger;;
                    return Observable.of({ type: "GOT_ANALYSIS_OPTIONS", payload: { chemPackageObject: result.json(), PackageType: toPayload.PackageTypes } })
                });
        })




    @Effect() getProximateAnalysis$ = this.action$
        .ofType('PULL_PROXIMATE_ANALYSIS')
        .do(() => this.store.dispatch({ type: "SHOW_LOADING" }))
        .map(toPayload)
        .switchMap(toPayload => {
            var Package = PackageTypes[toPayload.PackageTypes];
            ////debugger;;
            return this._http.get('http://stgcvassamplemanagerservice.foragelab.com/SampleSubmission.svc/GetPackageAnalysis/' + Package + '/HAG')
                .switchMap(result => {
                    ////debugger;;
                    return Observable.of({ type: "GOT_ANALYSIS_OPTIONS", payload: { chemPackageObject: result.json(), PackageType: toPayload.PackageTypes } })
                });
        })




    @Effect() getAminoAnalysis$ = this.action$
        .ofType('PULL_AMINO_ANALYSIS')
        .do(() => this.store.dispatch({ type: "SHOW_LOADING" }))
        .map(toPayload)
        .switchMap(toPayload => {
            var Package = PackageTypes[toPayload.PackageTypes];
            ////debugger;;
            return this._http.get('http://stgcvassamplemanagerservice.foragelab.com/SampleSubmission.svc/GetPackageAnalysis/' + Package + '/HAG')
                .switchMap(result => {
                    ////debugger;;
                    return Observable.of({ type: "GOT_ANALYSIS_OPTIONS", payload: { chemPackageObject: result.json(), PackageType: toPayload.PackageTypes } })
                });
        })




    @Effect() getMycotoxineAnalysis$ = this.action$
        .ofType('PULL_MYCOTOXINE_ANALYSIS')
        .do(() => this.store.dispatch({ type: "SHOW_LOADING" }))
        .map(toPayload)
        .switchMap(toPayload => {
            var Package = PackageTypes[toPayload.PackageTypes];
            ////debugger;;
            return this._http.get('http://stgcvassamplemanagerservice.foragelab.com/SampleSubmission.svc/GetPackageAnalysis/' + Package + '/HAG')
                .switchMap(result => {
                    ////debugger;;
                    return Observable.of({ type: "GOT_ANALYSIS_OPTIONS", payload: { chemPackageObject: result.json(), PackageType: toPayload.PackageTypes } })
                });
        });

    @Effect() getWaterAnalysis$ = this.action$
        .ofType('PULL_WATER_ANALYSIS')
        .do(() => this.store.dispatch({ type: "SHOW_LOADING" }))
        .map(toPayload)
        .switchMap(toPayload => {
            var Package = PackageTypes[toPayload.PackageTypes];
            ////debugger;;
            return this._http.get('http://stgcvassamplemanagerservice.foragelab.com/SampleSubmission.svc/GetPackageAnalysis/' + Package + '/HAG')
                .switchMap(result => {
                    ////debugger;;
                    return Observable.of({ type: "GOT_ANALYSIS_OPTIONS", payload: { chemPackageObject: result.json(), PackageType: toPayload.PackageTypes } })
                });
        })




    @Effect() getManureAnalysis$ = this.action$
        .ofType('PULL_MANURE_ANALYSIS')
        .do(() => this.store.dispatch({ type: "SHOW_LOADING" }))
        .map(toPayload)
        .switchMap(toPayload => {
            var Package = PackageTypes[toPayload.PackageTypes];
            ////debugger;;
            return this._http.get('http://stgcvassamplemanagerservice.foragelab.com/SampleSubmission.svc/GetPackageAnalysis/' + Package + '/HAG')
                .switchMap(result => {
                    ////debugger;;
                    return Observable.of({ type: "GOT_ANALYSIS_OPTIONS", payload: { chemPackageObject: result.json(), PackageType: toPayload.PackageTypes } })
                });
        })

    @Effect() getPlantAnalysis$ = this.action$
        .ofType('PULL_PLANT_ANALYSIS')
        .do(() => this.store.dispatch({ type: "SHOW_LOADING" }))
        .map(toPayload)
        .switchMap(toPayload => {
            var Package = PackageTypes[toPayload.PackageTypes];
            ////debugger;;
            return this._http.get('http://stgcvassamplemanagerservice.foragelab.com/SampleSubmission.svc/GetPackageAnalysis/' + Package + '/HAG')
                .switchMap(result => {
                    ////debugger;;
                    return Observable.of({ type: "GOT_ANALYSIS_OPTIONS", payload: { chemPackageObject: result.json(), PackageType: toPayload.PackageTypes } })
                });
        })


    // .switchMap(toPayload => {
    //     debugger;;
    //     var Package = PackageTypes[toPayload.PackageTypes];
    //     switch (toPayload.PackageTypes) {
    //         case PackageTypes.Options:
    //             return Observable.of(this._http.get('http://stgcvassamplemanagerservice.foragelab.com/SampleSubmission.svc/GetPackageAnalysis/' + Package + '/HAG')
    //                 .switchMap(result => {
    //                     debugger;
    //                     return Observable.of({ type: "GOT_ANALYSIS_OPTIONS", payload: { chemPackageObject: result.json(), PackageType: PackageTypes.Options } });
    //                 }));

    //         case PackageTypes.Components:
    //             return Observable.of(this._http.get('http://stgcvassamplemanagerservice.foragelab.com/SampleSubmission.svc/GetPackageAnalysis/' + Package + '/HAG')
    //                 .switchMap(result => {
    //                     debugger;
    //                     return Observable.of({ type: "GOT_ANALYSIS_OPTIONS", payload: { chemPackageObject: result.json(), PackageType: PackageTypes.Components } });
    //                 }));

    //         case PackageTypes.Insitu:
    //             return Observable.of(this._http.get('http://stgcvassamplemanagerservice.foragelab.com/SampleSubmission.svc/GetPackageAnalysis/' + Package + '/HAG')
    //                 .switchMap(result => {
    //                     debugger;
    //                     return Observable.of({ type: "GOT_ANALYSIS_OPTIONS", payload: { chemPackageObject: result.json(), PackageType: PackageTypes.Insitu } });
    //                 }));

    //         case PackageTypes.Invitro:
    //             return Observable.of(this._http.get('http://stgcvassamplemanagerservice.foragelab.com/SampleSubmission.svc/GetPackageAnalysis/' + Package + '/HAG')
    //                 .switchMap(result => {
    //                     debugger;
    //                     return Observable.of({ type: "GOT_ANALYSIS_OPTIONS", payload: { chemPackageObject: result.json(), PackageType: PackageTypes.Invitro } });
    //                 }));

    //         case PackageTypes.Starch:
    //             return Observable.of(this._http.get('http://stgcvassamplemanagerservice.foragelab.com/SampleSubmission.svc/GetPackageAnalysis/' + Package + '/HAG')
    //                 .switchMap(result => {
    //                     debugger;
    //                     return Observable.of({ type: "GOT_ANALYSIS_OPTIONS", payload: { chemPackageObject: result.json(), PackageType: PackageTypes.Starch } });
    //                 }));

    //         case PackageTypes.Proximate:
    //             return Observable.of(this._http.get('http://stgcvassamplemanagerservice.foragelab.com/SampleSubmission.svc/GetPackageAnalysis/' + Package + '/HAG')
    //                 .switchMap(result => {
    //                     debugger;
    //                     return Observable.of({ type: "GOT_ANALYSIS_OPTIONS", payload: { chemPackageObject: result.json(), PackageType: PackageTypes.Proximate } });
    //                 }));

    //         case PackageTypes.Amino:
    //             return Observable.of(this._http.get('http://stgcvassamplemanagerservice.foragelab.com/SampleSubmission.svc/GetPackageAnalysis/' + Package + '/HAG')
    //                 .switchMap(result => {
    //                     debugger;
    //                     return Observable.of({ type: "GOT_ANALYSIS_OPTIONS", payload: { chemPackageObject: result.json(), PackageType: PackageTypes.Amino } });
    //                 }));

    //         case PackageTypes.Mycotoxins:
    //             return Observable.of(this._http.get('http://stgcvassamplemanagerservice.foragelab.com/SampleSubmission.svc/GetPackageAnalysis/' + Package + '/HAG')
    //                 .switchMap(result => {
    //                     debugger;
    //                     return Observable.of({ type: "GOT_ANALYSIS_OPTIONS", payload: { chemPackageObject: result.json(), PackageType: PackageTypes.Mycotoxins } });
    //                 }));

    //         case PackageTypes.Water:
    //             return Observable.of(this._http.get('http://stgcvassamplemanagerservice.foragelab.com/SampleSubmission.svc/GetPackageAnalysis/' + Package + '/HAG')
    //                 .switchMap(result => {
    //                     debugger;
    //                     return Observable.of({ type: "GOT_ANALYSIS_OPTIONS", payload: { chemPackageObject: result.json(), PackageType: PackageTypes.Water } });
    //                 }));

    //         case PackageTypes.Manure:
    //             return Observable.of(this._http.get('http://stgcvassamplemanagerservice.foragelab.com/SampleSubmission.svc/GetPackageAnalysis/' + Package + '/HAG')
    //                 .switchMap(result => {
    //                     debugger;
    //                     return Observable.of({ type: "GOT_ANALYSIS_OPTIONS", payload: { chemPackageObject: result.json(), PackageType: PackageTypes.Manure } });
    //                 }));

    //         case PackageTypes.Plant:
    //             return Observable.of(this._http.get('http://stgcvassamplemanagerservice.foragelab.com/SampleSubmission.svc/GetPackageAnalysis/' + Package + '/HAG')
    //                 .switchMap(result => {
    //                     debugger;
    //                     return Observable.of({ type: "GOT_ANALYSIS_OPTIONS", payload: { chemPackageObject: result.json(), PackageType: PackageTypes.Plant } });
    //                 }));

    //     }


    // })

    @Effect() getCountries$ = this.action$
        .ofType('PULL_COUNTRIES')
        .do(() => this.store.dispatch({ type: "SHOW_LOADING" }))
        .map(toPayload)
        .switchMap(toPayload => {
            //////////debugger;;
            return this._http.get('app/assets/data/CountryState.xml')
                .switchMap(result => {
                    //////////debugger;;
                    var outJson;
                    var xml = result.text();
                    xml2js.parseString(xml, function (err, result) {
                        //////////debugger;;
                        outJson = result.countries.country;
                    });
                    return Observable.of({ type: "GOT_COUNTRIES", payload: { countriesObject: outJson } })
                })
        })


    @Effect() showLoader$ = this.action$
        .ofType('SHOW_LOADING')
        .map(toPayload)
        .switchMap(payload => {
            return Observable.of({ type: "SHOW_LOADING_RESPOND", payload: { loading: true } })
        });


    @Effect() setBilltoDetailsToCurrentSample$ = this.action$
        .ofType('SET_ADD_SAMPLE_BILLTO')
        .map(toPayload)
        .do(() => this.store.dispatch({ type: "SHOW_LOADING" }))
        .switchMap(toPayload => {
            //console.log('the payload was : ' + payload.message);
            ////////////////debugger;;
            //////////debugger;;
            return Observable.of({ type: "GOT_ADD_SAMPLE_BILLTO", payload: { Billto: toPayload.Billto, nextIndex: toPayload.nextIndex } })
        });

    @Effect() setSelectedIndexOfTab$ = this.action$
        .ofType('SET_SELECTED_INDEX_OF_TAB')
        .map(toPayload)
        //.do(() => this.store.dispatch({ type: "SHOW_LOADING" }))
        .switchMap(toPayload => {
            //console.log('the payload was : ' + payload.message);
            ////////////////debugger;;
            //////////debugger;;
            return Observable.of({ type: "GOT_SELECTED_INDEX_OF_TAB", payload: { objIndex: toPayload.nextIndex } })
        });

    @Effect() setAddSample$ = this.action$
        .ofType('SET_ADD_SAMPLE')
        .map(toPayload)
        .do(() => this.store.dispatch({ type: "SHOW_LOADING" }))
        .switchMap(toPayload => {
            //console.log('the payload was : ' + payload.message);
            ////////////////debugger;;
            // //////////debugger;
            //////////debugger;;
            return Observable.of({ type: "GOT_ADD_SAMPLE", payload: { sampleObject: toPayload.Sample } })
        });

    @Effect() getUserFarms$ = this.action$
        .ofType('PULL_USER_FARMS')
        .do(() => this.store.dispatch({ type: "SHOW_LOADING" }))
        .switchMap(toPayload => {
            //////////debugger;
            return this._http.post('http://stgservice.foragelab.com/ForageLab.svc/SM_GetSourceGroupByUserID', `data=[{UserID:"5ea5fd34-8259-4aaf-ab59-c6fb2a187c20"}]`)
                .switchMap(result => {
                    ////////////////////debugger;;
                    return Observable.of({ type: "GOT_USER_FARMS", payload: { userFarmsObject: result.json() } })
                })
        });
}




