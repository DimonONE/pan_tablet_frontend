export const mainSlider = {
  rewind: false,
  slide: "slide",
  perPage: 1,
  perMove: 1,
  arrows: true,
  type: "slide",
  pagination: false,
  updateOnMove: true,
  speed: 200,
  start: 0,
  width: "700px",
  breakpoints: {
    1440: {
      width: "650px",
    },
    1366: {
      width: "600px",
    },
    1024: {
      width: "400px",
    },
    800: {
      width: "450px",
    },
    414: {
      width: "350px",
    },
  },
};

export const secondarySlider = {
  slide: "slide",
  fixedWidth: 120,
  height: 100,
  gap: 10,
  cover: true,
  pagination: false,
  isNavigation: true,
  trimSpace: true,
  updateOnMove: true,
  speed: 200,
  start: 0,
  focus: "center",
  width: "600px",
  breakpoints: {
    768: {
      width: "700px",
    },
    570: {
      width: "290px",
    },
    370: {
      width: "220px",
    },
  },
};
