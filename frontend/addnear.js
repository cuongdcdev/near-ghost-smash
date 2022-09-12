import 'regenerator-runtime/runtime';
import { Contract } from './near-interface';
import { Wallet } from './near-wallet';
import { gameLogic } from './gamelogic';
// create the Wallet and the Contract
const wallet = new Wallet({contractId: process.env.CONTRACT_NAME});
const contract = new Contract({wallet: wallet});

// Setup on page load
window.onload = async () => {
  //near logic 
  window.isSignedIn = await wallet.startUp();
  if(isSignedIn){
    signedInFlow();
  }else{
    signedOutFlow();
  }

  //start game logic 
  gameLogic();
  await getHighScores();
};

// Button clicks
document.querySelector('#sign-in-button').onclick = () => { console.log("sigout"); wallet.signIn(); };
document.querySelector('#sign-out-button').onclick = () => { wallet.signOut(); }; 

// Take the new greeting and send it to the contract
// async function doUserAction(event) {
//   event.preventDefault();
//   const { greeting } = event.target.elements;

//   document.querySelector('#signed-in-flow main')
//     .classList.add('please-wait');

//   await contract.setGreeting(greeting.value);

//   // ===== Fetch the data from the blockchain =====
//   // await getHighScores();
//   document.querySelector('#signed-in-flow main').classList.remove('please-wait');
// }

// Get greeting from the contract on chain
async function getHighScores() {
  let listScore = document.getElementById("highScore");
  listScore.innerHTML = "loading...";
  const hs = await contract.get_scores();
  listScore.innerHTML = "";
  console.log("top high scores" , hs );
  hs.sort( (a,b)=> { if( a.score == b.score ) return 0 ; return a.score > b.score  ? -1 : 1}  );
  hs.map( s => {
    let l = document.createElement("li");
    l.appendChild( document.createTextNode( `${s.name} - ${s.score}`) ) ;
    listScore.appendChild( l );
  });
  // document.querySelectorAll('[data-behavior=greeting]').forEach(el => {
  //   el.innerText = currentGreeting;
  //   el.value = currentGreeting;
  // });
}

window.saveScoreToNear = async function(){
  let listScore = document.getElementById("highScore");
  let s = window.getScore();
  if( isSignedIn ){
    listScore.innerHTML = "loading...";
    await contract.set_score(s);
    console.log("Save new score to NEAR " , s ) ;   
    await getHighScores();
  }
  console.log("called save score to near | score: " , s  )
}

// Display the signed-out-flow container
function signedOutFlow() {
  document.querySelector('#signed-in-flow').style.display = 'none';
  document.querySelector('#signed-out-flow').style.display = 'block';
}

// Displaying the signed in flow container and fill in account-specific data
function signedInFlow() {
  document.querySelector('#signed-out-flow').style.display = 'none';
  document.querySelector('#signed-in-flow').style.display = 'block';
  document.querySelectorAll('[data-behavior=account-id]').forEach(el => {
    el.innerText = wallet.accountId;
  });
}