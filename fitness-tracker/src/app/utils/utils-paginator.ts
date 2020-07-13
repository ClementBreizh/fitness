import { MatPaginatorIntl, MatPaginator } from "@angular/material/paginator";
import { Injectable } from '@angular/core';

@Injectable()
export class MatPaginatorIntlFr extends MatPaginatorIntl {

    itemsPerPageLabel = 'Exercices par page';
    nextPageLabel  = 'Page suivante';
    previousPageLabel = 'Page précédente';

}