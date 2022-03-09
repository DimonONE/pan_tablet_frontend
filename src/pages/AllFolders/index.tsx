import "./AllFolders.scss";
import { Navbar } from "../../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FoldersList } from "../../components/FoldersList";
import { getAllFolders, getBooksFromFolder } from "../../store/actions/folders";
import { CreatingFolderForm } from "../../components/CreatingFolderForm";
import { IRootReducer } from "../../store/reducers";
import { Work } from "../../components/Work";
import { IBook } from "../../store/reducers/book/interfaces";
import { booksSearchingFailed } from "../../store/actions/books";
import { If } from "../../components/If";

export const AllFolders = () => {
  const dispatch = useDispatch();
  const [folderID, setFolderID] = useState(0);

  const {
    user: { role },
  } = useSelector((state: IRootReducer) => state.signUp);

  const openFolder = (folderID: number) => {
    setFolderID(folderID);
    dispatch(getBooksFromFolder(folderID));
  };

  const { loading, books } = useSelector((state: IRootReducer) => state.books);

  useEffect(() => {
    dispatch(getAllFolders());
    dispatch(booksSearchingFailed());

    window.scrollTo({ top: 0 });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />

      <div className="folder_page container">
        <div className="folders_header">Teczki</div>
        <div className="full_width_page">
          <FoldersList ButtonAction={openFolder} />

          <If condition={loading}>
            <div className="loader">Trwa ładowanie prac...</div>
          </If>

          <CreatingFolderForm />
        </div>

        <div className="books">
          {books?.map((book: IBook, i: number) => (
            <Work
              folderID={folderID}
              key={book.id.toString()}
              userRole={role}
              book={book}
              index={i}
              isBook={true}
            />
          ))}
          <If condition={books?.length === 0}>
            Nie masz jeszcze żadnej księgi w tej teczce.
          </If>
        </div>
      </div>
    </>
  );
};
