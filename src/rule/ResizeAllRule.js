import RuleProvider from 'diagram-js/lib/features/rules/RuleProvider';

import inherits from 'inherits';

export default function ResizeAllRule(eventBus) {
  RuleProvider.call(this, eventBus);
}

inherits(ResizeAllRule, RuleProvider);

ResizeAllRule.$inject = [ 'eventBus' ];


ResizeAllRule.prototype.init = function() {

  this.addRule('shape.resize', 1500, function() {
    return true;
  });

};