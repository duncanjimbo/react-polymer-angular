'use strict';

var React = require('react/addons');
var CommentModel = require('components/Comment/Comment');

require('./CommentList.css');

/*

 ## Example

  <CommentList data={this.state.data}/>

 */

var CommentList = React.createClass({

  /*
     The data contains the array of comments

     @attribute data
     @type Array
   */

  render: function () {
    var commentNodes = this.props.data.map(function (comment) {
      var timeago = '';
      if ((typeof comment.timestamp !== 'undefined') && (comment.timestamp !== '')){
        var timeStamp = comment.timestamp;
        var nowStamp = Math.floor(Date.now() / 1000);
        var units = [
          {name: "minute", limit: 3600, in_seconds: 60},
          {name: "hour", limit: 86400, in_seconds: 3600},
          {name: "day", limit: 604800, in_seconds: 86400}
        ];
        var diff = (nowStamp - timeStamp);

        if (diff < 60) {
          timeago = '1 minute ago';
        }
        else {
          var i = 0, unit;
          while (unit = units[i++]) {
            if (diff < unit.limit || !unit.limit){
              diff =  Math.floor(diff / unit.in_seconds);
              timeago = diff + " " + unit.name + (diff > 1 ? "s" : "") + " ago";
              break;
            }
          };
        }
      }

      return (
        <CommentModel author={comment.author} key={comment.id}>
          <span className="message">{comment.msg}</span>
          <span className="timestamp">{timeago}</span>
        </CommentModel>
      );
    });
    return (
      <div className="commentList">
        {this.props.data.length > 0 ? commentNodes : 'No comments yet'}
      </div>
    );
  }
});


module.exports = CommentList;

