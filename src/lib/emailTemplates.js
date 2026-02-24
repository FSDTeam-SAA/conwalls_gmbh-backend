// ✅ ESM
const verificationCodeTemplate = (code) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 10px; background-color: #f9f9f9;">
    <h1 style="color: #333; text-align: center;">Verification Code</h1>
    <p style="font-size: 16px; color: #555;">Hello,</p>
    <p style="font-size: 16px; color: #555;">Thank you for using our services. Your verification code is:</p>
    <p style="font-size: 24px; font-weight: bold; text-align: center; color: #007BFF;">${code}</p>
    <p style="font-size: 16px; color: #555;">Please enter this code within 5 minutes to verify your account.</p>
    <p style="font-size: 16px; color: #555;">If you did not request this code, please ignore this email.</p>
    <footer style="border-top: 1px solid #ddd; padding-top: 10px; margin-top: 20px; text-align: center; font-size: 12px; color: #aaa;">
      &copy; 2023 Your Company Name. All rights reserved.
    </footer>
  </div>
`;

export default verificationCodeTemplate;


export const getPaymentSuccessTemplate = ({ name, eventId, slots }) => {
  const slotDetails = slots
    .map(
      (slot, index) =>
        `<li><strong>Slot ${index + 1}:</strong> ${slot.date} from ${slot.startTime} to ${slot.endTime}</li>`
    )
    .join('');

  return `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>✅ Booking Confirmed</h2>
      <p>Dear ${name},</p>
      <p>Your payment has been successfully received and your booking has been confirmed.</p>
      <p><strong>Event ID:</strong> ${eventId}</p>
      <p><strong>Slot(s) Booked:</strong></p>
      <ul>
        ${slotDetails}
      </ul>
      <br />
      <p>Thank you for choosing our service.</p>
      <p>We look forward to seeing you at the event.</p>
      <br />
    
      
    </div>
  `;
};


// auto refunded template

export const getConflictAfterPaymentTemplate = ({
  name,
  email,
  phone,
  eventId,
  eventTitle,
  selectedDate,
  selectedSlots = [],
  sessionId,
  paymentIntentId,
  refundAmount,
}) => {
  const slotDetails = selectedSlots
    .map(
      (slot, index) =>
        `<li><strong>Slot ${index + 1}:</strong> ${slot.date} from ${slot.startTime} to ${slot.endTime}</li>`
    )
    .join('');

  return `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>⚠️ Booking Conflict Detected After Payment</h2>

      <p><strong>Customer Details:</strong></p>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Phone:</strong> ${phone}</li>
      </ul>

      <p><strong>Event Details:</strong></p>
      <ul>
        <li><strong>Event ID:</strong> ${eventId}</li>
        <li><strong>Event Title:</strong> ${eventTitle || 'N/A'}</li>
        <li><strong>Date:</strong> ${selectedDate}</li>
      </ul>

      <p><strong>Attempted Slot(s):</strong></p>
      <ul>
        ${slotDetails}
      </ul>

      <p><strong>Stripe Info:</strong></p>
      <ul>
        <li><strong>Session ID:</strong> ${sessionId}</li>
        <li><strong>Payment Intent ID:</strong> ${paymentIntentId}</li>
        ${
          refundAmount
            ? `<li><strong>Refund Amount:</strong> $${(refundAmount / 100).toFixed(2)}</li>`
            : ''
        }
        <li><strong>Refund Status:</strong> Refund automatically processed</li>
      </ul>

      <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>

      <br />
      <p style="color: red;">
        ⚠️ Some of the selected slots were already booked by the time payment completed.<br/>
        The booking was not created, and the payment has been refunded.
      </p>
    </div>
  `;
};

export const getPaymentSuccessForAdminTemplate = ({ name, email, phone, eventId, slots }) => {
  const slotDetails = slots
    .map(
      (slot, index) =>
        `<li><strong>Slot ${index + 1}:</strong> ${slot.date} from ${slot.startTime} to ${slot.endTime}</li>`
    )
    .join('');

  return `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>📥 New Booking Received</h2>
      <p><strong>User Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Event ID:</strong> ${eventId}</p>
      <p><strong>Slot(s) Booked:</strong></p>
      <ul>
        ${slotDetails}
      </ul>
      <br />
      <p>This booking has been paid and confirmed via Stripe.</p>
      <p>Please make necessary arrangements for the event.</p>
    </div>
  `;
};

export const getWelcomeUserTemplate = ({ name, email, password, websiteUrl }) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px; overflow: hidden; background-color: #f9f9f9;">
      
      <!-- Header -->
      <div style="background-color: #007BFF; padding: 30px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 26px;">Welcome to Our Platform! 🎉</h1>
      </div>

      <!-- Body -->
      <div style="padding: 30px;">
        <p style="font-size: 16px; color: #555;">Hi <strong>${name}</strong>,</p>
        <p style="font-size: 16px; color: #555;">
          We're thrilled to have you on board. Your account has been successfully created. 
          Below are your login credentials — please keep them safe.
        </p>

        <!-- Credentials Box -->
        <div style="background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0; border-bottom: 1px solid #eee; padding-bottom: 10px;">🔐 Your Login Credentials</h3>
          <table style="width: 100%; font-size: 15px; color: #555;">
            <tr>
              <td style="padding: 8px 0;"><strong>📧 Email:</strong></td>
              <td style="padding: 8px 0;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0;"><strong>🔑 Password:</strong></td>
              <td style="padding: 8px 0;">${password}</td>
            </tr>
          </table>
        </div>

        <p style="font-size: 14px; color: #e53935; font-weight: bold;">
          ⚠️ For your security, please change your password after your first login.
        </p>

        <!-- CTA Button -->
        <div style="text-align: center; margin: 30px 0;">
          <a 
            href="${websiteUrl}" 
            style="background-color: #007BFF; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: bold; display: inline-block;"
          >
            🚀 Login to Your Account
          </a>
        </div>

        <p style="font-size: 15px; color: #555;">
          If you have any questions or need help getting started, feel free to reach out to our support team.
        </p>

        <p style="font-size: 15px; color: #555;">
          Best regards,<br/>
          <strong>The Support Team</strong>
        </p>
      </div>

      <!-- Footer -->
      <div style="border-top: 1px solid #ddd; padding: 16px; text-align: center; background-color: #f1f1f1;">
        <p style="font-size: 12px; color: #aaa; margin: 0;">
          &copy; ${new Date().getFullYear()} Your Company Name. All rights reserved.
        </p>
        <p style="font-size: 12px; color: #aaa; margin: 4px 0 0;">
          <a href="${websiteUrl}" style="color: #007BFF; text-decoration: none;">Visit our website</a>
        </p>
      </div>

    </div>
  `;
};