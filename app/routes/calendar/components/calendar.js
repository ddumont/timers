define([
  'react'
], function (
  React
) {
  return React.createClass({
    render: function () {
      var events = [{
        id: 0,
        title: 'essay due'
      }];
      return (
        <div>
          <h2>Calendar</h2>
          <ul>
            {events.map(function (event) {
              return <li key={event.id}>{event.title}</li>;
            })}
          </ul>
        </div>
      );
    }
  });
});
