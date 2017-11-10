(window => {
    const tokenReady = getToken();

    function tweetsUrl(token) {
        return tag => `https://api.instagram.com/v1/tags/${tag}/media/recent?access_token=${token}`;
    }

    function userProfile(token) {
        return `https://api.instagram.com/v1/users/self/?access_token=${token}`;
    }

    function tokenUrl() {
        return '/api/v1/token';
    }

    function getToken() {
        return $.ajax(tokenUrl())
            .then(data => data.token)
            .catch(() => console.error('Token request failed.'));
    }

    function getTweets(tag, count = 15) {
        return tokenReady.then(token => {
            const url = tweetsUrl(token)(tag);
            return $.ajax(url, {
                dataType: "jsonp",
                data: {
                    count
                }
            });
        }).then(details => {
            const { data, meta } = details;
            // if request was successful return data
            if (meta.code === 200) {
                return data;
            }
            return [];
        });
    }

    window.DataService = {
        getTweets
    }
})(window);