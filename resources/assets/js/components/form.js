import React, { Component } from 'react'
import ReactDOM from 'react-dom'

//Form
const Form = props =>{
    
    return(
        <form noValidate>

            <label htmlFor="name">名前</label>
            <input type="text" name="name" id="name" data-validation="required" onBlur={ props.checkValidation } defaultValue={ props.data.formData.name }/>
            { !(props.data.message.name)? "": <p className="errmsg">{ props.data.message.name }</p> }
            
            <label htmlFor="email">メールアドレス</label>
            <input type="email" name="email" id="email" data-validation="required email" onBlur={ props.checkValidation } onChange={ props.checkValidation } defaultValue={ props.data.formData.email }/>
            { !(props.data.message.email)? "": <p className="errmsg">{ props.data.message.email }</p> }
            
            <label htmlFor="zip">郵便番号</label>
            <input type="text" name="zip" id="zip" data-validation="required min7 max8 zip" onBlur={ props.checkValidation } onChange={ props.checkValidation } defaultValue={ props.data.formData.zip }/>
            { !(props.data.message.zip)? "": <p className="errmsg">{ props.data.message.zip }</p> }
            
            <label htmlFor="tel">電話番号</label>
            <input type="tel" name="tel" id="tel" data-validation="required tel" onBlur={ props.checkValidation } onChange={ props.checkValidation } defaultValue={ props.data.formData.tel }/>
            { !(props.data.message.tel)? "": <p className="errmsg">{ props.data.message.tel }</p> }
            
            <label htmlFor="remarks">備考</label>
            <textarea name="remarks" id="remarks" cols="30" rows="10" data-validation="textarea max100" onBlur={ props.checkValidation } onChange={ props.checkValidation } defaultValue={ props.data.formData.remarks }></textarea>
            { !(props.data.message.remarks)? "": <p className="errmsg">{ props.data.message.remarks }</p> }
            
            <input type="submit" value="確認" onClick={ props.goToConfirm } disabled={ props.data.disabled }/>

        </form>
    )
}

export default Form
