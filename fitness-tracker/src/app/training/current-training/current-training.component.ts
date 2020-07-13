import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { StopTrainingComponent } from './stop-training.components';
import { ExerciseService } from '../exercise.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  secondes = 0;
  minutes = 0;
  timer: number;
 

  @Output() trainingExit = new EventEmitter();
  

  constructor(private dialog: MatDialog, private exerciseService: ExerciseService, private authService: AuthService) { }

  ngOnInit() {
    this.startTimer();
  }

  startTimer () {
    this.timer = setInterval(() => {
      this.secondes = this.secondes + 1;
      if (this.secondes >= 60) {
        this.secondes = 0
        this.minutes++;
      }
    }, 1000)
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        minutes: this.minutes,
        secondes: this.secondes
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.exerciseService.completedExercise(this.minutes, this.secondes);
      } else {
        this.exerciseService.canceledExercise(this.minutes, this.secondes);
      }

    });
  }
}
