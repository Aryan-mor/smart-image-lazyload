import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import PropTypes from "prop-types";

export const Img = (pr) => {
  const {
    skeleton,
    imageWidth,
    imageHeight,
    borderRadius,
    src,
    placeholderSrc,
    alt,
    loading,
    imageRootProps = {},
    imageProps = {},
    ...props
  } = pr;
  const [width] = useWindowSize();
  const ref = useRef();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [size, setSize] = useState();

  useEffect(() => {
    setImageSize();
  }, [width]);

  function setImageSize() {
    if (!(imageWidth && imageHeight)) return;

    const process = () => {
      const [width, height] = getImageSize(ref, imageWidth, imageHeight);
      setSize({
        width,
        height
      });
    };

    if (size) {
      setSize(undefined);
      setTimeout(process, 300);
      return;
    }
    process();
  }

  useEffect(() => {
    let interval;
    if (!loaded) {
      try {
        setTimeout(() => {
          interval = setInterval(() => {
            if (!(ref && ref.current)) return;
            if (
              loaded ||
              ref.current.getElementsByClassName("smart-image")[0].complete
            ) {
              setLoaded(true);
              clearInterval(interval);
            }
          }, 400);
        }, 1000);
      } catch {
      }
    }
    return () => {
      clearInterval(interval);
    };
  }, [loaded]);


  const isLoaded = src && loaded && !error;

  return (
    <div
      ref={ref}
      {...props}
      style={{
        maxWidth: "100%",
        width: size?.width || "100%",
        height: size?.height,
        position: "relative",
        ...props?.style
      }}>
      {(!isLoaded || true)  &&
      (skeleton && React.isValidElement(skeleton) ? (
        skeleton
      ) : (
        <div className={styles.skeleton} />
      ))}
      <div
        {...imageRootProps}
        style={{
          maxWidth: "100%",
          width: size?.width || "100%",
          height: size?.height,
          position:'absolute',
          ...(placeholderSrc
            ? {
              backgroundImage: `url("${placeholderSrc}")`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover"
            }
            : {}),
          ...imageRootProps?.style
        }}>
        <img
          className={`smart-image ${styles.initWithOpacity} ${
            isLoaded ? styles.initWithOpacityStart : ""
          }`}
          src={src}
          alt={alt}
          loading={loading}
          onLoad={() => {
            setLoaded(true);
          }}
          onError={() => {
            setError(true);
          }}
          {...imageProps}
          style={{
            maxWidth: "100%",
            width: size?.width || "100%",
            height: size?.height,
            ...imageProps?.style
          }}
        />
      </div>
    </div>
  );
};

export function useWindowSize(wait = 2000) {
  const [size, setSize] = useState([0, 0]);

  useLayoutEffect(() => {
    updateSize();
    try {
      window?.addEventListener(
        "resize",
        debounce(function() {
          updateSize();
        }, wait)
      );
      return () => window?.removeEventListener("resize", updateSize);
    } catch {
    }
  }, []);

  function updateSize() {
    try {
      setSize([window?.innerWidth, window?.innerHeight]);
    } catch {
    }
  }

  return size;
}

export function getImageSize(ref, imageWidth, imageHeight) {
  try {
    const offsetWidth = ref?.current?.offsetWidth;
    const height = (offsetWidth * imageHeight) / imageWidth;
    return [offsetWidth, height];
  } catch (e) {
  }
  return [imageWidth, imageHeight];
}

function debounce(func, wait, immediate) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}


Img.defaultProps = {
  loading: "lazy"
};

Img.propTypes = {
  imageWidth: PropTypes.number,
  imageHeight: PropTypes.number,
  src: PropTypes.string,
  placeholderSrc: PropTypes.string,
  alt: PropTypes.string,
  loading: PropTypes.string,
  imageRootProps: PropTypes.object,
  imageProps: PropTypes.object,
  skeleton: PropTypes.oneOfType([PropTypes.element, PropTypes.bool])
};
