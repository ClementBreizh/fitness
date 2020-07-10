import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExerciseService } from '../exercise.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy, OnDestroy {

  exercises: Exercise[];
  exercisesSubscription = new Subscription;

  constructor(private exerciseService: ExerciseService) { }

  ngOnInit() {
    this.exercisesSubscription =
      this.exerciseService.exercisesChanged.subscribe(
        exercises => (this.exercises = exercises)
      );
    this.fetchExercises();
  }

  onStartTraining(form: NgForm) {
    this.exerciseService.startExercise(form.value.choiceExercise)

  }

  fetchExercises() {
    this.exerciseService.fetchAvailableExercices();
  }

  ngOnDestroy() {
    if (this.exercisesSubscription) {
      this.exercisesSubscription.unsubscribe();
    }

  }

}
