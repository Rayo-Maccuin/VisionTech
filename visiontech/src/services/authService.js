// Simulación de base de datos de usuarios
const usersDB = [
  {
    id: 1,
    name: "Dr. Mario Sosa",
    email: "doctor@visiontech.com",
    password: "doctor123",
    role: "doctor",
    specialty: "Oftalmólogo especialista en Córnea",
    phone: "123-456-7891",
    profileImage: "/md.jpg",
    appointments: [1, 2, 3, 4],
  },
  {
    id: 2,
    name: "Administrador Principal",
    email: "admin@admin.com",
    password: "admin2024",
    role: "admin",
    phone: "555-123-4567",
    address: "Av. Administración 456",
    profileImage: "",
    permissions: ["manage_users", "manage_appointments", "manage_products", "manage_settings"],
    lastLogin: "2023-06-10T14:30:00Z",
    createdAt: "2023-01-01T10:00:00Z",
  },
    {
    id: 3,
    name: "Dra. Maria Camila Taborda",
    email: "doctora@visiontech.com",
    password: "doctor123",
    role: "doctor",
    specialty: "Oftalmólogo especialista en Córnea",
    phone: "123-456-7891",
    profileImage: "/cam.jpg",
    appointments: [1, 2, 3, 4], 
  },
]


const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const authService = {
  login: async (email, password) => {
    await delay(800)

    const user = usersDB.find((u) => u.email === email && u.password === password)

    if (user) {
      const { password, ...userWithoutPassword } = user

      localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword))

      return { success: true, user: userWithoutPassword }
    }

    return { success: false, message: "Credenciales incorrectas" }
  },

  logout: () => {
    localStorage.removeItem("currentUser")
    return { success: true }
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem("currentUser")
    return userStr ? JSON.parse(userStr) : null
  },
  isAuthenticated: () => {
    return localStorage.getItem("currentUser") !== null
  },

  isAdmin: () => {
    const user = authService.getCurrentUser()
    return user && user.role === "admin"
  },

  isDoctor: () => {
    const user = authService.getCurrentUser()
    return user && user.role === "doctor"
  },

  register: async (userData) => {
    await delay(1000)

    if (usersDB.some((u) => u.email === userData.email)) {
      return { success: false, message: "El correo electrónico ya está registrado" }
    }


    const newUser = {
      id: usersDB.length + 1,
      ...userData,
      role: "client", 
      appointments: [],
    }

    usersDB.push(newUser)

    const { password, ...userWithoutPassword } = newUser

    return { success: true, user: userWithoutPassword }
  },

  updateUserProfile: async (userId, userData) => {
    await delay(800)

    const userIndex = usersDB.findIndex((u) => u.id === userId)

    if (userIndex === -1) {
      return { success: false, message: "Usuario no encontrado" }
    }

    usersDB[userIndex] = { ...usersDB[userIndex], ...userData }

    const { password, ...userWithoutPassword } = usersDB[userIndex]

    localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword))

    return { success: true, user: userWithoutPassword }
  },

  requestPasswordReset: async (email) => {
    await delay(800)

    const user = usersDB.find((u) => u.email === email)

    if (!user) {
      return { success: false, message: "Correo electrónico no encontrado" }
    }



    return { success: true, message: "Se ha enviado un código de recuperación a tu correo" }
  },


  verifyResetCode: async (email, code) => {
    await delay(500)


    if (code.length === 6 && /^\d+$/.test(code)) {
      return { success: true }
    }

    return { success: false, message: "Código inválido" }
  },


  resetPassword: async (email, newPassword) => {
    await delay(800)

    const userIndex = usersDB.findIndex((u) => u.email === email)

    if (userIndex === -1) {
      return { success: false, message: "Usuario no encontrado" }
    }


    usersDB[userIndex].password = newPassword

    return { success: true, message: "Contraseña actualizada correctamente" }
  },


  getAllUsers: async () => {
    await delay(800)

    const currentUser = authService.getCurrentUser()

    if (!currentUser || currentUser.role !== "admin") {
      return { success: false, message: "No tienes permisos para realizar esta acción" }
    }

    const usersWithoutPasswords = usersDB.map(({ password, ...user }) => user)

    return { success: true, users: usersWithoutPasswords }
  },

  createUser: async (userData) => {
    await delay(1000)

    const currentUser = authService.getCurrentUser()

    if (!currentUser || currentUser.role !== "admin") {
      return { success: false, message: "No tienes permisos para realizar esta acción" }
    }

    if (usersDB.some((u) => u.email === userData.email)) {
      return { success: false, message: "El correo electrónico ya está registrado" }
    }


    const newUser = {
      id: usersDB.length + 1,
      ...userData,
      appointments: [],
    }

    usersDB.push(newUser)


    const { password, ...userWithoutPassword } = newUser

    return { success: true, user: userWithoutPassword }
  },

  deleteUser: async (userId) => {
    await delay(800)

    const currentUser = authService.getCurrentUser()

    if (!currentUser || currentUser.role !== "admin") {
      return { success: false, message: "No tienes permisos para realizar esta acción" }
    }

    const userIndex = usersDB.findIndex((u) => u.id === userId)

    if (userIndex === -1) {
      return { success: false, message: "Usuario no encontrado" }
    }

    usersDB.splice(userIndex, 1)

    return { success: true, message: "Usuario eliminado correctamente" }
  },
}

export default authService

