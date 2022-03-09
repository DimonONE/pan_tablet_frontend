import "./PopupImage.scss";
import { FC, useEffect } from "react";
import { renderVideoType } from "../../shared/features/checkVideoType";
import { useDispatch, useSelector } from "react-redux";
import { getWork } from "../../store/actions/book";
import { IRootReducer } from "../../store/reducers";
import { WorkInfoCard } from "../WorkInfoCard";

interface IPopupImage {
  setIsModalOpened?: (state: boolean) => void;
  links: string[];
  bookId: number;
  workId: number;
}
export const PopupImage: FC<IPopupImage> = ({
  setIsModalOpened,
  links,
  bookId,
  workId,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getWork(workId));
  }, []);

  const { book } = useSelector((state: IRootReducer) => state.book);

  return (
    <div className="img_viewer_container">
      <div
        className="overlay"
        onClick={() => setIsModalOpened && setIsModalOpened(false)}
      ></div>

      <div className="popup">
        <div
          onClick={() => setIsModalOpened && setIsModalOpened(false)}
          className="close"
        >
          &times;
        </div>

        {renderVideoType(links)}
        <WorkInfoCard book={book} workId={workId} />
      </div>
    </div>
  );
};
