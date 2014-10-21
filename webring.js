// Usage:
// Include JS
// Add a .webring_prev element and a .webring_next element to wrap the links
// that will be created.

var _webring = {};
_webring.insertLink = function(selector, href, text) {
    try {
        document.querySelectorAll(selector)[0].innerHTML = ('<a href="' + href + '">' + text + '</a>');
    }
    catch(err) {
        // Error :(
    }
}
_webring.load = function() {
    _webring.userRegex = /memtech\.website\/\~(.*)\//;

    var rq = new XMLHttpRequest();
    rq.open('GET', 'http://memtech.website/~dpritchett/data/user_stats.json', true);

    rq.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status >= 200 && this.status < 400) {
                // Success!
                var json = JSON.parse(this.responseText);

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
                _webring.randomIndex = _webring.CurrentUserIndex
                while (_webring.randomIndex == _webring.currentUserIndex && _webring.length > 1) {
                    _webring.randomIndex = Math.floor(Math.random() * _webring.length)
                }
                if (_webring.prevUserIndex < 0) {
                    _webring.prevUserIndex = _webring.users.length - 1;
                }
                _webring.nextUserIndex = _webring.currentUserIndex + 1;
                if (_webring.nextUserIndex > _webring.users.length - 1) {
                    _webring.nextUserIndex = 0;
                }

                _webring.insertLink('.webring_prev', 'http://memtech.website/~' + _webring.users[_webring.prevUserIndex], 'Previous (' + _webring.users[_webring.prevUserIndex] + ')')
                _webring.insertLink('.webring_rand', 'http://memtech.website/~' + _webring.users[_webring.randomIndex], 'Random')
                _webring.insertLink('.webring_next', 'http://memtech.website/~' + _webring.users[_webring.nextUserIndex], 'Next (' + _webring.users[_webring.nextUserIndex] + ')')
            }
            else {
                // Error :(
            }
        }
    };

    rq.send();
    rq = null;
}


if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', _webring.load);
}
else {
    document.attachEvent('onreadystatechange', function() {
        if (document.readyState === 'interactive')
            _webring.load();
    });
}