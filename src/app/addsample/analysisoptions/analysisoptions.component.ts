import { PackageAnalysis } from './../../state-management/model/packageAnalysis';
import { PackageTypes } from 'app/state-management/model/packagetype';
import { State } from './../../state-management/state/main-state';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-analysisoptions',
  templateUrl: './analysisoptions.component.html',
  styleUrls: ['./analysisoptions.component.css']
})
export class AnalysisoptionsComponent implements OnInit {

  optionsList: PackageAnalysis[] = [];
  componentsList: PackageAnalysis[] = [];
  insituList: PackageAnalysis[] = [];
  invitroList: PackageAnalysis[] = [];
  starchList: PackageAnalysis[] = [];
  proximateList: PackageAnalysis[] = [];
  aminoAcidList: PackageAnalysis[] = [];
  mycotoxinsList: PackageAnalysis[] = [];
  waterList: PackageAnalysis[] = [];
  manureList: PackageAnalysis[] = [];
  plantTissueList: PackageAnalysis[] = [];

  constructor(private store: Store<State>) {
    store.select('mainStoreReducer')
      .subscribe((data: State) => {
       ////debugger;;
        if (data.optionsAnalysis !== undefined && data.optionsAnalysis.length>0) {
           ////debugger;;
          this.optionsList = data.optionsAnalysis;
        }
        if (data.componentAnalysis !== undefined && data.componentAnalysis.length >0) {
           ////debugger;;
          this.componentsList = data.componentAnalysis;
        }

        if (data.insituAnalysis !== undefined && data.insituAnalysis.length >0) {
          this.insituList = data.insituAnalysis;
        }

        if (data.invitroAnalysis !== undefined && data.invitroAnalysis.length >0) {
          this.invitroList = data.invitroAnalysis;
        }

        if (data.starchAnalysis !== undefined && data.starchAnalysis.length >0) {
          this.starchList = data.starchAnalysis;
        }

        if (data.proximateAnalysis !== undefined && data.proximateAnalysis.length >0) {
          this.proximateList = data.proximateAnalysis;
        }

        if (data.aminoAnalysis !== undefined  && data.aminoAnalysis.length >0) {
          this.aminoAcidList = data.aminoAnalysis;
        }

        if (data.mycoToxineAnalysis !== undefined  && data.mycoToxineAnalysis.length >0) {
          this.mycotoxinsList = data.mycoToxineAnalysis;
        }

        if (data.waterAnalysis !== undefined && data.waterAnalysis.length >0) {
          this.waterList = data.waterAnalysis;
        }

        if (data.manureAnalysis !== undefined && data.manureAnalysis.length >0) {
          this.manureList = data.manureAnalysis;
        }

        if (data.plantTissuAnalysis !== undefined && data.plantTissuAnalysis.length >0) {
           ////debugger;;
          this.plantTissueList = data.plantTissuAnalysis;
        }

      });
  }

  ngOnInit() {
    this.store.dispatch({ type: "PULL_OPTIONS_ANALYSIS", payload: { PackageTypes: PackageTypes.Options } });
    this.store.dispatch({ type: "PULL_COMPONENT_ANALYSIS", payload: { PackageTypes: PackageTypes.Components } });
    this.store.dispatch({ type: "PULL_INSITU_ANALYSIS", payload: { PackageTypes: PackageTypes.Insitu } });
    this.store.dispatch({ type: "PULL_INVITRO_ANALYSIS", payload: { PackageTypes: PackageTypes.Invitro } });
    this.store.dispatch({ type: "PULL_STARCH_ANALYSIS", payload: { PackageTypes: PackageTypes.Starch } });
    this.store.dispatch({ type: "PULL_PROXIMATE_ANALYSIS", payload: { PackageTypes: PackageTypes.Proximate } });
    this.store.dispatch({ type: "PULL_AMINO_ANALYSIS", payload: { PackageTypes: PackageTypes.Amino } });
    this.store.dispatch({ type: "PULL_MYCOTOXINE_ANALYSIS", payload: { PackageTypes: PackageTypes.Mycotoxins } });
    this.store.dispatch({ type: "PULL_WATER_ANALYSIS", payload: { PackageTypes: PackageTypes.Water } });
    this.store.dispatch({ type: "PULL_MANURE_ANALYSIS", payload: { PackageTypes: PackageTypes.Manure } });
    this.store.dispatch({ type: "PULL_PLANT_ANALYSIS", payload: { PackageTypes: PackageTypes.Plant } });
    //PULL_ANALYSIS_OPTIONS
  }

}
