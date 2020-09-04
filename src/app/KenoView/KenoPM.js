import { observable, decorate, action } from "mobx";

class KenoPM {
  //Standard error messages
  selectionError = "Too Many Numbers Selected";
  duplicates =
    "This Number Has Already Been Selected! Please Select A Different Value";

  //Array to store the grid numbers
  grid_element = [];
  //Hold the amount to bet
  bet_amount = 0.0;
  //A default list of amounts to bet. Dynamically changes as the user adds different values
  default_amounts = [50, 100, 200, 500, 1000];
  //Stores the grid numbers being selected for the bet
  selected_values = [];
  //Logs the number of bets made
  number_of_bets = 0;
  //Creates a map to store the Id and bets
  submitted_bet = new Map();
  //Variable to disable the submit button until the correct criteria is met
  submit_button = false;

  constructor(props) {
    props = this.props;
  }

  //Generates the grid
  fetch() {
    for (var i = 1; i < 81; i++) {
      this.grid_element.push({ key: i, clicked: false });
    }
  }

  //Funtions to handle updating the amount
  //Updates the variable bet_amount
  setAmount(value) {
    this.bet_amount = value.value;
    //If more than one number has been selected and a set amount then the submit button can be active.
    if (this.selected_values.length > 0) {
      this.submit_button = true;
    }
  }

  //OnChangeAmountHandler
  onChangeHandler(e) {
    this.bet_amount = e.target.value;
    //If more than one number has been selected and a set amount >0.01 then the submit button can be active.
    if (this.selected_values.length > 0 && this.bet_amount > 0.01) {
      this.submit_button = true;
    } else {
      this.submit_button = false;
    }
  }

  //If a grid location is selected
  onClickGrid(square) {
    //used a nested if statement to give a specific error to the user. Alternatively could
    // have used the && this.checkDuplicate(square.square) === -1
    if (this.checkDuplicate(square) !== -1) {
      alert(this.duplicates);
    } else {
      //Check if another number is allowed
      if (this.selected_values.length < 5) {
        this.selected_values.push(square);
        //Set the checked property for the grid square
        this.grid_element[square - 1] = { key: square, clicked: true };
      } else {
        alert(this.selectionError);
      }
    }
    //if the amount is greater than 0.1 allow for the submit button to be active
    if (this.bet_amount > 0.1) {
      this.submit_button = true;
    }
  }

  // Function to handle the Lucky Pick.
  luckyPick() {
    //Deselect all the previously selected grid squares
    this.selected_values.map(
      (e) => (this.grid_element[e - 1] = { key: e, clicked: false })
    );
    //Clear the previous grid selections
    this.selected_values = [];

    //Use a while loop to make 5 random grid selections
    while (true) {
      if (this.selected_values.length < 5) {
        let rand = Math.round(Math.random() * 80);
        //Checks to see if the random number is a duplicate, if so another random
        // value is selected and pushed onto the selected values array.
        if (this.checkDuplicate(rand) !== -1) {
          rand = Math.round(Math.random() * 80);
          this.selected_values.push(rand);
          this.grid_element[rand - 1] = { key: rand, clicked: true };
        } else {
          this.selected_values.push(rand);
          this.grid_element[rand - 1] = { key: rand, clicked: true };
        }
      } else {
        break;
      }
    }
    if (this.bet_amount > 0.1) {
      this.submit_button = true;
    }
  }

  //Function to remove a selected grid value
  removeValue(value) {
    let location = this.selected_values.indexOf(value);
    this.selected_values.splice(location, 1);
    this.grid_element[value - 1] = { key: value, clicked: false };
    if (this.selected_values.length < 1) {
      this.submit_button = false;
    }
  }

  //Submission of a bet handler
  onSubmitHandler(e) {
    e.preventDefault();
    //Checks if the bet is valid if so pushes the bet and id to a Map
    if (
      this.bet_amount > 0.1 &&
      this.selected_values.length > 0 &&
      this.selected_values.length < 6
    ) {
      let bet = {
        amount: this.bet_amount,
        bet: this.selected_values,
      };
      //pushes the values on to the map and increases the tally of bets places
      this.submitted_bet.set(this.number_of_bets, bet);
      this.number_of_bets++;

      //maps over the previously selected grid locations, returning them to unchecked
      //and emptys the selected array
      this.selected_values.map(
        (e) => (this.grid_element[e - 1] = { key: e, clicked: false })
      );
      this.selected_values = [];

      //Checks if the bet amount value is different to those already displayed. If so its added
      if (this.default_amounts.indexOf(this.bet_amount) === -1) {
        this.default_amounts.pop();
        this.default_amounts.unshift(this.bet_amount);
      }

      //Resets the amount bet and alerts the user to a successful bet else throws an error message
      this.bet_amount = 0;
      alert("Bet has been sucessfully placed!");
    } else {
      if (this.bet_amount > 0.01) {
        alert("Please select a grid number before placing a bet");
      } else if (this.selected_values.length > 0) {
        alert("Please enter a bet amount greater than £0.01");
      }
    }
    //disables the submission button
    this.submit_button = false;
  }

  //Function to see if a default value already exists in the array
  defaultAmountsCheck(value) {
    return this.default_amounts.indexOf(value);
  }

  //function to check for duplicate values
  checkDuplicate(value) {
    return this.selected_values.indexOf(value);
  }
}

//Decorators for Mobx
decorate(KenoPM, {
  bet_amount: observable,
  submitted_bet: observable,
  submit_button: observable,
  selected_values: observable,
  grid_element: observable,
  default_amounts: observable,
  removeValue: action,
  checkDuplicate: action,
  luckyPick: action,
  onChangeHandler: action,
  onSubmitHandler: action,
  onClickGrid: action,
  setAmount: action,
  fetch: action,
  isChecked: action,
});

export default KenoPM;
