import React from "react"

const getGenderLabel = gen => {
    if (Number(gen) === 0) {
        return "男"
    } else if (Number(gen) === 1) {
        return "女"
    }
}

//改行を表示
const nl2br = text => {
    const regex = /(\n)/g
    return text.split(regex).map((line, i) => {
        if (line.match(regex)) {
            return <br key={i} />
        } else {
            return line
        }
    })
}

//Confirm
const Confirm = props => {
    return (
        <div>
            <table className="confirm_table">
                <tbody>
                    <tr>
                        <th>お名前</th>
                        <td>{ props.data.formData.name }</td>
                    </tr>
                    <tr>
                        <th>メールアドレス</th>
                        <td>{ props.data.formData.email }</td>
                    </tr>
                    <tr>
                        <th>郵便番号</th>
                        <td>{ props.data.formData.zip }</td>
                    </tr>
                    <tr>
                        <th>電話番号</th>
                        <td>{ props.data.formData.tel }</td>
                    </tr>
                    <tr>
                        <th>性別</th>
                        <td>{ getGenderLabel(props.data.formData.gender) }</td>
                    </tr>
                    <tr>
                        <th>備考</th>
                        <td>{ nl2br(props.data.formData.remarks) }</td>
                    </tr>
                </tbody>
            </table>

            <div className="return_btn" onClick={ props.onClickReturn }>
                <a href="#">
                    戻って修正
                </a>
            </div>

            <div className="link_btn">
                <a href="#">
                    送信
                </a>
            </div>
        </div>
    )
}

export default Confirm