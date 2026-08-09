"use client";

import Link from "next/link";
import { FormEvent, useRef, useState } from "react";
import useSWRMutation from "swr/mutation";
import { RoundButton } from "@/components";

type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
  app: string;
};

type ContactResponse = {
  ok?: boolean;
  error?: string;
  message?: string;
  retryAfterSeconds?: number;
};

class ContactError extends Error {
  status: number;
  payload: ContactResponse | null;

  constructor(
    message: string,
    status: number,
    payload: ContactResponse | null,
  ) {
    super(message);
    this.name = "ContactError";
    this.status = status;
    this.payload = payload;
  }
}

const inputClassName =
  "paragraph w-full font-NeueMontreal font-normal text-secondry bg-background border-b border-[#21212155] focus:border-secondry text-center sm:text-left xm:text-left outline-none focus:placeholder:opacity-0 mt-[20px] transform transition duration-200 ease-in-out sm:w-full xm:w-full";

async function sendContact(
  url: string,
  { arg }: { arg: ContactPayload },
): Promise<ContactResponse> {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(arg),
  });

  const payload = (await response
    .json()
    .catch(() => null)) as ContactResponse | null;

  if (response.status === 429) {
    throw new ContactError(
      payload?.error ||
        "Too many requests. You can send another inquiry in about 1 hour.",
      429,
      payload,
    );
  }

  if (!response.ok || payload?.ok === false) {
    throw new ContactError(
      payload?.error || "Failed to send inquiry. Please try again.",
      response.status,
      payload,
    );
  }

  return (
    payload ?? { ok: true, message: "Accepted. Email will be sent shortly." }
  );
}

export default function Form() {
  const formRef = useRef<HTMLFormElement>(null);
  const [validationError, setValidationError] = useState("");

  const { trigger, isMutating, data, error, reset } = useSWRMutation(
    "/api/contact",
    sendContact,
    { revalidate: false },
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isMutating) return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") || "").trim();
    const company = String(formData.get("company") || "").trim();
    const goal = String(formData.get("goal") || "").trim();
    const deadline = String(formData.get("deadline") || "").trim();
    const budget = String(formData.get("budget") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const details = String(formData.get("details") || "").trim();
    const agreed = formData.get("privacy") === "on";

    reset();

    if (!agreed) {
      setValidationError(
        "Please agree with the Privacy Policy before sending.",
      );
      return;
    }

    if (!name || !email || !goal) {
      setValidationError("Name, email, and project goal are required.");
      return;
    }

    setValidationError("");

    const message = [
      `Company: ${company || "—"}`,
      `Looking for help with: ${goal}`,
      `Target completion: ${deadline || "—"}`,
      `Budget: ${budget || "—"}`,
      "",
      "More details:",
      details || "—",
    ].join("\n");

    try {
      await trigger({
        name,
        email,
        subject: goal.slice(0, 200),
        message,
        app: "soralabs-landing",
      });
      form.reset();
    } catch {
      // Error surface comes from useSWRMutation `error`
    }
  }

  const feedback =
    validationError ||
    (error instanceof Error ? error.message : "") ||
    (data?.ok
      ? data.message || "Inquiry sent. I will get back to you soon."
      : "");

  const feedbackTone =
    validationError || error ? "error" : data?.ok ? "success" : "idle";

  return (
    <section className="w-full padding-x padding-y">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-[15px]"
      >
        <div className="w-full flex gap-[15px] sm:flex-col xm:flex-col">
          <div className="flex gap-[10px] w-[50%] sm:w-full xm:w-full sm:flex-col xm:flex-col">
            <div className="xl:min-w-max lg:min-w-max md:min-w-max">
              <h2 className="sub-heading font-NeueMontreal font-normal text-secondry">
                Hi! My name is
              </h2>
            </div>
            <div className="w-full">
              <input
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Enter your name*"
                className={inputClassName}
              />
            </div>
          </div>
          <div className="flex gap-[10px] w-[50%] sm:w-full xm:w-full sm:flex-col xm:flex-col">
            <div className="xl:min-w-max lg:min-w-max md:min-w-max">
              <h2 className="sub-heading font-NeueMontreal font-normal text-secondry">
                and I work with
              </h2>
            </div>
            <div className="w-full">
              <input
                name="company"
                type="text"
                autoComplete="organization"
                placeholder="Company name type here*"
                className={inputClassName}
              />
            </div>
          </div>
        </div>

        <div className="w-full flex gap-[10px]">
          <div className="flex gap-[10px] w-full sm:flex-col xm:flex-col">
            <div className="xl:min-w-max lg:min-w-max md:min-w-max">
              <h2 className="sub-heading font-NeueMontreal font-normal text-secondry">
                I’m looking for a partner to help me with
              </h2>
            </div>
            <div className="w-full">
              <input
                name="goal"
                type="text"
                required
                placeholder="Your goal type here*"
                className={inputClassName}
              />
            </div>
          </div>
        </div>

        <div className="w-full flex gap-[10px]">
          <div className="flex gap-[10px] w-full sm:flex-col xm:flex-col">
            <div className="xl:min-w-max lg:min-w-max md:min-w-max">
              <h2 className="sub-heading font-NeueMontreal font-normal text-secondry">
                With an idea of having that completed
              </h2>
            </div>
            <div className="w-full">
              <input
                name="deadline"
                type="text"
                placeholder="Date*"
                className={inputClassName}
              />
            </div>
          </div>
        </div>

        <div className="w-full flex gap-[10px]">
          <div className="flex gap-[10px] w-full sm:flex-col xm:flex-col">
            <div className="xl:min-w-max lg:min-w-max md:min-w-max">
              <h2 className="sub-heading font-NeueMontreal font-normal text-secondry">
                I am hoping to stay around a budget range of
              </h2>
            </div>
            <div className="w-full">
              <input
                name="budget"
                type="text"
                placeholder="Select*"
                className={inputClassName}
              />
            </div>
          </div>
        </div>

        <div className="w-full flex gap-[10px]">
          <div className="flex gap-[10px] w-full sm:flex-col xm:flex-col">
            <div className="xl:min-w-max lg:min-w-max md:min-w-max">
              <h2 className="sub-heading font-NeueMontreal font-normal text-secondry">
                You can reach me at
              </h2>
            </div>
            <div className="w-full">
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="name@example.com"
                className={inputClassName}
              />
            </div>
            <div className="xl:min-w-max lg:min-w-max md:min-w-max">
              <h2 className="sub-heading font-NeueMontreal font-normal text-secondry">
                to start the conversation.
              </h2>
            </div>
          </div>
        </div>

        <div className="w-full flex gap-[10px]">
          <div className="flex gap-[10px] w-full sm:flex-col xm:flex-col">
            <div className="xl:min-w-max lg:min-w-max md:min-w-max">
              <h2 className="sub-heading font-NeueMontreal font-normal text-secondry">
                Optionally, i’m sharing more:
              </h2>
            </div>
            <div className="w-full">
              <input
                name="details"
                type="text"
                placeholder="Product details type here..."
                className={inputClassName}
              />
            </div>
          </div>
        </div>

        <div className="w-full flex items-center justify-end sm:justify-start xm:justify-start pt-[50px]">
          <div className="flex sm:flex-col xm:flex-col gap-[25px]">
            <div className="flex gap-[10px] items-center">
              <div className="flex gap-[10px]">
                <input
                  name="privacy"
                  type="checkbox"
                  required
                  className="w-[30px]"
                />
                <p className="paragraph text-secondry font-NeueMontreal font-normal">
                  I agree with the
                </p>
              </div>
              <Link
                className="paragraph font-medium font-NeueMontreal text-secondry capitalize flex flex-col hover"
                href="/"
              >
                Privacy Policy
              </Link>
            </div>

            <div
              className={`w-fit flex items-center justify-between bg-secondry rounded-full group ${
                isMutating ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
              }`}
              onClick={(event) => {
                event.preventDefault();
                if (isMutating) return;
                formRef.current?.requestSubmit();
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  if (isMutating) return;
                  formRef.current?.requestSubmit();
                }
              }}
              role="button"
              tabIndex={0}
              aria-disabled={isMutating}
              aria-label="Send inquiry"
            >
              <RoundButton
                bgcolor="#212121"
                href="#"
                title={isMutating ? "sending..." : "send inquiry"}
                className="bg-white text-black pointer-events-none"
                style={{ color: "#fff" }}
              />
            </div>
          </div>
        </div>

        {feedback ? (
          <div className="w-full flex items-center justify-end sm:justify-start xm:justify-start">
            <p
              className={`paragraph font-NeueMontreal pt-[20px] ${
                feedbackTone === "success" ? "text-secondry" : "text-red-600"
              }`}
              role="status"
              aria-live="polite"
            >
              {feedback}
            </p>
          </div>
        ) : null}
      </form>
    </section>
  );
}
