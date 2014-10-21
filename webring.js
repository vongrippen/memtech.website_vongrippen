var _webring = {};
$(function() {
    _webring = {
        userRegex: /memtech\.website\/\~(.*)\//
    };
    $.getJSON('http://memtech.website/~dpritchett/data/user_stats.json', function(json) {
        var tempUsers = [];
        var wrIndex = 0;
        for (var i = 0; i < json.users.length; i++) {
            if (json.users[i].webringMember == true) {
                tempUsers[wrIndex] = json.users[i].name;
                wrIndex = wrIndex + 1;
            }
        }
        _webring.users = tempUsers;
        var url = window.location.href;
        _webring.currentUser = _webring.userRegex.exec(url)[1].split('/')[0];
        _webring.currentUserIndex = _webring.users.indexOf(_webring.currentUser);
        _webring.prevUserIndex = _webring.currentUserIndex - 1;
        if (_webring.prevUserIndex < 0) {
            _webring.prevUserIndex = _webring.users.length - 1;
        }
        _webring.nextUserIndex = _webring.currentUserIndex + 1;
        if (_webring.nextUserIndex > _webring.users.length - 1) {
            _webring.nextUserIndex = 0;
        }

        $('.webring_prev').html('<a href="http://memtech.website/~' + _webring.users[_webring.prevUserIndex] + '/">Previous (' + _webring.users[_webring.prevUserIndex] + ')</a>')
        $('.webring_next').html('<a href="http://memtech.website/~' + _webring.users[_webring.nextUserIndex] + '/">Next (' + _webring.users[_webring.nextUserIndex] + ')</a>')
    })
})