import os

# Obtén la ruta absoluta al archivo iso_29100.txt
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ISO_FILE_PATH = os.path.join(BASE_DIR, "iso_29100.txt")

# Lee el contenido del archivo
with open(ISO_FILE_PATH, "r", encoding="utf-8") as file:
    ISO_TEXT = file.read()
