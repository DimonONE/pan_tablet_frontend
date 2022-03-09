import "./Work.scss";
import iconLike from "../../assets/images/hand_like.png";
import iconFB from "../../assets/images/fb.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointer } from "@fortawesome/free-solid-svg-icons";
import { Route, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AddComment } from "../AddComment";
import { isBookLiked } from "../../store/actions/bookLike";
import { DragEvent, FC, useEffect, useRef, useState } from "react";
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
import { PopupImage } from "../PopupImage";
import { Helmet } from "react-helmet";

interface IProps {
  book: IBook | IWork;
  userRole?: string;
  index?: number;
  folderID?: number;
  isBook: boolean;
}

export const Work: FC<IProps> = ({
  folderID,
  book,
  userRole,
  index,
  isBook,
}) => {
  const location = useLocation();
  const isInitialMount = useRef(true);

  const [isModalOpened, setIsModalOpened] = useState(() => {
    const param = new URLSearchParams(location.search).get("workId");
    if (location.search.includes("workId=") && Number(param) === book.id) {
      return true;
    }
    return false;
  });

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      // Your useEffect code here to be run on update
      if (!isModalOpened && location.pathname.includes("/works")) {
        const param = new URLSearchParams(location.search);
        param.delete("workId");
        history?.push({
          pathname: userRoutes.works,
          search: param.toString(),
        });
        return;
      }
    }
  }, [isModalOpened]);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isFoldersModalOpened, setIsFoldersModalOpened] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const isAuthorized = AuthChecking();

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
    if (location.pathname !== userRoutes.works && isBook) {
      history?.push(`${userRoutes.book}?bookId=${book.id}`);
    }
    if (location.pathname === userRoutes.works && !isBook) {
      const param = new URLSearchParams(location.search);
      param.set("workId", String(book.id));
      history?.push({
        pathname: userRoutes.works,
        search: param.toString(),
      });
    }
  };

  const param = new URLSearchParams(location.search);
  param.set("workId", String(book.id));

  const share = isBook
    ? `https://pracedzieci.pan-tablet.pl/#/book?bookId=${book.id}`
    : `https://pracedzieci.pan-tablet.pl/#/works?${param}`;

  const imgLinks = [book.link || "", book.linkTwo || "", book.linkThree || ""];

  return (
    <div className="work_container">
      <Helmet>
        <meta property="og:title" content={book?.title} />
        <link rel="icon" href={book.link}></link>
      </Helmet>
      <div
        draggable={location.pathname === userRoutes.mainPage}
        onDragStart={(event) => setData(event)}
        onClick={openBook}
        className={`work_content 
          ${
            isBook || location.pathname === "/winners"
              ? `bg_image draggable`
              : `work_img_full_width`
          }`}
      >
        <div className="title">{book.title || ""}</div>

        <div className="img_container">
          <If condition={isBook}>
            <button>
              <DynamicMediaElement links={imgLinks} />
            </button>
          </If>

          <If condition={!isBook}>
            <button onClick={() => setIsModalOpened(!isModalOpened)}>
              <DynamicMediaElement links={[book.resourceLink || ""]} />
            </button>
          </If>
        </div>
      </div>

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

        <FacebookShareButton url={share || "https://pan-tablet.pl/"}>
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
            onClick={() => [setIsModalOpened(!isModalOpened), openBook()]}
            className="open full_width"
          >
            Otwórz pracę
          </button>
        </Route>
        <If condition={location.pathname !== userRoutes.works}>
          <If
            condition={!isBook}
            anotherChildren={
              <button
                onClick={openBook}
                className={`open 
              ${!isAuthorized && "full_width"}
              ${location.pathname === userRoutes.folders && "full_width"}`}
              >
                Otwórz księgę
              </button>
            }
          >
            <button
              onClick={() => [setIsModalOpened(!isModalOpened), openBook()]}
              className="open full_width"
            >
              Otwórz pracę
            </button>
          </If>
        </If>
      </div>

      <div className="school">
        <span>Szkoła:</span> {book.school}
      </div>

      <div className="mark">
        <span>Klasa:</span> {book.classroom}
      </div>
      {/* 
      <If condition={location.pathname == userRoutes.works}> */}
      <AddComment workId={book.id} bookId={book.id} />
      {/* </If> */}

      <If condition={isFoldersModalOpened}>
        <FoldersModalWindow
          setIsModalOpened={setIsFoldersModalOpened}
          bookID={book.id}
        />
      </If>

      <If condition={isLoginModalOpen}>
        <LoginForm handleLoginModal={() => setIsLoginModalOpen(false)} />
      </If>

      <If condition={isModalOpened || false}>
        <PopupImage
          links={[book.resourceLink || ""]}
          setIsModalOpened={setIsModalOpened}
          bookId={book.book?.id}
          workId={book.id}
        />
      </If>
    </div>
  );
};
