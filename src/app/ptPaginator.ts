import { MatPaginatorIntl } from '@angular/material';

const dutchRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length === 0 || pageSize === 0) {
    return `0 van ${length}`;
  }

  length = Math.max(length, 0);

  const startIndex = page * pageSize;

  // If the start index exceeds the list length, do not try and fix the end index to the end.
  const endIndex = startIndex < length ?
    Math.min(startIndex + pageSize, length) :
    startIndex + pageSize;

  return `${startIndex + 1} - ${endIndex} de ${length}`;
};

export function getPtPaginator() {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.getRangeLabel = dutchRangeLabel;
  paginatorIntl.itemsPerPageLabel = 'Itens por página.';
  paginatorIntl.firstPageLabel = 'Primeira página.';
  paginatorIntl.previousPageLabel = 'Página anterior';
  paginatorIntl.nextPageLabel = 'Próxima página';
  paginatorIntl.lastPageLabel = 'Última página';

  return paginatorIntl;
}
