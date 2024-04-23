
// for cuurency convertor api

const base_url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";


// we get select from dropdrown
const dropdowns = document.querySelectorAll(".dropdown select");

//access btn
const btn = document.querySelector(" form button");

//access fromCurr & toCurr

let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");


// to access msg

let msg = document.querySelector(".msg");

// for(let currCode in countryList){

//    // console.log(currCode);   //return currency

//    //to access currency and countrycode

//    console.log(currCode , countryList[currCode]);
// }



for(let select of dropdowns){

     //currCode basically key (INR) in country_code.js & country code(IN) is value
    for(let currCode in countryList){

        // for all list add new option

        // option() basically used to create new HtmlElement

        // here all countryList store newOption & newOption given to select
        let newOption = document.createElement("option");

        newOption.innerText = currCode;
        newOption.value = currCode;


// we want in from USD selected & in to INR selected then

     if(select.name === "from" && currCode === "USD"){

           newOption.selected = "selected";
     }
     else if(select.name === "to" && currCode === "INR"){

        newOption.selected = "selected";
  }

        // now newOption gives values to select using append() method

        select.append(newOption);
     
       
     }


     //use add addEventListener to select after change in select

     // Event object is parent of all evevent object. in events we have - change	The content of a form element have changed
     select.addEventListener("change" , (e) =>{

         updateFlag(e.target);
     } );

     // Event has property called - target	Returns the element that triggered the event  

          

}


// to update flag

const updateFlag = (element) => {

    // console.log(element);  //we get element on console browser

    // with help of element extract currency code
    let currCode = element.value
   // console.log(currCode);        // INR , USD , EUR

    //with help of currency code we can access countryCode
    let countryCode = countryList[currCode];  //IN , US
   // console.log(countryCode);

   // flaf old url -  src="https://flagsapi.com/US/flat/64.png"

   let new_flag_url = `https://flagsapi.com/${countryCode}/flat/64.png`;

    // to access img 

    // we have element & in ele. we have select but img is on parent
           let img = element.parentElement.querySelector('img');

           img.src = new_flag_url;

           //assign new flag url to img src

};

// now we look at exchange rate - when click on exchange rate then we get exchange value

// add eventListener to btn

btn.addEventListener("click" , async (evt) =>{

    evt.preventDefault();     
    //access amount
    let amount = document.querySelector(".amount input");
 
     let amtValue = amount.value;

     if(amtValue > 0){

         amtValue;
     }else{
        alert("input value greter than 0")
     }
     
     
     // NOW WE CREATE URL WHERE WE SEND REQ. TO FETCH EXCHANGE RATE
     // api works on lowercase so convert value to toLowerCase()
   // console.log(fromCurr.value , toCurr.value);

    const url = `${base_url}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
    
    
    //use fetch api so above fun. create async.
    //sends req get response in json object
    let respose = await fetch(url);
// console.log(respose);

    // to convert into js object use json()
    let data = await respose.json();
//   console.log(data);

   // from data only access toCurr value
    let rate = data[toCurr.value.toLowerCase()];

   // console.log(rate);


   //formula for EXc.rate
   let finalAmount = amtValue * rate; 

    //to print use templete literal 1USD = 80INR mould it into below
    msg.innerText = ` ${amtValue} ${fromCurr.value} =  ${finalAmount} ${toCurr.value}`


   
});

