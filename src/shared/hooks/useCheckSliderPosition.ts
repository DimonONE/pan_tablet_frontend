import { useEffect } from "react";
import { changeArrowsStyle } from "../../components/BookSlider/changeArrowsStyle";

export const checkSliderPosition = (mainSliderRef: any) => {
  const slideStyle: string =
    mainSliderRef.current.splide.root.children[1].children[0].style.transform;
  const prevArrowEl: HTMLButtonElement =
    mainSliderRef.current.splide.root.children[0].children[0];
  const nextArrowEl: HTMLButtonElement =
    mainSliderRef.current.splide.root.children[0].children[1];

  if (slideStyle === "translateX(0px)") {
    changeArrowsStyle(prevArrowEl, nextArrowEl, "first slide");
  } else {
    changeArrowsStyle(prevArrowEl, nextArrowEl, "");
  }
};

export const useCheckSliderPosition = (
  mainSliderRef: any,
  secondarySliderRef: any
) => {
  useEffect(() => {
    mainSliderRef.current.sync(secondarySliderRef.current.splide);
    checkSliderPosition(mainSliderRef);
  });
};
