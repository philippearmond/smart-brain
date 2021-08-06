import React from 'react'

import './imgFormLink.css'

const ImgFormLink = ( { onSearchImg, onClickDetect } ) => (
    <div>
        <p className="text-center f3">
           { 'Carregue uma imagem a partir de uma URL e detecte o rosto nas imagens' }
        </p>
        <div className="form-container-layout" >
            <div className="form-container-layout sizing background-texture pa4 br3 shadow-5">
                <input type="text" className="f4 pa2 w-70 center" onChange={ onSearchImg } />
                <button className="cursor w-30 grow f4 link ph3 pv2 dib white bg-light-purple" onClick={ onClickDetect }>Detect</button>
            </div>
        </div>
    </div>
)

export default ImgFormLink