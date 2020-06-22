var mongoose    = require("mongoose")

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
	description:String,
   // description: String
	
	//the seeding and comments part
	comments:[{
		type:mongoose.Schema.Types.ObjectId,
		ref:'Comment'
	}]
 });
 var Campground = mongoose.model("Campground", campgroundSchema);

module.exports=Campground;