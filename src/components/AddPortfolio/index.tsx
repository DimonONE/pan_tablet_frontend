import './AddPortfolio.scss';
import { DragEvent, useState } from 'react';
import { RegistrationForm } from '../RegistrationForm';
import { useSelector } from 'react-redux';
import { AuthChecking } from '../AuthGuard/AuthChecking';
import { FoldersModalWindow } from '../FoldersModalWindow';
import { IRootReducer } from '../../store/reducers';
import { IBook } from '../../store/reducers/book/interfaces';
import { If } from '../If';
import { ButtonLogOut, ButtonShowForm } from './Buttons';

export const AddPortfolio = () => {

    const [book, setBook] = useState<IBook | null>(null);
    const [isModalOpened, setIsModalOpened] = useState(false);
    const [cardOpened, setCardOpened] = useState<boolean>(false);
    const [regFormOpened, setRegFormOpened] = useState<boolean>(false);
    const isAuthorized = AuthChecking();
    const text = isAuthorized
        ?
        'Przeciągnij księgę, aby dodać ją do teczki'
        :
        'Oceniaj, komentuj i wygrywaj nagrody!';

    const { books } = useSelector((state: IRootReducer) => state.books);

    const bookDrop = (event: DragEvent<HTMLSpanElement>) => {

        const bookIndex = parseInt(event.dataTransfer.getData('bookIndex'), 10);
        const book: IBook | null = books && books[bookIndex];

        if (!bookIndex && bookIndex !== 0) {
            return;
        }

        setBook(book);
        setIsModalOpened(true);
    };

    const dropAccess = (event: DragEvent<HTMLSpanElement>) => {
        if (isAuthorized) {
            event.preventDefault();
        }
    };

    const draggableText = (
        <span
            onDragOver={event => dropAccess(event)}
            onDrop={event => bookDrop(event)}
        >
            {text}
        </span>
    );

    const defaultCardElements = (
        <>
            {draggableText}
            <If
                condition={isAuthorized}
                anotherChildren={<ButtonShowForm setRegFormOpened={setRegFormOpened} />}
            >
                <ButtonLogOut />
            </If>
        </>
    );

    return (
        <>
            <div className={`add_portfolio_card ${!cardOpened && `hide_portfolio_card`}`}>
                <div className="header"
                    onClick={() => setCardOpened(!cardOpened)}
                >
                    <span>
                        Stwórz swoją teczkę z dziełami!
                    </span>
                </div>
                <div className="content">
                    <If
                        condition={regFormOpened}
                        anotherChildren={defaultCardElements}
                    >
                        <RegistrationForm parent={'AddPortfolio'} />
                    </If>
                </div>
            </div>

            <If condition={isModalOpened}>
                <FoldersModalWindow
                    setIsModalOpened={setIsModalOpened}
                    bookID={book?.id}
                />
            </If>
        </>
    )
};