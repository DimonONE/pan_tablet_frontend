interface IApiUrl {
  getUserData: string;
  changeUserData: string;

  login: string;
  signUp: string;
  resetPwd: string;
  removeUser: string;

  competition: string;
  competitionBooks: string;
  topBooks: string;
  books: string;
  book: string;
  bookLike: string;
  randomBooks: string;
  nextPrevBook: string;

  works: string;
  application: string;
  checkLike: string;
  categoriesBooks: string;
  categoriesWorks: string;
  comments: string;

  folders: string;
  allFolders: string;
}

export const apiUrl: IApiUrl = {
  getUserData: "/users/self/role",
  changeUserData: "/users", // /{userID}/(password || info)

  login: "/auth/logini",
  signUp: "/users/role",
  resetPwd: "/users", // /{email}/reset
  removeUser: "/users/self",

  competition: "/competitions/date",
  competitionBooks: "/competitions/results/pictures?",
  topBooks: "/books?sort=totalLikes:DESC&",

  books: "/books",
  book: "/books/pictures?idbook=",

  bookLike: "/likes",
  randomBooks: "/books/random",
  nextPrevBook: "/books/way/",

  works: "/pictures",
  application: "/dataofpeople",
  checkLike: "/likes/my",
  categoriesBooks: "/categorysection?sortpictures=false",
  categoriesWorks: "/categorysection?sortpictures=true ",
  comments: "/books", // /{bookId}/comments

  folders: "/folders",
  allFolders: "/folders/user/auth",
};
