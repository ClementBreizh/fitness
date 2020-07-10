import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ExerciseService } from "./exercise.service";

interface Exercice {
}

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {

  ongoingTraining = false;
  exerciseSubsciption: Subscription;

  constructor(private exerciseService: ExerciseService) { }

  ngOnInit() {
    this.exerciseSubsciption = 
    this.exerciseService.exerciseChanged.subscribe(
      exercise => {
        if (exercise) {
          this.ongoingTraining = true;
        } else {
          this.ongoingTraining = false;
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.exerciseSubsciption) {
      this.exerciseSubsciption.unsubscribe();
      
    }
  }

}
