import { Exercise } from "./exercise.model";
import { Subject, Subscription } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { map } from "rxjs/operators/map";
import { Injectable } from '@angular/core';
import { uiService } from '../utils/utils-ui-service';



@Injectable()
export class ExerciseService {
    exerciseChanged = new Subject<Exercise>();
    exercisesChanged = new Subject<Exercise[]>();
    finishExercisesChanged = new Subject<Exercise[]>();
    private availableExercises: Exercise[] = [];
    private runningExercise: Exercise;
    private fdSubs: Subscription[] = [];

    constructor(
        private db: AngularFirestore, 
        private af: AngularFireDatabase,
        private uiService: uiService) { }


    fetchAvailableExercices() {
        this.fdSubs.push(this.db
            .collection('availableExercises')
            .snapshotChanges().pipe(map(docArray => {
                return docArray.map(doc => {
                    return {
                        id: doc.payload.doc.id,
                        name: doc.payload.doc.data()['name'],
                        duration: doc.payload.doc.data()['duration']
                    };
                });
            })).subscribe((exercises: Exercise[]) => {
                this.availableExercises = exercises;
                this.exercisesChanged.next([...this.availableExercises]);
            }, error => {
                this.uiService.showSnackbar(
                    'Le chargement des exercices à échouer merci de patienter',
                    null ,5000);
                this.exerciseChanged.next(null);    
            }));
    }

    startExercise(selectedId: string) {
        this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
        this.exerciseChanged.next({ ...this.runningExercise });
    }

    getRunningExercise() {
        return { ...this.runningExercise };
    }

    completedExercise(minutes: number, secondes: number) {
        this.addDataToDatabase(
            {
                ...this.runningExercise,
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
        this.addDataToDatabase(
            {
                ...this.runningExercise,
                date: new Date(),
                state: 'annulé',
                minutes: minutes,
                secondes: secondes
            }
        );
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    fetchGetCompletOrCancelExercise() {
       this.fdSubs.push(this.db
            .collection('pastExercices')
            .valueChanges()
            .subscribe((exercises: Exercise[]) => {
                this.finishExercisesChanged.next(exercises);
            }));
    }

    private addDataToDatabase(exercise: Exercise) {
        this.db.collection('pastExercices').add(exercise);
    }


    // TODO : faire une fois l'auth côté FIREBASE en place 
    deletePastExercice(id: string) {
        this.db.collection('pastExercices').doc(id).delete()
            .then(function () {
                console.log("Success");
            }).catch(function (error) {
                console.error("epic fail", error);
            });
        
        this.af.object('/pastExercices/' + id).remove();

    }

    cancelSubscription() {
        this.fdSubs.forEach(sub => sub.unsubscribe());
    }

}   