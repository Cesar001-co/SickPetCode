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
            password:['', [Validators.required, Validators.minLength(6)]],
            repeatPassword:['', [Validators.required]],
            numDoc:['', [Validators.required, Validators.minLength(10)]],
            numCel:['', [Validators.required, Validators.minLength(10)]]
        });
    }
}
