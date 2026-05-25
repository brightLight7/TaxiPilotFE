import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnChanges, OnInit {
  @Input() dbObj: any = {};  // The JSON object received from API
  dynamicForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dbObj']?.currentValue && typeof this.dbObj === 'object') {
      this.createForm();
    }
  }

  private createForm(): void {
    const formControls: any = {};

    if (this.dbObj) {
      Object.keys(this.dbObj).forEach(key => {
        formControls[key] = new FormControl(this.dbObj[key] || '', this.getValidators(key));
      });
    }

    this.dynamicForm = this.fb.group(formControls);
  }

  getObjectKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }

  private getValidators(field: string) {
    const validators = [];
    if (field.toLowerCase().includes('email')) {
      validators.push(Validators.required, Validators.email);
    }
    if (field.toLowerCase().includes('password')) {
      validators.push(Validators.required, Validators.minLength(6));
    }
    return validators.length > 0 ? validators : null;
  }

  getFieldType(field: string): string {
    if (field.toLowerCase().includes('email')) return 'email';
    if (field.toLowerCase().includes('password')) return 'password';
    if (field.toLowerCase().includes('phone')) return 'tel';
    return 'text';
  }

  onSubmit() {
    if (this.dynamicForm.valid) {
      console.log('Form Submitted:', this.dynamicForm.value);
    } else {
      console.log('Form Invalid:', this.dynamicForm);
    }
  }
}
