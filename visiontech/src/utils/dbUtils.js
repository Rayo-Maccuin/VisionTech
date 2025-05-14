// Utilidades para trabajar con la base de datos
import dbConfig from "../config/database"

// Función para realizar peticiones a la API
export const apiRequest = async (endpoint, options = {}) => {
  const url = `${dbConfig.apiUrl}/${endpoint}`

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      // Aquí se añadiría el token de autenticación cuando esté implementado
      // "Authorization": `Bearer ${getToken()}`
    },
    timeout: dbConfig.timeout,
  }

  const fetchOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  }

  try {
    // Añadir timeout a la petición fetch
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), fetchOptions.timeout)

    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`)
    }

    // Parsear la respuesta como JSON
    const data = await response.json()
    return data
  } catch (error) {
    // Manejar errores específicos
    if (error.name === "AbortError") {
      throw new Error(`La petición ha excedido el tiempo límite de ${fetchOptions.timeout}ms`)
    }

    throw error
  }
}

// Función para obtener el token de autenticación
export const getToken = () => {
  // En una implementación real, esto obtendría el token del localStorage o similar
  return localStorage.getItem("authToken")
}

// Función para guardar el token de autenticación
export const setToken = (token) => {
  // En una implementación real, esto guardaría el token en localStorage o similar
  localStorage.setItem("authToken", token)
}

// Función para eliminar el token de autenticación
export const removeToken = () => {
  // En una implementación real, esto eliminaría el token del localStorage o similar
  localStorage.removeItem("authToken")
}

// Función para verificar si hay un token válido
export const hasValidToken = () => {
  const token = getToken()

  if (!token) {
    return false
  }

  // En una implementación real, aquí se verificaría si el token ha expirado
  // Por ahora, simplemente verificamos que exista
  return true
}
