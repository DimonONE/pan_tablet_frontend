import { FC } from 'react';
import { IBook } from '../../store/reducers/book/interfaces';
import { BookIntro } from './BookIntro';
import { BookSlides } from './BookSlides';
import { ClosedBook } from './ClosedBook';

export const RenderWorks: FC<{ books: IBook[] }> = ({ books }) => {

    if (!books) {
        return <></>;
    }

    return (
        <>
            {books?.map((book: IBook, i: number) => {
                if (i === 0) {
                    return <ClosedBook key={i} book={book} />;
                }

                if (i === 1) {
                    return <BookIntro key={i} book={book} />;
                }

                return <BookSlides key={i} book={book} order={i} />;
            })}
        </>
    );
};