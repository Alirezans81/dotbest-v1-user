import { Children, ReactNode, useState } from "react";
import { useSwipeable } from "react-swipeable";

interface Props {
  children?: ReactNode;
  customSlider?: {
    state: number;
    setState: (value: number) => void;
  };
  showDots?: boolean;
  swipeable?: boolean;
  className?: string;
}
const Carousel = ({
  children,
  customSlider,
  showDots = true,
  swipeable = true,
  className,
}: Props) => {
  const childrenArray = Children.toArray(children);
  const [currentSlide, setCurrentSlide] = useState<number>(
    customSlider?.state || 0
  );

  const next = () => {
    if (customSlider) {
      customSlider.state < childrenArray.length - 1
        ? customSlider.setState(customSlider.state + 1)
        : customSlider.setState(0);
    } else {
      currentSlide < childrenArray.length - 1
        ? setCurrentSlide(currentSlide + 1)
        : setCurrentSlide(0);
    }
  };
  const prev = () => {
    if (customSlider) {
      customSlider.state > 0
        ? customSlider.setState(customSlider.state - 1)
        : customSlider.setState(childrenArray.length - 1);
    } else {
      currentSlide > 0
        ? setCurrentSlide(currentSlide - 1)
        : setCurrentSlide(childrenArray.length - 1);
    }
  };

  const config = {
    delta: 35, // min distance(px) before a swipe starts. *See Notes*
    preventScrollOnSwipe: false, // prevents scroll during swipe (*See Details*)
    trackTouch: true, // track touch input
    trackMouse: true, // track mouse input
    rotationAngle: 0, // set a rotation angle
    swipeDuration: Infinity, // allowable duration of a swipe (ms). *See Notes*
    touchEventOptions: { passive: true }, // options for touch listeners (*See Details*)
  };
  const handlers = useSwipeable({
    onSwipedLeft: prev,
    onSwipedRight: next,
    ...config,
  });

  if (swipeable) {
    return (
      <div {...handlers} className={`flex flex-col gap-[5dvw] ${className}`}>
        <div className="w-full overflow-hidden">
          {/* Slide Content */}
          <div
            className={`flex w-full transition-all duration-500`}
            style={{
              width: childrenArray.length * 100 + "%",
              transform: `translateX(${
                customSlider
                  ? (100 / childrenArray.length) * customSlider.state
                  : (100 / childrenArray.length) * currentSlide
              }%)`,
            }}
          >
            {childrenArray.map((child, index) => (
              <div
                key={index}
                className="w-full transition-all ease-out duration-500"
                style={{
                  opacity: customSlider
                    ? customSlider.state === index
                      ? "100%"
                      : "0%"
                    : currentSlide === index
                    ? "100%"
                    : "0%",
                }}
              >
                {child}
              </div>
            ))}
          </div>
        </div>
        {/* Carousel Navigation */}
        {showDots && (
          <div className="w-full flex justify-center gap-[2dvw]">
            {childrenArray.map((child, index) => (
              <button
                key={index}
                className={`h-[2dvw] rounded-full transition-all duration-500
                  ${
                    customSlider
                      ? customSlider.state === index
                        ? "bg-primary dark:bg-white w-[6dvw]"
                        : "bg-gray_001 dark:bg-gray_004 w-[2dvw]"
                      : currentSlide === index
                      ? "bg-primary dark:bg-white w-[6dvw]"
                      : "bg-gray_001 dark:bg-gray_004  w-[2dvw]"
                  }
                  `}
                onClick={() =>
                  customSlider
                    ? customSlider.setState(index)
                    : setCurrentSlide(index)
                }
              />
            ))}
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className={`flex flex-col gap-[5dvw] ${className}`}>
        <div className="w-full overflow-hidden">
          {/* Slide Content */}
          <div
            className={`flex w-full transition-all duration-500`}
            style={{
              width: childrenArray.length * 100 + "%",
              transform: `translateX(${
                customSlider
                  ? (100 / childrenArray.length) * customSlider.state
                  : (100 / childrenArray.length) * currentSlide
              }%)`,
            }}
          >
            {childrenArray.map((child, index) => (
              <div
                key={index}
                className="w-full transition-all ease-out duration-500"
                style={{
                  opacity: customSlider
                    ? customSlider.state === index
                      ? "100%"
                      : "0%"
                    : currentSlide === index
                    ? "100%"
                    : "0%",
                }}
              >
                {child}
              </div>
            ))}
          </div>
        </div>
        {/* Carousel Navigation */}
        {showDots && (
          <div className="w-full flex justify-center gap-[2dvw]">
            {childrenArray.map((child, index) => (
              <button
                key={index}
                className={`h-[2dvw] rounded-full transition-all duration-500
                  ${
                    customSlider
                      ? customSlider.state === index
                        ? "bg-primary dark:bg-white w-[6dvw]"
                        : "bg-gray_001 dark:bg-gray_004 w-[2dvw]"
                      : currentSlide === index
                      ? "bg-primary dark:bg-white w-[6dvw]"
                      : "bg-gray_001 dark:bg-gray_004  w-[2dvw]"
                  }
                  `}
                onClick={() =>
                  customSlider
                    ? customSlider.setState(index)
                    : setCurrentSlide(index)
                }
              />
            ))}
          </div>
        )}
      </div>
    );
  }
};

export default Carousel;
