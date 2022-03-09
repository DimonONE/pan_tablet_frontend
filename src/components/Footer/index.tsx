import "./Footer.scss";

export const Footer = () => {
  return (
    <div className="footer_wrapper">
      <h2 className="header_2">Kontakt z nami</h2>
      <div className="contact_wrapper">
        <div className="contacts">
          <div>Dane firmy:</div>
          <span>Pan Tablet sp. z o. o.</span>
          <span>Ul. Polna 78/4</span>
          <span>55-093 Kiełczów</span>
          <span>NIP: 896-157-77-04</span>
        </div>

        <div className="town_index">
          <span>Dział rezerwacji warsztatów: </span>
          <span>533 100 780</span>
        </div>

        <div className="copy_right">
          <span>
            &#169; 2022 Wrocław
            <a href="https://www.pan-tablet.pl"> www.pan-tablet.pl </a>
            Wszelkie prawa zastrzeżone
          </span>
        </div>
      </div>
    </div>
  );
};
