from fastapi import FastAPI
from routes import ia_routes
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI(title="IA ISO 29100 API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # o restringe a ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(ia_routes.router)
