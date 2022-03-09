import { FC, useState } from "react";
import { If } from "../If";
import "./AcceptCookieContent.scss";

interface IAcceptCookieContent {
  setIsCookieInfoOpened: (state: boolean) => void,
}

export const AcceptCookieContent: FC<IAcceptCookieContent> = (props) => {
  const { setIsCookieInfoOpened } = props;

  const [isNecessaryHidden, setIsNecessaryHidden] = useState(true);
  const [isNotNecessaryHidden, setIsNotNecessaryHidden] = useState(true);
  const [isEnabledExternalCookies, setIsEnabledExternalCookies] = useState(true);

  const handleTextDisplaying = (evt: any): void => {

    if (evt.target.tagName === 'LABEL') {

      setIsEnabledExternalCookies(!isEnabledExternalCookies)
    }

    setIsNotNecessaryHidden(!isNotNecessaryHidden)
  };

  return (
    <div className="cookie_info_container">
      <div className="overlay" onClick={() => setIsCookieInfoOpened(false)}></div>

      <div className="popup">

        <div
          onClick={() => setIsCookieInfoOpened(false)}
          className="close"
        >
          &times;
        </div>

        <div className="header">
          Omówienie prywatności
        </div>
        <div className="condition">
          Ta strona korzysta z plików cookie, aby poprawić Twoje
          wrażenia podczas przeglądania witryny. Z tych plików
          cookie, które są sklasyfikowane jako niezbędne, są
          przechowywane w przeglądarce, ponieważ są
          niezbędne do działania podstawowych funkcji strony.
        </div>

        <div
          className={`${!isNecessaryHidden && 'show_text'} point`}
          onClick={() => setIsNecessaryHidden(!isNecessaryHidden)}
        >
          <span>Konieczne</span>

          <div className="status">Zawsze włączone</div>
        </div>
        <div className={`${isNecessaryHidden && 'hide'} text`}>
          Niezbędne pliki cookie są absolutnie niezbędne do
          prawidłowego działania witryny. Ta kategoria obejmuje
          tylko pliki, które zapewniają podstawowe funkcje i
          funkcje bezpieczeństwa witryny. Te pliki
          cookie nie przechowują żadnych danych osobowych.
        </div>

        <div
          className={`${!isNotNecessaryHidden && 'show_text'} point`}
          onClick={(evt) => handleTextDisplaying(evt)}
        >
          <span>Niepotrzebne</span>

          <div className="status">
            <input type="checkbox" id="switch" defaultChecked />
            <label htmlFor="switch">
              <If condition={isEnabledExternalCookies} anotherChildren={'Wyłączony'}>
                Włączony
              </If>
            </label>
          </div>
        </div>
        <div className={`${isNotNecessaryHidden && 'hide'} text`}>
          Wszelkie pliki cookie, które mogą nie być szczególnie
          potrzebne do działania strony internetowej i są
          wykorzystywane w szczególności do gromadzenia danych
          osobowych użytkowników są pośrednictwem analiz reklam,
          innych treści osadzonych, są określone jako niepotrzebne
          pliki cookie. Wymagane jest uzyskanie zgody
          użytkownika przed uruchomieniem tych plików cookie w witrynie.
        </div>
      </div>
    </div>
  )
}
