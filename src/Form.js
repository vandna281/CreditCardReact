import React from 'react';
import axios from 'axios';

export default class Form extends React.Component {
    constructor() {
        super();
        this.state = {
            userName: '',
            cardNumber: '',
            cardLimit: '',
            cardList: []
        };
    }

    componentDidMount() {
        this.fetchCardList();
    } 

    fetchCardList = () => {
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
                cardList: response.data,
                userName: '',
                cardNumber: '',
                cardLimit: ''
            })
        })
    }

    renderCardData(cardList) {
        return cardList.map((card) => {
            const { id, userName, cardLimit, balance, cardNumber } = card;
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
        let { target:{name, value} } = e; 
        if(name !== 'userName')
            value = value.replace(/[^0-9]/g, ''); 
        this.setState({ [name]: value });
    }

    addCard = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        const fetchCall = this.fetchCardList;
        var postData = {};
        for (var entry of data.entries()) {
            postData[entry[0]] = entry[1];
        }
        postData = JSON.stringify(postData); 

        axios({
            method: 'POST',
            url: 'http://localhost:8080/card/add',
            mode: 'no-cors',
            //crossDomain: true,
            data: postData,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true
            }
        }).then(function (response) {
            alert(response.data);
            fetchCall();
        }).catch((error, response) => {
            if ((error.response.status === 409) || (error.response.status === 400)) {
                alert(error.response.data);
            }
        })
        return false;
    }

    render() {
        const { userName, cardNumber, cardLimit, cardList} = this.state;
        return (
            <>
                <h1 align="left">Credit Card System</h1> 
                <h2 align="left">Add</h2> 
                <form onSubmit={ (e) => this.addCard(e) }>
                    <label htmlFor="userName">Name</label>
                    <input type="text" name="userName" value={userName} onChange={this.onChange} size="50"/> <br /> <br />
                    
                    <label htmlFor="cardNumber">Card number</label> 
                    <input type="text" name="cardNumber" value={cardNumber} onChange={this.onChange} size="50" maxLength="19"/> <br /> <br />
                    
                    <label htmlFor="cardLimit">Limit</label>
                    <input type="text" name="cardLimit" value={cardLimit} onChange={this.onChange} size="50"/> <br /> <br />

                    <input type="submit" value="Add" />
                </form>
                <br /> <br />
                
                <h2 id='title' align="left">Existing Cards</h2>
                {
                    cardList.length === 0 ?
                    (
                        <p>No existing cards</p>
                    )
                    :
                    (
                        <table id='carddetail' width='100%' border="1">
                            <tbody>
                                <tr bgcolor='#ccc'>
                                    <th width="20%">Name</th>
                                    <th width="40%">Card Number</th>
                                    <th width="20%">Balance</th>
                                    <th width="20%">Limit</th>
                                </tr>
                                {this.renderCardData(cardList)}
                            </tbody>
                        </table> 
                    )
                } 
            </>
        );
    }
}