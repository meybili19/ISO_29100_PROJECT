'use client'

import { useState } from 'react'

export default function Home() {
  const [casoGenerado, setCasoGenerado] = useState('')
  const [respuestaUsuario, setRespuestaUsuario] = useState('')
  const [respuestaIA, setRespuestaIA] = useState('')
  const [coincidencia, setCoincidencia] = useState(null) // ✅ corregido

  const API_URL = 'http://localhost:8000'

  const generarCaso = async () => {
    try {
      const response = await fetch(`${API_URL}/generate_case`)
      const data = await response.json()
      setCasoGenerado(data.case)
      setRespuestaIA('')
      setRespuestaUsuario('')
      setCoincidencia(null)
    } catch (error) {
      console.error('Error al generar el caso:', error)
    }
  }

  const resolverConIA = async () => {
    try {
      const response = await fetch(`${API_URL}/solve_with_ia`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ case: casoGenerado })
      })
      const data = await response.json()
      setRespuestaIA(data.ia_solution)
      compararRespuestas(respuestaUsuario, data.ia_solution)
    } catch (error) {
      console.error('Error al resolver con IA:', error)
    }
  }

  const compararRespuestas = async (userResponse, iaResponse) => {
    try {
      const response = await fetch(`${API_URL}/compare_solutions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_answer: userResponse,
          ia_answer: iaResponse
        })
      })
      const data = await response.json()
      setCoincidencia(data.similarity)
    } catch (error) {
      console.error('Error al comparar respuestas:', error)
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">ISO/IEC 29100 - Generador de Casos</h1>

      <button
        onClick={generarCaso}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Generar caso de uso según 29100
      </button>

      {casoGenerado && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Caso generado por IA:</h2>
          <p className="bg-white p-4 rounded shadow mt-2 whitespace-pre-line">{casoGenerado}</p>

          <div className="mt-6">
            <h3 className="text-lg font-medium">Tu solución:</h3>
            <textarea
              className="w-full h-32 mt-2 p-2 border rounded"
              value={respuestaUsuario}
              onChange={(e) => setRespuestaUsuario(e.target.value)}
              placeholder="Escribe cómo resolverías el caso..."
            ></textarea>
          </div>

          <button
            onClick={resolverConIA}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 mt-4"
          >
            Resolver con IA
          </button>

          {respuestaIA && (
            <div className="mt-6">
              <h3 className="text-lg font-medium">Respuesta de la IA:</h3>
              <p className="bg-white p-4 rounded shadow mt-2 whitespace-pre-line">{respuestaIA}</p>
            </div>
          )}

          {coincidencia !== null && (
            <div className="mt-6">
              <h3 className="text-lg font-medium">Coincidencia:</h3>
              <p className="text-xl font-bold text-indigo-700">
                {coincidencia}%
              </p>
            </div>
          )}
        </div>
      )}
    </main>
  )
}
