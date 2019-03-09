const Commando = Depends.Commando
const Discord = Depends.Discord
const Mongoose = Depends.Mongoose

class ViewCommand extends Commando.Command { 
	constructor(client){
		super(client, {
			name: 'viewrole',
			aliases: ['roleview'],
			group: 'roles',
			memberName: "viewrole",
			description: 'Setting the Role for people joining.'
		});
	}	
	
	async run(message, args){
        if (message.author.bot) return;
		if (message.channel.type === "dm") return;
		if (Settings.Testing === true) return;
		
		if (message.member.hasPermission('ADMINISTRATOR')) {
			let Args = message.content.split(" ")
			Mongoose.connect(Settings.Connection + "\Join", {useNewUrlParser: true })
			.catch(Error => {
				console.error(Error)
			})

			Settings.Schemas.Join.findOne({
				ServerID: message.guild.id
			}, (Error, Results) => {
				if (Error) return;
				if(!Results) return message.channel.send(":x: No Results found for this Server!").then(R => R.delete(1000));
				
				let Roles = Results.Roles
				let Sending = `${Roles.map(ROLESID => `${message.guild.roles.get(ROLESID)}`).join('\n')}`
				if (Roles.length === 0) Sending = "No Roles Available!";
				
				let RichEmbed = new Discord.RichEmbed()
				.setTitle("Viewing Roles for receiving on Joining!")
				.setThumbnail(message.member.user.displayAvatarURL)
				.setColor("#27037e")
				.setFooter(`Brought to you by Lyaboo.`)
				.addField("ROLES ADDED", `${Sending}`)
				.setTimestamp();
				return message.channel.send(RichEmbed);	
			})
		} else {
			message.channel.send(":x: Missing Permissions 'ADMINISTRATOR'")
			return;
		}
	}
}

module.exports = ViewCommand