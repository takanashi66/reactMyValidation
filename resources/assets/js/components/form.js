import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const prefecture = ["北海道","青森県","岩手県","宮城県","秋田県","山形県","福島県",
"茨城県","栃木県","群馬県","埼玉県","千葉県","東京都","神奈川県",
"新潟県","富山県","石川県","福井県","山梨県","長野県","岐阜県",
"静岡県","愛知県","三重県","滋賀県","京都府","大阪府","兵庫県",
"奈良県","和歌山県","鳥取県","島根県","岡山県","広島県","山口県",
"徳島県","香川県","愛媛県","高知県","福岡県","佐賀県","長崎県",
"熊本県","大分県","宮崎県","鹿児島県","沖縄県"]

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
    
    const remainsAnswer = props.data.remainsAnswer <= 0 ? "" : <p className="remainsAnswer">残り<span>{ props.data.remainsAnswer }</span>個に回答してください</p>
    
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
            <select name="prefecture" id="prefecture" data-validation="required" onBlur={ props.checkValidation } onChange={ props.checkValidation } defaultValue={ props.data.formData.prefecture }>
                <option value="">選択してください</option>
                {prefecture.map((pre, key) =>{
                    return <option key={key} value={pre}>{pre}</option>
                })}
            </select>
            { !(props.data.message.prefecture)? "": <p className="errmsg">{ props.data.message.prefecture }</p> }
            
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
            
            <label>使用中のデバイス</label>
            <div className="cr_box">
                <label><input type="checkbox" name="device" onChange={ props.checkValidation } data-validation="" value="iPhone" defaultChecked={props.data.formData.device.includes('iPhone') ? true : false}/> iPhone</label>
                <label><input type="checkbox" name="device" onChange={ props.checkValidation } data-validation="" value="iPad" defaultChecked={props.data.formData.device.includes('iPad') ? true : false}/> iPad</label>
                <label><input type="checkbox" name="device" onChange={ props.checkValidation } data-validation="" value="Mac" defaultChecked={props.data.formData.device.includes('Mac') ? true : false}/> Mac</label>
            </div>
            
            <label htmlFor="remarks">備考</label>
            <textarea name="remarks" id="remarks" cols="30" rows="10" data-validation="max100" onChange={ props.checkValidation } defaultValue={ props.data.formData.remarks }></textarea>
            { !(props.data.message.remarks)? "": <p className="errmsg">{ props.data.message.remarks }</p> }
            
            { remainsAnswer }
            
            <input type="submit" value="確認" onClick={ props.goToConfirm } disabled={ props.data.disabled }/>

        </form>
    )
}

export default Form