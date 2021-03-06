const Mongoose = Depends.Mongoose

let ModSchema = new Mongoose.Schema({
	ServerID: String,
	Logging: Boolean,
	LogsChannel: String,
	MutedRole: String,
	WarnsBeforeKick: Number,
	WarnsBeforeBan: Number
});

module.exports = Mongoose.model("Moderation", ModSchema)