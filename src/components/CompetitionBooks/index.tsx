import "./CompetitionBooks.scss";
import iconLike from "../../assets/images/hand_like.png";
import iconFB from "../../assets/images/fb.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointer } from "@fortawesome/free-solid-svg-icons";
import { Route, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AddComment } from "../AddComment";
import { isBookLiked } from "../../store/actions/bookLike";
import { DragEvent, FC, useState } from "react";
import { IBook } from "../../store/reducers/book/interfaces";
import { secondsToDate } from "../../shared/features/secondsToDate";
import { getUrlParams } from "../../shared/features/getUrlParams";
import { FacebookShareButton } from "react-share";
import { userRoutes } from "../../shared/consts/url/routes";
import { IWork } from "../../store/reducers/works/interfaces";
import { DynamicMediaElement } from "../DynamicMediaElement";
import { isWorkLiked } from "../../store/actions/works";
import { FoldersModalWindow } from "../FoldersModalWindow";
import { LoginForm } from "../LoginForm";
import { AuthChecking } from "../AuthGuard/AuthChecking";
import { If } from "../If";
import cloud1 from "../../assets/images/cloud1.svg";
import cloud2 from "../../assets/images/cloud2.svg";
import cloud3 from "../../assets/images/cloud3.svg";
import { IRootReducer } from "../../store/reducers";

interface IProps {
  book: IBook | IWork;
  userRole?: string;
  index?: number;
  folderID?: number;
  rewardIndex: number;
}

export const CompetitionBooks: FC<IProps> = ({
  folderID,
  book,
  userRole,
  index,
  rewardIndex,
}) => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isFoldersModalOpened, setIsFoldersModalOpened] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const isChild = "CHILD" === userRole;
  const { currentPage, params } = getUrlParams(location);
  const isAuthorized = AuthChecking();

  const { competition } = useSelector(
    (state: IRootReducer) => state.competition
  );

  const handleLike = () => {
    const isAuthorized = AuthChecking();

    if (!isAuthorized) {
      setIsLoginModalOpen(true);
      return;
    }

    const urlParams = getUrlParams(location);

    if (location.pathname === userRoutes.works) {
      dispatch(isWorkLiked(book.id, urlParams));
      return;
    }
    dispatch(isBookLiked(book.id, urlParams, folderID));
  };

  const setData = (event: DragEvent<HTMLSpanElement>) => {
    event.dataTransfer.setData("bookIndex", `${index}`);
  };

  const openBook = () => {
    if (location.pathname !== userRoutes.works) {
      history?.push(`${userRoutes.book}?bookId=${book.id}`);
    }
  };

  const shareLink = `https://pracedzieci.pan-tablet.pl/#/book?bookId=${book.id}`;

  const imgLinks = [book.link || "", book.linkTwo || "", book.linkThree || ""];
  const imgList = competition?.rewards.map((item, index) => item.pictureUrl);

  return (
    <div className="competition__page">
      <div className="competitionBooks_container">
        <div
          draggable={location.pathname !== userRoutes.mainPage}
          onDragStart={(event) => setData(event)}
          onClick={openBook}
          className={`work_contentCompetition 
          ${
            book.book || location.pathname === "/winners"
              ? `bg_imageCompetition draggableCompetition`
              : `work_img_full_width`
          }`}
        >
          <div className="title">{book.title || ""}</div>

          <div className="img_containerCompetition">
            {/* <If condition={book.book}> */}
            <button>
              <DynamicMediaElement links={imgLinks} />
            </button>
            {/* </If> */}

            <If condition={!book.book}>
              <button onClick={() => setIsModalOpened(!isModalOpened)}>
                <DynamicMediaElement links={[book.resourceLink || ""]} />
              </button>
            </If>
          </div>
          {rewardIndex === 0 && currentPage === "0,15" && (
            <div>
              <img
                src={imgList && `https://api.pan-tablet.pl${imgList[0]}`}
                className="competition_img_one"
              />
              {competition?.rewards[0].description ? (
                <img src={cloud1} alt="no cloud" className="cloud"></img>
              ) : (
                ""
              )}
              {competition?.rewards[0] ? (
                <div className="description">
                  {competition?.rewards[0].description}
                </div>
              ) : (
                ""
              )}
            </div>
          )}
          {rewardIndex === 1 && currentPage === "0,15" && (
            <>
              <img
                src={imgList && `https://api.pan-tablet.pl${imgList[1]}`}
                className="competition_img_two"
              />
              {competition?.rewards[1].description ? (
                <img src={cloud2} alt="no cloud" className="cloud"></img>
              ) : (
                ""
              )}
              {competition?.rewards[1] ? (
                <div className="description">
                  {competition?.rewards[1].description}
                </div>
              ) : (
                ""
              )}
            </>
          )}
          {rewardIndex === 2 && currentPage === "0,15" && (
            <>
              <img
                src={imgList && `https://api.pan-tablet.pl${imgList[2]}`}
                className="competition_img_three"
              />
              {competition?.rewards[2] ? (
                <img src={cloud3} alt="no cloud" className="cloud"></img>
              ) : (
                ""
              )}
              {competition?.rewards[2]?.description ? (
                <div className="description">
                  {competition?.rewards[2].description}
                </div>
              ) : (
                ""
              )}
            </>
          )}
        </div>

        <div>
          <div className="info">
            <div className="date_view">
              <span className="date">{secondsToDate(book.uploadDate)}</span>
              <span className="view">
                {book.views} <FontAwesomeIcon icon={faHandPointer} />
              </span>
            </div>

            <If condition={location.pathname !== userRoutes.works}>
              <div onClick={handleLike} className="likes">
                {book.totalLikes}
                <img src={iconLike} alt="No Like Icon" />
              </div>
            </If>

            <FacebookShareButton url={shareLink || "https://pan-tablet.pl/"}>
              <div className="socNet">
                <img src={iconFB} alt="No FB Icon" />
                Udostępnij
              </div>
            </FacebookShareButton>
          </div>

          <div className="actions">
            <If
              condition={
                isAuthorized &&
                location.pathname !== userRoutes.works &&
                location.pathname !== userRoutes.folders
              }
            >
              <button
                onClick={() => setIsFoldersModalOpened(true)}
                className="save_book"
              >
                Dodaj do teczki
              </button>
            </If>
            <Route path={userRoutes.works}>
              <button
                onClick={() => setIsModalOpened(!isModalOpened)}
                className="open full_width"
              >
                Otwórz pracę
              </button>
            </Route>
            <If condition={location.pathname !== userRoutes.works}>
              <button
                onClick={openBook}
                className={`open 
              ${!isAuthorized && "full_width"}
              ${location.pathname === userRoutes.folders && "full_width"}`}
              >
                Otwórz księgę
              </button>
            </If>
          </div>

          <div className="school">
            <span>Szkoła:</span> {book.school}
          </div>

          <div className="mark">
            <span>Klasa:</span> {book.classroom}
          </div>

          <AddComment bookId={book.id} />
        </div>

        <If condition={location.pathname !== userRoutes.works}>
          <div onClick={handleLike} className="likes secondary">
            <h1>{book.totalLikes}</h1> <img src={iconLike} alt="No Like Icon" />
          </div>
        </If>
      </div>

      <If condition={isFoldersModalOpened}>
        <FoldersModalWindow
          setIsModalOpened={setIsFoldersModalOpened}
          bookID={book.id}
        />
      </If>

      <If condition={isLoginModalOpen}>
        <LoginForm handleLoginModal={() => setIsLoginModalOpen(false)} />
      </If>

      {/* <If condition={isModalOpened || false}>
        <PopupImage
          links={[book.resourceLink || ""]}
          setIsModalOpened={setIsModalOpened}
        />
      </If> */}
    </div>
  );
};
