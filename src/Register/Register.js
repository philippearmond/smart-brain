import React, { useState } from 'react'

const Register = ({ changeRoute, loadUser }) => {

    const [ name, nameSetState ] = useState('')
    const [ email, emailSetState ] = useState('')
    const [ password, passwordSetState ] = useState('')

    const onNameChange = event => {
        nameSetState(event.target.value)
    }

    const onEmailChange = event => {
        emailSetState(event.target.value)
    }

    const onPasswordChange = event => {
        passwordSetState(event.target.value)
    }

    const onSubmitRegister = () => {
        fetch('http://localhost:3000/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ //parte q o req.body espera
                name: name,
                email,
                password,
            })
        })
        .then(resp => resp.json())
        .then(user => { //aquilo que envio no res.json lado server
            if(user){
                loadUser(user)
                changeRoute('signin')
            } 
        })
    }

    return (
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure align-items-center">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" for="email-address">Name</label>
                            <input
                                onChange={ onNameChange } 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="text" 
                                name="name"  
                                id="name" />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" for="email-address">Email</label>
                            <input
                                onChange={ onEmailChange }
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="email-address"  
                                id="email-address" />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" for="password">Password</label>
                            <input 
                                onChange={ onPasswordChange}
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="password"
                                name="password"
                                id="password" />
                        </div>
                    </fieldset>
                    <div className="">
                        <input
                            onClick={ onSubmitRegister }
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                            type="submit"
                            value="Register" />
                    </div>
                </div>
            </main>
        </article>
    )
}

export default Register