import React from 'react'

import { Img } from 'smart-image-lazyload'
import 'smart-image-lazyload/dist/index.css'



const testImages = [
  {
    src: 'https://api.mehrtakhfif.com/media/boxes/2/2020-07-31/media/08-14-40-23-has-ph.jpg',
    ph: 'https://api.mehrtakhfif.com/media/boxes/2/2020-07-31/media/08-14-40-23-ph.jpg'
  },
  {
    src: 'https://api.mehrtakhfif.com/media/boxes/2/2020-07-31/media/11-30-43-13-has-ph.jpg',
    ph: 'https://api.mehrtakhfif.com/media/boxes/2/2020-07-31/media/11-30-43-13-ph.jpg'
  },
  {
    src: 'https://api.mehrtakhfif.com/media/boxes/2/2020-11-17/media/22-39-33-66-has-ph.jpg',
    ph: 'https://api.mehrtakhfif.com/media/boxes/2/2020-11-17/media/22-39-33-66-ph.jpg'
  },
  {
    src: 'https://api.mehrtakhfif.com/media/boxes/2/2020-12-07/media/14-10-09-34-has-ph.jpg',
    ph: 'https://api.mehrtakhfif.com/media/boxes/2/2020-12-07/media/14-10-09-34-ph.jpg'
  },
  {
    src: 'https://api.mehrtakhfif.com/media/boxes/2/2021-02-14/media/09-43-53-54-has-ph.jpg',
    ph: 'https://api.mehrtakhfif.com/media/boxes/2/2021-02-14/media/09-43-53-54-ph.jpg'
  }
]


const App = () => {
  return (
    <div>
      <div style={{
        display:'flex',
        flexWrap:'wrap'
      }}>
        {
          [testImages[0]].map(({ src, ph },index) => (
            <div key={index} style={{ padding:20,width:"20%"}}>
              <Img
                imageWidth={1280}
                imageHeight={794}
                src={src}
                placeholderSrc={ph}
                alt={index + ' image'}/>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default App
