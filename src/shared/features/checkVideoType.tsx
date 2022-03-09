import { Splide } from "@splidejs/react-splide";
import { SplideSlide } from "@splidejs/react-splide";
import ReactPlayer from "react-player";
import { If } from "../../components/If";
import "../../components/DynamicMediaElement/DynamicMediaElement.scss";

const options = {
  rewind: true,
  autoplay: true,
  width: 200,
  slide: "slide",
  type: "fade",
  arrows: false,
  perPage: 1,
  perMove: 1,
  interval: 3000,
  pagination: false,
  trimSpace: true,
};

export const renderVideoType = (links: string[]) => {
  const mediaElements = links.map((link) => {
    const imgEl = link ? <img src={'https://api.pan-tablet.pl' + link} alt="No Work" /> : null;

    return (
      <If condition={link?.includes("youtube")} anotherChildren={imgEl}>
        <ReactPlayer url={link} />
      </If>
    );
  });

  return (
    <div className="img_viewer">
      <Splide options={options}>
        {mediaElements.map((mediaEl, index) => (
          <If condition={!!links[index]} key={index.toString()}>
            <SplideSlide>
              <If
                condition={links[index]?.includes(".mp4")}
                anotherChildren={mediaEl}
              >
                <video src={'https://api.pan-tablet.pl' + links[index]} controls />
              </If>
            </SplideSlide>
          </If>
        ))}
      </Splide>
    </div>
  );
};
