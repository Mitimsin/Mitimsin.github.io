import "../styles/contact.css";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export const Contact = () => {
  const form = useRef<HTMLFormElement>(null);
  const emailRegex = /\S+@\S+\.\S+/;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();

    const nameInput = (e.currentTarget as HTMLFormElement)[
      "user_name"
    ] as HTMLInputElement;
    const emailInput = (e.currentTarget as HTMLFormElement)[
      "user_email"
    ] as HTMLInputElement;
    const messageInput = (e.currentTarget as HTMLFormElement)[
      "user_message"
    ] as HTMLInputElement;

    if (!nameInput.value || !emailInput.value || !messageInput.value) {
      alert("Please fill in all fields.");
      return;
    }

    if (!emailRegex.test(emailInput.value)) {
      alert("Please enter a valid E-mail.");
      return;
    }

    if (messageInput.value.length < 10) {
      alert("Please enter a message with at least 10 characters.");
      return;
    }

    setButtonText("Sending...");

    if (form.current) {
      emailjs
        .sendForm(
          "service_8f8d38r",
          "template_86s8q3e",
          form.current,
          "JzUNGp4EWrniAzZkq"
        )
        .then(
          (result) => {
            console.log(result.text);
            setButtonText("Send");
          },
          (error) => {
            console.log(error.text);
          }
        );
    }
  };

  const [buttonText, setButtonText] = useState("Send");

  return (
    <section className="contact" id="contact">
      <form ref={form} onSubmit={handleSend} className="contact-form">
        <label>Name</label>
        <input type="text" name="user_name" />
        <label>E-mail</label>
        <input type="email" name="user_email" />
        <label>Message</label>
        <textarea name="user_message" />
        <input
          type="submit"
          value={buttonText}
          className="contact-form-button"
        />
      </form>
    </section>
  );
};
