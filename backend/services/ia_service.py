from config.settings import settings
from google.generativeai import GenerativeModel, configure
from iso.iso_29100 import ISO_TEXT  
from utils.compare import calculate_similarity

configure(api_key=settings.GEMINI_API_KEY)
model = GenerativeModel("gemini-1.5-pro-latest")

def generate_case():
    prompt = f"Con base en el siguiente contenido de la norma ISO/IEC 29100 sobre privacidad, genera un caso práctico: {ISO_TEXT}"
    response = model.generate_content(prompt)
    return response.text

def solve_case_with_ai(case: str):
    prompt = f"Resuelve este caso práctico según la ISO/IEC 29100: {case}\nReferencia: {ISO_TEXT}"
    response = model.generate_content(prompt)
    return response.text

def compare_answers(user: str, ia: str):
    return calculate_similarity(user, ia)
