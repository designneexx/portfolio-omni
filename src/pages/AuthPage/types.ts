export enum EForm {
    Email = 'email',
    Password = 'password'
}

export interface IForm {
    [EForm.Email]: string;
    [EForm.Password]: string;
}

export type FormKeys = `${EForm}`;
