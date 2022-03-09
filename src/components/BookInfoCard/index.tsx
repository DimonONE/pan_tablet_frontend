import "./BookInfoCard.scss";
import iconLike from "../../assets/images/hand_like.png";
import iconFB from "../../assets/images/fb.png";
import { ListComments } from "../ListComments";
import { AddComment } from "../AddComment";
import { FC, useState } from "react";
import { IBook } from "../../store/reducers/book/interfaces";
import { getUrlParams } from "../../shared/features/getUrlParams";
import { useLocation } from "react-router";
import { getLikes, isBookLiked } from "../../store/actions/bookLike";
import { useDispatch, useSelector } from "react-redux";
import { FacebookShareButton } from "react-share";
import { useEffect } from "react";
import { IRootReducer } from "../../store/reducers";
import { If } from "../If";
import { LoginForm } from "../LoginForm";
import { AuthChecking } from "../AuthGuard/AuthChecking";
import { getCommentsByBookId } from "../../store/actions/comments";

export const BookInfoCard: FC<{ book: IBook | any }> = ({ book }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { likesQuantity } = useSelector(
    (state: IRootReducer) => state.bookLike
  );

  const handleLike = () => {
    const isAuthorized = AuthChecking();

    if (!isAuthorized) {
      setIsLoginModalOpen(true);
      return;
    }
    const urlParams = getUrlParams(location);

    dispatch(isBookLiked(book.id, urlParams));
  };

  useEffect(() => {
    if (book?.id) {
      dispatch(getLikes(book?.id));
      dispatch(getCommentsByBookId(book.id));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [book?.id]);

  const share = `https://pracedzieci.pan-tablet.pl/#/book?bookId=${book?.id}`;
  return (
    <div className="info_table">
      <div className="actions">
        <div className="likes" onClick={handleLike}>
          <img src={iconLike} alt="no like" />
          <span className="likes_quan">{likesQuantity}</span>
        </div>

        <FacebookShareButton url={share || "https://pan-tablet.pl/"}>
          <div className="share_via_fb">
            <img src={iconFB} alt="no FB" /> Udostepnij
          </div>
        </FacebookShareButton>
      </div>

      <AddComment bookId={book?.id} />

      <ListComments />

      <If condition={isLoginModalOpen}>
        <LoginForm handleLoginModal={() => setIsLoginModalOpen(false)} />
      </If>
    </div>
  );
};
