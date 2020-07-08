import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from '../exercise.model';
import { ExerciseService } from '../exercise.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorIntlFr } from 'src/app/utils/utils-paginator';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit {

  displayedColumns = ['date', 'duration', 'name', 'state', 'timer'];
  dataSource = new MatTableDataSource<Exercise>();
  customPaginator = new MatPaginatorIntlFr;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private exerciseService: ExerciseService) { }

  ngOnInit() {
    this.dataSource.data = this.exerciseService.getCompletOrCancelExercise();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.paginator._intl = this.customPaginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter= filterValue.trim().toLowerCase();
  }

  
}
