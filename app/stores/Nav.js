import {
  observable,
  autorun,
  computed,
  action
} from 'mobx';
//
// mobx store for Nav
//
class Nav {
  @observable current = '';
  @observable history = [];

  constructor() {
    // place reactions and autoruns here.
  }

  @action goTo(route) {
    this.history.push(route);
    this.current = route;
  }
}
export default new Nav();
