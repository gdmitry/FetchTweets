(() => {
    const tweetsGallery = new Vue({
        el: '#tweets-gallery',
        data: {
            hasTweets: false,
            images: []
        }
    });

    function renderTweets(tag) {
        return DataService.getTweets(tag, 50)
            .then(data => data.map(item => {
               const image = item.images['standard_resolution'];
               const title = item.caption && item.caption.text || '';
               return { ...image, title };
            }))
            .then(tweets => tweets.map(tweet => {
                const { url, width, height, title } = tweet;

                tweetsGallery.images.push({ url, width, height, title });
                return tweet;
            }))
            .then(tweets => {
                tweetsGallery.hasTweets = tweets.length > 0;
            });
    }

    $('.search-button').click(() => {
        const tag = $('.search-input').val();
        $('.search-input').val('');
        if (!tag) return;
        tweetsGallery.images = [];
        $('.search-button').toggleClass('disabled')
        renderTweets(tag).always(() => $('.search-button').toggleClass('disabled'));
    });
})();