import { SplideSlide } from "@splidejs/react-splide";
import { FC } from "react";
import { IBook } from "../../store/reducers/book/interfaces";
import { If } from "../If";

export const ClosedBook: FC<{ book: IBook }> = ({ book }) => (
  <SplideSlide>
    <div className="closed_book container">
      <div className="title">{book.title}</div>
      <If condition={!!book?.link}>
        <If
          condition={!!book.link?.includes(".mp4")}
          anotherChildren={
            <img src={`https://api.pan-tablet.pl${book.link}`} alt="no book" />
          }
        >
          <video src={book.link} controls style={{ width: "40%" }} />
        </If>
      </If>
    </div>
  </SplideSlide>
);
