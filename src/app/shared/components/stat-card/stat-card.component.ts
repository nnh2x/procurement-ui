import { Component, Input } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [NzIconModule],
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.scss',
})
export class StatCardComponent {
  @Input() title = '';
  @Input() value: number | string = 0;
  @Input() icon = 'bar-chart';
  @Input() color = '#6366f1';
  @Input() trend: 'up' | 'down' | null = null;
  @Input() trendLabel = '';
  @Input() subtitle = '';
}
