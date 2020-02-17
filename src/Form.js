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
                    <td>{balance}</td>
                    <td>{cardLimit}</td>
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
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h1>Credit Card System</h1> <br /> <br />
                    <h2>Add</h2> <br />
                    Name
                <br /> <input type="text" name="userName" value={this.state.userName} onChange={this.onChange} /> <br /> <br />
                    Card Number
                <br /> <input type="text" name="cardNumber" value={this.state.cardNumber} onChange={this.onChange} /> <br /> <br />
                    Limit
                <br /> <input type="text" name="cardLimit" value={this.state.cardLimit} onChange={this.onChange} /> <br /> <br />

                    <input type="submit" value="Add" />
                </form>
                <br />
                <div>
                    <h2 id='title'>Existing Cards</h2>
                    <table id='carddetail'>
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <th>Card Number</th>
                                <th>Balance</th>
                                <th>Limit</th>
                            </tr>
                            {this.renderCardData()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}