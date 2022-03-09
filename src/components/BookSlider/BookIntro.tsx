import { SplideSlide } from "@splidejs/react-splide";
import { FC } from "react";
import { IBook } from "../../store/reducers/book/interfaces";
import { If } from "../If";

export const BookIntro: FC<{ book: IBook }> = ({ book }) => (
  <SplideSlide>
    <div className="slide container">
      <div className="intro_slide">
        <div className="description">
          <div className="header">Historia i problem:</div>
          <div className="content">
            {book.history}
            <br />
            <br />
            {book.description}
          </div>
        </div>

        <div className="author">
          <div className="info">
            <span>Lekcję zorganizował i poprowadził animator </span>
            {book.id_animator?.name} {book.id_animator?.surname}
          </div>
          <If condition={!!book?.id_animator?.resource_link_animator}>
            <img
              src={`https://api.pan-tablet.pl${book?.id_animator?.resource_link_animator}`}
              alt="no avatar"
            />
          </If>
          <div className="info">oraz wychowawca klasy</div>
        </div>
      </div>
    </div>
  </SplideSlide>
);
