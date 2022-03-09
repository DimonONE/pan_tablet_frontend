export const changePasswordFields = [
    {
        id: 'oldPassword',
        type: 'password',
        placeholder: 'Hasło',
        parentClass: 'change_pwd',
        label: {
            htmlFor: 'oldPassword',
            value: 'Stare hasło:'
        }
    },
    {
        id: 'newPassword',
        type: 'password',
        placeholder: 'Hasło',
        parentClass: 'change_pwd',
        label: {
            htmlFor: 'newPassword',
            value: 'Nowe hasło:'
        }
    },
    {
        id: 'repeatNewPassword',
        type: 'password',
        placeholder: 'Powtórz hasło',
        parentClass: 'change_pwd',
        label: {
            htmlFor: 'repeatNewPassword',
            value: 'Powtórz nowe hasło:'
        }
    }
];