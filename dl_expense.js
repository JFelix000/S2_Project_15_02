"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 13
   Case Problem 2

    Author: Jose Felix
    Date:   4.18.19
   
   Filename: dl_expenses.js
   
   Function List
   =============
   
   validateSummary()
      Validates the data entry in the summary field.
   
   calcClass(sumClass)
      Sums up all of the data values for elements of the sumClass class.
      
   calcExp()
      Calculates the travel expenses from all categories and dates.
      
   formatNumber(val, decimals)
      Formats the value, "val" to the number of decimals indicated 
      by "decimals", adding thousands separators.
      
   formatUSCurrency(val)
      Formats the value, "val", as U.S. currency.
      
*/
// this is to make the browser run when the website starts
window.addEventListener("load", function () {
      //gets the table with the id travelExp
      var changingCells = document.querySelectorAll('table#travelExp');
      // uses changingCells to run the loop and execute calcExp when something changes in there
      for (var i = 0; i < changingCells.length; i++) {
            changingCells[i].onchange = calcExp;
      }
      // makes id submitButton when clicked run the validateSummary function
      document.getElementById("submitButton").onclick = validateSummary;
});

function validateSummary() {
      var summary = document.getElementById("summary");
      // checks whether it is missing the value or not
      if (summary.validity.valueMissing) {
            //gives the custom message
            summary.setCustomValidity("You must include the summary of the trip in your report.");
      } else {
            summary.setCustomValidity("");
      }
}

function calcClass (sumClass) {
      // sets the sumTotal and sumFields to be set later on and changed
      var sumFields = document.getElementsByClassName(sumClass);
      var sumTotal = 0;
      for (var i = 0; i < sumFields.length; i++) {
            // itemValue uses parseFloat to check whether the first character in the string is a number
            var itemValue = parseFloat(sumFields[i].value);
            // test to check whether the it is a number using not isNaN and it tests for itemValue
            if (!isNaN(itemValue)) {
                  // adds the value of the sumTotal to the itemValue
                  sumTotal += itemValue;
            }
      }
      // gets the value of the sumTotal to be used later
      return sumTotal;
}

function calcExp() {
      //checks all of the code to get the tbody and tr
      var expTable = document.querySelectorAll("table#travelExp tbody tr");
      for (var i = 0; i < expTable.length; i++) {
            // uses index to be concatenated with the i variable instead so it can be run in a for loop
            document.getElementById("subtotal" + i).value = formatNumber(calcClass("date" + i), 2);
      }
      // uses the values of all the ids and makes them run a calculation to the second decimal at the ends of it
      document.getElementById("transTotal").value = formatNumber(calcClass("trans"), 2);
      document.getElementById("lodgeTotal").value = formatNumber(calcClass("lodge"), 2);
      document.getElementById("mealTotal").value = formatNumber(calcClass("meal"), 2);
      document.getElementById("otherTotal").value = formatNumber(calcClass("other"), 2);

      // set the value of the expTotal input element
      document.getElementById("expTotal").value = formatUSCurrency(calcClass("sum"));
}



// dont touch
function formatNumber(val, decimals) {
      return val.toLocaleString(undefined, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
      });
}

function formatUSCurrency(val) {
   return val.toLocaleString('en-US', {style: "currency", currency: "USD"} );
}