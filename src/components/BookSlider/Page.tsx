import { FC, useState } from "react";
import { If } from "../If";
import Modal from "react-modal";
import "./ImageModal.scss";

interface IPage {
  link?: string;
  title?: string;
  order: number;
}

export const Page: FC<IPage> = ({ link, title, order }) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      zIndex: 9999,
    },
  };

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  if (!link) {
    return <></>;
  }
  const page = (
    <>
      <If
        condition={link?.includes(".mp4")}
        anotherChildren={
          <div>
            <img src={link} alt="" onClick={openModal} className="clickable" />
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <div className="image_modal">
                <img src={link} alt="" width="90%" height="90%" />
              </div>
            </Modal>
          </div>
        }
      >
        <video src={link} controls style={{ width: "100%" }} />
      </If>

      <div className="description">{title}</div>
    </>
  );

  return (
    <If condition={!!(order % 2)} anotherChildren={page}>
      <div className="description">{title}</div>
      <If
        condition={link?.includes(".mp4")}
        anotherChildren={
          <div>
            <img src={link} alt="" onClick={openModal} className="clickable" />
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <div className="image_modal">
                <img src={link} alt="" width="90%" height="90%" />
              </div>
            </Modal>
          </div>
        }
      >
        <video src={link} controls style={{ width: "100%" }} />
      </If>
    </If>
  );
};
