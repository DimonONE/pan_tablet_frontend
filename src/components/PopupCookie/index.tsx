import "./PopupCookie.scss";
import { FC, useEffect } from "react";
import { setCookieData } from "../../shared/cookieData";

interface IPopupCookie {
  setIsPopupCookieOpened: (state: boolean) => void,
  setIsCookieInfoOpened: (state: boolean) => void,
}

export const PopupCookie: FC<IPopupCookie> = (props) => {

  const {
    setIsPopupCookieOpened,
    setIsCookieInfoOpened
  } = props;

  const closePopup = () => {
    setCookieData();

    document.body.style.overflow = "";
    setIsPopupCookieOpened(false);
  };

  useEffect(() => {

    document.body.style.overflow = "hidden";
  }, []);

  return (
    <div className="popup_container">
      <div className="overlay"></div>

      <div className="popup">

        <div>
          Używamy plików cookie w naszej witrynie internetowej,
          aby zapewnić Ci najbardziej odpowiednie wrażenia dzięki zapamiętywaniu
          Twoich preferencji i powtarzaniu wizyt.
          Klikając „Akceptuj”, wyrażasz zgodę na używanie WSZYSTKICH plików cookie.
        </div>

        <div className="actions">
          <button
            onClick={() => setIsCookieInfoOpened(true)}
            className="additional_info"
          >
            Ustawienia plików cookies
          </button>

          <button className="accept" onClick={closePopup}>
            AKCEPTUJ
          </button>
        </div>

      </div>
    </div>
  );
}