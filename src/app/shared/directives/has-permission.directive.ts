import { Directive, Input, OnInit, TemplateRef, ViewContainerRef, inject } from '@angular/core';
import { PermissionService } from '../../core/auth/permission.service';

@Directive({
  selector: '[hasPermission]',
  standalone: true,
})
export class HasPermissionDirective implements OnInit {
  @Input({ required: true }) hasPermission!: string | string[];

  private readonly vcr = inject(ViewContainerRef);
  private readonly tpl = inject(TemplateRef<any>);
  private readonly permService = inject(PermissionService);

  ngOnInit(): void {
    const permissions = Array.isArray(this.hasPermission)
      ? this.hasPermission
      : [this.hasPermission];
    if (this.permService.hasAnyPermission(permissions)) {
      this.vcr.createEmbeddedView(this.tpl);
    } else {
      this.vcr.clear();
    }
  }
}
