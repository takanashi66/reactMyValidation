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
            }]
        }
    }
    
    render(){
        
        console.log(this.state.form)
        console.log(this.state.message)
        
        //エラーメッセージを格納する関数
        const setMessage = (inputName, errorMessage) =>{
            const copy = this.state.message.slice();
            copy[0][inputName] = errorMessage
            this.setState({message: copy})
        }
        
        //valueを格納する関数
        const setForm = (inputName, formData) =>{
            const copy = this.state.form.slice();
            copy[0][inputName] = formData
            this.setState({form: copy})
        }
        
        const checkValidation = (e) =>{
            let s = []
            const value = e.target.value
            const inputName = e.target.getAttribute('name')
            const validation = e.target.getAttribute('data-validation').split(" ")
            
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
        }
        
        const onSubmit = (e) => {
            e.preventDefault()
            
            alert("サブミット")
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
