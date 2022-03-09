interface IUserRoutes {
  mainPage: string;
  registration: string;
  book: string;
  profile: string;
  winners: string;
  competition: string;
  randomBook: string;
  randomBooks: string;
  works: string;
  folders: string;
}

export const userRoutes: IUserRoutes = {
  mainPage: "/home",
  registration: "/registration",
  book: "/book",
  profile: "/profile",
  winners: "/winners",
  competition: "/top-books",
  randomBook: "/random-book",
  randomBooks: "/random-books",
  works: "/works",
  folders: "/folders",
};
