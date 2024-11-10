import * as React from 'react';

interface EmailTemplateProps {
  name: string;
  email: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  email,
  message,
}) => (
  <div>
    <h1>New Contact Form Submission</h1>
    <p>You have received a new message from the contact form on CareerCanvas:</p>
    <table>
      <tr>
        <td><strong>Name:</strong></td>
        <td>{name}</td>
      </tr>
      <tr>
        <td><strong>Email:</strong></td>
        <td>{email}</td>
      </tr>
      <tr>
        <td><strong>Message:</strong></td>
        <td>{message}</td>
      </tr>
    </table>
  </div>
);

export default EmailTemplate;