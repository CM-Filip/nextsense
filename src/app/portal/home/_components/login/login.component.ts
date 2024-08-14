import { ChangeDetectionStrategy, Component, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbModalModule, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CustomValidators } from "@shared/_utils/forms/validators";

import { AuthService } from "@shared/_services/auth/auth.service";
import { CustomErrors } from "@shared/_utils/forms/errors";
import { debounceTime, distinctUntilChanged, Observable, shareReplay } from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    NgbModalModule,
    ReactiveFormsModule
  ],
  providers: []
})
export class LoginComponent implements OnInit {

  private _authService: AuthService = inject(AuthService);
  private _modalRef: NgbActiveModal = inject(NgbActiveModal);
  
  public form: FormGroup = new FormGroup({
    username: new FormControl<string | null>(null, {
      validators: [
        Validators.required,
        CustomValidators.lengthRange(4, 32)
      ]
    }),
    password: new FormControl<string | null>(null, {
      validators: [
        Validators.required,
        CustomValidators.lengthRange(4, 32)
      ]
    })
  });

  public valueChanges$: Observable<boolean> = this.form.valueChanges.pipe(
    debounceTime(150),
    distinctUntilChanged(),
    shareReplay(1)
  );

  ngOnInit(): void {
    
  }

  public login(): void {
    this._authService.login(this.form.value).subscribe((res) => {
      this._modalRef.close(res);
    })
  }

  public getError(controlName: string): string | null {
    return CustomErrors.first(this.form.controls[controlName]);
  }
}