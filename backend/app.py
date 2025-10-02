from fastapi import FastAPI, Request
from fastapi_crons import Crons, get_cron_router
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles

app = FastAPI()

# Allow all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
crons = Crons(app)


app.include_router(get_cron_router(), prefix="/api")

app.mount("/dist", StaticFiles(directory="dist/", html=True), name="admin")

@app.get("/")
def root():
    return {"message": "Hello! Let's create a standalone dashboard for the fastapi_crons package."}

@app.get("/dashboard/")
def dashbord(request: Request):
    with open("dist/index.html", "r") as f:
        html = f.read()

    backend_url = str(request.base_url)
    print(f"host of backend: {backend_url}")

    # Replace placeholder with real value
    html = html.replace("__API__", backend_url).replace("/assets/index-DM3vjygE.js",backend_url + "dist/index-DM3vjygE.js").replace("/assets/index-CK5lhLvC.css", backend_url + "dist/index-CK5lhLvC.css").replace("vite.svg", backend_url + "dist/vite.svg")


    return HTMLResponse(content=html)



@crons.cron("*/5 * * * *", name="print_hello")
def print_hello():
    print("Hello! I run every 5 minutes.")

@crons.cron("0 0 * * *", name="daily_task", tags=["rewards"])
async def run_daily_task():
    # Distribute daily rewards or any async task
    print("print something")
    # await  some_async_function()


@crons.cron("*/5 * * * *", tags=["maintenance", "cleanup"])
async def cleanup_job():
    # This job has tags for categorization
    pass
