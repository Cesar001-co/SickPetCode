import { FormBuilder, FormGroup } from '@angular/forms';
import { IngresarPageForm } from './ingresar.page.form';


describe('IngresarPageForm', () => {

    let ingresarPageForm: IngresarPageForm;
    let form: FormGroup;

    beforeEach(() => {
        ingresarPageForm = new IngresarPageForm(new FormBuilder());
        form = ingresarPageForm.createForm();
    });

    it('should create login form empty', () => {

        expect(form).not.toBeNull();
        expect(form.get('email')).not.toBeNull();
        expect(form.get('email').value).toEqual('');
        expect(form.get('email').valid).toBeFalsy();

        expect(form.get('password')).not.toBeNull();
        expect(form.get('password').value).toEqual('');
        expect(form.get('password').valid).toBeFalsy();
    });

    // it('should have email invalid if email is not valid'. () => {
    // });
});
