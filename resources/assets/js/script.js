import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'

//コンポーネント
import Main from './components/main'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            formData: {
                name: '',
                date: '',
                email: '',
                zip: '',
                tel: '',
                prefecture: '',
                gender: '',
                faction: '',
                device: '',
                remarks: '',
            },
            message: {
                name: '',
                date: '',
                email: '',
                zip: '',
                tel: '',
                prefecture: '',
                gender: '',
                faction: '',
                device: '',
                remarks: '',
            },
            hasError: {
                name: true,
                date: true,
                email: true,
                zip: true,
                tel: true,
                prefecture: true,
                gender: true,
                faction: false,
                device: false,
                remarks: false,//必須ではないのでfalse始まり
            },
            remainsAnswer: 7,
            disabled: true,
            confirmVisible: false,
        }
    }
    
    render(){
        
        // console.log(this.state.formData)
        // console.log(this.state.message)
        // console.log(this.state.hasError)
        // console.log("disabled : " + this.state.disabled)
        
        //エラーメッセージを格納する関数
        const setMessage = (inputName, errorMessage) =>{
            const message = {[inputName]: errorMessage}
            const assignMessage = Object.assign(this.state.message, message)
            this.setState({
                message: assignMessage
            })
            
            if(errorMessage != ""){
                const hasError = {[inputName]: true}
                const assignHasError = Object.assign(this.state.hasError, hasError)
                this.setState({
                    hasError: assignHasError
                })
            }
        }
        
        //valueを格納する関数
        const setForm = (inputName, formData) =>{
            const data = {[inputName]: formData}
            const assigndData = Object.assign(this.state.formData, data)
            this.setState({
                formData: assigndData
            })
            
            const hasError = {[inputName]: false}
            const assignHasError = Object.assign(this.state.hasError, hasError)
            this.setState({
                hasError: assignHasError
            })
        }
        
        //最大文字数のバリデーション
        const maxValueLength = (max, inputName, value) => {
            if(value.length <= max){
                //バリデーションを通ったデータを格納
                setForm(inputName, value)
                //エラーメッセージを削除
                setMessage(inputName, "")
            }else{
                //エラーメッセージをセット
                setMessage(inputName, max + "文字以内で入力してください。")
            }
        }
        
        //最小文字数のバリデーション
        const minValueLength = (min, inputName, value) => {
            if(value.length >= min){
                //バリデーションを通ったデータを格納
                setForm(inputName, value)
                //エラーメッセージを削除
                setMessage(inputName, "")
            }else{
                //エラーメッセージをセット
                setMessage(inputName, min + "文字以上で入力してください。")
            }
        }
        
        //最大値最小値両方あった場合のバリデーション
        const minMaxValueLength = (min, max, inputName, value) => {
            if(value.length >= min && value.length <= max){
                //バリデーションを通ったデータを格納
                setForm(inputName, value)
                //エラーメッセージを削除
                setMessage(inputName, "")
            }else{
                //エラーメッセージをセット
                setMessage(inputName, min + "文字以上" + max + "文字以下で入力してください。")
            }
        }
        
        //minの数値を取得する関数
        const getMin = (minmax) =>{
            let min = 0
            minmax.map(i=>{
                if(/^min/.test(i)){
                    min = i.slice(3)
                    return min
                }
            })
            return min
        }
        
        //maxの数値を取得する関数
        const getMax = (minmax) =>{
            let max = 0
            minmax.map(i=>{
                if(/^max/.test(i)){
                    max = i.slice(3)
                    return max
                }
            })
            return max
        }
        
        const getCheckboxValue = (inputName, validation) =>{
            let value="";
            const ele=document.getElementsByName(inputName);
            for(let i = 0; i < ele.length; i++){
                if(ele[i].checked){
                    if(value!=="") value+=",";
                    value+=ele[i].value;
                }
            }
            if(value == "" && validation.includes('required')){
                setMessage(inputName, "空です")
            }else{
                //バリデーションを通ったデータを格納
                setForm(inputName, value)
                //エラーメッセージを削除
                setMessage(inputName, "")
            }
        }
        
        //バリデーション項目
        const validationEntry = (value, inputName, validation) => {
            if(validation.includes('required')){
                if(!value){
                    //エラーメッセージをセット
                    setMessage(inputName, "空です。")
                    return false
                }else{
                    //バリデーションを通ったデータを格納
                    setForm(inputName, value)
                    //エラーメッセージを削除
                    setMessage(inputName, "")
                }
            }
            
            //min max を取得
            const minmax = validation.filter(RegExp.prototype.test.bind(/^(max|min)[0-9]+/))
            
            switch (minmax.length) {
                case 1:
                    minmax.map(i=>{
                        if(/^min/.test(i)){
                            let min = i.slice(3)
                            minValueLength(min, inputName, value)
                        }
            
                        if(/^max/.test(i)){
                            let max = i.slice(3)
                            maxValueLength(max, inputName, value)
                        }
                    })
                    break
                case 2:
                    minMaxValueLength(Number(getMin(minmax)), Number(getMax(minmax)), inputName, value)
                    break
                default:
                    break
            }
            
            if(validation.includes('email')){
                if(value.match(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
                    //バリデーションを通ったデータを格納
                    setForm(inputName, value)
                    //エラーメッセージを削除
                    setMessage(inputName, "")
                
                }else{
                    //エラーメッセージをセット
                    setMessage(inputName, "メールアドレスの形式が違う。")
                }
            }
            
            if(validation.includes('tel')){
                if(value.match(/^[0-9０-９-ー]{6,15}$/)){
                    //バリデーションを通ったデータを格納
                    value = value.replace(/[０-９-ー]/g, function(s) {
                        return String.fromCharCode(s.charCodeAt(0) - 65248);
                    });
                    setForm(inputName, value)
                    //エラーメッセージを削除
                    setMessage(inputName, "")
                }else{
                    //エラーメッセージをセット
                    setMessage(inputName, "電話番号の形式が違う。")
                }
            }
            
            if(validation.includes('zip')){
                if(value.match(/^\d{3}[-]?\d{4}$/)){
                    //バリデーションを通ったデータを格納
                    setForm(inputName, value)
                    //エラーメッセージを削除
                    setMessage(inputName, "")
                }else{
                    //エラーメッセージをセット
                    setMessage(inputName, "郵便番号の形式が違う。")
                }
            }
        }
        
        //バリデーションチェック
        const checkValidation = (e) =>{
            const inputType = e.target.type
            const value = e.target.value
            const inputName = e.target.getAttribute('name')
            const validation = e.target.getAttribute('data-validation').split(" ")
            
            
            
            if(inputType === 'checkbox'){
                //値を取得
                getCheckboxValue('device', validation)
            }
            
            //ラジオボタンだった場合
            if(inputType === 'radio'){
                if(value == "" && validation.includes('required')){
                    //エラーメッセージをセット
                    setMessage(inputName, "空です。")
                    return false
                }else{
                    //バリデーションを通ったデータを格納
                    setForm(inputName, value)
                    //エラーメッセージを削除
                    setMessage(inputName, "")
                }
            }
            
            //セレクトだった場合
            if(inputType == 'select-one'){
                if(value == "" && validation.includes('required')){
                    //エラーメッセージをセット
                    setMessage(inputName, "空です。")
                }else{
                    //バリデーションを通ったデータを格納
                    setForm(inputName, value)
                    //エラーメッセージを削除
                    setMessage(inputName, "")
                }
            }
            
            validationEntry(value, inputName, validation)
            
            const getRemainsAnswer = () => {
                let remainsAnswer = 0
                
                for (let [key, value] of Object.entries(this.state.hasError)) {
                    if(value){
                        remainsAnswer += 1
                    }
                }
                
                return remainsAnswer
            }
            
            this.setState({
                remainsAnswer: getRemainsAnswer()
            })
            
            if(!Object.values(this.state.hasError).includes(true)){
                this.setState({disabled: false})
            }else{
                this.setState({disabled: true})
            }
            
        }
        
        //
        const checkDateValidation = (date) =>{
            if(date != ""){
                //今日以降のみ
                const ToDay = new Date(new Date().setHours(0, 0, 0, 0));
                if(date.isSameOrAfter(ToDay)){
                    const datetime = date.format("YYYY年MM月DD日")
                    //バリデーションを通ったデータを格納
                    setForm("date", datetime)
                    //エラーメッセージを削除
                    setMessage("date", "")
                }else{
                    setMessage("date", "不正な日付が選択されました")
                }
            }else{
                setMessage("date", "空です。")
            }
            return false
        }
        
        //サブミットされた時の処理
        const goToConfirm = (e) => {
            e.preventDefault()
            this.setState({confirmVisible: true})
        }
        
        //入力画面に戻る
        const onClickReturn = e => {
            e.preventDefault()

            //確認画面を非表示
            this.setState({confirmVisible: false})
        }
        
        //サブミットされた時の処理
        const onClickSubmit = (e) => {
            e.preventDefault()
        }
        
        return(
            <div className="wrap">
                <header className="header">
                    <h1>フォーム作るよ</h1>
                </header>
                
                <main className="main">
                    <Main 
                        checkValidation={ checkValidation } 
                        checkDateValidation={ checkDateValidation }
                        onClickSubmit={ onClickSubmit } 
                        onClickReturn={ onClickReturn }
                        goToConfirm = { goToConfirm }
                        data={ this.state } 
                    />
                </main>
                
                <footer className="footer">
                    <p><small>footer</small></p>
                </footer>
            </div>
        )
    }
}

//レンダリング
ReactDOM.render(
    <App />,
    document.getElementById('root')
)
