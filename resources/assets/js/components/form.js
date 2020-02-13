import React, { Component } from 'react'
import ReactDOM from 'react-dom'

//Form
const Form = props =>{
    
    return(
        props.data.formData.map((item, i) =>{
            return (
                <form noValidate key={i}>

                    <label htmlFor="name">名前</label>
                    <input type="text" name="name" id="name" data-validation="required" onBlur={ props.checkValidation } defaultValue={ item.name }/>
                    { !(props.data.message[0].name)? "": <p className="errmsg">{ props.data.message[0].name }</p> }
                    
                    <label htmlFor="email">メールアドレス</label>
                    <input type="email" name="email" id="email" data-validation="required email" onBlur={ props.checkValidation } onChange={ props.checkValidation } defaultValue={ item.email }/>
                    { !(props.data.message[0].email)? "": <p className="errmsg">{ props.data.message[0].email }</p> }
                    
                    <label htmlFor="zip">郵便番号</label>
                    <input type="text" name="zip" id="zip" data-validation="required min7 max8 zip" onBlur={ props.checkValidation } onChange={ props.checkValidation } defaultValue={ item.zip }/>
                    { !(props.data.message[0].zip)? "": <p className="errmsg">{ props.data.message[0].zip }</p> }
                    
                    <label htmlFor="tel">電話番号</label>
                    <input type="tel" name="tel" id="tel" data-validation="required tel" onBlur={ props.checkValidation } onChange={ props.checkValidation } defaultValue={ item.tel }/>
                    { !(props.data.message[0].tel)? "": <p className="errmsg">{ props.data.message[0].tel }</p> }
                    
                    <label htmlFor="remarks">備考</label>
                    <textarea name="remarks" id="remarks" cols="30" rows="10" data-validation="textarea max100" onBlur={ props.checkValidation } onChange={ props.checkValidation } defaultValue={ item.remarks }></textarea>
                    { !(props.data.message[0].remarks)? "": <p className="errmsg">{ props.data.message[0].remarks }</p> }
                    
                    <input type="submit" value="送信" onClick={ props.goToConfirm } disabled={ props.data.disabled }/>

                </form>
            )
        })
    )
}

export default Form
