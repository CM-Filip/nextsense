import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ContactRepoService } from "@shared/_services/contact/contact.repo.service";

import { CustomValidators } from "@shared/_utils/forms/validators";
import { CustomErrors } from "@shared/_utils/forms/errors";
import { ToastService } from "@shared/_services/toast/toast.service";

@Component({
  selector: 'app-contact',
  templateUrl: 'contact.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  providers: []
})
export class ContactComponent {

  private _contactRepoService: ContactRepoService = inject(ContactRepoService);
  private _toastService: ToastService = inject(ToastService);

  public form: FormGroup = new FormGroup({
    name: new FormControl<string | null>(null, {
      validators: [
        Validators.required,
        CustomValidators.lengthRange(2, 64)
      ]
    }),
    email: new FormControl<string | null>(null, {
      validators: [
        Validators.required,
        CustomValidators.lengthRange(6, 64),
        CustomValidators.email
      ]
    }),
    phone: new FormControl<string | null>(null, {
      validators: [
        Validators.required,
        CustomValidators.phone
      ]
    }),
    message: new FormControl<string | null>(null, {
      validators: [
        Validators.required,
        CustomValidators.wordCountRange(8, 128)
      ]
    })
  });

  public submit(): void {
    /* Can be reworked to avoid subscribing, subscription also needs to be cleared */
    this._contactRepoService.contact(this.form.getRawValue()).subscribe((res) => {
      this.form.reset();
      this._toastService.next({
        message: 'Message sent successfully.',
        classname: 'bg-success',
        duration: 2000
      })
    });
  }

  public getError(controlName: string): string | null {
    return CustomErrors.first(this.form.controls[controlName]);
  }
}