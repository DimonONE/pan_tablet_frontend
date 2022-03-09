import buttonBg from "../../assets/images/btnNext.jpg";

export const changeArrowsStyle = (
  prevArrowEl: HTMLButtonElement,
  nextArrowEl: HTMLButtonElement,
  action: string
) => {
  if (action === "first slide") {
    prevArrowEl.style.display = "none";
    nextArrowEl.style.backgroundImage = `url(${buttonBg})`;
    nextArrowEl.style.backgroundRepeat = "round";
    nextArrowEl.style.backgroundSize = "cover";
    nextArrowEl.style.border = "2px solid rgb(37, 144, 245)";
    nextArrowEl.style.borderRadius = "5px";
    nextArrowEl.style.width = "70px";
    nextArrowEl.style.height = "70px";
    nextArrowEl.style.paddingTop = "5px";
    nextArrowEl.style.alignItems = "flex-start";
  } else {
    prevArrowEl.style.display = "flex";
    nextArrowEl.style.backgroundImage = `unset`;
    nextArrowEl.style.backgroundRepeat = "round";
    nextArrowEl.style.backgroundSize = "cover";
    nextArrowEl.style.border = "none";
    nextArrowEl.style.width = "70px";
    nextArrowEl.style.height = "70px";
    nextArrowEl.style.paddingTop = "5px";
    nextArrowEl.style.alignItems = "flex-start";
    nextArrowEl.style.marginTop = "20px";
  }
};
