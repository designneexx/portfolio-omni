export enum EForm {
    Email = 'email'
}

export interface IForm {
    [EForm.Email]: string;
}

export type FormKeys = `${EForm}`;
