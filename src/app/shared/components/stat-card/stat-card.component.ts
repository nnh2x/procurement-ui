import { Component, Input } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [NzCardModule, NzStatisticModule],
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.scss',
})
export class StatCardComponent {
  @Input() title = '';
  @Input() value = 0;
  @Input() color = '#1890ff';
}
