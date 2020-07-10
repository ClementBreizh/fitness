import { NgModule } from "@angular/core";
import { TrainingComponent } from './training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '../utils/shared.modules';
import { StopTrainingComponent } from './current-training/stop-training.components';
import { TrainingRoutingModule } from "./training-routing.module";


@NgModule({
    declarations: [
        TrainingComponent,
        CurrentTrainingComponent,
        NewTrainingComponent,
        PastTrainingComponent,
        StopTrainingComponent,
    ],
    imports: [
        MatDialogModule,
        SharedModule,
        TrainingRoutingModule
    ],
    exports: []
})
export class TrainingModule { }