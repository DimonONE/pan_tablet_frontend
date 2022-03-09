import "./workInfoCard.scss";
import iconLike from "../../assets/images/hand_like.png";
import iconFB from "../../assets/images/fb.png";
import { ListComments } from "../ListComments";
import { AddComment } from "../AddComment";
import { FC, useState } from "react";
import { IBook } from "../../store/reducers/book/interfaces";
import { getUrlParams } from "../../shared/features/getUrlParams";
import { useLocation } from "react-router";
import { getWorkLikes } from "../../store/actions/bookLike";
import { useDispatch, useSelector } from "react-redux";
import { FacebookShareButton } from "react-share";
import { useEffect } from "react";
import { IRootReducer } from "../../store/reducers";
import { If } from "../If";
import { LoginForm } from "../LoginForm";
import { AuthChecking } from "../AuthGuard/AuthChecking";
import { getCommentsByWorkId, isWorkLiked } from "../../store/actions/works";

export const WorkInfoCard: FC<{ book: IBook | any; workId: number }> = ({
  book,
  workId,
}) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleLike = () => {
    const isAuthorized = AuthChecking();

    if (!isAuthorized) {
      setIsLoginModalOpen(true);
      return;
    }
    const urlParams = getUrlParams(location);

    dispatch(isWorkLiked(workId, urlParams));
  };

  useEffect(() => {
    if (workId) {
      dispatch(getWorkLikes(workId));
      dispatch(getCommentsByWorkId(workId));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [book[0]?.id]);

  const { likesQuantity } = useSelector(
    (state: IRootReducer) => state.bookLike
  );

  const { bookComments } = useSelector((state: IRootReducer) => state.comments);

  const param = new URLSearchParams(location.search);
  const share = `https://pracedzieci.pan-tablet.pl/#/works?${param}`;

  return (
    <div className="info_table_work">
      <div className="actions">
        <div className="likes" onClick={handleLike}>
          <img src={iconLike} alt="no like" />
          <span className="likes_quan">{likesQuantity && likesQuantity}</span>
        </div>

        <FacebookShareButton url={share || "https://pan-tablet.pl/"}>
          <div className="share_via_fb">
            <img src={iconFB} alt="no FB" /> Udostepnij
          </div>
        </FacebookShareButton>
      </div>

      <AddComment workId={workId} bookId={book[0]?.id} />

      <ListComments workComments={bookComments} />

      <If condition={isLoginModalOpen}>
        <LoginForm handleLoginModal={() => setIsLoginModalOpen(false)} />
      </If>
    </div>
  );
};
