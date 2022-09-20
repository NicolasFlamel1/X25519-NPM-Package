// Use strict
"use strict";


// Constants

// Modules
const MODULES = [
	"@nicolasflamel/x25519-native",
	"@nicolasflamel/x25519-wasm",
	"@nicolasflamel/x25519-wasm.asmjs"
];

// Tests
const TESTS = [
	{
	
		// Name
		name: "secretKeyFromEd25519SecretKey",
		
		// Paramaters
		parameters: [
		
			// Ed25519 secret key
			Buffer.from([188, 5, 126, 146, 103, 92, 154, 195, 30, 142, 73, 167, 119, 127, 12, 152, 86, 178, 119, 120, 87, 115, 49, 28, 246, 168, 249, 125, 171, 29, 188, 177])
		],
		
		// Result
		result: Buffer.from([112, 230, 143, 158, 16, 66, 43, 248, 212, 147, 46, 163, 205, 255, 228, 74, 103, 215, 92, 132, 133, 119, 122, 215, 236, 47, 156, 185, 123, 61, 99, 106])
	},
	{
	
		// Name
		name: "publicKeyFromEd25519PublicKey",
		
		// Paramaters
		parameters: [
		
			// Ed25519 public key
			Buffer.from([38, 48, 118, 143, 50, 211, 241, 187, 36, 1, 177, 47, 9, 208, 217, 114, 147, 199, 203, 217, 225, 235, 230, 184, 237, 219, 174, 58, 164, 248, 121, 112])
		],
		
		// Result
		result: Buffer.from([16, 213, 247, 117, 41, 252, 101, 199, 219, 124, 200, 5, 193, 106, 205, 0, 49, 15, 103, 239, 3, 17, 205, 84, 85, 22, 3, 121, 206, 156, 159, 53])
	},
	{
	
		// Name
		name: "sharedSecretKeyFromSecretKeyAndPublicKey",
		
		// Paramaters
		parameters: [
		
			// Secret key
			Buffer.from([112, 230, 143, 158, 16, 66, 43, 248, 212, 147, 46, 163, 205, 255, 228, 74, 103, 215, 92, 132, 133, 119, 122, 215, 236, 47, 156, 185, 123, 61, 99, 106]),
			
			// Public key
			Buffer.from([16, 213, 247, 117, 41, 252, 101, 199, 219, 124, 200, 5, 193, 106, 205, 0, 49, 15, 103, 239, 3, 17, 205, 84, 85, 22, 3, 121, 206, 156, 159, 53])
		],
		
		// Result
		result: Buffer.from([182, 123, 207, 210, 189, 196, 203, 115, 210, 234, 93, 204, 22, 205, 38, 202, 106, 205, 214, 110, 78, 204, 41, 176, 107, 70, 79, 218, 193, 109, 221, 45])
	}
];


// Main function
(async () => {

	// Go through all modules
	for(let module of MODULES) {
	
		// Check if module uses asm.js
		if(module.endsWith(".asmjs")) {
		
			// Remove WASM support
			WebAssembly = undefined;
			
			// Fix module name
			module = module.substring(0, module.length - ".asmjs".length);
		}
		
		// Load module
		const library = require(module);

		// Go through all tests
		for(const test of TESTS) {
		
			// Check if library implements the test
			if(test.name in library) {
		
				// Run test
				let result = library[test.name](...test.parameters);
				
				// Check if result is a promise
				if(result instanceof Promise) {
				
					// Resolve result
					result = await result;
				}
				
				// Check if result is a Uint8Array
				if(result instanceof Uint8Array && !(result instanceof Buffer)) {
				
					// Make result a buffer
					result = Buffer.from(result);
				}
				
				// Otherwise check if result is an object
				else if(typeof result === "object" && result !== null) {
				
					// Go through all values in the object
					for(const key of Object.keys(result)) {
					
						// Check if value is a Uint8Array
						if(result[key] instanceof Uint8Array && !(result[key] instanceof Buffer)) {
						
							// Make value a buffer
							result[key] = Buffer.from(result[key]);
						}
					}
				}
				
				// Check if result is known
				if("result" in test) {
				
					// Check if results don't have the same type or the results differ
					if(typeof test.result !== typeof result || JSON.stringify(test.result) !== JSON.stringify(result)) {
					
						// Throw error
						throw new Error(`Failed ${test.name} test`);
					}
				}
				
				// Otherwise
				else {
				
					// Check if result is invalid
					if(result === undefined || result === null) {
					
						// Throw error
						throw new Error(`Failed ${test.name} test`);
					}
				}
			}
			
			// Otherwise
			else {
			
				// Display message
				console.log(`Skipping ${test.name} test for ${module} module`);
			}
		}
		
		// Unload module
		delete require.cache[require.resolve(module)];
	}
	
	// Display message
	console.log("Tests passed");
})();
