import './FoldersModalWindow.scss';
import closeIcon from '../../assets/images/close.png';
import { FC } from 'react';
import { CreatingFolderForm } from '../CreatingFolderForm';
import { useDispatch } from 'react-redux';
import { addBookToFolder, addedBookToFolder } from '../../store/actions/folders';
import { FoldersList } from '../FoldersList';
import { closeModalWindow } from '../../shared/features/closeModalWindow';

interface IFoldersModalWindow {
    setIsModalOpened: (state: boolean) => void,
    bookID?: number
}

export const FoldersModalWindow: FC<IFoldersModalWindow> = ({
    setIsModalOpened,
    bookID
}) => {
    const dispatch = useDispatch();

    const addingBookToFolder = (folderID: number) => {

        dispatch(addBookToFolder(folderID, setIsModalOpened, bookID));
    };

    return (
        <div className="folders_modal">
            <div
                className="overlay"
                onClick={() => dispatch(closeModalWindow(addedBookToFolder, setIsModalOpened))}
            />

            <div className="popup">

                <img
                    onClick={() => dispatch(closeModalWindow(addedBookToFolder, setIsModalOpened))}
                    className="close"
                    src={closeIcon}
                    alt="no Close Icon"
                />
                <FoldersList ButtonAction={addingBookToFolder} />
                <CreatingFolderForm cancel={setIsModalOpened} />
            </div>
        </div>
    );
}