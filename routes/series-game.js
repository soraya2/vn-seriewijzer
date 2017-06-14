var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

router.get('/', function (req, res) {
  res.render('series-game/intro');
});
router.get('/1', function (req, res) {
    var step1 = [
        {   title: 'The Vampire Diaries',
            img_url: 'http://static.tvgcdn.net/rovi/showcards/tvshow/297527/thumbs/16917305_900x1200.jpg'
        },{ title: 'Game of Thrones',
            img_url: 'https://upload.wikimedia.org/wikipedia/en/e/e8/Game_of_Thrones_Season_1.jpg'
        },{ title: 'Pretty Little Liars',
            img_url: 'https://images-na.ssl-images-amazon.com/images/I/81tpqkna9XL._SY445_.jpg'
        },{ title: 'Friends',
            img_url: 'https://www.warnerbros.co.uk/~/media/images/warner%20bro/tv%20series/friends/friends_season_1%20jpg.ashx?mw=240'
        }
    ]
    res.locals.stepNum = 1;
    res.locals.stepData = step1;
    res.locals.stepNext = 2;
    res.render('series-game/steps');
})
router.get('/2', function (req, res) {
    var step2 = [
        {   title: 'The Vampire Diaries2',
            img_url: 'http://static.tvgcdn.net/rovi/showcards/tvshow/297527/thumbs/16917305_900x1200.jpg'
        },{ title: 'Game of Thrones2',
            img_url: 'https://upload.wikimedia.org/wikipedia/en/e/e8/Game_of_Thrones_Season_1.jpg'
        },{ title: 'Pretty Little Liars2',
            img_url: 'https://images-na.ssl-images-amazon.com/images/I/81tpqkna9XL._SY445_.jpg'
        },{ title: 'Friends2',
            img_url: 'https://www.warnerbros.co.uk/~/media/images/warner%20bro/tv%20series/friends/friends_season_1%20jpg.ashx?mw=240'
        }
    ]
    res.locals.stepNum = 2;
    res.locals.stepData = step2;
    res.locals.stepNext = 3;
    res.render('series-game/steps');
})
router.get('/3', function (req, res) {
    var step3 = [
        {   title: 'The Vampire Diaries3',
            img_url: 'http://static.tvgcdn.net/rovi/showcards/tvshow/297527/thumbs/16917305_900x1200.jpg'
        },{ title: 'Game of Thrones3',
            img_url: 'https://upload.wikimedia.org/wikipedia/en/e/e8/Game_of_Thrones_Season_1.jpg'
        },{ title: 'Pretty Little Liars3',
            img_url: 'https://images-na.ssl-images-amazon.com/images/I/81tpqkna9XL._SY445_.jpg'
        },{ title: 'Friends3',
            img_url: 'https://www.warnerbros.co.uk/~/media/images/warner%20bro/tv%20series/friends/friends_season_1%20jpg.ashx?mw=240'
        }
    ]
    res.locals.stepNum = 3;
    res.locals.stepData = step3;
    res.locals.stepNext = 4;
    res.render('series-game/steps');
})
router.get('/4', function (req, res) {
    var step4 = [
        {   title: 'The Vampire Diaries4',
            img_url: 'http://static.tvgcdn.net/rovi/showcards/tvshow/297527/thumbs/16917305_900x1200.jpg'
        },{ title: 'Game of Thrones4',
            img_url: 'https://upload.wikimedia.org/wikipedia/en/e/e8/Game_of_Thrones_Season_1.jpg'
        },{ title: 'Pretty Little Liars4',
            img_url: 'https://images-na.ssl-images-amazon.com/images/I/81tpqkna9XL._SY445_.jpg'
        },{ title: 'Friends4',
            img_url: 'https://www.warnerbros.co.uk/~/media/images/warner%20bro/tv%20series/friends/friends_season_1%20jpg.ashx?mw=240'
        }
    ]
    res.locals.stepNum = 4;
    res.locals.stepData = step4;
    res.locals.stepNext = 'overview';
    res.render('series-game/steps');
})

router.get('/details/:id', function (req, res) {
    res.render('series-game/detail-view')
});
module.exports = router;
