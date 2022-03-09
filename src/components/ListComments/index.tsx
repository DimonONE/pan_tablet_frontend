import { FC } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { userRoutes } from "../../shared/consts/url/routes";
import { secondsToExactDate } from "../../shared/features/secondsToDate";
import { IRootReducer } from "../../store/reducers";
import { IComment } from "../../store/reducers/comments/interface";
import "./ListComments.scss";

export const ListComments: FC<{ workComments?: IComment[] }> = ({
  workComments,
}) => {
  const { pathname } = useLocation();
  const { bookComments, errorMessage, errorStatus } = useSelector(
    (state: IRootReducer) => state.comments
  );

  if (errorStatus) {
    return <div className="error">{errorMessage}</div>;
  }
  const comments = pathname === userRoutes.works ? workComments : bookComments;

  if (comments?.length) {
    return (
      <div className="comments">
        <ul>
          {comments.map((commentData: IComment) => (
            <li key={commentData.id}>
              <div className="date_author">
                {`${secondsToExactDate(commentData.creationDate)}
                                        ${
                                          commentData?.author?.accountName || ""
                                        }`}
              </div>

              <div className="text">{commentData.comment}</div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return <></>;
};
