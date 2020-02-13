import React from "react";

const getGenderLabel = gen => {
    if (gen === "men") {
        return "男";
    } else if (gen === "women") {
        return "女";
    } else {
        return "その他";
    }
};

//改行を表示
const nl2br = text => {
    const regex = /(\n)/g;
    return text.split(regex).map((line, i) => {
        if (line.match(regex)) {
            return <br key={i} />;
        } else {
            return line;
        }
    });
};

//Confirm
const Confirm = props => {
    const { formData, onClickReturn, onClickSubmit } = props;
    const item = formData;
    return (
        <div>
            <table className="confirm_table">
            {props.data.formData.map((item, i) =>{
                return(
                    <tbody key={i}>
                        <tr>
                            <th>お名前</th>
                            <td>{ item.name }</td>
                        </tr>
                        <tr>
                            <th>メールアドレス</th>
                            <td>{ item.email }</td>
                        </tr>
                        <tr>
                            <th>郵便番号</th>
                            <td>{ item.zip }</td>
                        </tr>
                        <tr>
                            <th>電話番号</th>
                            <td>{ item.tel }</td>
                        </tr>
                        <tr>
                            <th>備考</th>
                            <td>{ nl2br(item.remarks) }</td>
                        </tr>
                    </tbody>
                )
            })}
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
    );
};

export default Confirm;