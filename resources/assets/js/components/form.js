import React, { Component } from 'react'
import ReactDOM from 'react-dom'

//Form
const Form = props =>{
    
    //ラジオボタンのラベルの表示を切り替え
    const onClickLabelChange = (e)=>{
        if(e.target.classList.contains('checked') !== true){
            //HTMLCollectionを配列に変換後、map
            Array.from(e.target.parentNode.children).map(c =>{
                //他のラベルから.checkedを削除
                c.classList.remove("checked")
            })
            //押されたラベルに.checkedを追加
            e.target.classList.add("checked")
        }
    }
    
    return(
        <form noValidate autoComplete="off">

            <label htmlFor="name">名前 <span className="required">必須</span></label>
            <input type="text" name="name" id="name" data-validation="required" onChange={ props.checkValidation } defaultValue={ props.data.formData.name }/>
            { !(props.data.message.name)? "": <p className="errmsg">{ props.data.message.name }</p> }
            
            <label htmlFor="email">メールアドレス <span className="required">必須</span></label>
            <input type="email" name="email" id="email" data-validation="required email" onChange={ props.checkValidation } defaultValue={ props.data.formData.email }/>
            { !(props.data.message.email)? "": <p className="errmsg">{ props.data.message.email }</p> }
            
            <label htmlFor="zip">郵便番号 <span className="required">必須</span></label>
            <input type="text" name="zip" id="zip" data-validation="required min7 max8 zip" onChange={ props.checkValidation } defaultValue={ props.data.formData.zip }/>
            { !(props.data.message.zip)? "": <p className="errmsg">{ props.data.message.zip }</p> }
            
            <label htmlFor="tel">電話番号 <span className="required">必須</span></label>
            <input type="tel" name="tel" id="tel" data-validation="required tel" onChange={ props.checkValidation } defaultValue={ props.data.formData.tel }/>
            { !(props.data.message.tel)? "": <p className="errmsg">{ props.data.message.tel }</p> }
            
            <label>性別 <span className="required">必須</span></label>
            <div className="cr_box">
                <label htmlFor="gender_m" className="cr_box_label" onClick={ onClickLabelChange }>男</label>
                <label htmlFor="gender_f" className="cr_box_label" onClick={ onClickLabelChange }>女</label>
                <input type="radio" id="gender_m" name="gender" data-validation="required" value="0" onChange={ props.checkValidation }/>    
                <input type="radio" id="gender_f" name="gender" data-validation="required" value="1" onChange={ props.checkValidation }/>
            </div>
            
            <label htmlFor="remarks">備考</label>
            <textarea name="remarks" id="remarks" cols="30" rows="10" data-validation="max100" onChange={ props.checkValidation } defaultValue={ props.data.formData.remarks }></textarea>
            { !(props.data.message.remarks)? "": <p className="errmsg">{ props.data.message.remarks }</p> }
            
            <input type="submit" value="確認" onClick={ props.goToConfirm } disabled={ props.data.disabled }/>

        </form>
    )
}

export default Form