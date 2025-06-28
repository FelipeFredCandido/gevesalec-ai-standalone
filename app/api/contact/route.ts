import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { contactFormSchema, type ContactFormData } from '@/app/lib/schemas'
import { createNotificationEmailTemplate, createClientConfirmationTemplate } from '@/app/lib/email-templates'

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    // Validar que tenemos la API key
    if (!process.env.RESEND_API_KEY) {
      console.error('❌ RESEND_API_KEY no está configurada')
      return NextResponse.json(
        { 
          success: false, 
          message: 'Configuración de email no disponible. Por favor contacta al administrador.' 
        },
        { status: 500 }
      )
    }

    // Parsear el body de la request
    const body = await request.json()
    
    // Validar los datos usando el mismo schema que el cliente
    const validationResult = contactFormSchema.safeParse(body)
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Datos de formulario inválidos',
          errors: validationResult.error.flatten().fieldErrors
        },
        { status: 400 }
      )
    }
    
    const formData: ContactFormData = validationResult.data
    
    console.log('📧 Procesando nuevo contacto:', {
      nombre: formData.name,
      email: formData.email,
      tipoEmpresa: formData.companyType,
      fecha: new Date().toISOString(),
    })

    // Preparar emails
    const notificationEmail = createNotificationEmailTemplate(formData)
    const confirmationEmail = createClientConfirmationTemplate(formData)
    
    const contactEmail = process.env.CONTACT_EMAIL || 'contacto@gevesalec.com'

    try {
      // Enviar notificación al equipo de GEVESALEC
      const notificationResult = await resend.emails.send({
        from: 'GEVESALEC <noreply@gevesalec.com>',
        to: [contactEmail],
        subject: `🚨 Nueva Consulta: ${formData.name} - ${formData.companyType}`,
        html: notificationEmail,
      })

      // Enviar confirmación al cliente
      const confirmationResult = await resend.emails.send({
        from: 'GEVESALEC <noreply@gevesalec.com>',
        to: [formData.email],
        subject: '✅ Consulta Recibida - GEVESALEC te contactará pronto',
        html: confirmationEmail,
      })

      console.log('✅ Emails enviados exitosamente:', {
        notification: notificationResult.data?.id,
        confirmation: confirmationResult.data?.id,
      })

    } catch (emailError) {
      console.error('❌ Error enviando emails:', emailError)
      
      // Aunque falle el email, no queremos que falle toda la operación
      // El usuario ya completó el formulario, así que respondemos éxito
      // pero loggeamos el error para investigar
      return NextResponse.json({
        success: true,
        message: 'Consulta recibida exitosamente. Nos pondremos en contacto contigo en menos de 24 horas.',
        data: {
          name: formData.name,
          email: formData.email,
          submittedAt: new Date().toISOString(),
        },
        warning: 'Email delivery may be delayed'
      }, { status: 200 })
    }
    
    return NextResponse.json({
      success: true,
      message: 'Consulta agendada exitosamente. Nos pondremos en contacto contigo en menos de 24 horas.',
      data: {
        name: formData.name,
        email: formData.email,
        submittedAt: new Date().toISOString(),
      }
    }, { status: 200 })
    
  } catch (error) {
    console.error('❌ Error procesando formulario de contacto:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error interno del servidor. Por favor intenta nuevamente.' 
      },
      { status: 500 }
    )
  }
}

// Método GET para verificar que el endpoint está disponible
export async function GET() {
  return NextResponse.json({ 
    message: 'Contact API endpoint is running',
    status: 'ok' 
  })
}