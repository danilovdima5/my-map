import { assertInInjectionContext, inject } from "@angular/core";
import { AuthForm } from "./auth-page.types";
import { FormBuilder, Validators } from "@angular/forms";

export function getAuthForm(): AuthForm {
    assertInInjectionContext(getAuthForm);

    const fb = inject(FormBuilder);

    const form = fb.group({
        email: fb.control('', {
            validators: [Validators.required, Validators.email],
            nonNullable: true,
        }),
        password: fb.control('', {
            validators: [Validators.required, Validators.minLength(6)],
            nonNullable: true,
        }),
    });

    return form;
}