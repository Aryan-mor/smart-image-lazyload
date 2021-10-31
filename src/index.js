import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import styles from './styles.module.css'
import PropTypes from 'prop-types'
import { debounce } from 'lodash'

export const Img = (pr) => {
  const {
    vw,
    skeleton,
    imageWidth,
    imageHeight,
    borderRadius,
    checkParent = false,
    src: dSrc,
    minHeight: mH = 70,
    placeholderSrc: dPlaceholderSrc,
    alt,
    loading,
    debug: dDebug = false,
    debugTimeout,
    imageRootProps = {},
    imageProps = {},
    ...props
  } = pr

  const [windowWidth] = useWindowSize()
  const ref = useRef()
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const [size, setSize] = useState()
  const [debug, setDebug] = useState()


  useLayoutEffect(() => {
    if (vw)
      return
    setImageSize(true)
  }, [windowWidth])

  const setImageSizeDebounce = debounce(function() {
    setImageSize(true)
  }, 1500)

  useEffect(() => {
    if (!checkParent || !loaded || vw)
      return
    let parentWidth = ref?.current?.parentNode.offsetWidth
    const interval = setInterval(() => {
      if (Math.abs(ref?.current?.parentNode.offsetWidth - parentWidth) < 15)
        return
      parentWidth = ref?.current?.parentNode.offsetWidth
      setImageSizeDebounce()
    }, 1000)

    setTimeout(() => {
      clearInterval(interval)
    }, 9000)

    return () => {
      clearInterval(interval)
    }
  }, [size, loaded])

  function setImageSize(force = false) {
    if (!(imageWidth && imageHeight) && !force) return

    const process = () => {
      const [width, height] = getImageSize(ref, imageWidth, imageHeight)

      setSize({
        width,
        height
      })
    }

    if (size) {
      setSize(undefined)
      setTimeout(process, 500)
      return
    }
    process()
  }

  useEffect(() => {
    if (vw)
      return
    let interval
    if (!loaded) {
      try {
        setTimeout(() => {
          interval = setInterval(() => {
            if (!(ref && ref.current)) return
            if (
              loaded ||
              ref.current.getElementsByClassName('smart-image')[0].complete
            ) {
              setLoaded(true)
              clearInterval(interval)
            }
          }, 400)
        }, 1000)
      } catch {
      }
    }
    return () => {
      clearInterval(interval)
    }
  }, [loaded])

  useEffect(() => {
    if (!dDebug) {
      setDebug(undefined)
      return
    }
    setDebug(1)

    let timeout1
    let timeout2
    timeout1 = setTimeout(() => {
      setDebug(2)
      timeout2 = setTimeout(() => {
        setDebug(3)
      }, debugTimeout)
    }, debugTimeout)
    return () => {
      clearInterval(timeout1)
      clearInterval(timeout2)
    }
  }, [dDebug])


  const src = (!dDebug || debug > 2) ? dSrc : undefined
  const placeholderSrc = (!dDebug || debug > 1) ? dPlaceholderSrc : undefined
  const isLoaded = src && loaded && !error
  const width = vw ? `${vw}vw` : (size?.width || '100%')
  const height = vw ? `${((imageHeight * vw) / imageWidth)}vw` : (size?.height || 'auto')
  const minHeight = vw ? undefined : (size?.height ? undefined : mH)

  return (
    <div
      ref={ref}
      {...props}
      style={{
        maxWidth: '100%',
        width: width,
        height: height,
        minHeight: minHeight,
        position: 'relative',
        ...props?.style
      }}>
      {!isLoaded &&
      (skeleton && React.isValidElement(skeleton) ? (
        skeleton
      ) : (
        <div className={styles.skeleton} />
      ))}
      <div
        {...imageRootProps}
        style={{
          maxWidth: '100%',
          width: width,
          height: height,
          minHeight: minHeight,
          position: 'absolute',
          ...(placeholderSrc
            ? {
              backgroundImage: `url("${placeholderSrc}")`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover'
            }
            : {}),
          ...imageRootProps?.style
        }}>
        <img
          className={`smart-image ${styles.initWithOpacity} ${
            isLoaded ? styles.initWithOpacityStart : ''
          }`}
          src={src}
          alt={alt}
          loading={loading}
          onLoad={() => {
            setLoaded(true)
          }}
          onError={() => {
            setError(true)
          }}
          {...imageProps}
          style={{
            maxWidth: '100%',
            width: width,
            height: height,
            ...imageProps?.style
          }}
        />
      </div>
    </div>
  )
}

export function useWindowSize(wait = 2000) {
  const [size, setSize] = useState([0, 0])

  useLayoutEffect(() => {
    updateSize()
    try {
      window?.addEventListener(
        'resize',
        debounce(function() {
          updateSize()
        }, wait)
      )
      return () => window?.removeEventListener('resize', updateSize)
    } catch {
    }
  }, [])

  function updateSize() {
    try {
      setSize([window?.innerWidth, window?.innerHeight])
    } catch {
    }
  }

  return size
}

export function getImageSize(ref, imageWidth, imageHeight) {
  try {
    const offsetWidth = ref?.current?.offsetWidth
    const height = (offsetWidth * imageHeight) / imageWidth
    return [offsetWidth, height]
  } catch (e) {
  }
  return [imageWidth, imageHeight]
}


Img.defaultProps = {
  loading: 'lazy',
  debug: false,
  debugTimeout: 5000,
}

Img.propTypes = {
  imageWidth: PropTypes.number,
  imageHeight: PropTypes.number,
  src: PropTypes.string,
  placeholderSrc: PropTypes.string,
  alt: PropTypes.string,
  loading: PropTypes.string,
  debug: PropTypes.bool,
  debugTimeout: PropTypes.number,
  imageRootProps: PropTypes.object,
  imageProps: PropTypes.object,
  skeleton: PropTypes.oneOfType([PropTypes.element, PropTypes.bool])
}
