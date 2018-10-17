require("source-map-support").install();
/******/ (function(modules) { // webpackBootstrap
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest() {
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch (e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/
/******/ 	//eslint-disable-next-line no-unused-vars
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "2d14595d34c0cfbc6aa6";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (typeof dep === "undefined") hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (typeof dep === "undefined") hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/hot/log-apply-result.js":
/*!*****************************************!*\
  !*** (webpack)/hot/log-apply-result.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
module.exports = function(updatedModules, renewedModules) {
	var unacceptedModules = updatedModules.filter(function(moduleId) {
		return renewedModules && renewedModules.indexOf(moduleId) < 0;
	});
	var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");

	if (unacceptedModules.length > 0) {
		log(
			"warning",
			"[HMR] The following modules couldn't be hot updated: (They would need a full reload!)"
		);
		unacceptedModules.forEach(function(moduleId) {
			log("warning", "[HMR]  - " + moduleId);
		});
	}

	if (!renewedModules || renewedModules.length === 0) {
		log("info", "[HMR] Nothing hot updated.");
	} else {
		log("info", "[HMR] Updated modules:");
		renewedModules.forEach(function(moduleId) {
			if (typeof moduleId === "string" && moduleId.indexOf("!") !== -1) {
				var parts = moduleId.split("!");
				log.groupCollapsed("info", "[HMR]  - " + parts.pop());
				log("info", "[HMR]  - " + moduleId);
				log.groupEnd("info");
			} else {
				log("info", "[HMR]  - " + moduleId);
			}
		});
		var numberIds = renewedModules.every(function(moduleId) {
			return typeof moduleId === "number";
		});
		if (numberIds)
			log(
				"info",
				"[HMR] Consider using the NamedModulesPlugin for module names."
			);
	}
};


/***/ }),

/***/ "./node_modules/webpack/hot/log.js":
/*!****************************!*\
  !*** (webpack)/hot/log.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

var logLevel = "info";

function dummy() {}

function shouldLog(level) {
	var shouldLog =
		(logLevel === "info" && level === "info") ||
		(["info", "warning"].indexOf(logLevel) >= 0 && level === "warning") ||
		(["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error");
	return shouldLog;
}

function logGroup(logFn) {
	return function(level, msg) {
		if (shouldLog(level)) {
			logFn(msg);
		}
	};
}

module.exports = function(level, msg) {
	if (shouldLog(level)) {
		if (level === "info") {
			console.log(msg);
		} else if (level === "warning") {
			console.warn(msg);
		} else if (level === "error") {
			console.error(msg);
		}
	}
};

/* eslint-disable node/no-unsupported-features/node-builtins */
var group = console.group || dummy;
var groupCollapsed = console.groupCollapsed || dummy;
var groupEnd = console.groupEnd || dummy;
/* eslint-enable node/no-unsupported-features/node-builtins */

module.exports.group = logGroup(group);

module.exports.groupCollapsed = logGroup(groupCollapsed);

module.exports.groupEnd = logGroup(groupEnd);

module.exports.setLogLevel = function(level) {
	logLevel = level;
};


/***/ }),

/***/ "./node_modules/webpack/hot/poll.js?1000":
/*!**********************************!*\
  !*** (webpack)/hot/poll.js?1000 ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__resourceQuery) {/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
/*globals __resourceQuery */
if (true) {
	var hotPollInterval = +__resourceQuery.substr(1) || 10 * 60 * 1000;
	var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");

	var checkForUpdate = function checkForUpdate(fromUpdate) {
		if (module.hot.status() === "idle") {
			module.hot
				.check(true)
				.then(function(updatedModules) {
					if (!updatedModules) {
						if (fromUpdate) log("info", "[HMR] Update applied.");
						return;
					}
					__webpack_require__(/*! ./log-apply-result */ "./node_modules/webpack/hot/log-apply-result.js")(updatedModules, updatedModules);
					checkForUpdate(true);
				})
				.catch(function(err) {
					var status = module.hot.status();
					if (["abort", "fail"].indexOf(status) >= 0) {
						log("warning", "[HMR] Cannot apply update.");
						log("warning", "[HMR] " + (err.stack || err.message));
						log("warning", "[HMR] You need to restart the application!");
					} else {
						log(
							"warning",
							"[HMR] Update failed: " + (err.stack || err.message)
						);
					}
				});
		}
	};
	setInterval(checkForUpdate, hotPollInterval);
} else {}

/* WEBPACK VAR INJECTION */}.call(this, "?1000"))

/***/ }),

/***/ "./src/api/modules/auth.js":
/*!*********************************!*\
  !*** ./src/api/modules/auth.js ***!
  \*********************************/
/*! exports provided: getJWT, verifyToken */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getJWT", function() { return getJWT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "verifyToken", function() { return verifyToken; });
/* harmony import */ var babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/helpers/slicedToArray */ "babel-runtime/helpers/slicedToArray");
/* harmony import */ var babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babel-runtime/regenerator */ "babel-runtime/regenerator");
/* harmony import */ var babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "babel-runtime/helpers/asyncToGenerator");
/* harmony import */ var babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! babel-runtime/core-js/promise */ "babel-runtime/core-js/promise");
/* harmony import */ var babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_5__);





var _this = undefined;



var aaud = "1kim3ke0fq358jrota00sam46r";
var tokenUrl = 'https://cognito-idp.us-east-2.amazonaws.com/us-east-2_ZAwetvcgl/.well-known/jwks.json';

var tokenKeys = null;

var getJWT = function getJWT() {
    return new babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_3___default.a(function () {
        var _ref = babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee(resolve, reject) {
            var _ref2, keys;

            return babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.prev = 0;
                            _context.next = 3;
                            return axios__WEBPACK_IMPORTED_MODULE_4___default.a.get(tokenUrl);

                        case 3:
                            _ref2 = _context.sent;
                            keys = _ref2.data.keys;

                            tokenKeys = keys;
                            resolve();
                            _context.next = 12;
                            break;

                        case 9:
                            _context.prev = 9;
                            _context.t0 = _context['catch'](0);

                            reject(_context.t0);

                        case 12:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this, [[0, 9]]);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }());
};

var verifyToken = function verifyToken(req, res, next) {
    var bearerLength = "Bearer ".length;
    var authorization = req.headers.authorization;

    if (authorization && authorization.length > bearerLength) {
        var token = authorization.slice(bearerLength);
        var tokenData = jsonwebtoken__WEBPACK_IMPORTED_MODULE_5___default.a.decode(token, { complete: true });

        if (!!tokenData) {
            var _tokenData$header = tokenData.header,
                kid = _tokenData$header.kid,
                alg = _tokenData$header.alg,
                payload = tokenData.payload;
            var aud = payload.aud,
                exp = payload.exp;

            var _tokenKeys$filter = tokenKeys.filter(function (k) {
                return k.kid === kid && k.alg === alg;
            }),
                _tokenKeys$filter2 = babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_tokenKeys$filter, 1),
                matchKey = _tokenKeys$filter2[0];

            var current_ts = Math.floor(new Date() / 1000);

            if (matchKey !== undefined && aaud === aud && current_ts < exp) {
                req.user = payload;
                next();
                return;
            }
        }
    } else if (req.originalUrl.match('/api/invoice') !== null && req.method.toLowerCase() === 'get' || req.originalUrl.match('/api/payment') !== null && req.method.toLowerCase() === 'post' || req.originalUrl.match('/api/payment') !== null && req.method.toLowerCase() === 'get' || req.originalUrl.match('/api/banks') !== null && req.method.toLowerCase() === 'get' || req.originalUrl.match('/api/dispute') !== null && req.method.toLowerCase() === 'post' || req.originalUrl.match('/api/dispute') !== null && req.method.toLowerCase() === 'get' || req.originalUrl.match('/api/verify') !== null && req.method.toLowerCase() === 'get') {
        next();
    } else {
        res.status(403).send({ success: false, error: 'Invalid auth token' });
    }
};

/***/ }),

/***/ "./src/api/modules/generateController.js":
/*!***********************************************!*\
  !*** ./src/api/modules/generateController.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/core-js/object/assign */ "babel-runtime/core-js/object/assign");
/* harmony import */ var babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babel-runtime/helpers/extends */ "babel-runtime/helpers/extends");
/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__);


/* harmony default export */ __webpack_exports__["default"] = (function (model, overrides) {
    var controller = {
        findByParam: function findByParam(req, res, next, id) {
            model.findById(id, function (err, doc) {
                if (err) res.status(404).send({ success: false, error: { message: "Not found" } });
                req.docId = doc.id;
                next();
            });
        },
        createOne: function createOne(req, res) {
            var body = req.body;
            body.userId = req.user.id;
            model.create(body, function (err, doc) {
                if (err) res.status(401).send({ success: false, error: babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({}, err) });
                res.status(200).send({ success: true, data: doc });
            });
        },
        deleteOne: function deleteOne(req, res) {
            var id = req.docId;
            model.deleteOne({ _id: id }, function (err, doc) {
                if (err) res.status(401).send({ success: false, error: babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({}, err) });;
                res.status(200).send({ success: true });
            });
        },
        getAll: function getAll(req, res) {
            model.find({}, function (err, docs) {
                if (err) res.status(401).send({ success: false, error: babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({}, err) });;
                res.status(200).send({ success: true, data: docs });
            });
        },
        getOne: function getOne(req, res) {
            var id = req.docId;
            model.find({ _id: id }, function (err, docs) {
                if (err) res.status(401).send({ success: false, error: babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({}, err) });;
                res.status(200).send({ success: true, data: docs[0] });
            });
        },
        updateOne: function updateOne(req, res) {
            var id = req.docId;
            var body = req.body;
            model.findOneAndUpdate({ _id: id }, body, function (err, doc) {
                if (err) res.status(401).send({ success: false, error: babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({}, err) });;
                var updated = babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_0___default()({}, body, doc);
                res.status(200).send({ success: true, data: updated });
            });
        }
    };

    if (!overrides) {
        overrides = {};
    }

    return babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_0___default()({}, controller, overrides);
});;

/***/ }),

/***/ "./src/api/modules/invoice.js":
/*!************************************!*\
  !*** ./src/api/modules/invoice.js ***!
  \************************************/
/*! exports provided: CreateInvoice */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateInvoice", function() { return CreateInvoice; });
/* harmony import */ var babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/regenerator */ "babel-runtime/regenerator");
/* harmony import */ var babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "babel-runtime/helpers/asyncToGenerator");
/* harmony import */ var babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! babel-runtime/core-js/promise */ "babel-runtime/core-js/promise");
/* harmony import */ var babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var superagent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! superagent */ "superagent");
/* harmony import */ var superagent__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(superagent__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var date_fns_add_days__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! date-fns/add_days */ "date-fns/add_days");
/* harmony import */ var date_fns_add_days__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(date_fns_add_days__WEBPACK_IMPORTED_MODULE_4__);




var _this = undefined;



var secret = "sk_test_ef208dee35b39342cf35bf961ec6cb19ebc2f94c";

var CreateCustomer = function CreateCustomer(_ref) {
    var name = _ref.name,
        email = _ref.email,
        phone = _ref.phone;
    return new babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_2___default.a(function (resolve, reject) {
        superagent__WEBPACK_IMPORTED_MODULE_3___default.a.post('https://api.paystack.co/customer').set("Authorization", 'Bearer ' + secret).send({
            name: name,
            email: email,
            phone: phone
        }).end(function (err, _ref2) {
            var body = _ref2.body;

            if (err) reject(err);
            resolve(body);
        });
    });
};

var CreateInvoice = function CreateInvoice(customer, amount, description) {
    var line_items = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
    return new babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_2___default.a(function () {
        var _ref3 = babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(resolve, reject) {
            var _ref4, customer_code, due_date;

            return babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return CreateCustomer(customer);

                        case 2:
                            _ref4 = _context.sent;
                            customer_code = _ref4.data.customer_code;
                            due_date = date_fns_add_days__WEBPACK_IMPORTED_MODULE_4___default()(new Date(), 7);


                            superagent__WEBPACK_IMPORTED_MODULE_3___default.a.post('https://api.paystack.co/paymentrequest').set("Authorization", 'Bearer ' + secret).send({
                                customer: customer_code,
                                description: description,
                                amount: amount,
                                line_items: line_items,
                                due_date: due_date
                            }).end(function (err, _ref5) {
                                var body = _ref5.body;

                                if (err) reject(err);
                                resolve(body);
                            });

                        case 6:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }));

        return function (_x2, _x3) {
            return _ref3.apply(this, arguments);
        };
    }());
};

/***/ }),

/***/ "./src/api/modules/mailer.js":
/*!***********************************!*\
  !*** ./src/api/modules/mailer.js ***!
  \***********************************/
/*! exports provided: sendInvoiceMail, sendReceiptMail, sendTransferMail, sendDisputeMail, sendCustormerVerificationCode, sendPaymentRequest */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendInvoiceMail", function() { return sendInvoiceMail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendReceiptMail", function() { return sendReceiptMail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendTransferMail", function() { return sendTransferMail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendDisputeMail", function() { return sendDisputeMail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendCustormerVerificationCode", function() { return sendCustormerVerificationCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendPaymentRequest", function() { return sendPaymentRequest; });
/* harmony import */ var babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/regenerator */ "babel-runtime/regenerator");
/* harmony import */ var babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babel-runtime/helpers/extends */ "babel-runtime/helpers/extends");
/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "babel-runtime/helpers/asyncToGenerator");
/* harmony import */ var babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! babel-runtime/core-js/promise */ "babel-runtime/core-js/promise");
/* harmony import */ var babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var nodemailer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! nodemailer */ "nodemailer");
/* harmony import */ var nodemailer__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(nodemailer__WEBPACK_IMPORTED_MODULE_4__);





var _this = undefined;



var ZOHO_EMAIL = "hello@pipepay.africa";
var ZOHO_PASSWORD = "G4eHR8WfEPCz";

var transporter = nodemailer__WEBPACK_IMPORTED_MODULE_4___default.a.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
        user: ZOHO_EMAIL,
        pass: ZOHO_PASSWORD
    }
});

var from = 'Pipepay <hello@pipepay.africa>';

var sendInvoiceMail = function sendInvoiceMail(_ref) {
    var customerEmail = _ref.customerEmail,
        totalPrice = _ref.totalPrice;
    return new babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_3___default.a(function (resolve, reject) {
        var mailOptions = {
            from: from,
            to: customerEmail,
            subject: 'Your Invoice Is Ready',
            text: 'Your invoice is worth ' + totalPrice
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return reject(new Error(error));
            }

            resolve(info);
        });
    });
};

var sendTo = function sendTo(mailOption) {
    return new babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_3___default.a(function (resolve, reject) {
        transporter.sendMail(mailOption, function (error, info) {
            if (error) {
                return reject(new Error(error));
            }

            resolve(info);
        });
    });
};

var sendReceiptMail = function sendReceiptMail(customerName, customerEmail, marchantEmail, amount) {
    return new babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_3___default.a(function () {
        var _ref2 = babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(resolve, reject) {
            var mailOption;
            return babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            mailOption = {
                                from: from,
                                subject: 'Your Receipt Is Ready',
                                text: customerName + ' made payment of ' + amount
                            };
                            _context.prev = 1;
                            _context.next = 4;
                            return babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_3___default.a.all([sendTo(babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({}, mailOption, { to: customerEmail })), sendTo(babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({}, mailOption, { to: marchantEmail }))]);

                        case 4:
                            resolve();
                            _context.next = 10;
                            break;

                        case 7:
                            _context.prev = 7;
                            _context.t0 = _context['catch'](1);

                            reject(_context.t0);

                        case 10:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this, [[1, 7]]);
        }));

        return function (_x, _x2) {
            return _ref2.apply(this, arguments);
        };
    }());
};

var sendTransferMail = function sendTransferMail(customerEmail, marchantEmail) {
    return new babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_3___default.a(function (esolve, reject) {});
};

var sendDisputeMail = function sendDisputeMail(marchantEmail, customerEmail, customerName, reason, disputeFrom) {
    var supportEmail = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'hello@pipepay.africa';
    return new babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_3___default.a(function () {
        var _ref3 = babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(resolve, reject) {
            var mailOption;
            return babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            mailOption = {
                                from: from,
                                subject: 'Payment Dispute'
                            };
                            _context2.prev = 1;

                            if (!(disputeFrom !== 'marchant')) {
                                _context2.next = 7;
                                break;
                            }

                            _context2.next = 5;
                            return babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_3___default.a.all([sendTo(babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({}, mailOption, { to: customerEmail, text: 'Your dispute has been received, you will hear from our support rep soon.' })), sendTo(babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({}, mailOption, { to: marchantEmail, text: 'New dispute from ' + customerName + ' reason being that: "' + reason + '"' })), sendTo(babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({}, mailOption, { to: supportEmail, text: 'New dispute from ' + customerEmail + ' reason being that: "' + reason + '" marchant email is ' + marchantEmail }))]);

                        case 5:
                            _context2.next = 9;
                            break;

                        case 7:
                            _context2.next = 9;
                            return babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_3___default.a.all([sendTo(babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({}, mailOption, { to: customerEmail, text: 'Your dispute has been received, you will hear from our support rep soon.' })), sendTo(babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({}, mailOption, { to: marchantEmail, text: 'New dispute from ' + customerName + ' reason being that: "' + reason + '"' })), sendTo(babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({}, mailOption, { to: supportEmail, text: 'New dispute from ' + marchantEmail + ' reason being that: "' + reason + '" customer email is ' + customerEmail }))]);

                        case 9:
                            resolve();
                            _context2.next = 15;
                            break;

                        case 12:
                            _context2.prev = 12;
                            _context2.t0 = _context2['catch'](1);

                            reject(_context2.t0);

                        case 15:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this, [[1, 12]]);
        }));

        return function (_x4, _x5) {
            return _ref3.apply(this, arguments);
        };
    }());
};

var sendCustormerVerificationCode = function sendCustormerVerificationCode(customerEmail, code) {
    return new babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_3___default.a(function () {
        var _ref4 = babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(resolve, reject) {
            var mailOption;
            return babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            mailOption = {
                                from: from,
                                subject: 'Invoice Mail Verification',
                                text: 'Your invoice verfication code is ' + code
                            };
                            _context3.prev = 1;
                            _context3.next = 4;
                            return sendTo(babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({}, mailOption, { to: customerEmail }));

                        case 4:
                            resolve();
                            _context3.next = 10;
                            break;

                        case 7:
                            _context3.prev = 7;
                            _context3.t0 = _context3['catch'](1);

                            reject(_context3.t0);

                        case 10:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, _this, [[1, 7]]);
        }));

        return function (_x6, _x7) {
            return _ref4.apply(this, arguments);
        };
    }());
};

var sendPaymentRequest = function sendPaymentRequest(_ref5, customerEmail, marchantName) {
    var amount = _ref5.amount,
        name = _ref5.name;
    return new babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_3___default.a(function () {
        var _ref6 = babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4(resolve, reject) {
            var mailOption;
            return babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            mailOption = {
                                from: from,
                                subject: 'Payment Request',
                                text: marchantName + ' is requesting for payment for milestone "' + name + '"'
                            };
                            _context4.prev = 1;
                            _context4.next = 4;
                            return sendTo(babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({}, mailOption, { to: customerEmail }));

                        case 4:
                            resolve();
                            _context4.next = 11;
                            break;

                        case 7:
                            _context4.prev = 7;
                            _context4.t0 = _context4['catch'](1);

                            console.log('err', _context4.t0);
                            reject(_context4.t0);

                        case 11:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, _this, [[1, 7]]);
        }));

        return function (_x8, _x9) {
            return _ref6.apply(this, arguments);
        };
    }());
};

/***/ }),

/***/ "./src/api/modules/recode.js":
/*!***********************************!*\
  !*** ./src/api/modules/recode.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var randomAlpha = function randomAlpha() {
  return 'abcdefghijklmnopqrstuvwxyz'.charAt(Math.floor(Math.random() * alpha.length));
};
var randomNum = function randomNum() {
  return Math.floor(Math.random() * 9);
};
/* harmony default export */ __webpack_exports__["default"] = (function () {
  return '' + randomAlpha() + randomNum() + randomAlpha() + randomNum() + randomAlpha() + randomNum();
});

/***/ }),

/***/ "./src/api/modules/transfer.js":
/*!*************************************!*\
  !*** ./src/api/modules/transfer.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/regenerator */ "babel-runtime/regenerator");
/* harmony import */ var babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "babel-runtime/helpers/asyncToGenerator");
/* harmony import */ var babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! babel-runtime/core-js/promise */ "babel-runtime/core-js/promise");
/* harmony import */ var babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var superagent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! superagent */ "superagent");
/* harmony import */ var superagent__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(superagent__WEBPACK_IMPORTED_MODULE_3__);




var _this = undefined;


var secret = "sk_test_ef208dee35b39342cf35bf961ec6cb19ebc2f94c";

var getReceipt = function getReceipt(name, account_number, bank_code) {
    return new babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_2___default.a(function (resolve, reject) {
        superagent__WEBPACK_IMPORTED_MODULE_3___default.a.post("https://api.paystack.co/transferrecipient").set("Authorization", "Bearer " + secret).send({
            "type": "nuban",
            name: name,
            account_number: account_number,
            bank_code: bank_code,
            currency: 'NGN'
        }).end(function (err, _ref) {
            var body = _ref.body;

            if (err) {
                console.log('err1', err);
                reject(err);
            }
            resolve(body);
        });
    });
};

var makeTransfer = function makeTransfer(recipient_code, amount) {
    return new babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_2___default.a(function (resolve, reject) {
        superagent__WEBPACK_IMPORTED_MODULE_3___default.a.post("https://api.paystack.co/transfer").set("Authorization", "Bearer " + secret).send({
            "source": "balance",
            amount: amount,
            recipient: recipient_code,
            currency: 'NGN'
        }).end(function (err, _ref2) {
            var body = _ref2.body;

            if (err) {
                console.log('err2', err);
                reject(err);
            }
            resolve(body);
        });
    });
};

var transfer = function transfer(name, account_number, bank_code, amount) {
    return new babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_2___default.a(function () {
        var _ref3 = babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(resolve, reject) {
            var _ref4, status, recipient_code, _ref5, _status;

            return babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.prev = 0;
                            _context.next = 3;
                            return getReceipt(name, account_number, bank_code);

                        case 3:
                            _ref4 = _context.sent;
                            status = _ref4.status;
                            recipient_code = _ref4.data.recipient_code;

                            if (!(status && recipient_code)) {
                                _context.next = 14;
                                break;
                            }

                            _context.next = 9;
                            return makeTransfer(recipient_code, amount * 100);

                        case 9:
                            _ref5 = _context.sent;
                            _status = _ref5.status;

                            if (_status) resolve();
                            _context.next = 15;
                            break;

                        case 14:
                            reject(new Error('No recipient_code'));

                        case 15:
                            _context.next = 21;
                            break;

                        case 17:
                            _context.prev = 17;
                            _context.t0 = _context["catch"](0);

                            console.log('err3', _context.t0);
                            reject(_context.t0);

                        case 21:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, _this, [[0, 17]]);
        }));

        return function (_x, _x2) {
            return _ref3.apply(this, arguments);
        };
    }());
};

/* harmony default export */ __webpack_exports__["default"] = (transfer);

/***/ }),

/***/ "./src/api/resources/banks/banks.route.js":
/*!************************************************!*\
  !*** ./src/api/resources/banks/banks.route.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/regenerator */ "babel-runtime/regenerator");
/* harmony import */ var babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "babel-runtime/helpers/asyncToGenerator");
/* harmony import */ var babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var superagent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! superagent */ "superagent");
/* harmony import */ var superagent__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(superagent__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_3__);



var _this = undefined;



var secret = "sk_test_ef208dee35b39342cf35bf961ec6cb19ebc2f94c";
var Router = express__WEBPACK_IMPORTED_MODULE_3___default.a.Router();

Router.route('/').get(function () {
    var _ref = babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(req, res) {
        return babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        superagent__WEBPACK_IMPORTED_MODULE_2___default.a.get('https://api.paystack.co/bank').set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + secret).end(function (err, _ref2) {
                            var data = _ref2.body.data;

                            if (err) res.status(400).send({ success: false, err: err });
                            res.send({ success: true, data: data });
                        });

                    case 1:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, _this);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}());

Router.route('/verify/:bank_code/:account_number').get(function () {
    var _ref3 = babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(req, res) {
        var _req$params, bank_code, account_number;

        return babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _req$params = req.params, bank_code = _req$params.bank_code, account_number = _req$params.account_number;


                        superagent__WEBPACK_IMPORTED_MODULE_2___default.a.get('https://api.paystack.co/bank/resolve?account_number=' + account_number + '&bank_code=' + bank_code).set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + secret).then(function (_ref4) {
                            var data = _ref4.body.data;

                            res.send({ success: true, data: data });
                        }).catch(function (err) {
                            res.status(400).send({ success: false, err: err });
                        });

                    case 2:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, _this);
    }));

    return function (_x3, _x4) {
        return _ref3.apply(this, arguments);
    };
}());

/* harmony default export */ __webpack_exports__["default"] = (Router);

/***/ }),

/***/ "./src/api/resources/confirm/confirm.route.js":
/*!****************************************************!*\
  !*** ./src/api/resources/confirm/confirm.route.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/regenerator */ "babel-runtime/regenerator");
/* harmony import */ var babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "babel-runtime/helpers/asyncToGenerator");
/* harmony import */ var babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _invoice_invoice_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../invoice/invoice.model */ "./src/api/resources/invoice/invoice.model.js");
/* harmony import */ var _modules_transfer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../modules/transfer */ "./src/api/modules/transfer.js");
/* harmony import */ var _dispute_dispute_controller__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../dispute/dispute.controller */ "./src/api/resources/dispute/dispute.controller.js");



var _this = undefined;






var ConfirmRouter = express__WEBPACK_IMPORTED_MODULE_2___default.a.Router();

ConfirmRouter.param('invoiceId', _dispute_dispute_controller__WEBPACK_IMPORTED_MODULE_5__["default"].getInvoiceId);

ConfirmRouter.route('/:invoiceId').post(function (req, res) {
    var invoiceId = req.params.invoiceId;
    var status = req.body.accepted ? 'accepted' : 'rejected';
    var emailCode = req.body.emailCode;

    if (req.invoice.verifyCode !== emailCode) return res.status(400).send({ success: false, error: new Error('Wrong invoice code') });

    _invoice_invoice_model__WEBPACK_IMPORTED_MODULE_3__["default"].findOneAndUpdate({ _id: invoiceId }, { $set: { status: status } }, { new: true }, function () {
        var _ref = babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(error, doc) {
            var marchantName, marchantAccountNumber, marchantBankCode, purchaseAmount, pipePayFee, deliveryAmount, amount;
            return babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            if (error) res.status(400).send({ success: false, error: error });
                            marchantName = doc.marchantName, marchantAccountNumber = doc.marchantAccountNumber, marchantBankCode = doc.marchantBankCode, purchaseAmount = doc.purchaseAmount, pipePayFee = doc.pipePayFee, deliveryAmount = doc.deliveryAmount;

                            if (!(status === "accepted")) {
                                _context.next = 16;
                                break;
                            }

                            _context.prev = 3;
                            amount = purchaseAmount;


                            if (doc.whoPaysPipepayFee === 'seller') {
                                amount -= pipePayFee;
                            }

                            if (doc.whoPaysPipepayFee === 'both') {
                                amount -= pipePayFee / 2;
                            }

                            if (doc.whoPaysDeliveryFee === 'both') {
                                amount += deliveryAmount / 2;
                            }

                            if (doc.whoPaysDeliveryFee === 'seller') {
                                amount -= deliveryAmount;
                            }

                            _context.next = 11;
                            return Object(_modules_transfer__WEBPACK_IMPORTED_MODULE_4__["default"])(marchantName, marchantAccountNumber, marchantBankCode, amount);

                        case 11:
                            _context.next = 16;
                            break;

                        case 13:
                            _context.prev = 13;
                            _context.t0 = _context['catch'](3);

                            res.status(400).send({ success: false, error: _context.t0 });

                        case 16:

                            res.status(200).send({ success: true, data: doc });

                        case 17:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this, [[3, 13]]);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }());
});

ConfirmRouter.route('/:invoiceId/:milestoneId').post(function () {
    var _ref2 = babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(req, res) {
        var invoiceId, milestoneId, status, emailCode, _ref3, marchantName, marchantAccountNumber, marchantBankCode, milestones, milestone, milestoneIndex;

        return babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        invoiceId = req.params.invoiceId;
                        milestoneId = req.params.milestoneId;
                        status = req.body.accepted ? 'accepted' : 'rejected';
                        emailCode = req.body.emailCode;

                        if (!(req.invoice.verifyCode !== emailCode)) {
                            _context2.next = 6;
                            break;
                        }

                        return _context2.abrupt('return', res.status(400).send({ success: false, error: new Error('Wrong invoice code') }));

                    case 6:
                        _context2.prev = 6;
                        _context2.next = 9;
                        return _invoice_invoice_model__WEBPACK_IMPORTED_MODULE_3__["default"].findOne({ _id: invoiceId });

                    case 9:
                        _ref3 = _context2.sent;
                        marchantName = _ref3.marchantName;
                        marchantAccountNumber = _ref3.marchantAccountNumber;
                        marchantBankCode = _ref3.marchantBankCode;
                        milestones = _ref3.milestones;
                        milestone = {};
                        milestoneIndex = -1;


                        milestones.forEach(function (m, i) {
                            if (m._id == milestoneId) {
                                milestoneIndex = i;
                                milestone = m;
                            }
                        });

                        _context2.next = 19;
                        return Object(_modules_transfer__WEBPACK_IMPORTED_MODULE_4__["default"])(marchantName, marchantAccountNumber, marchantBankCode, milestone.amount);

                    case 19:
                        milestone.paid = true;
                        milestones[milestoneIndex] = milestone;
                        _invoice_invoice_model__WEBPACK_IMPORTED_MODULE_3__["default"].findOneAndUpdate({ _id: invoiceId }, { $set: { milestones: milestones } }, { new: true }, function (err, doc) {
                            if (err) res.status(400).send({ success: false, error: err });
                            res.status(200).send({ success: true, data: doc });
                        });
                        _context2.next = 27;
                        break;

                    case 24:
                        _context2.prev = 24;
                        _context2.t0 = _context2['catch'](6);

                        res.status(400).send({ success: false, error: _context2.t0 });

                    case 27:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, _this, [[6, 24]]);
    }));

    return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}());

/* harmony default export */ __webpack_exports__["default"] = (ConfirmRouter);

/***/ }),

/***/ "./src/api/resources/dispute/dispute.controller.js":
/*!*********************************************************!*\
  !*** ./src/api/resources/dispute/dispute.controller.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/regenerator */ "babel-runtime/regenerator");
/* harmony import */ var babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "babel-runtime/helpers/asyncToGenerator");
/* harmony import */ var babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _dispute_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dispute.model */ "./src/api/resources/dispute/dispute.model.js");
/* harmony import */ var _invoice_invoice_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../invoice/invoice.model */ "./src/api/resources/invoice/invoice.model.js");
/* harmony import */ var _modules_generateController__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../modules/generateController */ "./src/api/modules/generateController.js");
/* harmony import */ var _modules_mailer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../modules/mailer */ "./src/api/modules/mailer.js");



var _this = undefined;






var DisputeController = Object(_modules_generateController__WEBPACK_IMPORTED_MODULE_4__["default"])(_dispute_model__WEBPACK_IMPORTED_MODULE_2__["default"], {
    getInvoiceId: function getInvoiceId(req, res, next) {
        var _id = req.params.invoiceId;

        _invoice_invoice_model__WEBPACK_IMPORTED_MODULE_3__["default"].findOne({ _id: _id }, function (err, doc) {
            if (err) return res.status(400).send({ error: { message: 'Invoice with id does not exits' }, success: false });
            req.invoice = doc;
            next();
        });
    },
    createOne: function createOne(req, res) {
        var body = req.body;
        var _req$invoice = req.invoice,
            marchantEmail = _req$invoice.marchantEmail,
            customerEmail = _req$invoice.customerEmail,
            customerName = _req$invoice.customerName,
            _id = _req$invoice._id;

        body.status = "open";
        body.invoiceId = _id;
        _dispute_model__WEBPACK_IMPORTED_MODULE_2__["default"].create(body, function () {
            var _ref = babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(err, doc) {
                return babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!err) {
                                    _context.next = 2;
                                    break;
                                }

                                return _context.abrupt('return', res.status(400).send({ error: { message: 'Could not create the dispute' }, success: false }));

                            case 2:
                                _context.prev = 2;
                                _context.next = 5;
                                return Object(_modules_mailer__WEBPACK_IMPORTED_MODULE_5__["sendDisputeMail"])(marchantEmail, customerEmail, customerName, body.reason, body.from);

                            case 5:
                                res.send({ data: doc, success: true });
                                _context.next = 11;
                                break;

                            case 8:
                                _context.prev = 8;
                                _context.t0 = _context['catch'](2);
                                return _context.abrupt('return', res.status(400).send({ error: { message: 'Could not send mail' }, success: false }));

                            case 11:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, _this, [[2, 8]]);
            }));

            return function (_x, _x2) {
                return _ref.apply(this, arguments);
            };
        }());
    },
    getOne: function getOne(req, res) {
        var invoiceId = req.params.invoiceId;
        _dispute_model__WEBPACK_IMPORTED_MODULE_2__["default"].findOne({ invoiceId: invoiceId }, function () {
            var _ref2 = babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(err, doc) {
                return babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                if (!err) {
                                    _context2.next = 2;
                                    break;
                                }

                                return _context2.abrupt('return', res.status(400).send({ error: { message: 'Find dispute' }, success: false }));

                            case 2:
                                res.send({ data: doc, success: true });

                            case 3:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, _this);
            }));

            return function (_x3, _x4) {
                return _ref2.apply(this, arguments);
            };
        }());
    }
});

/* harmony default export */ __webpack_exports__["default"] = (DisputeController);

/***/ }),

/***/ "./src/api/resources/dispute/dispute.model.js":
/*!****************************************************!*\
  !*** ./src/api/resources/dispute/dispute.model.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ "mongoose");
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);


var DisputeSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.Schema({
    customerEmail: String,
    marchantEmail: String,
    from: String,
    reason: String,
    category: String,
    invoiceId: { type: String, unique: true },
    status: String
});

/* harmony default export */ __webpack_exports__["default"] = (mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.model('Dispute', DisputeSchema));

/***/ }),

/***/ "./src/api/resources/dispute/dispute.route.js":
/*!****************************************************!*\
  !*** ./src/api/resources/dispute/dispute.route.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _dispute_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dispute.controller */ "./src/api/resources/dispute/dispute.controller.js");


var Router = express__WEBPACK_IMPORTED_MODULE_0___default.a.Router();

Router.param('invoiceId', _dispute_controller__WEBPACK_IMPORTED_MODULE_1__["default"].getInvoiceId);

Router.route('/:invoiceId').post(_dispute_controller__WEBPACK_IMPORTED_MODULE_1__["default"].createOne).get(_dispute_controller__WEBPACK_IMPORTED_MODULE_1__["default"].getOne);

/* harmony default export */ __webpack_exports__["default"] = (Router);

/***/ }),

/***/ "./src/api/resources/index.js":
/*!************************************!*\
  !*** ./src/api/resources/index.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _verify_verify_route__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./verify/verify.route */ "./src/api/resources/verify/verify.route.js");
/* harmony import */ var _request_request_route__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./request/request.route */ "./src/api/resources/request/request.route.js");
/* harmony import */ var _invoice_invoice_route__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./invoice/invoice.route */ "./src/api/resources/invoice/invoice.route.js");
/* harmony import */ var _payment_payment_route__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./payment/payment.route */ "./src/api/resources/payment/payment.route.js");
/* harmony import */ var _dispute_dispute_route__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dispute/dispute.route */ "./src/api/resources/dispute/dispute.route.js");
/* harmony import */ var _confirm_confirm_route__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./confirm/confirm.route */ "./src/api/resources/confirm/confirm.route.js");
/* harmony import */ var _banks_banks_route__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./banks/banks.route */ "./src/api/resources/banks/banks.route.js");
/* harmony import */ var _modules_auth__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../modules/auth */ "./src/api/modules/auth.js");











var MainRouter = express__WEBPACK_IMPORTED_MODULE_0___default.a.Router();

MainRouter.use('/verify', _verify_verify_route__WEBPACK_IMPORTED_MODULE_1__["default"]);
MainRouter.use('/banks', _banks_banks_route__WEBPACK_IMPORTED_MODULE_7__["default"]);
MainRouter.use('/confirm', _confirm_confirm_route__WEBPACK_IMPORTED_MODULE_6__["default"]);
MainRouter.use('/dispute', _dispute_dispute_route__WEBPACK_IMPORTED_MODULE_5__["default"]);
MainRouter.use('/request', _modules_auth__WEBPACK_IMPORTED_MODULE_8__["verifyToken"], _request_request_route__WEBPACK_IMPORTED_MODULE_2__["default"]);
MainRouter.use('/invoice', _modules_auth__WEBPACK_IMPORTED_MODULE_8__["verifyToken"], _invoice_invoice_route__WEBPACK_IMPORTED_MODULE_3__["default"]);
MainRouter.use('/payment', _modules_auth__WEBPACK_IMPORTED_MODULE_8__["verifyToken"], _payment_payment_route__WEBPACK_IMPORTED_MODULE_4__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (MainRouter);

/***/ }),

/***/ "./src/api/resources/invoice/invoice.controller.js":
/*!*********************************************************!*\
  !*** ./src/api/resources/invoice/invoice.controller.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/regenerator */ "babel-runtime/regenerator");
/* harmony import */ var babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "babel-runtime/helpers/asyncToGenerator");
/* harmony import */ var babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _invoice_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./invoice.model */ "./src/api/resources/invoice/invoice.model.js");
/* harmony import */ var _modules_recode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../modules/recode */ "./src/api/modules/recode.js");
/* harmony import */ var _modules_generateController__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../modules/generateController */ "./src/api/modules/generateController.js");
/* harmony import */ var _modules_invoice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../modules/invoice */ "./src/api/modules/invoice.js");



var _this = undefined;






/* harmony default export */ __webpack_exports__["default"] = (Object(_modules_generateController__WEBPACK_IMPORTED_MODULE_4__["default"])(_invoice_model__WEBPACK_IMPORTED_MODULE_2__["default"], {
    createOne: function () {
        var _ref = babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(req, res) {
            var body, line_items, customerTotalAmount, customerDeliveryFee, customPipepayFee, reconciliator, _ref4, request_code;

            return babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            body = req.body;


                            body.userId = req.user.sub;
                            body.marchantEmail = req.user.email;
                            body.marchantName = req.user.name;
                            body.marchantAccountNumber = req.user['custom:account_number'];
                            body.marchantBankCode = req.user['custom:bank_code'];

                            body.verifyCode =  false ? undefined : Object(_modules_recode__WEBPACK_IMPORTED_MODULE_3__["default"])();

                            if (body.type === 'good') {
                                body.bankCharges = 100;
                                body.pipePayFee = Math.min(body.purchaseAmount * 5 / 100, 5000) + body.bankCharges;
                                body.totalPrice = body.purchaseAmount + body.deliveryAmount + body.pipePayFee;
                            } else {
                                body.bankCharges = body.milestones.length * 50;
                                body.purchaseAmount = body.milestones.reduce(function (pv, _ref2) {
                                    var amount = _ref2.amount;
                                    return amount + pv;
                                }, 0);
                                body.purchaseAmount;
                                body.pipePayFee = Math.min(body.purchaseAmount * 5 / 100, 5000) + body.bankCharges;
                                body.deliveryAmount = 0;
                                body.totalPrice = body.purchaseAmount + body.pipePayFee;
                            }

                            line_items = [];
                            customerTotalAmount = body.purchaseAmount;
                            customerDeliveryFee = 0;
                            customPipepayFee = 0;

                            reconciliator = function reconciliator(who, original, fee) {
                                if (who === 'both') {
                                    return original += fee / 2;
                                } else if (who === 'buyer') {
                                    return original += fee;
                                } else {
                                    return original;
                                }
                            };

                            customerDeliveryFee = reconciliator(body.whoPaysDeliveryFee, customerDeliveryFee, body.deliveryAmount);
                            customPipepayFee = reconciliator(body.whoPaysPipepayFee, customPipepayFee, body.pipePayFee);

                            if (body.type === 'good') {
                                line_items = [{ 'name': 'Purchase Price', 'amount': customerTotalAmount * 100 }];

                                if (customPipepayFee > 0) line_items.push({ 'name': 'PipePay Fee', 'amount': customPipepayFee * 100 });
                                if (customerDeliveryFee > 0) line_items.push({ 'name': 'Delivery Fee', 'amount': customerDeliveryFee * 100 });
                            } else {
                                line_items = body.milestones.map(function (_ref3) {
                                    var name = _ref3.name,
                                        amount = _ref3.amount;
                                    return { name: name, amount: amount * 100 };
                                });
                                line_items.push({ 'name': 'PipePay Fee', 'amount': body.pipePayFee * 100 });
                            }

                            _context2.prev = 16;
                            _context2.next = 19;
                            return Object(_modules_invoice__WEBPACK_IMPORTED_MODULE_5__["CreateInvoice"])({ email: body.customerEmail, name: body.customerName, phone: body.customerPhone }, customerTotalAmount * 100, body.description, line_items);

                        case 19:
                            _ref4 = _context2.sent;
                            request_code = _ref4.data.request_code;


                            body.invoice_code = request_code;

                            _invoice_model__WEBPACK_IMPORTED_MODULE_2__["default"].create(body, function () {
                                var _ref5 = babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(err, doc) {
                                    return babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
                                        while (1) {
                                            switch (_context.prev = _context.next) {
                                                case 0:
                                                    if (!err) {
                                                        _context.next = 2;
                                                        break;
                                                    }

                                                    return _context.abrupt('return', res.status(400).send({ error: { message: 'Could not create the invoice' }, success: false }));

                                                case 2:
                                                    delete doc.verifyCode;
                                                    doc.status = "sent";
                                                    doc.save();
                                                    res.send({ data: doc, success: true });

                                                case 6:
                                                case 'end':
                                                    return _context.stop();
                                            }
                                        }
                                    }, _callee, _this);
                                }));

                                return function (_x3, _x4) {
                                    return _ref5.apply(this, arguments);
                                };
                            }());
                            _context2.next = 29;
                            break;

                        case 25:
                            _context2.prev = 25;
                            _context2.t0 = _context2['catch'](16);

                            console.log('err', _context2.t0);
                            return _context2.abrupt('return', res.status(400).send({ err: _context2.t0, success: false }));

                        case 29:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this, [[16, 25]]);
        }));

        return function createOne(_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }()
}));

/***/ }),

/***/ "./src/api/resources/invoice/invoice.model.js":
/*!****************************************************!*\
  !*** ./src/api/resources/invoice/invoice.model.js ***!
  \****************************************************/
/*! exports provided: MilestoneSchema, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MilestoneSchema", function() { return MilestoneSchema; });
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ "mongoose");
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);


var MilestoneSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.Schema({
    amount: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    paid: { type: Boolean, required: true, default: false }
});

var InvoiceSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.Schema({
    userId: { type: String, required: true },
    type: { type: String, enum: ['service', 'good'], required: true },
    description: { type: String, required: true },

    deliveryAmount: { type: Number, required: true },
    purchaseAmount: { type: Number, required: true },
    pipePayFee: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    bankCharges: { type: Number, required: true },

    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerPhone: { type: String, required: true },

    marchantName: { type: String, required: true },
    marchantAccountNumber: { type: String, required: true },
    marchantBankCode: { type: String, required: true },
    marchantEmail: { type: String, required: true },

    milestones: [MilestoneSchema],

    invoice_code: { type: String, unique: true },
    verifyCode: { type: String, unique: true },

    whoPaysPipepayFee: { type: String, enum: ['buyer', 'seller', 'both'] },
    whoPaysDeliveryFee: { type: String, enum: ['buyer', 'seller', 'both'] },

    status: String
});

/* harmony default export */ __webpack_exports__["default"] = (mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.model('Invoice', InvoiceSchema));

/***/ }),

/***/ "./src/api/resources/invoice/invoice.route.js":
/*!****************************************************!*\
  !*** ./src/api/resources/invoice/invoice.route.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _invoice_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./invoice.controller */ "./src/api/resources/invoice/invoice.controller.js");



var InvoiceRouter = express__WEBPACK_IMPORTED_MODULE_0___default.a.Router();

InvoiceRouter.param('id', _invoice_controller__WEBPACK_IMPORTED_MODULE_1__["default"].findByParam);

InvoiceRouter.route('/').post(_invoice_controller__WEBPACK_IMPORTED_MODULE_1__["default"].createOne);

InvoiceRouter.route('/:id').get(_invoice_controller__WEBPACK_IMPORTED_MODULE_1__["default"].getOne).delete(_invoice_controller__WEBPACK_IMPORTED_MODULE_1__["default"].deleteOne);

/* harmony default export */ __webpack_exports__["default"] = (InvoiceRouter);

/***/ }),

/***/ "./src/api/resources/payment/payment.controller.js":
/*!*********************************************************!*\
  !*** ./src/api/resources/payment/payment.controller.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/helpers/extends */ "babel-runtime/helpers/extends");
/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babel-runtime/regenerator */ "babel-runtime/regenerator");
/* harmony import */ var babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "babel-runtime/helpers/asyncToGenerator");
/* harmony import */ var babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var babel_runtime_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! babel-runtime/core-js/json/stringify */ "babel-runtime/core-js/json/stringify");
/* harmony import */ var babel_runtime_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! crypto */ "crypto");
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _payment_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./payment.model */ "./src/api/resources/payment/payment.model.js");
/* harmony import */ var _invoice_invoice_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../invoice/invoice.model */ "./src/api/resources/invoice/invoice.model.js");
/* harmony import */ var _modules_mailer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../modules/mailer */ "./src/api/modules/mailer.js");
/* harmony import */ var _modules_generateController__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../modules/generateController */ "./src/api/modules/generateController.js");
/* harmony import */ var _modules_transfer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../modules/transfer */ "./src/api/modules/transfer.js");





var _this = undefined;








var secret = "sk_test_ef208dee35b39342cf35bf961ec6cb19ebc2f94c";

/* harmony default export */ __webpack_exports__["default"] = (Object(_modules_generateController__WEBPACK_IMPORTED_MODULE_8__["default"])(_payment_model__WEBPACK_IMPORTED_MODULE_5__["default"], {
    createOne: function createOne(req, res) {
        var hash = crypto__WEBPACK_IMPORTED_MODULE_4___default.a.createHmac('sha512', secret).update(babel_runtime_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_3___default()(req.body)).digest('hex');
        var _req$body = req.body,
            event = _req$body.event,
            _req$body$data = _req$body.data,
            reference = _req$body$data.transaction.reference,
            amount = _req$body$data.amount,
            paid = _req$body$data.paid,
            invoice_code = _req$body$data.invoice_code,
            _req$body$data$custom = _req$body$data.customer,
            first_name = _req$body$data$custom.first_name,
            last_name = _req$body$data$custom.last_name,
            email = _req$body$data$custom.email;


        if (hash === req.headers['x-paystack-signature'] && event === 'invoice.update' && paid) {
            _invoice_invoice_model__WEBPACK_IMPORTED_MODULE_6__["default"].findOneAndUpdate({ invoice_code: invoice_code }, { $set: { status: 'paid' } }, { new: true }, function () {
                var _ref = babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee(err, doc) {
                    var _id, type, whoPaysDeliveryFee, marchantName, marchantEmail, marchantBankCode, deliveryAmount, marchantAccountNumber;

                    return babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    if (!err) {
                                        _context.next = 3;
                                        break;
                                    }

                                    console.log(err);
                                    return _context.abrupt('return', res.status(400).send({ error: new Error(error), status: false }));

                                case 3:
                                    _id = doc._id, type = doc.type, whoPaysDeliveryFee = doc.whoPaysDeliveryFee, marchantName = doc.marchantName, marchantEmail = doc.marchantEmail, marchantBankCode = doc.marchantBankCode, deliveryAmount = doc.deliveryAmount, marchantAccountNumber = doc.marchantAccountNumber;
                                    _context.prev = 4;

                                    if (!(type === 'good')) {
                                        _context.next = 10;
                                        break;
                                    }

                                    _context.next = 8;
                                    return Object(_modules_transfer__WEBPACK_IMPORTED_MODULE_9__["default"])(marchantName, marchantAccountNumber, marchantBankCode, deliveryAmount);

                                case 8:
                                    _context.next = 10;
                                    return _payment_model__WEBPACK_IMPORTED_MODULE_5__["default"].create({ customerEmail: email, marchantEmail: marchantEmail, reference: reference, deliveryAmount: deliveryAmount, invoiceId: _id });

                                case 10:
                                    _context.next = 12;
                                    return _modules_mailer__WEBPACK_IMPORTED_MODULE_7__["sendReceiptMail"](first_name + ' ' + last_name, email, marchantEmail, amount);

                                case 12:
                                    res.status(200).send({ success: true });
                                    _context.next = 19;
                                    break;

                                case 15:
                                    _context.prev = 15;
                                    _context.t0 = _context['catch'](4);

                                    console.log(_context.t0);
                                    return _context.abrupt('return', res.status(400).send({ error: { message: 'Could not send mail' }, success: false }));

                                case 19:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this, [[4, 15]]);
                }));

                return function (_x, _x2) {
                    return _ref.apply(this, arguments);
                };
            }());
        } else {
            res.status(400).send({ success: false });
        }
    },
    getOne: function getOne(req, res) {
        var id = req.params.invoiceId;
        _payment_model__WEBPACK_IMPORTED_MODULE_5__["default"].findOne({ invoiceId: id }, function (err, doc) {
            if (err) res.status(401).send({ success: false, error: babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, err) });
            res.status(200).send({ success: true, data: doc });
        });
    }
}));

/***/ }),

/***/ "./src/api/resources/payment/payment.model.js":
/*!****************************************************!*\
  !*** ./src/api/resources/payment/payment.model.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ "mongoose");
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);


var PaymentSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.Schema({
    marchantEmail: String,
    customerEmail: String,
    amount: Number,
    invoiceId: String,
    reference: String
});

/* harmony default export */ __webpack_exports__["default"] = (mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.model('Payment', PaymentSchema));

/***/ }),

/***/ "./src/api/resources/payment/payment.route.js":
/*!****************************************************!*\
  !*** ./src/api/resources/payment/payment.route.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _payment_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./payment.controller */ "./src/api/resources/payment/payment.controller.js");



var Router = express__WEBPACK_IMPORTED_MODULE_0___default.a.Router();

Router.param('/:id', _payment_controller__WEBPACK_IMPORTED_MODULE_1__["default"].findByParam);

Router.route('/').post(_payment_controller__WEBPACK_IMPORTED_MODULE_1__["default"].createOne);

Router.route('/:invoiceId').get(_payment_controller__WEBPACK_IMPORTED_MODULE_1__["default"].getOne);

/* harmony default export */ __webpack_exports__["default"] = (Router);

/***/ }),

/***/ "./src/api/resources/request/request.route.js":
/*!****************************************************!*\
  !*** ./src/api/resources/request/request.route.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/regenerator */ "babel-runtime/regenerator");
/* harmony import */ var babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babel-runtime/helpers/slicedToArray */ "babel-runtime/helpers/slicedToArray");
/* harmony import */ var babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "babel-runtime/helpers/asyncToGenerator");
/* harmony import */ var babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _invoice_invoice_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../invoice/invoice.model */ "./src/api/resources/invoice/invoice.model.js");
/* harmony import */ var _modules_mailer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../modules/mailer */ "./src/api/modules/mailer.js");




var _this = undefined;




var Router = express__WEBPACK_IMPORTED_MODULE_3___default.a.Router();

Router.route('/:invoiceId/:milestoneId').get(function () {
    var _ref = babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(req, res) {
        var _req$params, invoiceId, milestoneId, _ref2, milestones, customerEmail, marchantName, _milestones$filter, _milestones$filter2, milestone;

        return babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _req$params = req.params, invoiceId = _req$params.invoiceId, milestoneId = _req$params.milestoneId;
                        _context.prev = 1;
                        _context.next = 4;
                        return _invoice_invoice_model__WEBPACK_IMPORTED_MODULE_4__["default"].findOne({ _id: invoiceId });

                    case 4:
                        _ref2 = _context.sent;
                        milestones = _ref2.milestones;
                        customerEmail = _ref2.customerEmail;
                        marchantName = _ref2.marchantName;
                        _milestones$filter = milestones.filter(function (_ref3) {
                            var _id = _ref3._id;
                            return _id !== milestoneId;
                        }), _milestones$filter2 = babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_milestones$filter, 1), milestone = _milestones$filter2[0];

                        if (!(milestone && !milestone.paid)) {
                            _context.next = 15;
                            break;
                        }

                        _context.next = 12;
                        return Object(_modules_mailer__WEBPACK_IMPORTED_MODULE_5__["sendPaymentRequest"])(milestone, customerEmail, marchantName);

                    case 12:
                        res.status(200).send({ success: true });
                        _context.next = 16;
                        break;

                    case 15:
                        res.status(400).send({ success: false, error: { message: 'Milestone already paid for' } });

                    case 16:
                        _context.next = 23;
                        break;

                    case 18:
                        _context.prev = 18;
                        _context.t0 = _context['catch'](1);

                        console.log('error...');
                        if (_context.t0) console.log(_context.t0);
                        if (_context.t0) res.status(400).send({ success: false, error: _context.t0 });

                    case 23:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, _this, [[1, 18]]);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}());

/* harmony default export */ __webpack_exports__["default"] = (Router);

/***/ }),

/***/ "./src/api/resources/verify/verify.route.js":
/*!**************************************************!*\
  !*** ./src/api/resources/verify/verify.route.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/regenerator */ "babel-runtime/regenerator");
/* harmony import */ var babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "babel-runtime/helpers/asyncToGenerator");
/* harmony import */ var babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _dispute_dispute_controller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dispute/dispute.controller */ "./src/api/resources/dispute/dispute.controller.js");
/* harmony import */ var _modules_mailer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../modules/mailer */ "./src/api/modules/mailer.js");



var _this = undefined;





var Router = express__WEBPACK_IMPORTED_MODULE_2___default.a.Router();

Router.param('invoiceId', _dispute_dispute_controller__WEBPACK_IMPORTED_MODULE_3__["default"].getInvoiceId);

Router.route('/:invoiceId').get(function () {
    var _ref = babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(req, res) {
        var _req$invoice, customerEmail, verifyCode;

        return babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _req$invoice = req.invoice, customerEmail = _req$invoice.customerEmail, verifyCode = _req$invoice.verifyCode;
                        _context.prev = 1;
                        _context.next = 4;
                        return Object(_modules_mailer__WEBPACK_IMPORTED_MODULE_4__["sendCustormerVerificationCode"])(customerEmail, verifyCode);

                    case 4:
                        res.send({ success: true });
                        _context.next = 10;
                        break;

                    case 7:
                        _context.prev = 7;
                        _context.t0 = _context['catch'](1);

                        res.status(400).send({ status: false, error: _context.t0 });

                    case 10:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, _this, [[1, 7]]);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}());

/* harmony default export */ __webpack_exports__["default"] = (Router);

/***/ }),

/***/ "./src/config/dev.js":
/*!***************************!*\
  !*** ./src/config/dev.js ***!
  \***************************/
/*! exports provided: config */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "config", function() { return config; });
var username = Object({"BUILD_TARGET":"server"}).DB_USER;
var password = Object({"BUILD_TARGET":"server"}).DB_PASSWORD;

var config = {
    db: {
        url: "mongodb://localhost:27017/pipepay"
    }
};

/***/ }),

/***/ "./src/config/index.js":
/*!*****************************!*\
  !*** ./src/config/index.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash_merge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash.merge */ "lodash.merge");
/* harmony import */ var lodash_merge__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_merge__WEBPACK_IMPORTED_MODULE_0__);

var env = "development";

console.log('env', env);

var baseConfig = {
    port: 3000,
    db: {
        url: ''
    }
};

var envConfig = {};

switch (env) {
    case 'development':
    case 'dev':
        envConfig = __webpack_require__(/*! ./dev */ "./src/config/dev.js").config;
        break;
    case 'prod':
    case 'production':
        envConfig = __webpack_require__(/*! ./prod */ "./src/config/prod.js").config;
    default:
        envConfig = __webpack_require__(/*! ./dev */ "./src/config/dev.js").config;
}

/* harmony default export */ __webpack_exports__["default"] = (lodash_merge__WEBPACK_IMPORTED_MODULE_0___default()(baseConfig, envConfig));

/***/ }),

/***/ "./src/config/prod.js":
/*!****************************!*\
  !*** ./src/config/prod.js ***!
  \****************************/
/*! exports provided: config */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "config", function() { return config; });
var username = Object({"BUILD_TARGET":"server"}).DB_USER;
var password = Object({"BUILD_TARGET":"server"}).DB_PASSWORD;

var config = {
    db: {
        url: ""
    }
};

/***/ }),

/***/ "./src/db.js":
/*!*******************!*\
  !*** ./src/db.js ***!
  \*******************/
/*! exports provided: connect */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "connect", function() { return connect; });
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ "mongoose");
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config */ "./src/config/index.js");



mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.Promise = global.Promise;

var connect = function connect() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _config__WEBPACK_IMPORTED_MODULE_1__["default"];

    return mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.connect(config.db.url, { useNewUrlParser: true });
};

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! http */ "http");
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./server */ "./src/server.js");



var server = http__WEBPACK_IMPORTED_MODULE_0___default.a.createServer(_server__WEBPACK_IMPORTED_MODULE_1__["default"]);
var currentApp = _server__WEBPACK_IMPORTED_MODULE_1__["default"];

var port = 4545 || Object({"BUILD_TARGET":"server"}).PORT;

console.log('port', port);

server.listen(port, function () {
	console.log('Server listening on port ' + port);
});

if (true) {
	module.hot.accept([/*! ./server */ "./src/server.js"], function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./server */ "./src/server.js");
(function () {
		server.removeListener('request', currentApp);
		server.on('request', _server__WEBPACK_IMPORTED_MODULE_1__["default"]);
		currentApp = _server__WEBPACK_IMPORTED_MODULE_1__["default"];
	})(__WEBPACK_OUTDATED_DEPENDENCIES__); });
}

/***/ }),

/***/ "./src/middleware.js":
/*!***************************!*\
  !*** ./src/middleware.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! body-parser */ "body-parser");
/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var morgan__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! morgan */ "morgan");
/* harmony import */ var morgan__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(morgan__WEBPACK_IMPORTED_MODULE_1__);



var setGlobalMiddleware = function setGlobalMiddleware(app) {
    app.use(morgan__WEBPACK_IMPORTED_MODULE_1___default()());
    app.use(body_parser__WEBPACK_IMPORTED_MODULE_0___default.a.urlencoded({ extended: true }));
    app.use(body_parser__WEBPACK_IMPORTED_MODULE_0___default.a.json());
};

/* harmony default export */ __webpack_exports__["default"] = (setGlobalMiddleware);

/***/ }),

/***/ "./src/server.js":
/*!***********************!*\
  !*** ./src/server.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _middleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./middleware */ "./src/middleware.js");
/* harmony import */ var _api_resources__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./api/resources */ "./src/api/resources/index.js");
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./db */ "./src/db.js");
/* harmony import */ var _api_modules_auth__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./api/modules/auth */ "./src/api/modules/auth.js");






var app = express__WEBPACK_IMPORTED_MODULE_0___default()();

Object(_api_modules_auth__WEBPACK_IMPORTED_MODULE_4__["getJWT"])();
Object(_middleware__WEBPACK_IMPORTED_MODULE_1__["default"])(app);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

Object(_db__WEBPACK_IMPORTED_MODULE_3__["connect"])().catch(function (err) {
    console.error('DB error', err);
});

app.use('/api', _api_resources__WEBPACK_IMPORTED_MODULE_2__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (app);

/***/ }),

/***/ 0:
/*!***********************************************!*\
  !*** multi webpack/hot/poll?1000 ./src/index ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! webpack/hot/poll?1000 */"./node_modules/webpack/hot/poll.js?1000");
module.exports = __webpack_require__(/*! ./src/index */"./src/index.js");


/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),

/***/ "babel-runtime/core-js/json/stringify":
/*!*******************************************************!*\
  !*** external "babel-runtime/core-js/json/stringify" ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),

/***/ "babel-runtime/core-js/object/assign":
/*!******************************************************!*\
  !*** external "babel-runtime/core-js/object/assign" ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/assign");

/***/ }),

/***/ "babel-runtime/core-js/promise":
/*!************************************************!*\
  !*** external "babel-runtime/core-js/promise" ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/promise");

/***/ }),

/***/ "babel-runtime/helpers/asyncToGenerator":
/*!*********************************************************!*\
  !*** external "babel-runtime/helpers/asyncToGenerator" ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ }),

/***/ "babel-runtime/helpers/extends":
/*!************************************************!*\
  !*** external "babel-runtime/helpers/extends" ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/extends");

/***/ }),

/***/ "babel-runtime/helpers/slicedToArray":
/*!******************************************************!*\
  !*** external "babel-runtime/helpers/slicedToArray" ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/slicedToArray");

/***/ }),

/***/ "babel-runtime/regenerator":
/*!********************************************!*\
  !*** external "babel-runtime/regenerator" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/regenerator");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),

/***/ "date-fns/add_days":
/*!************************************!*\
  !*** external "date-fns/add_days" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("date-fns/add_days");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "lodash.merge":
/*!*******************************!*\
  !*** external "lodash.merge" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash.merge");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),

/***/ "nodemailer":
/*!*****************************!*\
  !*** external "nodemailer" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("nodemailer");

/***/ }),

/***/ "superagent":
/*!*****************************!*\
  !*** external "superagent" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("superagent");

/***/ })

/******/ });
//# sourceMappingURL=server.js.map