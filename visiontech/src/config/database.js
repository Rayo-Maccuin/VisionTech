// Configuración para la base de datos
// Este archivo se utilizará para configurar la conexión a la base de datos real en el futuro

const dbConfig = {
  // Configuración para desarrollo local
  development: {
    // Aquí irían los datos de conexión para desarrollo
    apiUrl: "http://localhost:3001/api",
    timeout: 10000,
  },

  // Configuración para producción
  production: {
    // Aquí irían los datos de conexión para producción
    apiUrl: "https://api.visiontech.com/api",
    timeout: 15000,
  },
}

// Determinar el entorno actual
const environment = process.env.NODE_ENV || "development"

// Exportar la configuración correspondiente al entorno
export default dbConfig[environment]
