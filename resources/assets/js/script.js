import React, { Component } from 'react'
import ReactDOM from 'react-dom'

//コンポーネント
import Main from './components/main'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            formData: [{
                name: '',
                email: '',
                zip: '',
                tel: '',
                remarks: '',
            }],
            message: [{
                name: '',
                email: '',
                zip: '',
                tel: '',
                remarks: '',
            }],
            hasError: [{
                name: true,
                email: true,
                zip: true,
                tel: true,
                remarks: false,//必須ではないのでfalse始まり
            }],
            disabled: true,
            confirmVisible: false,
            test: {
                a: "a",
                b: "b"
            }
        }
    }
    
    render(){
        
        const setTest = e => {
            e.preventDefault()
            console.log("↓Before test↓");
            console.log(this.state.test);
            this.setState({test:{a: "c"}})
            console.log("↓After test↓");
            console.log(this.state.test);
        }
        
        // const stateData = {
        //     form: {
        //         formData: this.state.formData,
        //         message: this.state.message,
        //         disabled: this.state.disabled
        //     },
        //     confirm: {
        //         formData: this.state.formData,
        //     },
        //     confirmVisible: this.state.confirmVisible
        // }
        
        // console.log(this.state.form)
        // console.log(this.state.message)
        // console.log(this.state.hasError)
        // console.log("disabled : " + this.state.disabled)
        
        //エラーメッセージを格納する関数
        const setMessage = (inputName, errorMessage) =>{
            const message_copy = this.state.message.slice();
            message_copy[0][inputName] = errorMessage
            this.setState({message: message_copy})
            
            if(errorMessage != ""){
                const hasError_copy = this.state.hasError.slice();
                hasError_copy[0][inputName] = true
                this.setState({hasError: hasError_copy})
            }
        }
        
        //valueを格納する関数
        const setForm = (inputName, formData) =>{
            const copy = this.state.form.slice();
            copy[0][inputName] = formData
            this.setState({form: copy})
            
            const hasError_copy = this.state.hasError.slice();
            hasError_copy[0][inputName] = false
            this.setState({hasError: hasError_copy})
        }
        
        //最大文字数のバリデーション
        const maxValueLength = (max, inputName, value) => {
            console.log(value.length);
            
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
        
        //バリデーション項目
        const validationEntry = (value, inputName, validation) => {
            if(validation.includes('required')){
                if(!value){
                    //エラーメッセージをセット
                    setMessage(inputName, "空です。")
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
                    break;
                case 2:
                    minMaxValueLength(Number(getMin(minmax)), Number(getMax(minmax)), inputName, value)
                    break;
                default:
                    break;
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
                if(value.match(/^0[7-9]0-?[1-9]\d{3}-?\d{4}$/)){
                    //バリデーションを通ったデータを格納
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
            const value = e.target.value
            const inputName = e.target.getAttribute('name')
            const validation = e.target.getAttribute('data-validation').split(" ")
            
            validationEntry(value, inputName, validation)
            
            if(!this.state.hasError[0].name && !this.state.hasError[0].email && !this.state.hasError[0].zip  && !this.state.hasError[0].tel && !this.state.hasError[0].remarks){
                this.setState({disabled: false})
            }else{
                this.setState({disabled: true})
            }
            
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
        };
        
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
