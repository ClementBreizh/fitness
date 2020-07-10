import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from '../exercise.model';
import { ExerciseService } from '../exercise.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorIntlFr } from 'src/app/utils/utils-paginator';
import { Subscription } from 'rxjs';

import { AngularFireDatabase, AngularFireList }
  from 'angularfire2/database';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns = ['date', 'duration', 'name', 'timer', 'state', 'edit'];
  dataSource = new MatTableDataSource<Exercise>();
  customPaginator = new MatPaginatorIntlFr;
  private exercisesSubscription = new Subscription;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private exerciseService: ExerciseService, private af : AngularFireDatabase) { }

  afList: AngularFireList<Exercise[]>;
  
  ngOnInit() {
    this.exercisesSubscription = this.exerciseService.finishExercisesChanged
      .subscribe((exercises: Exercise[]) => {
        this.dataSource.data = exercises;
      });
    this.exerciseService.fetchGetCompletOrCancelExercise();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.paginator._intl = this.customPaginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    if (this.exercisesSubscription) {
      this.exercisesSubscription.unsubscribe();
    }

  }

  // deletePast(id: string) {
  //   this.exerciseService.deletePastExercice(id);
  // }

  deletePast(id: String) {
    this.af.object('/pastExercices' + id).remove();
  }
}
