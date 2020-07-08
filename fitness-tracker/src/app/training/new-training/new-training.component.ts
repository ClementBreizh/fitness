import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ExerciseService } from '../exercise.service';
import { Exercise } from '../exercise.model';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  @Output() trainingStart = new EventEmitter<void>();

  exercises: Exercise[] = [];
  
  constructor(private exerciseService: ExerciseService) { }

  ngOnInit(): void {
    this.exercises = this.exerciseService.getAvailableExercices();
  }
  onStartTraining() {
    this.trainingStart.emit();
  }

}
