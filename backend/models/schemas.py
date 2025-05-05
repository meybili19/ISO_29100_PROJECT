from pydantic import BaseModel

class CaseRequest(BaseModel):
    prompt: str = None

class SolveRequest(BaseModel):
    case: str

class CompareRequest(BaseModel):
    user_answer: str
    ia_answer: str
