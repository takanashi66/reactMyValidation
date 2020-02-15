import React, { Component } from 'react'
import ReactDOM from 'react-dom'

//コンポーネント
import Main from './components/main'

// バリデーションの共通処理
const validationBase = (cond, message, normalize)=> value => {
    const v = normalize ? normalize(value) : value
    if (cond(v)) {
        return {
            valid: true,
            message: '',
            value,
        }
    }
    return {
        valid: false,
        message,
        value,
    }
}

const toHankakuNumber = v => v.replace(/[０-９-ー]/g,
        s => String.fromCharCode(s.charCodeAt(0) - 65248))

// バリデーション用の関数群
const validation = {
    required: validationBase(v => v, '空です。'),
    max: (max) => validationBase(v => v.length <= max,`${max}文字以内で入力してください。`),
    min: (min) => validationBase(v => v.length >= min, `${min}文字以上で入力してください。`),
    minMax: (min, max) => validationBase(v => v.length <= max && v.length >= min, `${min}文字以上${max}文字以下で入力してください。`),
    email: validationBase(v => {
        return v.match(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
    }, "メールアドレスの形式が違う。"),
    tel: validationBase(v => v.match(/^[0-9-ー]{6,15}$/), "電話番号の形式が違う", toHankakuNumber),
    zip: validationBase(v => v.match(/^\d{3}[-]?\d{4}$/), '郵便番号の形式が違う。'),
}

// inputタグの種類によっては強制するバリデーション
const defaultValidations = {
    radio: [validation.required],
    select: [validation.required],
}

// 各inputタグのバリデーションを指定
const validationConfig =
    {
        name: ["required"],
        email: ["required", "email"],
        zip: ["required", ["minMax", 7, 8], "zip"],
        tel: ["required", "tel"],
        prefecture: ["required"],
        gender: ["required"],
        faction: [],
        remarks: [["max", 100]],
    }

// validationConfigの値をバリデーション関数へ変換する関数
const toValidation = (config) => {
    if (Array.isArray(config)) {
        const [name, ...args] = config;
        return validation[name].apply(null, args)
    }
    if (typeof config === "string") {
        return validation[config]
    }
}

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            formData: {
                name: '',
                email: '',
                zip: '',
                tel: '',
                prefecture: '',
                gender: '',
                faction: '',
                remarks: '',
            },
            message: {
                name: '',
                email: '',
                zip: '',
                tel: '',
                prefecture: '',
                gender: '',
                faction: '',
                remarks: '',
            },
            hasError: {
                name: true,
                email: true,
                zip: true,
                tel: true,
                prefecture: true,
                gender: true,
                faction: false,
                remarks: false,//必須ではないのでfalse始まり
            },
            remainsAnswer: 6,
            disabled: true,
            confirmVisible: false,
        }
    }

    render(){
        //バリデーションチェック
        const checkValidation = (e) =>{
            const { value, name, type } = e.target;
            // 実行するバリデーションを用意する
            const validations = [
                ...defaultValidations[type] || [],
                ...(validationConfig[name] || []).map(toValidation)
            ]

            // バリデーションを順番に行う
            const { valid, value: formData, message } = validations.reduce((acc, validate) => {
                const { valid } = acc;
                // すでにエラーが有る場合、その他のバリデーションはスキップする仕様で
                if (!valid) {
                    return acc;
                }
                return validate(value)
            }, { valid: true, message: "", value, })

            const hasError = {
                ...this.state.hasError,
                [name]: !valid,
            }
            const errors = Object.values(hasError)

            this.setState({
                ...this.state,
                message: {
                    ...this.state.message,
                    [name]: message
                },
                hasError ,
                formData: {
                    ...this.state.formData,
                    [name]: formData,
                },
                remainsAnswer: errors.reduce((acc, value) => value ? acc+1 : acc, 0),
                disabled: errors.some(value => value),
            })
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
