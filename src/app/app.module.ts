import { LoaderService } from './state-management/loader/loader.service';
import { MainEffects } from './state-management/effects/main-effects';
import { mainStoreReducer } from './state-management/reducers/main-reducer';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
// import { AngularFireModule } from 'angularfire2';
import { BatchesComponent } from './batches/batches.component';
import { SamplesComponent } from './batches/samples/samples.component';
import { routes } from "app/app.routes";
import { RouterModule } from "@angular/router";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SampleComponent } from './batches/sample/sample.component';
import { UnknownComponent } from './unknown/unknown.component';
import { AddsampleComponent } from './addsample/addsample.component';
import { BilltoComponent } from './addsample/billto/billto.component';
import { SampledetailsComponent } from './addsample/sampledetails/sampledetails.component';
import { PackageselectionComponent } from './addsample/packageselection/packageselection.component';
import { AnalysisoptionsComponent } from './addsample/analysisoptions/analysisoptions.component';
import { SubmissionsummaryComponent } from './addsample/submissionsummary/submissionsummary.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdCheckboxModule, MdInputContainer, MaterialModule, MdDatepickerModule, MdNativeDateModule } from '@angular/material';
import 'hammerjs';
import { BilltodetailsComponent } from './addsample/billto/billtodetails/billtodetails.component';
import { CopytodetailsComponent } from './addsample/billto/copytodetails/copytodetails.component';
import { TabsModule } from 'ng2-tabs'

export const firebaseConfig = {
  apiKey: "AIzaSyBa6CmVnFn3vTdtyTBNj7GORku5nBM2cS8",
  authDomain: "angular2-8ec00.firebaseapp.com",
  databaseURL: "https://angular2-8ec00.firebaseio.com",
  projectId: "angular2-8ec00",
  storageBucket: "angular2-8ec00.appspot.com",
  messagingSenderId: "799946604634"
};
@NgModule({
  declarations: [
    AppComponent,
    BatchesComponent,
    SamplesComponent,
    SampleComponent,
    UnknownComponent,
    AddsampleComponent,
    BilltoComponent,
    SampledetailsComponent,
    PackageselectionComponent,
    AnalysisoptionsComponent,
    SubmissionsummaryComponent,
    BilltodetailsComponent,
    CopytodetailsComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    StoreModule.provideStore({ mainStoreReducer }),
    EffectsModule.run(MainEffects),
    //AngularFireModule.initializeApp(firebaseConfig), 
    RouterModule.forRoot(routes),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    BrowserAnimationsModule,
    MaterialModule,
    MdButtonModule,
    MdCheckboxModule,
    TabsModule, 
    MdNativeDateModule,
    ReactiveFormsModule
  ],
  providers: [LoaderService],
  bootstrap: [AppComponent]
})
export class AppModule {

}

