/**
 * @file smartmirror-speechrecongnition.js
 *
 * @author nkucza
 * @license MIT
 *
 * @see 
 */

//const rosnodejs = require('rosnodejs');

Module.register('SmartMirror-StartExternalProcesses', {


	Debug_infos: {},


	/** @member {boolean} pulsing - Flag to indicate listening state. */
	/**
	*/
	defaults: {
		processes: {},
	},

	/**
	* @function start
	* @description Sets mode to initialising.
	* @override
	*/
	start() {
		var self = this;
		this.sendSocketNotification('CONFIG', this.config);
	},

	
	/**
	* @function socketNotificationReceived
	* @description Handles incoming messages from node_helper.
	* @override
  	   *
	* @param {string} notification - Notification name
	* @param {*} payload - Detailed payload of the notification.
	*/
	socketNotificationReceived(notification, payload) {
		const self = this;

	},

	notificationReceived: function(notification, payload, sender) {
		const self = this;


	}
});



