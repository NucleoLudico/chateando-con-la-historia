/**
 * Simulador básico de envío de email (console log).
 */

exports.sendRecoveryEmail = async (to, content) => {
  console.log(`[EMAIL] a ${to}: ${content}`);
  // Aquí puedes integrar nodemailer u otro servicio real.
};
