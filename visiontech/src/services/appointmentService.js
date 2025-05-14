// Simulación de base de datos de citas
const appointmentsDB = [
  {
    id: 1,
    patientId: 1,
    doctorId: 2,
    date: "2023-06-15",
    time: "10:00",
    reason: "examen-visual",
    status: "confirmed", 
    notes: "Primera visita",
  },
  {
    id: 2,
    patientId: 1,
    doctorId: 2,
    date: "2023-07-20",
    time: "14:30",
    reason: "lentes-contacto",
    status: "completed",
    notes: "Seguimiento",
  },
  {
    id: 3,
    patientId: 1,
    doctorId: 2,
    date: "2023-08-10",
    time: "11:00",
    reason: "problema-vision",
    status: "cancelled",
    notes: "Cancelado por el paciente",
  },
]

// Función para simular retraso de red
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Servicio de citas
const appointmentService = {
  // Obtener todas las citas
  getAllAppointments: async () => {
    await delay(500)
    return { success: true, appointments: appointmentsDB }
  },

  // Obtener citas de un usuario
  getUserAppointments: async (userId) => {
    await delay(500)
    const appointments = appointmentsDB.filter((a) => a.patientId === userId)
    return { success: true, appointments }
  },

  // Obtener citas de un doctor
  getDoctorAppointments: async (doctorId) => {
    await delay(500)
    const appointments = appointmentsDB.filter((a) => a.doctorId === doctorId)
    return { success: true, appointments }
  },

  // Crear una nueva cita
  createAppointment: async (appointmentData) => {
    await delay(800)

    // En una aplicación real, aquí se enviaría la información a la API
    // Por ahora, simulamos la creación de una nueva cita
    const newAppointment = {
      id: appointmentsDB.length + 1,
      ...appointmentData,
      status: "pending",
    }

    // Agregamos la cita a nuestra "base de datos" simulada
    appointmentsDB.push(newAppointment)

    // Enviamos notificaciones
    await notificationService.sendAppointmentConfirmation(newAppointment)

    return { success: true, appointment: newAppointment }
  },

  // Actualizar una cita
  updateAppointment: async (appointmentId, appointmentData) => {
    await delay(800)

    const appointmentIndex = appointmentsDB.findIndex((a) => a.id === appointmentId)

    if (appointmentIndex === -1) {
      return { success: false, message: "Cita no encontrada" }
    }

    // Actualizamos los datos de la cita
    appointmentsDB[appointmentIndex] = {
      ...appointmentsDB[appointmentIndex],
      ...appointmentData,
    }

    // Si el estado cambió, enviamos notificaciones
    if (appointmentData.status && appointmentData.status !== appointmentsDB[appointmentIndex].status) {
      await notificationService.sendAppointmentStatusUpdate(appointmentsDB[appointmentIndex])
    }

    return { success: true, appointment: appointmentsDB[appointmentIndex] }
  },

  // Cancelar una cita
  cancelAppointment: async (appointmentId, reason) => {
    await delay(800)

    const appointmentIndex = appointmentsDB.findIndex((a) => a.id === appointmentId)

    if (appointmentIndex === -1) {
      return { success: false, message: "Cita no encontrada" }
    }

    // Actualizamos el estado de la cita
    appointmentsDB[appointmentIndex].status = "cancelled"
    appointmentsDB[appointmentIndex].cancellationReason = reason

    // Enviamos notificaciones
    await notificationService.sendAppointmentCancellation(appointmentsDB[appointmentIndex])

    return { success: true, appointment: appointmentsDB[appointmentIndex] }
  },

  // Obtener horarios disponibles
  getAvailableTimeSlots: async (doctorId, date) => {
    await delay(500)

    // En una aplicación real, aquí se consultaría la disponibilidad real
    // Por ahora, devolvemos horarios fijos
    const allTimeSlots = [
      "09:00",
      "09:30",
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "14:00",
      "14:30",
      "15:00",
      "15:30",
      "16:00",
      "16:30",
    ]

    // Filtramos los horarios que ya están ocupados
    const bookedSlots = appointmentsDB
      .filter((a) => a.doctorId === doctorId && a.date === date && a.status !== "cancelled")
      .map((a) => a.time)

    const availableSlots = allTimeSlots.filter((slot) => !bookedSlots.includes(slot))

    return { success: true, availableSlots }
  },
}

// Servicio de notificaciones
const notificationService = {
  // Enviar confirmación de cita
  sendAppointmentConfirmation: async (appointment) => {
    await delay(300)

    // En una aplicación real, aquí se enviaría un correo electrónico
    console.log(`Correo de confirmación enviado al paciente para la cita #${appointment.id}`)
    console.log(`Notificación enviada al doctor para la cita #${appointment.id}`)

    return { success: true }
  },

  // Enviar actualización de estado de cita
  sendAppointmentStatusUpdate: async (appointment) => {
    await delay(300)

    // En una aplicación real, aquí se enviaría un correo electrónico
    console.log(`Correo de actualización enviado al paciente para la cita #${appointment.id}`)
    console.log(`Notificación enviada al doctor para la cita #${appointment.id}`)

    return { success: true }
  },

  // Enviar cancelación de cita
  sendAppointmentCancellation: async (appointment) => {
    await delay(300)

    // En una aplicación real, aquí se enviaría un correo electrónico
    console.log(`Correo de cancelación enviado al paciente para la cita #${appointment.id}`)
    console.log(`Notificación enviada al doctor para la cita #${appointment.id}`)

    return { success: true }
  },
}

export default appointmentService
export { notificationService }
