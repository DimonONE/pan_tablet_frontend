import "./Header.scss";
import left_hero from "../../assets/images/left_hero.png";
import right_hero from "../../assets/images/right_hero.png";
import logo from "../../assets/images/logo.png";
import trash_icon from "../../assets/images/trash.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Navbar } from "../Navbar";
import { AddWork } from "../AddWork";
import { Formik, FormikState } from "formik";
import { CustomInput } from "../CustomInput";
import { getBooks } from "../../store/actions/books";
import { useHistory, useLocation } from "react-router";
import { If } from "../If";
import { userRoutes } from "../../shared/consts/url/routes";
import { searchFieldsData } from "../../shared/consts/fieldsData/searchFields";
import { getWorks, resetWorks } from "../../store/actions/works";
import { getUrlParams } from "../../shared/features/getUrlParams";

interface ISearchFieldsData {
  rating: string;
  school: string;
}

const initialValues = {
  rating: "",
  school: "",
};

export const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { currentPage } = getUrlParams(location);

  const setScrollPosition = (): void => {
    if (window.screen.width < 980) {
      window.scrollTo({ top: 1790 });
      return;
    }
    window.scrollTo({ top: 830 });
  };

  const backToHome = (
    resetForm: (nextState?: Partial<FormikState<ISearchFieldsData>>) => void
  ): void => {
    resetForm();
    dispatch(resetWorks());
    history.push(userRoutes.mainPage);
  };

  return (
    <div className="header_container">
      <Navbar />

      <div className="header container">
        <div className="left_image">
          <img src={left_hero} alt="no left hero" />
        </div>

        <div className="search_container">
          <div className="logo">
            <img src={logo} alt="No Logo" />
          </div>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
              const { rating, school } = values;
              let params: string = 'search=';

              if (school.trim()) {
                params += `school=${school.trim()},`
              }

              if (rating.trim()) {
                params += `classroom=${rating.trim()}`
              }

              dispatch(getBooks(currentPage, params));
              dispatch(getWorks(currentPage, params));

              history.push(
                `${history.location.pathname
                }?page=0,15&${params.replaceAll(" ", "+")}`
              );

              setScrollPosition();
            }}
          >
            {(props) => (
              <form onSubmit={props.handleSubmit}>
                <div className="form_container">
                  {searchFieldsData.map((field) => (
                    <CustomInput
                      key={field.id}
                      fieldData={field}
                      formikProps={props}
                    />
                  ))}

                  <button type="submit" className="btn_search_files">
                    <span>Wyszukaj pracę</span>
                    <FontAwesomeIcon icon={faSearch} />
                  </button>

                  <button
                    className="delete"
                    type="reset"
                    onClick={() => backToHome(props.resetForm)}
                  >
                    <img src={trash_icon} alt="no trash icon" />
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>

        <div className="right_image">
          <img src={right_hero} alt="no left hero" />
        </div>
      </div>

      <div className="short_info container">
        <div>
          Wrocławska platforma multimedialnych prac uczniów ze szkół
          podstawowych
        </div>

        <div className="sub_text">Przeglądaj i oceniaj 59784 dzieł!</div>
      </div>

      <button
        className="open_add_work_modal"
        onClick={() => setIsModalOpen(true)}
      >
        Dodaj pracę na platformę
      </button>

      <If condition={isModalOpen}>
        <AddWork changeModalState={setIsModalOpen} />
      </If>
    </div>
  );
};
