// import { Resend } from 'resend';

export const sendEmail = async (
  to: string,
  subject: string,
  template: React.ReactNode,
) => {
  console.log('sendEmail', to, subject, template);
  // TODO: add resend
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // const { error } = await resend.emails.send({
  //   from: 'onboarding@resend.dev',
  //   to,
  //   subject,
  //   text: '',
  //   react: template,
  // });
  // if (error) {
  //   throw error;
  // }
};
