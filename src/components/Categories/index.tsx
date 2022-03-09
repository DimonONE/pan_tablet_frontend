/** @format */
import "./Categories.scss";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { getBooks } from "../../store/actions/books";
import { IRootReducer } from "../../store/reducers";
import { userRoutes } from "../../shared/consts/url/routes";
import { resetWorks } from "../../store/actions/works";
import { useEffect, useState } from "react";
import { AuthChecking } from "../AuthGuard/AuthChecking";
import { LoginForm } from "../LoginForm";
import { If } from "../If";

export const Categories = () => {
  const { categories } = useSelector((state: IRootReducer) => state.categories);
  let { works } = useSelector((state: IRootReducer) => state.works);

  const dispatch = useDispatch();
  const history = useHistory();
  const { pathname, search } = useLocation();
  const [mainCategories, setMainCategories] = useState(categories);
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const [sizeBook, setSizeBook] = useState<number>();

  useEffect(() => {
    setMainCategories(categories);
  }, [categories]);

  const handleSubcategory = (index: number) => {
    setMainCategories((prev) => {
      const selectedCategory = { ...prev[index] };
      selectedCategory.isOpened = !selectedCategory.isOpened;
      prev[index] = selectedCategory;
      return [...prev];
    });
  };

  const getBooksByCategory = (categoryTitle: string) => {
    if (categoryTitle === "Wszystkie") {
      dispatch(getBooks("0,15", userRoutes.mainPage));
      dispatch(resetWorks());
      history.push(`${userRoutes.mainPage}`);
      window.location.reload();
    } else if (categoryTitle === "Teczki") {
      const isAuthorized = AuthChecking();
      if (!isAuthorized) {
        setLoginModalOpen(true);
        return;
      }
      history.push(`${userRoutes.folders}`);
    } else if (categoryTitle === "Pozostale") {
      history.push(`${userRoutes.works}`);
      window.scrollTo({
        top: 970,
      });
    } else {
      categoryTitle = categoryTitle.replaceAll(" ", "+");
      history.push(
        `${pathname}?page=0,15&search=pictureCategory=${categoryTitle}`
      );
      window.scrollTo({
        top: 970,
      });
    }

    const params = `search=pictureCategory=${categoryTitle}`;
    categoryTitle = categoryTitle.replaceAll(" ", "+");

    if (pathname === `${userRoutes.mainPage}${search}`) {
      dispatch(getBooks("0,15", params));

      return;
    }
  };

  const totalQuantity =
    pathname === userRoutes.works ? "numberOfPictures" : "numberOfBooks";

  return (
    <div className="categories_container">
      <h3>Tematy:</h3>
      <ul className="categories_list">
        {mainCategories?.map((category, index) => {
          return (
            <div key={index}>
              <li key={category.id} className="category__active">
                {category.name} ({category.sizeBook})
              </li>

              {category.categories.map((subcat) => (
                <div
                  key={subcat.id}
                  onClick={() => getBooksByCategory(subcat.name)}
                  className="subcategory__item"
                >
                  {subcat.name} {subcat.sizeBook}
                  {/* {history.location.pathname === '/home'?subcat.sizeBook: subcat.sizeWork} */}
                </div>
              ))}
            </div>
          );
        })}
      </ul>

      <If condition={loginModalOpen}>
        <LoginForm handleLoginModal={() => setLoginModalOpen(false)} />
      </If>
    </div>
  );
};
