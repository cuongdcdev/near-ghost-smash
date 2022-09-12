export class Contract{
  wallet;

  constructor({wallet}){
    this.wallet = wallet;
  }

  async getGreeting(){
    return await this.wallet.viewMethod({method: 'get_greeting'});
  }
  
  async setGreeting(greeting){
    return await this.wallet.callMethod({method: 'set_greeting', args:{message: greeting}});
  }

  async set_score( score ){
    return await this.wallet.callMethod( {method: 'set_score' , args: {score: score}});
  }

  async get_scores(){
    return await this.wallet.viewMethod( {method: 'get_scores' , args:{} } );
  }
}