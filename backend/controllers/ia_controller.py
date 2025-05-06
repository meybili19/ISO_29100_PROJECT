from services import ia_service

def get_case():
    return ia_service.generate_case()

def solve_case(case: str):
    return ia_service.solve_case_with_ai(case)

def compare(user: str, ia: str):
    return ia_service.compare_answers(user, ia)
