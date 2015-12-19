module.exports = function(Category) {
//Now inside remote_method.
Category.mature = function(id, limit, after, before, callback) {
    var app = this.app;
    var Games = app.models.Games;
    Category.findById(id, {}, function(err, category){
        if (err) return callback(err);
	//set limit
	if (limit && limit > 5){
	  limit = 5;
	}else if(limit === undefined){	  
	  limit = 5;
	}
	//set after cursor
	if(after){
	Games.find({
            "where": {
                categoryId: id,
                mature: true,
		gameId: {gt: after}
            },
            "limit": limit
        }, function(err, gameArr) {
            if (err) return callback(err);
            callback(null, gameArr);
        });
	//set before cursor
	}else if(before){
        Games.find({
            "where": {
                categoryId: id,
                mature: true,
                gameId: {lt: before}
            },
            "order": 'gameId DESC',
	    "limit": limit
        }, function(err, gameArr) {
            if (err) return callback(err);
            callback(null, gameArr.reverse());
        });
	}else if(after === undefined && before === undefined){
        Games.find({
            "where": {
                categoryId: id,
                mature: true
            },
	    "limit": limit
        }, function(err, gameArr) {
            if (err) return callback(err);
            callback(null, gameArr);
        });
	}
    });
}


Category.remoteMethod(
        'mature', {
            accepts: [{
                arg: 'id',
                type: 'number',
                required: true
            },
	    {
    		arg: 'limit',
    		type: 'number',
    		required: false
  	    },
	    {
		arg: 'after',
		type: 'number',
		required: false
	    },
	    {
		arg: 'before',
                type: 'number',
                required: false
	    }  	
	    ],
            // mixing ':id' into the rest url allows $owner to be determined and used for access control
            http: {
                path: '/:id/games/mature',
                verb: 'get'
            },
            returns: {
                arg: 'games',
                type: 'array'
            }
        }
);

};
