export const accountName: ISignUpField = {
    id: 'accountName',
    type: 'text',
    placeholder: 'Nazwa użytkownika',
    label: {
        htmlFor: 'accountName',
        value: 'Nazwa użytkownika:'
    }
};

export const age: ISignUpField = {
    id: 'age',
    type: 'text',
    placeholder: 'Wiek',
    parentClass: 'age',
    label: {
        htmlFor: 'age',
        value: 'Wiek:'
    }
};

export const email: ISignUpField = {
    id: 'email',
    type: 'email',
    placeholder: 'E-mail',
    parentClass: 'email',
    label: {
        htmlFor: 'email',
        value: 'E-mail:'
    }
};

export const password: ISignUpField = {
    id: 'password',
    type: 'password',
    placeholder: 'Hasło',
    parentClass: 'password',
    label: {
        htmlFor: 'password',
        value: 'Hasło:'
    }
};

export const confirmPassword: ISignUpField = { // don't display in page profile
    id: 'repeatedPassword',
    type: 'password',
    placeholder: 'Powtórz hasło',
    parentClass: 'confirm_password',
    label: {
        htmlFor: 'repeatedPassword',
        value: 'Powtórz hasło:'
    }
};

export const userTypes = [
    {
        input: {
            type: 'radio',
            name: 'role',
            id: 'child',
            value: 'CHILD'
        },
        label: {
            htmlFor: 'child',
            value: 'Dziecko'
        }
    },
    {
        input: {
            type: 'radio',
            name: 'role',
            id: 'parent',
            value: 'PARENT'
        },
        label: {
            htmlFor: 'parent',
            value: 'Rodzic'
        }
    },
    {
        input: {
            type: 'radio',
            name: 'role',
            id: 'teacher',
            value: 'TEACHER'
        },
        label: {
            htmlFor: 'teacher',
            value: 'Nauczyciel'
        }
    }
];

export interface IUserType {
    input: IInput,
    label: ILabel
}

interface IInput {
    type: string,
    name: string,
    id: string,
    value: string
}

export interface ISignUpField {
    id: string,
    type: string,
    placeholder: string,
    parentClass?: string,
    label?: ILabel
}

interface ILabel {
    htmlFor: string,
    value: string
}