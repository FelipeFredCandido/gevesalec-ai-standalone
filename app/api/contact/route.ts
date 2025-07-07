import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { contactFormSchema, type ContactFormData } from '@/app/lib/schemas'
import { createNotificationEmailTemplate, createClientConfirmationTemplate } from '@/app/lib/email-templates'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
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

    // Enviar emails usando Resend
    try {
      // Email de notificación para el equipo
      const notificationEmail = createNotificationEmailTemplate(formData)
      const { data: notificationData, error: notificationError } = await resend.emails.send({
        from: 'GEVESALEC <onboarding@resend.dev>',
        to: ['contacto@gevesalec.com'],
        subject: `Nueva consulta de ${formData.name}`,
        html: notificationEmail,
      })

      if (notificationError) {
        console.error('❌ Error enviando email de notificación:', notificationError)
        throw notificationError
      }

      // Email de confirmación para el cliente
      const confirmationEmail = createClientConfirmationTemplate(formData)
      const { data: confirmationData, error: confirmationError } = await resend.emails.send({
        from: 'GEVESALEC <onboarding@resend.dev>',
        to: [formData.email],
        subject: 'Confirmación de tu consulta - GEVESALEC',
        html: confirmationEmail,
      })

      if (confirmationError) {
        console.error('❌ Error enviando email de confirmación:', confirmationError)
        throw confirmationError
      }

      console.log('✅ Emails enviados exitosamente:', {
        notification: notificationData?.id,
        confirmation: confirmationData?.id
      })
      
    } catch (emailError) {
      console.error('❌ Error enviando emails:', emailError)
      // No fallar la request si el email falla, solo registrar el error
    }
    
    return NextResponse.json({
      success: true,
      message: 'Consulta recibida exitosamente. Nos pondremos en contacto contigo en menos de 24 horas.',
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