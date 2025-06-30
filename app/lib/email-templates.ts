import { type ContactFormData, companyTypeLabels } from './schemas'

// Template para notificación al equipo de GEVESALEC
export function createNotificationEmailTemplate(data: ContactFormData): string {
  return `
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nueva Consulta - GEVESALEC</title>
        <style>
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            line-height: 1.6;
            color: #374151;
            background-color: #f9fafb;
            margin: 0;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }
          .header {
            background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
            color: white;
            padding: 30px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 700;
          }
          .header p {
            margin: 8px 0 0 0;
            opacity: 0.9;
            font-size: 16px;
          }
          .content {
            padding: 30px;
          }
          .field {
            margin-bottom: 24px;
            padding: 20px;
            background: #f8fafc;
            border-radius: 8px;
            border-left: 4px solid #3b82f6;
          }
          .field-label {
            font-weight: 600;
            color: #1f2937;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 8px;
          }
          .field-value {
            font-size: 16px;
            color: #374151;
            word-wrap: break-word;
          }
          .priority-high {
            border-left-color: #ef4444;
          }
          .footer {
            background: #f8fafc;
            padding: 20px 30px;
            border-top: 1px solid #e5e7eb;
            text-align: center;
            font-size: 14px;
            color: #6b7280;
          }
          .button {
            display: inline-block;
            background: #1e40af;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            margin-top: 20px;
          }
          .timestamp {
            font-size: 12px;
            color: #9ca3af;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🤖 Nueva Consulta Recibida</h1>
            <p>GEVESALEC - Plataforma de IA Contable</p>
          </div>
          
          <div class="content">
            <div class="field priority-high">
              <div class="field-label">👤 Cliente</div>
              <div class="field-value">${data.name}</div>
            </div>
            
            <div class="field">
              <div class="field-label">📧 Email</div>
              <div class="field-value">
                <a href="mailto:${data.email}" style="color: #3b82f6; text-decoration: none;">
                  ${data.email}
                </a>
              </div>
            </div>
            
            <div class="field">
              <div class="field-label">📱 Teléfono</div>
              <div class="field-value">
                <a href="tel:${data.phone}" style="color: #3b82f6; text-decoration: none;">
                  ${data.phone}
                </a>
              </div>
            </div>
            
            <div class="field">
              <div class="field-label">🏢 Tipo de Empresa</div>
              <div class="field-value">${companyTypeLabels[data.companyType]}</div>
            </div>
            
            ${data.situation ? `
            <div class="field">
              <div class="field-label">📋 Situación Contable Actual</div>
              <div class="field-value">${data.situation}</div>
            </div>
            ` : ''}
            
            <div class="timestamp">
              📅 Recibido el ${new Date().toLocaleDateString('es-MX', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'America/Mexico_City'
              })}
            </div>
            
            <center>
              <a href="mailto:${data.email}" class="button">
                💬 Responder Cliente
              </a>
            </center>
          </div>
          
          <div class="footer">
            <p>
              Este email fue enviado automáticamente desde 
              <strong>gevesalec.com</strong>
            </p>
            <p>
              🎯 <strong>Objetivo:</strong> Responder en menos de 24 horas
            </p>
          </div>
        </div>
      </body>
    </html>
  `
}

// Template para confirmación al cliente
export function createClientConfirmationTemplate(data: ContactFormData): string {
  return `
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Consulta Recibida - GEVESALEC</title>
        <style>
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            line-height: 1.6;
            color: #374151;
            background-color: #f9fafb;
            margin: 0;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }
          .header {
            background: linear-gradient(135deg, #10b981 0%, #34d399 100%);
            color: white;
            padding: 40px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
          }
          .header p {
            margin: 12px 0 0 0;
            opacity: 0.95;
            font-size: 18px;
          }
          .content {
            padding: 40px;
          }
          .highlight-box {
            background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
            border: 1px solid #3b82f6;
            border-radius: 12px;
            padding: 24px;
            margin: 24px 0;
            text-align: center;
          }
          .highlight-box h3 {
            color: #1e40af;
            margin: 0 0 12px 0;
            font-size: 20px;
          }
          .highlight-box p {
            margin: 0;
            color: #1e40af;
            font-size: 16px;
          }
          .benefits {
            margin: 30px 0;
          }
          .benefit {
            display: flex;
            align-items: flex-start;
            margin-bottom: 16px;
          }
          .benefit-icon {
            width: 24px;
            height: 24px;
            background: #10b981;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 14px;
            margin-right: 12px;
            flex-shrink: 0;
          }
          .footer {
            background: #f8fafc;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
          }
          .contact-info {
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
            margin: 20px 0;
          }
          .contact-item {
            text-align: center;
            margin: 10px;
          }
          .contact-item a {
            color: #3b82f6;
            text-decoration: none;
            font-weight: 600;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ ¡Consulta Recibida!</h1>
            <p>Hola ${data.name}, gracias por confiar en GEVESALEC</p>
          </div>
          
          <div class="content">
            <p>
              <strong>¡Excelente!</strong> Hemos recibido tu solicitud de consulta gratuita 
              y estamos emocionados de ayudarte a transformar la contabilidad de tu empresa.
            </p>
            
            <div class="highlight-box">
              <h3>⏰ Respuesta Garantizada</h3>
              <p>Nuestro equipo se pondrá en contacto contigo en menos de <strong>24 horas</strong></p>
            </div>
            
            <h3 style="color: #1f2937; margin-top: 30px;">🎯 Qué esperar en tu consulta:</h3>
            
            <div class="benefits">
              <div class="benefit">
                <div class="benefit-icon">🔍</div>
                <div>
                  <strong>Análisis personalizado</strong> de tu situación contable actual
                </div>
              </div>
              
              <div class="benefit">
                <div class="benefit-icon">📊</div>
                <div>
                  <strong>Identificación de oportunidades</strong> de optimización fiscal
                </div>
              </div>
              
              <div class="benefit">
                <div class="benefit-icon">🤖</div>
                <div>
                  <strong>Demostración de nuestras herramientas de IA</strong> contable
                </div>
              </div>
              
              <div class="benefit">
                <div class="benefit-icon">💰</div>
                <div>
                  <strong>Propuesta personalizada</strong> sin compromiso alguno
                </div>
              </div>
              
              <div class="benefit">
                <div class="benefit-icon">⚡</div>
                <div>
                  <strong>Plan de implementación</strong> para automatizar tus procesos
                </div>
              </div>
            </div>
            
            <p style="color: #6b7280; font-style: italic; text-align: center; margin: 30px 0;">
              "Más de 50 empresas mexicanas ya confían en nuestra tecnología de IA 
              para optimizar su contabilidad y cumplimiento fiscal"
            </p>
          </div>
          
          <div class="footer">
            <h4 style="color: #1f2937; margin-bottom: 20px;">📞 ¿Tienes alguna pregunta urgente?</h4>
            
            <div class="contact-info">
              <div class="contact-item">
                <div>📧 Email</div>
                <a href="mailto:contacto@gevesalec.com">contacto@gevesalec.com</a>
              </div>
              
              <div class="contact-item">
                <div>📱 WhatsApp</div>
                <a href="https://wa.me/528116801924">+52 (81) 1680-1924</a>
              </div>
            </div>
            
            <p style="font-size: 14px; color: #6b7280; margin-top: 20px;">
              GEVESALEC - El primer despacho contable mexicano potenciado por Inteligencia Artificial<br>
              <strong>Síguenos:</strong> 
              <a href="#" style="color: #3b82f6;">LinkedIn</a> | 
              <a href="#" style="color: #3b82f6;">Facebook</a> | 
              <a href="#" style="color: #3b82f6;">Twitter</a>
            </p>
          </div>
        </div>
      </body>
    </html>
  `
}