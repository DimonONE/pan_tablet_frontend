import './Folder.scss';
import { FC } from 'react';
import { IFolder } from '../../store/reducers/book/interfaces';
import { useLocation } from 'react-router';
import { userRoutes } from '../../shared/consts/url/routes';

interface IListFolders {
    folder: IFolder,
    action: (id: number) => void
}

export const Folder: FC<IListFolders> = ({ folder, action }) => {
    const { pathname } = useLocation();
    const buttonText = (pathname === userRoutes.folders)
        ?
        'Otwórz'
        :
        'WYBIERZ';

    return (
        <div className="folder">
            <div className="folder_name">
                {folder.name}
            </div>

            <button onClick={() => action(folder.id)}>
                {buttonText}
            </button>
        </div>
    )
}
