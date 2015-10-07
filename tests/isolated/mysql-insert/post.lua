wrk.method = "POST"
wrk.path = "/mysql-insert"
wrk.headers["content-type"] = "application/json"
wrk.body = io.input("ten-rows.json"):read("*a")
