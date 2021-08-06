import React, { useState } from 'react';

import Particles from 'react-particles-js'
import Clarifai from 'clarifai'

import HeaderNav from './HeaderNav/HeaderNav'
import Logo from './Logo/Logo'
import Rank from './Rank/Rank'
import ImgFormLink from './ImgFormLink/ImgFormLink'
import ImgContainer from './ImgContainer/ImgContainer'
import SignIn from './SignIn/SignIn'
import Register from './Register/Register'

import './main.css'


//SEPAREI EM MODULOS O CSS MAS, POSSO USAR EM UM ARQUIVO SOMENTE E CHAMAR NO RESTANTE ATRAVES DO CLASSNAME APENAS
const particlesOptions = { //config do fundo particles
    number: {
        value: 330,
        density: {
            enable: true,
            value_area: 552
        }
    }
}

const app = new Clarifai.App({ //config da api
    apiKey: '89e40aa128a84e5fb79c47b016439eb2'
})


const Main = () => {

    const [ inputInit, inputSetState ] = useState('')

    const [ imgInit, imgSetState ] = useState('')

    const [ boxImg, boxImgSetState ] = useState('')

    const [ routeInit, routeSetState ] = useState('signin')

    const [ isSignedIn, isSignedInSetState] = useState(false)  //criado somente para exemplificar de como seria o estado de um usuario logado, nesse exemplo foi usado para alterar os escritos do signed out quando usuario n estiver logado
    
    const [ userData, userDataSetState ] = useState({
        id: '',
        name: '',
        email: '',
        password: '',
        entries: 0,
        joined: ''
    })
    
    const onInputChange = event => {
        inputSetState(event.target.value)
    }

    const calculateFaceLocation = data => {
        const clarifaceBox = data.outputs[0].data.regions[0].region_info.bounding_box
        const image = document.getElementById('inputImage')
        const width = Number(image.width)
        const height = Number(image.height)
        return {
            leftCol: clarifaceBox.left_col * width,
            topRow: clarifaceBox.top_row * height,
            rightCol: width - (clarifaceBox.right_col * width),
            bottomRow: height - (clarifaceBox.bottom_row * height)
        }
    }

    const displayBox = box => {
        boxImgSetState(box)
    }

    const onSubmit = async () => {

        imgSetState(inputInit)

        try {
            const resp = await app.models
                .predict(Clarifai.FACE_DETECT_MODEL, inputInit )
            
            displayBox(calculateFaceLocation(resp))

            if(resp) {
                fetch('http://localhost:3000/image', {
                    method: 'put',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ //parte q o req.body espera
                        id: userData.id
                    })
                })
                .then(resp => resp.json())
                .then(count => {
                    userDataSetState(Object.assign(userData, { entries: count }))
                    onLoadUser(userData) //acrescentei essa função para corrigir bug, retire para checar, importante!!! preciso chamar a atualização dos dados no front/view
                })
                .catch(console.log)
            }
        } catch {
            console.log('error on fetch API')
        }


        console.log('buggggg-->','a', inputInit, 'b', imgInit)

        
    }

    const onRouteChange = ( route ) => {
        route === 'home' ? isSignedInSetState(true) : isSignedInSetState(false) //identifica se usuario está logado ou não a partir da rota.... nesse exemplo muda o signin para signout caso logado
        if(route === 'signin') imgSetState('') //implementado para quando o usuario fizer logout a imagem nao permanecer no proximo acesso
        
        routeSetState(route)
    }

    const onLoadUser = data => { //ao registrar ou logar, para que eu possa visualizar os dados do usuario no front eu preciso chamar essa função!
        userDataSetState({
            id: data.id,
            name: data.name,
            email: data.email,
            password: data.password,
            entries: data.entries,
            joined: data.joined
        })
    }


    return (
        <div>
            <Particles 
                className="particles"
                params={ particlesOptions }
            />
            <HeaderNav
                changeRoute={ onRouteChange }
                isSignedIn={ isSignedIn } />
            { routeInit === 'home' ? 
                <div>
                    <Logo />
                    <Rank 
                        name={ userData.name } 
                        entries={ userData.entries }/>
                    <ImgFormLink
                        onSearchImg={ onInputChange } 
                        onClickDetect={ onSubmit } />
                    <ImgContainer 
                        faceBoxSize={ boxImg } 
                        imgState={ imgInit }/>
                </div>
            :
                (
                    routeInit === 'signin' ? < SignIn changeRoute={ onRouteChange } loadUser={ onLoadUser } /> : < Register changeRoute={ onRouteChange } loadUser={ onLoadUser }/>
                )
            }
        </div>
    )
}

export default Main
