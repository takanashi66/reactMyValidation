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
    
    //入力があったら背景を戻す
    const onKeyUpCheckValue = e =>{
        const value = e.target.value
        if(value !== ""){
            e.target.classList.remove("input_required")
        }else{
            e.target.classList.add("input_required")
        }
    }
    
    return(
        <form noValidate autoComplete="off">

            <label htmlFor="name">名前 <span className="required">必須</span></label>
            <input type="text" name="name" id="name" className={props.data.formData.tel ? "" : "input_required"} data-validation="required" onBlur={ props.checkValidation } onChange={ props.checkValidation } defaultValue={ props.data.formData.name } onKeyUp={ onKeyUpCheckValue }/>
            { !(props.data.message.name)? "": <p className="errmsg">{ props.data.message.name }</p> }
            
            <label htmlFor="email">メールアドレス <span className="required">必須</span></label>
            <input type="email" name="email" id="email" className={props.data.formData.tel ? "" : "input_required"} data-validation="required email" onBlur={ props.checkValidation } onChange={ props.checkValidation } defaultValue={ props.data.formData.email } onKeyUp={ onKeyUpCheckValue }/>
            { !(props.data.message.email)? "": <p className="errmsg">{ props.data.message.email }</p> }
            
            <label htmlFor="zip">郵便番号 <span className="required">必須</span></label>
            <input type="text" name="zip" id="zip" className={props.data.formData.tel ? "" : "input_required"} data-validation="required min7 max8 zip" onBlur={ props.checkValidation } onChange={ props.checkValidation } defaultValue={ props.data.formData.zip } onKeyUp={ onKeyUpCheckValue }/>
            { !(props.data.message.zip)? "": <p className="errmsg">{ props.data.message.zip }</p> }
            
            <label htmlFor="tel">電話番号 <span className="required">必須</span></label>
            <input type="tel" name="tel" id="tel" className={props.data.formData.tel ? "" : "input_required"} data-validation="required tel" onBlur={ props.checkValidation } onChange={ props.checkValidation } defaultValue={ props.data.formData.tel } onKeyUp={ onKeyUpCheckValue }/>
            { !(props.data.message.tel)? "": <p className="errmsg">{ props.data.message.tel }</p> }
            
            <label htmlFor="prefecture">都道府県 <span className="required">必須</span></label>
            <select name="prefecture" id="prefecture" data-validation="required" onBlur={ props.checkValidation } onChange={ props.checkValidation }>
                <option value="0">選択してください</option>
                <option value="1">岡山</option>
                <option value="2">広島</option>
                <option value="3">山口</option>
                <option value="4">島根</option>
                <option value="5">鳥取</option>
            </select>
            
            <label>性別 <span className="required">必須</span></label>
            <div className="cr_box">
                <label htmlFor="gender_m" className={`cr_box_label ${ props.data.formData.gender === "0" ? "checked" : "" }`} onClick={ onClickLabelChange }>男</label>
                <label htmlFor="gender_f"  className={`cr_box_label ${ props.data.formData.gender === "1" ? "checked" : "" }`} onClick={ onClickLabelChange }>女</label>
                <input type="radio" id="gender_m" name="gender" data-validation="required" value="0" onChange={ props.checkValidation } defaultChecked={props.data.formData.gender === "0" ? true : false}/>    
                <input type="radio" id="gender_f" name="gender" data-validation="required" value="1" onChange={ props.checkValidation } defaultChecked={props.data.formData.gender === "1" ? true : false}/>
            </div>
            
            <label>派閥</label>
            <div className="cr_box">
                <label htmlFor="faction_m" className={`cr_box_label ${ props.data.formData.faction === "0" ? "checked" : "" }`} onClick={ onClickLabelChange }>犬派</label>
                <label htmlFor="faction_f"  className={`cr_box_label ${ props.data.formData.faction === "1" ? "checked" : "" }`} onClick={ onClickLabelChange }>猫派</label>
                <input type="radio" id="faction_m" name="faction" data-validation="" value="0" onChange={ props.checkValidation } defaultChecked={props.data.formData.faction === "0" ? true : false}/>    
                <input type="radio" id="faction_f" name="faction" data-validation="" value="1" onChange={ props.checkValidation } defaultChecked={props.data.formData.faction === "1" ? true : false}/>
            </div>
            
            <label htmlFor="remarks">備考</label>
            <textarea name="remarks" id="remarks" cols="30" rows="10" data-validation="max100" onChange={ props.checkValidation } defaultValue={ props.data.formData.remarks }></textarea>
            { !(props.data.message.remarks)? "": <p className="errmsg">{ props.data.message.remarks }</p> }
            
            <input type="submit" value="確認" onClick={ props.goToConfirm } disabled={ props.data.disabled }/>

        </form>
    )
}

export default Form