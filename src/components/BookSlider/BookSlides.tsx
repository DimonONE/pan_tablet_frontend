import { SplideSlide } from "@splidejs/react-splide";
import { FC } from "react";
import { IBook } from "../../store/reducers/book/interfaces";
import { Page } from "./Page";

interface IBookSlides {
  book: IBook;
  order: number;
}

export const BookSlides: FC<IBookSlides> = ({ book, order }) => (
  <SplideSlide>
    <div className="slide container">
      <div className="left_img">
        <Page
          link={
            book.leftImageResourceLink
              ? "https://api.pan-tablet.pl" + book.leftImageResourceLink
              : ""
          }
          title={book.leftNameAuthor}
          order={order}
        />
      </div>

      <div className="right_img">
        <Page
          link={
            book.rightImageResourceLink
              ? "https://api.pan-tablet.pl" + book.rightImageResourceLink
              : ""
          }
          title={book.rightNameAuthor}
          order={order}
        />
      </div>
    </div>
  </SplideSlide>
);
