module.exports = function(Category) {
//Now inside remote_method.
Category.mature = function(id, limit, after, before, callback) {
    var app = this.app;
    var Games = app.models.Games;
    Category.findById(id, {}, function(err, category){
        //if (err) return callback(err);
	if(!category) {
        	var err = new Error('Category ID ' + id + ' does not exist.');
        	err.statusCode = 404;
        	callback(err);
        }else{
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
        }, function(err, gameArray) {
	    if(gameArray.length > 0) {
	    if (err) return callback(err);
            //callback(null, gameArr);
	    callback(null, {
                "perPage": limit,
                "total": gameArray.length,
                "data": gameArray,
                "paging": {
                        "cursors": {
                        "after": gameArray[gameArray.length-1].gameId,// last game_id in result
                        "before": gameArray[0].gameId // first game_id in result
			},
                "previous": "http://localhost:3000/api/Categories/1004/games/mature?before=" + gameArray[0].gameId,
                "next": "http://localhost:3000/api/Categories/1004/games/mature?after=" + gameArray[gameArray.length-1].gameId
                }
            });
	    }else{
		var err = new Error('No games found.');
        	err.statusCode = 404;
        	callback(err);
	    }
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
        }, function(err, gameArray) {
	    if(gameArray.length > 0) {
            if (err) return callback(err);
            //callback(null, gameArr.reverse());
	    callback(null, {
                "perPage": limit,
                "total": gameArray.length,
                "data": gameArray.reverse,
                "paging": {
                        "cursors": {
                        "after": gameArray[gameArray.length-1].gameId,// last game_id in result
                        "before": gameArray[0].gameId // first game_id in result
			},
                "previous": "http://localhost:3000/api/Categories/1004/games/mature?before=" + gameArray[0].gameId,
                "next": "http://localhost:3000/api/Categories/1004/games/mature?after=" + gameArray[gameArray.length-1].gameId
		}
            });
    	    }else{
	    	var err = new Error('No games found.');
        	err.statusCode = 404;
        	callback(err);
	    }
        });
	}else if(after === undefined && before === undefined){
        Games.find({
            "where": {
                categoryId: id,
                mature: true
            },
	    "limit": limit
        }, function(err, gameArray) {
	    if(gameArray.length > 0) {
	    if (err) return callback(err);
	    //callback(null, gameArr);
	    callback(null, {
  		"perPage": limit,
  		"total": gameArray.length,
  		"data": gameArray,
  		"paging": {
    			"cursors": {
      			"after": gameArray[gameArray.length-1].gameId,// last game_id in result
      			"before": gameArray[0].gameId // first game_id in result
    			},
  		"previous": "http://localhost:3000/api/Categories/1004/games/mature?before=" + gameArray[0].gameId,
                "next": "http://localhost:3000/api/Categories/1004/games/mature?after=" + gameArray[gameArray.length-1].gameId
		}
	    })
	    }else{
		var err = new Error('No games found.');
        	err.statusCode = 404;
        	callback(err);	
	    }
        });
	}
	}
    });
}


Category.remoteMethod(
        'mature', {
            accepts: [
	      	{arg: 'id', type: 'number', required: true},
    		{arg: 'limit',type: 'number',required: false},
    		{arg: 'after',type: 'string',required: false},
    		{arg: 'before',type: 'string',required: false}
	    ],
            // mixing ':id' into the rest url allows $owner to be determined and used for access control
            http: {
                path: '/:id/games/mature',
                verb: 'get'
            },
            returns: {
                root: true,
                type: 'object' // will be whatever is passed back as 2nd arg to callback()
            }
        }
);

};
