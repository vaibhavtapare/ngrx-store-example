import { SubmissionsummaryComponent } from './addsample/submissionsummary/submissionsummary.component';
import { AnalysisoptionsComponent } from './addsample/analysisoptions/analysisoptions.component';
import { PackageselectionComponent } from './addsample/packageselection/packageselection.component';
import { SampledetailsComponent } from './addsample/sampledetails/sampledetails.component';
import { BilltoComponent } from './addsample/billto/billto.component';
import { AddsampleComponent } from './addsample/addsample.component';
import { UnknownComponent } from './unknown/unknown.component';
import { SampleComponent } from './batches/sample/sample.component';
import { SamplesComponent } from './batches/samples/samples.component';
import { BatchesComponent } from './batches/batches.component';
import { Routes } from "@angular/router"

export const routes: Routes = [
    { path: '', component: BatchesComponent },
    { path: 'samples/:batch', component: SamplesComponent },
    { path: 'sample/:batch/:code', component: SampleComponent },
    {
        path: 'addsample/:labid',
        children: [
            { path: '',  pathMatch: 'full',component: AddsampleComponent },           
            { path: 'billto', component: BilltoComponent },
            { path: 'sampledetails', component: SampledetailsComponent },
            { path: 'packageselection', component: PackageselectionComponent },
            { path: 'analysisoption', component: AnalysisoptionsComponent },
            { path: 'submissionsummary', component: SubmissionsummaryComponent }
        ]
    },
    { path: '**', component: UnknownComponent }
]

