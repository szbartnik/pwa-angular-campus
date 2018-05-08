import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './user.service';
import { PersistenceService } from './persistence.service';

@NgModule({
  imports: [CommonModule]
})
export class CoreModule {

  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        UserService,
        PersistenceService
      ]
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (!parentModule) {
      return;
    }
    throw new Error('CoreModule is already loaded. Import it in the AppModule only');
  }
}
