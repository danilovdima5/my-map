import { FormControl, FormGroup } from "@angular/forms";
import { AuthService } from "@shared/services/auth/auth.service";

export type AuthForm = FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
}>;

export type AuthActions = keyof AuthService;