import React from "react"

const getGenderLabel = gen => {
    if (gen === "0") {
        return "男"
    } else if (gen === "1") {
        return "女"
    }
}

const getFactionLabel = fac => {
    if (fac === "0") {
        return "犬派"
    } else if (fac === "1") {
        return "猫派"
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
                        <th>都道府県</th>
                        <td>{ props.data.formData.prefecture }</td>
                    </tr>
                    <tr>
                        <th>性別</th>
                        <td>{ getGenderLabel(props.data.formData.gender) }</td>
                    </tr>
                    <tr>
                        <th>派閥</th>
                        <td>{ getFactionLabel(props.data.formData.faction) }</td>
                    </tr>
                    <tr>
                        <th>使用中のデバイス</th>
                        <td>{ props.data.formData.device }</td>
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