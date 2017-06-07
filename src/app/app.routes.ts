import { SamplesComponent } from './batches/samples/samples.component';
import { BatchesComponent } from './batches/batches.component';
import { Routes } from "@angular/router"

export const routes: Routes = [
    { path: '', component: BatchesComponent  }, 
    { path: 'samples/:batch', component: SamplesComponent}
] 

