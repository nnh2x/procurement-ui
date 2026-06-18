import { Pipe, PipeTransform } from '@angular/core';

export type PrStatus = 'Draft' | 'Submitted' | 'Approved' | 'Rejected';

const STATUS_LABELS: Record<PrStatus, string> = {
  Draft: 'Draft',
  Submitted: 'Pending Approval',
  Approved: 'Approved',
  Rejected: 'Rejected',
};

@Pipe({ name: 'prStatusLabel', standalone: true })
export class PrStatusLabelPipe implements PipeTransform {
  transform(status: PrStatus): string {
    return STATUS_LABELS[status] ?? status;
  }
}
