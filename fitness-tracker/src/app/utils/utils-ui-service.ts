import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class uiService {
    loadingSpinner = new Subject<boolean>();

    constructor(private snackBar: MatSnackBar) { }

    showSnackbar(message, action, duration) {
        this.snackBar.open(message, action,
            { duration: duration }
        );

    }



}