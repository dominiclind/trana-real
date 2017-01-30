import {
  observable,
  autorun,
  computed,
  action,
  reaction
} from 'mobx';

import { StatusBar } from 'react-native';
//
// mobx store for CardSlider
//
class CardSlider {
  @observable index = ''
  @observable fullscreen = false;

  constructor() {
    // place reactions and autoruns here.
    reaction(() => this.fullscreen, (fullscreen) => {
      if (fullscreen) {
        StatusBar.setHidden(true, 'slide');
      } else {
        StatusBar.setHidden(false, 'slide');
      }
    });
  }

 
    

}
export default new CardSlider();
