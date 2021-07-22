let fs = require('fs-extra');
let path = require('path');
let walk = function(dir, done) {
  let results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    let i = 0;
    (function next() {
      let file = list[i++];
      if (!file) return done(null, results);
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
			console.log(file);
            next();
          });
        } else {
          results.push(file);
		  console.log(file);
          next();
        }
      });
    })();
  });
};

if(!fs.existsSync("logs")){
	fs.mkdirSync('logs');
	console.log('Создал папку logs.');
	return
}

walk('./logs', function(err, results) {
  if (err) throw err;
  console.log(results)
  for ( strPath of results) {
	  try{
	  if( strPath.endsWith('.txt')){
  let data = fs.readFileSync(strPath);
let tokentwitch = [...(data.toString()
				.matchAll(/.twitch.tv	(TRUE|FALSE)	\/	(TRUE|FALSE)	[0-9]*	auth-token	(.*)/g))]; 
					
				  tokentwitch.forEach(x => {
					  console.log(x[3]);
						fs.appendFileSync('twitch_tokens.txt', x[3] + "\n");
					});

 }
	  } catch(err) {
		  console.log(err)
	  }
  }
});