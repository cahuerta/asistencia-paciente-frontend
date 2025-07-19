import { useState } from 'react';

export default function FormPaciente() {
  const [formulario, setFormulario] = useState({
    nombre: '', edad: '', enfermedades: '', cirugias: '', alergias: '', descripcion: ''
  });
  const [pdfURL, setPdfURL] = useState(null);

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/paciente', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formulario)
    });
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    setPdfURL(url);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Formulario de Asistencia al Paciente</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        {['nombre', 'edad', 'enfermedades', 'cirugias', 'alergias', 'descripcion'].map((campo) => (
          <div key={campo}>
            <label className="block capitalize">{campo}</label>
            <textarea
              name={campo}
              value={formulario[campo]}
              onChange={handleChange}
              className="w-full border rounded p-2"
              rows={campo === 'descripcion' ? 4 : 2}
              required
            />
          </div>
        ))}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Generar Informe</button>
      </form>
      {pdfURL && (
        <div className="mt-4">
          <a href={pdfURL} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Descargar PDF generado</a>
        </div>
      )}
    </div>
  );
}
