import { getUniqueId, getDeviceId } from 'react-native-device-info';

class Genelet {
	constructor(args) {
		this.handler = args.handler;
		this.json = args.json || "json";
		this.logins = args.logins || "login";
		this.logouts = args.logouts || "logout";
		this.mime = args.mime || "jsx";
		this.single = args.single || {};
		this.lists = args.lists || {};
		this.names = args.names || {}
		this.note = args.note || "note";
		this.token = args.token || "";
		this.OTHER = args.OTHER || {};
		this.lastQ = args.lastQ || {};
	}

	ajaxPage(f, role, comp, query, method, landing) {
		var handler = this.handler;
		if (method === undefined) method = "GET";

		var url = handler + "/" + role + "/" + this.json + "/" + comp;
		var req = { method: method, headers: { "Content-Type": "application/json", "User-Agent": getUniqueId(), "Referer": getDeviceId() } };
		if (comp != this.logins && this.token != "") {
			req.method = "POST";
			//req.headers["Authorization"] = "Bearer " + this.token;
			query["ta"] = this.token;
			req.body = JSON.stringify(query);
		} else if (method == 'GET') {
			var pairs = [];
			for (var k in query) pairs.push(k + "=" + encodeURIComponent(query[k]));
			url = url + "?" + pairs.join("&");
		} else {
			req.body = JSON.stringify(query);
		}
		// console.log(url + ": ", JSON.stringify(req));

		fetch(url, req).then(
			(resp) => {
				const status = resp.status;
				if ((status == 401 && resp.headers.get("WWW-Authenticate") !== null) || (status == 400 && comp == this.logins)) {
					// console.log("Login or relogin required.");
					var code = resp.headers.get("Tabilet-Error");
					this.single = {
						error_code: code,
						error_string: resp.headers.get("Tabilet-Error-Description")
					};
					this.lists = [this.single];
					if (req.method != "GET") this.lastQ = {};
					var name = (Number.isInteger(code) || /^\d+$/.test(code)) ? this.logins : code;
					f.navigate(role + "-" + name, this);
					return;
				} else if (status == 200 || status == 201) {
					resp.json().then((data) => {
						// console.log("RAW:", data);
						if (data.token_type !== null && data.token_type == "bearer") {
							return this.loginSuccess(f, data, landing);
						} else if (data.success != null && data.success == false) {
							// console.log("Custom error:", data.error_code);
							alert("Error status: " + data.error_string, data.error_code);
							return;
						}
						// console.log("start switch.....", typeof landing);
						switch (typeof landing) {
							case "undefined":
								this.assignThree(data);
								// console.log("Landing on " + role + ", " + comp + ", " + query.action);
								f.navigate(role + "-" + comp + "-" + query.action, this);
								return;
							case "boolean":
								if (landing) {
									this.assignThree(data);
									// console.log("Stay, but refresh two.");
								} else {
									this.assignOther(this.note, data);
									// console.log("Stay, but assign OTHER.note");
								}
								return;
							case "function":
								// console.log("Function assignment. May land or stay.");
								landing(f, data);
								return;
							case "string":
								if (comp == this.logouts && data.success) {
									// console.log("Logout found.", this.constructor.name); // specifically for React
									this.token = "";
									f.navigate(landing, this);
									return;
								}
								this.assignTwo(data);
								this.assignOther(landing, data);
								// console.log("Popup modal: ", landing);
								return;
							case "object":
								if (landing.operator) {
									// console.log("Stay on this page. changing data.");
									this.assignOne2Data(data, landing);
								} else {
									var s = landing.query || {};
									s.action = landing.action || query.action;
									var r = landing.role || role;
									var c = landing.comp || comp;
									// console.log("Landing on new " + r + ", " + c + ", " + s.action);
									this.ajaxPage(f, r, c, s, "GET", landing.refresh);
								}
								return;
							default:
						}
					});
					return;
				} else {
					// console.log("77 status: ", status);
					alert("Error status: " + status);
				}
			}).catch(
				(err) => {
					// console.log("88 ", err);
					alert(err);
				});
		// console.log("return from ajax.");
	};

	loginSuccess(f, data, landing) {
		this.token = data.access_token;
		// console.log("Login succeeds. TOKEN: " + this.token);
		var q = (Object.keys(this.lastQ).length > 0) ? this.lastQ : { action: landing.action };
		// console.log("Redirect to " + landing.role + ", " + landing.comp + ", " + landing.action);
		return this.ajaxPage(f, landing.role, landing.comp, q);
	}

	assignOther(k, data) {
		this.OTHER[k] = data;
	};

	assignTwo(data) {
		if (data["data"]) {
			this.lists = data["data"];
			this.single = data["data"][0];
		}
	};

	assignThree(data) {
		this.assignTwo(data)
		this.names = data;
	};

	assignOne2Data(data, landing) {
		var lists = this.lists;
		if (landing.target) {
			var a = landing.target.split('.');
			switch (a.length) {
				case 4:
					var pos = this.OTHER[a[0]][a[1]].map(function (e) { return e[a[2]]; }).indexOf(data[a[2]]);
					if (pos < 0) return;
					lists = this.OTHER[a[0]][a[1]][pos][a[3]];
					if (lists === undefined) {
						this.OTHER[a[0]][a[1]][pos][a[3]] = [];
						lists = this.OTHER[a[0]][a[1]][pos][a[3]];
					}
					break;
				case 3:
					var s = this.names[this.names.action][0][a[0]];
					var pos = s.map(function (e) { return e[a[1]]; }).indexOf(data[a[1]]);
					if (pos < 0) return;
					lists = s[pos][a[2]];
					if (lists === undefined) {
						s[pos][a[2]] = [];
						lists = s[pos][a[2]];
					}
					break;
				case 2:
					lists = this.OTHER[a[0]][a[1]];
					break;
				default:
					lists = this.OTHER[a[0]];
			}
		}
		if (lists === undefined) return;

		if (landing.operator == 'append') {
			this.lists.push(...data["data"]);
			return;
		}
		var single = data["data"][0];
		if (single === undefined || lists === undefined) return;
		if (landing.operator == 'insert') {
			if (landing.extra) landing.extra.forEach((v, k) => { single[k] = v; });
			lists.push(single);
			if (landing.callback !== null) landing.callback();
		} else {
			var pos = -1;
			for (var i = 0; i < lists.length; i++) {
				var x = single[landing.id_name];
				var y = lists[i][landing.id_name];
				if ((typeof (x) == "string" && typeof (y) == "number" && parseInt(x) == y) || (x == y)) {
					pos = i;
					break;
				}
			}
			if (pos < 0) return;
			if (landing.operator == 'delete') {
				lists.splice(pos, 1);
				if (landing.callback !== null) landing.callback();
			} else if (landing.operator == 'update') {
				for (var k in single) {
					if (single[k]) lists[pos][k] = single[k];
				}
				if (landing.callback !== null) landing.callback();
			}
		}
		return;
	};

	go(f, r, c, a, q, landing) {
		if (q === undefined) q = {};
		q.action = a;
		return this.ajaxPage(f, r, c, q, "GET", landing);
	};

	send(f, r, c, a, q, landing) {
		if (q === undefined) q = {};
		q.action = a;
		return this.ajaxPage(f, r, c, q, "POST", landing);
	};

	login(f, r, c, a, q, provider) {
		if (provider === undefined) provider = "db";
		q.provider = provider
		return this.ajaxPage(f, r, this.logins, q, 'POST', { role: r, comp: c, action: a });
	};

	logout(f, r, name) {
		return this.ajaxPage(f, r, this.logouts, {}, 'GET', name);
	};

};

export default Genelet;
