from fastapi import APIRouter
from controllers import ia_controller
from models.schemas import SolveRequest, CompareRequest

router = APIRouter()

@router.get("/generate_case")
def generate_case():
    return {"case": ia_controller.get_case()}

@router.post("/solve_with_ia")
def solve_with_ai(data: SolveRequest):
    return {"ia_solution": ia_controller.solve_case(data.case)}

@router.post("/compare_solutions")
def compare(data: CompareRequest):
    score = ia_controller.compare(data.user_answer, data.ia_answer)
    return {"similarity": score}
