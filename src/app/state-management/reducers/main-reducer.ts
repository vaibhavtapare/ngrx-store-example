import { Batches } from './../model/workingbatches';
import { INCREMENT, EVENT_FROM_EFFECT } from './../actions/main-action-creator';
import { State, initialState } from './../state/main-state';
import { ActionReducer, Action } from '@ngrx/store';
export const mainStoreReducer: ActionReducer<State> =
    (state = initialState, action: Action) => {
        console.log('Action came in! ' + action.type);
        //debugger;
        switch (action.type) {
            case INCREMENT: {
                console.log('the payload string is: ' + action.payload.innerObj.text);
                return {
                    counter: state.counter + 1
                }
            }
            case EVENT_FROM_EFFECT: {
                console.log('we cheesin in the reducer over here!');
                return {
                    counter: 4
                }
            }
            case "PAYLOAD_EFFECT_RESPONDS": {
                console.log("got array payload from effect: " + action.payload.pulledArray);
            }


            case "GOT_FIREBASE_ARRAY": {
                debugger;
                console.log("got array payload from effect: " + action.payload.pulledArray);
                if (action.payload.pulledArray != undefined) {
                    debugger;
                    let payloadArray = <Batches[]>action.payload.pulledArray;
                    console.log("got payload from effect: " + payloadArray);
                    console.log("first element is: " + payloadArray[0]['Batch']);
                     return {
                        displayText: payloadArray['Batch'],
                        counter: state.counter + 100,
                        batches: payloadArray
                    };
                }
                return Object.assign(state);
            }

            case "GOT_FIREBASE_OBJECT": {
                debugger;
                if (action.payload.pulledObject != undefined) {
                    let payloadObject = <Batches[]>action.payload.pulledObject;
                    console.log("got object payload from effect: " + payloadObject);
                    // console.log("first element is: " + payloadObject);


                    return {
                        displayText: payloadObject['Batch'],
                        counter: state.counter + 100,
                        batches: [...state.batches, payloadObject]
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