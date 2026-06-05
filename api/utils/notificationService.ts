import nodemailer from "nodemailer";
import { db } from "../config/firebaseConfig.ts";
import { logger } from "./logger.ts";

export interface OrderNotificationPayload {
  id: string;
  customerInfo: {
    name: string;
    phone: string;
    address: string;
    city: string;
  };
  items: Array<{
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  paymentMethod: string;
  totalAmount: number;
}

function escapeHtml(str: string): string {
  if (typeof str !== "string") return String(str || "");
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function sendOrderAlert(order: OrderNotificationPayload) {
  try {
    if (!db) {
      logger.warn("Database not configured, skipping order notification check.");
      return;
    }

    // 1. Check setting flag before sending
    const settingsDoc = await db.collection("settings").doc("general").get();
    const settingsData = settingsDoc.exists ? settingsDoc.data() : null;
    const newOrderAlertsEnabled = settingsData?.notifications?.newOrderAlerts !== false;

    if (!newOrderAlertsEnabled) {
      logger.info(`Order alert notification disabled in settings for order ${order.id}`);
      return;
    }

    // 2. Resolve recipient email
    const supportEmail = settingsData?.supportEmail || "support@pureorigins.com";
    const adminEmailsEnv = process.env.ADMIN_EMAILS || "";
    const recipients = Array.from(
      new Set(
        [supportEmail, ...adminEmailsEnv.split(",")]
          .map(e => e.trim().toLowerCase())
          .filter(e => e && e.includes("@"))
      )
    );

    if (recipients.length === 0) {
      logger.warn("No valid recipient emails configured for order alerts.");
      return;
    }

    const itemsHtml = order.items
      .map(
        item => `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #e1e8ed; text-align: left;">${escapeHtml(item.name || "")}</td>
          <td style="padding: 10px; border-bottom: 1px solid #e1e8ed; text-align: center;">${Number(item.quantity) || 0}</td>
          <td style="padding: 10px; border-bottom: 1px solid #e1e8ed; text-align: right;">৳ ${Number(item.price) || 0}</td>
          <td style="padding: 10px; border-bottom: 1px solid #e1e8ed; text-align: right;">৳ ${(Number(item.price) || 0) * (Number(item.quantity) || 0)}</td>
        </tr>
      `
      )
      .join("");

    const emailSubject = `🔔 [PureOrigins] New Order Alert: #${escapeHtml(order.id || "")}`;
    const emailBodyHtml = `
      <div style="font-family: inherit; color: #1c2b1c; max-width: 600px; margin: 0 auto; border: 1px solid #d4dec9; border-radius: 16px; overflow: hidden; background: #fffcf8;">
        <div style="background-color: #0f3310; color: #ffffff; padding: 24px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px; letter-spacing: 0.5px;">New Order Placed!</h1>
          <p style="margin: 8px 0 0 0; opacity: 0.85; font-size: 14px;">Order ID: #${escapeHtml(order.id || "")}</p>
        </div>
        
        <div style="padding: 24px;">
          <h2 style="font-size: 18px; border-bottom: 2px solid #0f3310; padding-bottom: 8px; margin-top: 0;">Customer Details</h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
            <tr>
              <td style="padding: 4px 0; font-weight: bold; width: 30%;">Name:</td>
              <td style="padding: 4px 0;">${escapeHtml(order.customerInfo.name || "")}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; font-weight: bold;">Phone:</td>
              <td style="padding: 4px 0;">${escapeHtml(order.customerInfo.phone || "")}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; font-weight: bold;">Address:</td>
              <td style="padding: 4px 0;">${escapeHtml(order.customerInfo.address || "")}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; font-weight: bold;">City:</td>
              <td style="padding: 4px 0;">${escapeHtml(order.customerInfo.city || "")}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; font-weight: bold;">Payment Method:</td>
              <td style="padding: 4px 0;">${escapeHtml(order.paymentMethod || "")}</td>
            </tr>
          </table>

          <h2 style="font-size: 18px; border-bottom: 2px solid #0f3310; padding-bottom: 8px; margin-top: 24px;">Order Summary</h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
            <thead>
              <tr style="background: #f1f6ef; font-weight: bold;">
                <th style="padding: 10px; text-align: left;">Item</th>
                <th style="padding: 10px; text-align: center;">Qty</th>
                <th style="padding: 10px; text-align: right;">Price</th>
                <th style="padding: 10px; text-align: right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
              <tr>
                <td colspan="3" style="padding: 12px 10px; text-align: right; font-weight: bold;">Grand Total:</td>
                <td style="padding: 12px 10px; text-align: right; font-weight: bold; color: #015c00; font-size: 16px;">৳ ${order.totalAmount}</td>
              </tr>
            </tbody>
          </table>
          
          <div style="background-color: #fcf6eb; border-left: 4px solid #b57a10; padding: 12px; margin-top: 24px; border-radius: 4px; font-size: 13px;">
            Please visit the Admin Panel to mark this order as "In Transit" or "Delivered".
          </div>
        </div>
        
        <div style="background-color: #f4eae1; text-align: center; padding: 16px; font-size: 12px; color: #73796f;">
          &copy; 2026 PureOrigins. Organic Wellness directly to your door.
        </div>
      </div>
    `;

    // 3. Lazy configure transport or mock fallback
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env;

    if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
      const portVal = Number(SMTP_PORT) || 587;
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: portVal,
        secure: portVal === 465,
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS
        }
      });

      await transporter.sendMail({
        from: SMTP_FROM || `"PureOrigins Notifications" <${SMTP_USER}>`,
        to: recipients.join(", "),
        subject: emailSubject,
        html: emailBodyHtml
      });

      logger.info(`Successfully sent email order notification for order: ${order.id} to ${recipients.join(", ")}`);
    } else {
      // Graceful local notification log
      logger.info("========================================= NEW ORDER ALERTSIGNAL =========================================");
      logger.info(`ORDER NOTIFICATION SIMULATED (SMTP credentials not provided in .env template)`);
      logger.info(`TO: ${recipients.join(", ")}`);
      logger.info(`SUBJECT: ${emailSubject}`);
      logger.info(`CUSTOMER: ${order.customerInfo.name} (${order.customerInfo.phone})`);
      logger.info(`ITEMS COUNT: ${order.items.length}, TOTAL VALUE: ৳ ${order.totalAmount}`);
      logger.info("==========================================================================================================");
    }
  } catch (error) {
    logger.error({ err: error }, "Failed to send order notification");
  }
}
