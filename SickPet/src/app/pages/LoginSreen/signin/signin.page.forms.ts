import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class IngresarPageForm {

    private formBuilder: FormBuilder;

    constructor(formBuilder: FormBuilder){
        this.formBuilder = formBuilder;
    }

    createForm(): FormGroup{
        return this.formBuilder.group({
            nombre:['', [Validators.required]],
            apellidos:['', [Validators.required]],
            email:['', [Validators.required, Validators.email]],
            password1:['', [Validators.required]],
            password2:['', [Validators.required]],
            numero1:['', [Validators.required]],
            numero2:['', [Validators.required]]
        });
    }
}
