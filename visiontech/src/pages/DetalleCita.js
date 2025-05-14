"use client"

import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import "./Citas.css"
import authService from "../services/authService"
import appointmentService from "../services/appointmentService"

function DetalleCita() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [appointment, setAppointment] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const currentUser = authService.getCurrentUser()
    if (!currentUser) {
      navigate("/login")
      return
    }
    setUser(currentUser)

    const loadAppointmentDetails = async () => {
      try {
        setLoading(true)

        setTimeout(() => {
          appointmentService.getUserAppointments(currentUser.id).then((result) => {
            if (result.success) {
              const foundAppointment = result.appointments.find((a) => a.id === Number.parseInt(id))

              if (foundAppointment) {
                setAppointment(foundAppointment)
              } else {
                setError("Cita no encontrada")
              }

              setLoading(false)
            } else {
              setError("Error al cargar la cita")
              setLoading(false)
            }
          })
        }, 800)
      } catch (error) {
        console.error("Error al cargar los detalles de la cita:", error)
        setError("Error al cargar los detalles de la cita")
        setLoading(false)
      }
    }

    loadAppointmentDetails()
  }, [id, navigate])

  const handleCancelAppointment = async () => {
    if (window.confirm("¿Estás seguro de que deseas cancelar esta cita?")) {
      try {
        setLoading(true)
        const result = await appointmentService.cancelAppointment(appointment.id, "Cancelado por el usuario")

        if (result.success) {
          setAppointment({ ...appointment, status: "cancelled" })
        } else {
          alert("Error al cancelar la cita")
        }
      } catch (error) {
        console.error("Error al cancelar la cita:", error)
        alert("Error al cancelar la cita")
      } finally {
        setLoading(false)
      }
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "Pendiente"
      case "confirmed":
        return "Confirmada"
      case "cancelled":
        return "Cancelada"
      case "completed":
        return "Completada"
      default:
        return "Desconocido"
    }
  }

  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "status-pending"
      case "confirmed":
        return "status-confirmed"
      case "cancelled":
        return "status-cancelled"
      case "completed":
        return "status-completed"
      default:
        return ""
    }
  }

  const getReasonText = (reason) => {
    switch (reason) {
      case "examen-visual":
        return "Examen Visual"
      case "lentes-contacto":
        return "Lentes de Contacto"
      case "problema-vision":
        return "Problema de Visión"
      case "seguimiento":
        return "Consulta de Seguimiento"
      default:
        return "Otro"
    }
  }

  if (loading) {
    return (
      <div className="appointment-detail-page">
        <div className="container">
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !appointment) {
    return (
      <div className="appointment-detail-page">
        <div className="container">
          <div className="appointment-detail-card">
            <h2 className="appointment-title">Error</h2>
            <p>{error || "No se pudo cargar la cita"}</p>
            <Link to="/perfil" className="btn btn-primary">
              Volver al Perfil
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="appointment-detail-page">
      <div className="container">
        <div className="appointment-detail-card">
          <div className="appointment-header">
            <div>
              <h2 className="appointment-title">Detalles de la Cita</h2>
              <p className="appointment-id">ID: {appointment.id}</p>
            </div>
            <span className={`appointment-status-badge ${getStatusClass(appointment.status)}`}>
              {getStatusText(appointment.status)}
            </span>
          </div>

          <div className="appointment-info">
            <div className="info-section">
              <h3 className="info-section-title">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                Información de la Cita
              </h3>
              <div className="info-list">
                <div className="info-item">
                  <div className="info-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                  </div>
                  <div className="info-content">
                    <div className="info-label">Fecha</div>
                    <div className="info-value">
                      {format(new Date(appointment.date), "EEEE d 'de' MMMM 'de' yyyy", { locale: es })}
                    </div>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </div>
                  <div className="info-content">
                    <div className="info-label">Hora</div>
                    <div className="info-value">{appointment.time}</div>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                  </div>
                  <div className="info-content">
                    <div className="info-label">Motivo</div>
                    <div className="info-value">{getReasonText(appointment.reason)}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="info-section">
              <h3 className="info-section-title">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Información del Doctor
              </h3>
              <div className="info-list">
                <div className="info-item">
                  <div className="info-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <div className="info-content">
                    <div className="info-label">Nombre</div>
                    <div className="info-value">Dr. Mario Sosa</div>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <div className="info-content">
                    <div className="info-label">Especialidad</div>
                    <div className="info-value">Oftalmólogo especialista en Córnea</div>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div className="info-content">
                    <div className="info-label">Contacto</div>
                    <div className="info-value">+123 456 7891</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {appointment.notes && (
            <div className="notes-section">
              <h3 className="notes-title">Notas</h3>
              <div className="notes-content">{appointment.notes}</div>
            </div>
          )}

          <div className="appointment-actions">
            {appointment.status === "pending" || appointment.status === "confirmed" ? (
              <>
                <button className="action-btn btn-cancel" onClick={handleCancelAppointment}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                  </svg>
                  Cancelar Cita
                </button>
                <button className="action-btn btn-reschedule" onClick={() => navigate("/citas")}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 2v6h-6"></path>
                    <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
                    <path d="M3 22v-6h6"></path>
                    <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
                  </svg>
                  Reagendar
                </button>
              </>
            ) : null}
            <button className="action-btn btn-print" onClick={() => window.print()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 6 2 18 2 18 9"></polyline>
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                <rect x="6" y="14" width="12" height="8"></rect>
              </svg>
              Imprimir
            </button>
            <Link to="/perfil" className="action-btn btn-print">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Volver al Perfil
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetalleCita
