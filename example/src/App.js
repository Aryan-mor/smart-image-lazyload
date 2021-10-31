import React, { useEffect, useRef, useState } from 'react'

import { Img as SmartImg } from 'smart-image-lazyload'
import 'smart-image-lazyload/dist/index.css'


const App = () => {
  const ref = useRef()
  const [width, setWidth] = useState('7.5%')

  function handleChangeWidth() {
    setWidth((w) => w === '15%' ? '7.5%' : '15%')
  }

  // useEffect(() => {
  //   console.log('askfjkaskfjkajskf 2', ref?.current?.offsetWidth)
  // }, [ref?.current?.offsetWidth])

  return (
    <div
      style={{
        width: '100%'
      }}>
      <button onClick={handleChangeWidth}>
        Change Width
      </button>
      <div
        style={{
          width:'100%',
          display: 'flex',
          flexWrap: 'wrap'
        }}>
        <MyImage width={"25vw"} show={width === "15%"}/>
      </div>
    </div>
  )
}

function MyImage({ width ,show}) {
  return (
    <div
      style={{
        padding: 10,
        width: width,
        display: 'flex',
        flexWrap: 'wrap'
      }}>
      <SmartImg
        vw={25}
        checkParent={true}
        imageWidth={1280}
        imageHeight={794}
        debug={false}
        src={'https://api.mehrtakhfif.com/media/boxes/2/2020-07-31/media/08-14-40-23-has-ph.jpg'}
        placeholderSrc={'https://api.mehrtakhfif.com/media/boxes/2/2020-07-31/media/08-14-40-23-ph.jpg'}
        alt={'image'} />
    </div>
  )
}


export default App
