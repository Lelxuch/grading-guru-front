import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-new-company',
  templateUrl: './new-company.component.html',
  styleUrls: ['./new-company.component.scss']
})
export class NewCompanyComponent {

  companyForm: FormGroup;

  formOffset = 2;

  constructor(
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.companyForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      description: [null],
    });
  }

  submit(): void {
    if (this.companyForm.valid) {
      console.log('submit', this.companyForm.value);
    } else {
      Object.values(this.companyForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
