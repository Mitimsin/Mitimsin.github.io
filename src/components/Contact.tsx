import "../styles/contact.css";
import { useContext, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { TfiEmail } from "react-icons/tfi";
import { DataContext } from "../App";

export const Contact = () => {
    const { info } = useContext(DataContext);
    const form = useRef<HTMLFormElement>(null);
    const emailRegex = /\S+@\S+\.\S+/;
    const [sending, setSending] = useState(false);

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

        setSending(true);

        if (form.current) {
            emailjs
                .sendForm(
                    "service_bq9e22w",
                    "template_86s8q3e",
                    form.current,
                    "JzUNGp4EWrniAzZkq"
                )
                .then(
                    (result) => {
                        alert("Your message has been sent successfully.");
                        form.current?.reset();
                        setSending(false);
                    },
                    (error) => {
                        alert("There was an error while sending the message.");
                        setSending(false);
                    }
                );
        }
    };

    const openMail = () => {
        const recipient = info.mail;

        const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(
            ""
        )}&body=${encodeURIComponent("")}`;

        window.location.href = mailtoLink;
    };

    return (
        <section className="contact" id="contact">
            <div className="spacer wave2"></div>
            <h1 className="contact-header ">Have Some Questions?</h1>
            <div className="contact-text">
                <button
                    className="contact-mail-button"
                    onClick={() => openMail()}
                >
                    {info.mail}
                </button>
                <br /> {info.phone}
            </div>
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
                        placeholder="Company (Optional)"
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
                        disabled={sending}
                        className={`contact-form-button ${
                            sending ? "blur" : ""
                        }`}
                    />
                </form>
            </div>
        </section>
    );
};
