import { NearBindgen, near, call, view } from 'near-sdk-js';
import { Score} from './model';

@NearBindgen({})
class ScoreBoard {
  scores: Score[] = [];

  @call({})
  set_score({ score }) {
    let name = near.predecessorAccountId();

    if( near.currentAccountId() != name ){
      near.log( "Only contract can do this" );
      return;
    }

    const s = new Score({ name, score });
    //only allow top 6 best players 
    if (this.scores.length < 6) {
      this.scores.push(s);
      near.log(`set new score ${name} - ${score}`);
    } else {
      //sort high to low scores 
      let lastIndex = this.scores.length - 1;
      this.scores.sort((a, b) => { return a.score > b.score ? -1 : 1 });
      if (this.scores[lastIndex].score <= s.score) {
        //replace new high score 
        this.scores[lastIndex] = s;
        near.log(`New high score of # ${lastIndex} -  ${name} - ${score}`);
      }
    }
  }

  @view({})
  get_scores(): Score[] {
    return this.scores;
  }


}
