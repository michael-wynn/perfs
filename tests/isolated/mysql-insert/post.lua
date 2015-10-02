wrk.method = "POST"
wrk.path = "/mysql-insert"
wrk.headers["content-type"] = "application/json"
wrk.body = io.input("one-rows.json"):read("*a")
