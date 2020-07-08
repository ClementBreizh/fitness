import { Exercise } from "./exercise.model";
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';

export class ExerciseService {
    exerciseChanged = new Subject<Exercise>();
    private availableExercises: Exercise[] = [
        { id: 'abdos', name: 'Abdos', duration: 50},
        { id: 'pompes', name: 'Pompes', duration: 50 },
        { id: 'gainage', name: 'Gainage (min)', duration: 2 },
        { id: 'burpees', name: 'Burpees', duration: 30 }
    ];

    private runningExercise: Exercise;
    private exercises: Exercise[]= [];


    getAvailableExercices() {
        return this.availableExercises.slice();
        // slice crée une copie sans affecter l'original
    }

    startExercise(selectedId: string) {
        this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
        this.exerciseChanged.next({ ...this.runningExercise });
    }

    getRunningExercise() {
        return { ...this.runningExercise };
    }

    completedExercise(minutes: number, secondes: number) {
        this.exercises.push(
            {...this.runningExercise,
                duration: this.runningExercise.duration,
                date: new Date(), 
                state: 'fini',
                minutes: minutes,
                secondes: secondes
            }
        );
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    canceledExercise(minutes: number, secondes: number) {
        this.exercises.push(
            {...this.runningExercise, 
                date: new Date(), 
                state: 'annulé',
                minutes: minutes,
                secondes: secondes
            }
        );
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    getCompletOrCancelExercise() {
        return this.exercises.slice();
    }
}   