// Use strict
"use strict";

// Try
try {

	// Export X25519 React Native module
	module["exports"] = require("@nicolasflamel/x25519-react");
}

// Catch errors
catch(error) {

	// Try
	try {
	
		// Export X25519 Node.js addon
		module["exports"] = require("@nicolasflamel/x25519-native");
	}
	
	// Catch errors
	catch(error) {
	
		// Export X25519 WASM wrapper
		module["exports"] = require("@nicolasflamel/x25519-wasm");
	}
}
