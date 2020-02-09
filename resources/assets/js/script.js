import React, { Component } from 'react'
import ReactDOM from 'react-dom'

//コンポーネント
import Form from './components/form'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            form: [{
                name: '',
                email: '',
                zip: '',
                tel: '',
            }],
            message: [{
                name: '',
                email: '',
                zip: '',
                tel: '',
            }],
            hasError: [{
                name: true,
                email: true,
                zip: true,
                tel: true,
            }],
            disabled: true
        }
    }
    
    render(){
        
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
        
        const checkValidation = (e) =>{
            const value = e.target.value
            const inputName = e.target.getAttribute('name')
            const validation = e.target.getAttribute('data-validation').split(" ")
            
            validationEntry(value, inputName, validation)
            
            if(!this.state.hasError[0].name && !this.state.hasError[0].email && !this.state.hasError[0].zip  && !this.state.hasError[0].tel){
                this.setState({disabled: false})
            }else{
                this.setState({disabled: true})
            }
            
        }
        
        const onSubmit = (e) => {
            e.preventDefault()
        }
        
        return(
            <div className="wrap">
                <header className="header">
                    <h1>フォーム作るよ</h1>
                </header>
                
                <main className="main">
                    <Form 
                        checkValidation={ checkValidation } 
                        onSubmit={ onSubmit } 
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
