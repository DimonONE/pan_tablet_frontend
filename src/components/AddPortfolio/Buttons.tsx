import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { FC } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { removeToken } from '../../store/actions/login';
import { dataFetched } from '../../store/actions/registration';
import { userRoutes } from '../../shared/consts/url/routes';

interface IButtonShowFormProps {
    setRegFormOpened: (state: boolean) => void
}

export const ButtonShowForm: FC<IButtonShowFormProps> = ({ setRegFormOpened }) => (

    <button onClick={() => setRegFormOpened(true)}>
        Dodaj teczkę
    </button>
);

export const ButtonLogOut = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const logOut = () => {

        dispatch(dataFetched());
        removeToken();

        history.push(`${userRoutes.registration}`);
    };

    return (

        <button onClick={logOut}>
            <FontAwesomeIcon
                icon={faPowerOff}
            /> Wyloguj
        </button>
    );
}