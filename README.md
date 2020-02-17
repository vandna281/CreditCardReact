# CreditCardService React

                                
## Steps to build and run

```
  1.) Move to project directory using command line.
  2.) Then use command  : "npm start"
```  
## Info of API

```
  1.) When application starts it will fetch existing credit-card list from java backend service using 'GET' Rest API "http://localhost:8080/card".
  2.) When "ADD" button is clicked, all the form data will be posted to backend server to insert the new card using Rest API "http://localhost:8080/card/add".
  3.) If there is any error in any api call then alert will be shown with respective error message.
```

## Rest Api Contract

```
   GET : 	    http://localhost:8080/card
   Response Format: [
    {
        "id": 1,
        "userName": "firstUser",
        "balance": 0.00,
        "cardLimit": 10000,
        "cardNumber": "1111222233334444"
    },
    {
        "id": 2,
        "userName": "SecondUser",
        "balance": 0.00,
        "cardLimit": 20000,
        "cardNumber": "2222333344445555"
    }
]
         
```
```
   POST : 	    http://localhost:8080/card/add
   Example body : {
                "userName": "FirstUser",
                "cardLimit": 10000,
                "cardNumber": "1111222233334444"
                }
   Response Format:
   Some message with relevant http status code like : 201(success), 400(data corrupted), 409(conflict in data)
         
```

  
