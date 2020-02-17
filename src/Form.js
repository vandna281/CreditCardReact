import React from 'react';
import axios from 'axios';

export default class Form extends React.Component {
    constructor() {
        super();
        this.state = {
            userName: '',
            cardNumber: '',
            cardLimit: '',
            cardList: [
                { id: 1, userName: 'firstuser', balance: 100, cardLimit: 10000, cardNumber: "1111222233334444" },
                { id: 2, userName: 'seconduser', balance: 200, cardLimit: 20300, cardNumber: "222222222222222" }
            ]
        };
    }

    renderCardData() {
        return this.state.cardList.map((card, index) => {
            const { id, userName, balance, cardLimit, cardNumber } = card //destructuring
            return (
                <tr key={id}>
                    <td>{userName}</td>
                    <td>{cardNumber}</td>
                    <td><span>&#163;</span>{balance}</td>
                    <td><span>&#163;</span>{cardLimit}</td>
                </tr>
            )
        })
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    fetchCardList() {
        axios({
            method: 'GET',
            url: 'http://localhost:8080/card',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
                'Accept': 'application/json'
            }
        }).then(response => {
            this.setState({
                cardList: response.data
            })
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        var postData = {};

        for (var entry of data.entries()) {
            postData[entry[0]] = entry[1];
        }
        postData = JSON.stringify(postData)

        axios({
            method: 'POST',
            url: 'http://localhost:8080/card/add',
            mode: 'no-cors',
            //crossDomain: true,
            data: postData,
            headers: {
                'Content-Type': 'application/json',
                //'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true
            }
        }).then(function (response) {
            alert(response.data);
        }).catch((error, response) => {
            if ((error.response.status == 409) || (error.response.status == 400)) {
                alert(error.response.data);
            }
        })

    }

    componentDidMount() {
        this.fetchCardList();
    }

    render() {
        return (
            <div style={{ "width": '80%', "align": 'center' }}>
                <form onSubmit={this.handleSubmit} style={{ "align": 'left', "width": '80%' }}>
                    <h1>Credit Card System</h1> <br />
                    <h2>Add</h2> <br />
                    <label>Name</label>
                    <br /> <input type="text" name="userName" value={this.state.userName} onChange={this.onChange} /> <br /> <br />
                    <label>Card number</label>
                    <br /> <input type="text" name="cardNumber" value={this.state.cardNumber} onChange={this.onChange} /> <br /> <br />
                    <label>Limit</label>
                    <br /> <input type="text" name="cardLimit" value={this.state.cardLimit} onChange={this.onChange} /> <br /> <br />

                    <input type="submit" value="Add" style={{ 'background-color': '#cccccc' }} />
                </form>
                <br /> <br />
                <div style={{ "width": '80%', "align": 'center' }}>
                    <h2 id='title' align="left">Existing Cards</h2>
                    <table id='carddetail' width='100%' align='center' border="1">
                        <tbody>
                            <tr bgcolor='#cccccc'>
                                <th width="25%">Name</th>
                                <th width="25%">Card Number</th>
                                <th width="25%">Balance</th>
                                <th width="25%">Limit</th>
                            </tr>
                            {this.renderCardData()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}