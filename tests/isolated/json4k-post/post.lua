wrk.method = "POST"
wrk.path = "/json4k-post"
wrk.headers["content-type"] = "application/json"
wrk.body = io.input("4k.json"):read("*a")
