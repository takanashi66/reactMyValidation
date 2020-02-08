import React, { Component } from 'react'
import ReactDOM from 'react-dom'

//Form
const Form = props =>{
    const nameErrorMessage = name

    return(
        <div className="form">
            <h2>Form</h2>
            
            <form onSubmit={ props.onSubmit }>
            
                <label htmlFor="name">名前</label>
                <input type="text" name="name" id="name" data-validation="required" onBlur={ props.checkValidation }/>
                { !(props.data.message[0].name)? "": <p className="errmsg">{ props.data.message[0].name }</p> }
                
                <label htmlFor="email">メールアドレス</label>
                <input type="email" name="email" id="email" data-validation="required email" onBlur={ props.checkValidation }/>
                { !(props.data.message[0].email)? "": <p className="errmsg">{ props.data.message[0].email }</p> }
                
                <label htmlFor="zip">郵便番号</label>
                <input type="text" name="zip" id="zip" data-validation="required zip" onBlur={ props.checkValidation }/>
                { !(props.data.message[0].zip)? "": <p className="errmsg">{ props.data.message[0].zip }</p> }
                
                <label htmlFor="tel">電話番号</label>
                <input type="tel" name="tel" id="tel" data-validation="required tel" onBlur={ props.checkValidation }/>
                { !(props.data.message[0].tel)? "": <p className="errmsg">{ props.data.message[0].tel }</p> }
                
                <input type="submit" value="送信"/>
            
            </form>
        </div>
    )
}

export default Form
