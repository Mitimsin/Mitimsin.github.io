import "../styles/contact.css";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { TfiEmail } from "react-icons/tfi";

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
            setButtonText("Sent");
            form.current?.reset();

            setTimeout(() => {
              setButtonText("Send");
            }, 5000);
          },
          (error) => {
            console.log(error.text);
            setButtonText("Failed!");

            setTimeout(() => {
              setButtonText("Send");
            }, 5000);
          }
        );
    }
  };

  const [buttonText, setButtonText] = useState("Send");

  return (
    <section className="contact" id="contact">
      <div className="spacer wave2"></div>
      <h1 className="contact-header ">Have Some Questions?</h1>
      <p className="contact-text">
        mert.gurer@hotmail.com.tr <br /> +90 534 069 97 79
      </p>
      <div className="contact-area">
        <div className="contact-image">
          <TfiEmail size={350} />
        </div>
        <form ref={form} onSubmit={handleSend} className="contact-form">
          <input
            type="text"
            name="user_name"
            placeholder="Full Name"
            className="contact-input-field"
          />
          <input
            type="email"
            name="user_email"
            placeholder="E-mail"
            className="contact-input-field"
          />
          <input
            type="text"
            name="user_company"
            placeholder="Company"
            className="contact-input-field"
          />
          <textarea
            name="user_message"
            className="contact-input-field"
            placeholder="Message"
            style={{ resize: "none", height: "10em" }}
          />
          <input
            type="submit"
            value={buttonText}
            className="contact-form-button"
          />
        </form>
      </div>
    </section>
  );
};
