import { FC } from "react";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import tg_icon from "../../assets/images/tg_icon.png";
import { userRoutes } from "../../shared/consts/url/routes";
import { getUrlParams } from "../../shared/features/getUrlParams";
import { addCommentToBook } from "../../store/actions/comments";
import { addCommentToWork } from "../../store/actions/works";
import { IRootReducer } from "../../store/reducers";
import { AuthChecking } from "../AuthGuard/AuthChecking";
import { If } from "../If";
import { LoginForm } from "../LoginForm";
import "./AddComment.scss";

export const AddComment: FC<{ workId?: number; bookId: number }> = ({
  workId,
  bookId,
}) => {
  const { user } = useSelector((state: IRootReducer) => state.signUp);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [comment, setCommentData] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const commentField = useRef<any>();
  const location = useLocation();

  const urlParams = getUrlParams(location);
  const isAuthorized: boolean = AuthChecking();

  const addComment = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!isAuthorized) {
      setIsLoginModalOpen(true);
      return;
    }
    const commentInfo = {
      comment: comment.trim(),
      anonAuthor: user.accountName || "",
    };

    setCommentData("");

    if (commentInfo.comment) {
      if (location.pathname === userRoutes.works) {
        dispatch(addCommentToWork(workId ? workId : 1, commentInfo, urlParams));
        return;
      }
      dispatch(addCommentToBook(bookId, commentInfo));
      return;
    }

    setErrorMessage("Napisz komentarz");

    commentField.current.focus();
  };

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;

    setErrorMessage("");
    setCommentData(value);
  };

  return (
    <>
      <form onSubmit={(evt) => addComment(evt)} className="add_comment">
        <input
          type="text"
          placeholder="Napisz komentarz..."
          name="comment"
          value={comment}
          onChange={(evt) => handleChange(evt)}
          ref={commentField}
          required
        />

        <button type="submit">
          <img src={tg_icon} alt="No telegram" />
        </button>
      </form>

      <div className="error">{errorMessage}</div>
      <If condition={isLoginModalOpen}>
        <LoginForm handleLoginModal={() => setIsLoginModalOpen(false)} />
      </If>
    </>
  );
};
