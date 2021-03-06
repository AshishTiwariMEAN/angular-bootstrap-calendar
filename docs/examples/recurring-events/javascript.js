angular
  .module('mwl.calendar.docs')
  .controller('RecurringEventsCtrl', function($scope, moment) {

    var vm = this;

    vm.events = [];
    vm.calendarView = 'month';
    vm.viewDate = moment().toDate();
    vm.isCellOpen = true;

    $scope.$watchGroup([
      'vm.calendarView',
      'vm.viewDate'
    ], function() {

      // Use the rrule library to generate recurring events: https://github.com/jkbrzt/rrule
      var rule = new RRule({
        freq: RRule.WEEKLY,
        interval: 1,
        byweekday: [RRule.MO],
        dtstart: moment(vm.viewDate).startOf(vm.calendarView).toDate(),
        until: moment(vm.viewDate).endOf(vm.calendarView).toDate()
      });

      vm.events = [{
        title: 'Recurs monthly',
        type: 'warning',
        startsAt: moment().toDate(),
        recursOn: 'month'
      }, {
        title: 'Recurs yearly',
        type: 'info',
        startsAt: moment().toDate(),
        recursOn: 'year'
      }];

      rule.all().forEach(function(date) {
        vm.events.push({
          title: 'Recurs weekly on mondays',
          type: 'success',
          startsAt: new Date(date)
        });
      });

    });

  });
