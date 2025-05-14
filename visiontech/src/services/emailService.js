// Servicio para enviar correos electrónicos
// En una aplicación real, esto se haría desde el servidor

// Función para simular retraso de red
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Plantillas de correo
const emailTemplates = {
  // Plantilla para confirmación de cita
  appointmentConfirmation: (appointment, patientName, doctorName) => ({
    subject: "Confirmación de Cita - VisionTech",
    body: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="logo.png" alt="VisionTech Logo" style="height: 60px;">
        </div>
        
        <h2 style="color: #1E2F5F; margin-bottom: 20px;">¡Tu cita ha sido agendada!</h2>
        
        <p>Hola <strong>${patientName}</strong>,</p>
        
        <p>Tu cita con <strong>${doctorName}</strong> ha sido agendada correctamente. A continuación, te proporcionamos los detalles:</p>
        
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Fecha:</strong> ${appointment.date}</p>
          <p><strong>Hora:</strong> ${appointment.time}</p>
          <p><strong>Motivo:</strong> ${
            appointment.reason === "examen-visual"
              ? "Examen Visual"
              : appointment.reason === "lentes-contacto"
                ? "Lentes de Contacto"
                : appointment.reason === "problema-vision"
                  ? "Problema de Visión"
                  : appointment.reason === "seguimiento"
                    ? "Consulta de Seguimiento"
                    : "Otro"
          }</p>
        </div>
        
        <p>Si necesitas modificar o cancelar tu cita, puedes hacerlo a través de tu perfil en nuestra página web o contactándonos directamente.</p>
        
        <p>¡Gracias por confiar en VisionTech para el cuidado de tu salud visual!</p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; text-align: center;">
          <p>Este es un correo automático, por favor no respondas a este mensaje.</p>
          <p>© ${new Date().getFullYear()} VisionTech. Todos los derechos reservados.</p>
        </div>
      </div>
    `,
  }),

  // Plantilla para notificación al doctor
  doctorNotification: (appointment, patientName) => ({
    subject: "Nueva Cita Agendada - VisionTech",
    body: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="logo.png" alt="VisionTech Logo" style="height: 60px;">
        </div>
        
        <h2 style="color: #1E2F5F; margin-bottom: 20px;">Nueva Cita Agendada</h2>
        
        <p>Se ha agendado una nueva cita con el paciente <strong>${patientName}</strong>. A continuación, los detalles:</p>
        
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Fecha:</strong> ${appointment.date}</p>
          <p><strong>Hora:</strong> ${appointment.time}</p>
          <p><strong>Motivo:</strong> ${
            appointment.reason === "examen-visual"
              ? "Examen Visual"
              : appointment.reason === "lentes-contacto"
                ? "Lentes de Contacto"
                : appointment.reason === "problema-vision"
                  ? "Problema de Visión"
                  : appointment.reason === "seguimiento"
                    ? "Consulta de Seguimiento"
                    : "Otro"
          }</p>
          <p><strong>Notas:</strong> ${appointment.notes || "Sin notas adicionales"}</p>
        </div>
        
        <p>Puedes ver más detalles y gestionar tus citas desde el panel de administración.</p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; text-align: center;">
          <p>Este es un correo automático, por favor no respondas a este mensaje.</p>
          <p>© ${new Date().getFullYear()} VisionTech. Todos los derechos reservados.</p>
        </div>
      </div>
    `,
  }),

  passwordReset: (name, resetCode) => ({
    subject: "Recuperación de Contraseña - VisionTech",
    body: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="logo.png" alt="VisionTech Logo" style="height: 60px;">
        </div>
        
        <h2 style="color: #1E2F5F; margin-bottom: 20px;">Recuperación de Contraseña</h2>
        
        <p>Hola <strong>${name}</strong>,</p>
        
        <p>Hemos recibido una solicitud para restablecer tu contraseña. Utiliza el siguiente código para completar el proceso:</p>
        
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
          <h3 style="font-size: 24px; letter-spacing: 5px; color: #1E2F5F;">${resetCode}</h3>
        </div>
        
        <p>Este código es válido por 30 minutos. Si no has solicitado este cambio, puedes ignorar este correo.</p>
        
        <p>¡Gracias por confiar en VisionTech!</p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; text-align: center;">
          <p>Este es un correo automático, por favor no respondas a este mensaje.</p>
          <p>© ${new Date().getFullYear()} VisionTech. Todos los derechos reservados.</p>
        </div>
      </div>
    `,
  }),
}


const emailService = {

  sendEmail: async (to, template, data) => {
    await delay(800)

    // En una aplicación real, aquí se enviaría el correo a través de una API
    // Por ahora, simulamos el proceso

    // Obtener la plantilla correspondiente
    const emailContent = emailTemplates[template](...data)

    console.log(`Correo enviado a ${to}`)
    console.log(`Asunto: ${emailContent.subject}`)
    console.log(`Contenido: ${emailContent.body.substring(0, 100)}...`)

    return { success: true }
  },

  // Enviar confirmación de cita al paciente
  sendAppointmentConfirmation: async (appointment, patientEmail, patientName, doctorName) => {
    return await emailService.sendEmail(patientEmail, "appointmentConfirmation", [appointment, patientName, doctorName])
  },

  // Enviar notificación al doctor
  sendDoctorNotification: async (appointment, doctorEmail, patientName) => {
    return await emailService.sendEmail(doctorEmail, "doctorNotification", [appointment, patientName])
  },

  // Enviar código de recuperación de contraseña
  sendPasswordResetCode: async (email, name, resetCode) => {
    return await emailService.sendEmail(email, "passwordReset", [name, resetCode])
  },
}

export default emailService
