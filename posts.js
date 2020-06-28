// Post parser

const fs = require('fs');
const dir = './posts';

class Post {
	constructor(body, title) {
		this.body = body;
		this.title = title;
		this.id = fs.readdirSync(dir).length;
	}

	save() {
		fs.writeFile(dir + '/' + this.id + '.md', this.body, function(err) {
    		if(err) {
        		return console.log(err);
    		}

    		console.log("Post saved correctly");
		});

		var postMetadata = getPostMetadata();
		postMetadata[this.id - 1] = { "title": this.title, "id": this.id };
		fs.writeFile('metadata.json', JSON.stringify(postMetadata), function(err) {
    		if(err) {
        		return console.log(err);
    		}

    		console.log("Metadata saved correctly");
		});

	}
}
exports.Post = Post;

const getPostMetadata = () => {
	var postMetadata = JSON.parse(fs.readFileSync('metadata.json', 'utf8'));

	return postMetadata;
}
exports.getPostMetadata = getPostMetadata;

const searchExactTitle = (title) => {
	var postMetadata = getPostMetadata();

	for(i in postMetadata) {
		post = postMetadata[i];
		
		if(post.title === title) {
			return i;
		}
	}
}
exports.searchExactTitle = searchExactTitle;

const getBody = (id) => {
	return fs.readFileSync(dir + '/' + id + '.md', 'utf8');
}
exports.getBody = getBody;