import { Exercise } from "./exercise.model";

export class ExerciseService {
    private availableExercises: Exercise[] = [
        { id: 'abdos', name: 'Abdos', duration: 50 },
        { id: 'pompes', name: 'Pompes', duration: 50 },
        { id: 'gainage', name: 'minutes de Gainage', duration: 2 },
        { id: 'burpees', name: 'Burpees', duration: 30 }
    ];

    private runningExercise: Exercise;

    getAvailableExercices() {
        return this.availableExercises.slice();
        // slice crée une copie sans affecter l'original
    }

    startExercise(selectedId: string) {
        this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId)
    }
}   