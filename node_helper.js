'use strict';
const NodeHelper = require('node_helper');
const { spawn, exec } = require('child_process');
const { parseArgsStringToArgv } = require('string-argv');

module.exports = NodeHelper.create({

	process_array : {},

	/**
	* @function start
	* @description Logs a start message to the console.
	* @override
	*/
	start() {
		const self = this;
		console.log(`Starting module helper: ${this.name}`);
		
	},

	/**
	 * @function startProcess
	 * @description start the defined process and put it in the list.
	 */
	startProcess(element,num) {
		const self = this;
		console.log('['+self.name+']: '+ num + ': starting \''+ element[1] + '\' on \'' + element[0] + '\' with nice level ' + element[2]);

		if (element[0] == 'localhost'){
			console.log('['+self.name+']: starting locally');
			let args = parseArgsStringToArgv("nice -n " + element[2] + " " +element[1]);
			let cmd = args.shift();
			self.process_array[num] = spawn(cmd , args);

		} else {
			console.log('['+self.name+']: starting on ' + element[0]);
			var args = ["-t", "-t", element[0]].concat("nice -n " + element[2] + " " + element[1])
			self.process_array[num] = spawn("ssh" , args);
		}
	},

	/**
	 * @function startExternalProcesses
	 * @description start all external processes given in the config (with where, what and at what nice level)
	 */
	startExternalProcesses() {
		const self = this;
		console.log('['+self.name+']: starting external processes');
		var counter = 0;
		self.config.processes.forEach(function(element) {
			self.startProcess( element,counter);
			counter++;
		});
	},

	/**
	 * @function socketNotificationReceived
	 * @description handle all messages coming from above
	 *
	 * @param {string} notification - Notification name
	 * @param {*} payload - Detailed payload of the notification.
	 */
	socketNotificationReceived(notification, payload) {
		const self = this;
		if(notification === 'CONFIG') {
			self.config = payload;
			self.startExternalProcesses();

		}

	}

});
