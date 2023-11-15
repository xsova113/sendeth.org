import useMediaQuery from "@/hooks/useMediaQuery";
import { getEmailLink } from "@/lib/send";
import { useEffect, useRef, useState } from "react";
import { Currency } from "./Form";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import ToolTip from "@/components/ToolTip";

const Send: React.FC = () => {
  const [fromEmail, setFromEmail] = useState<string>("");
  const [toEmail, setToEmail] = useState<string>("");
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [amount, setAmount] = useState<number | undefined>(5);
  const [currency, setCurrency] = useState<Currency>(Currency.TEST);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef(null);
  const countdownMax = 120;
  function getCurrencyOptionClass(selected: boolean): string {
    const baseClasses =
      "text-gray-50 block px-4 py-2 text-sm m-2 rounded-md cursor-pointer hover:transition-all";
    return selected
      ? `${baseClasses} bg-gray-700`
      : `${baseClasses} hover:bg-gray-700`;
  }

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    console.log("Value", value);
    if (value === "") {
      setAmount(undefined);
      return;
    }
    if (!Number.isInteger(Number(value))) {
      const roundedValue = Math.floor(Number(value));
      setAmount(roundedValue);
    } else {
      setAmount(Number(value));
    }
    if (Number(value) > 100 && currency === Currency.TEST) {
      setAmount(100);
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as any).contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);
  const [emailProviderName, emailLink, emailSearchLink] = getEmailLink(
    fromEmail,
    `Send ${amount} ${Currency[currency]} to ${toEmail}`,
    "",
  );
  const isLargeScreen = useMediaQuery("(min-width: 740px)");

  return (
    <>
      <div className="flex w-[95%] flex-col items-center justify-center gap-2 rounded-[32px] bg-black px-6 py-4 sm:w-[600px] md:w-[700px] lg:w-[850px]">
        <div className="flex w-full items-center border-b-[1px] border-[#515364]/30 py-4">
          <label
            htmlFor="to_email"
            className="mr-2 flex items-center justify-center px-2 py-2 text-sm font-medium text-[#515364]"
          >
            To:
          </label>
          <input
            id="to_email"
            type="email"
            size={isLargeScreen ? 55 : 33}
            className="block rounded-lg border-2 border-[#515364] bg-black px-2 py-2 text-sm text-white placeholder:text-[#515364]"
            placeholder="Email Address OR Wallet Address"
            onChange={(e) => {
              setToEmail(e.target.value);
            }}
            onBlur={(e) => {
              setToEmail(e.target.value);
            }}
          />
          {toEmail.startsWith("0x") && (
            <button
              onClick={() => {
                navigator.clipboard.writeText(toEmail);
              }}
              className="pulsetarget px-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6 text-[#515364]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                />
              </svg>
            </button>
          )}
        </div>
        <div className="flex w-full items-center border-b-[1px] border-[#515364]/30">
          <label
            htmlFor="cc_email"
            className="mr-2 flex items-center justify-center px-2 pb-5 pt-3 text-sm font-medium text-[#515364]"
          >
            cc:
          </label>
          <p
            className="
              mb-3 mt-1 block w-[11rem] rounded-lg border-2 border-[#515364] bg-black px-2.5 py-2 text-sm text-white placeholder:text-[#515364]"
          >
            optimism@sendeth.org
          </p>
          <ToolTip text="Copy to clipboard">
            <button
              onClick={() => {
                navigator.clipboard.writeText("optimism@sendeth.org");
              }}
              className="pulsetarget px-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6 text-[#515364]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                />
              </svg>
            </button>
          </ToolTip>
        </div>
        <div className="flex w-full items-start border-b-[1px] border-[#515364]/30 md:items-center">
          <label
            htmlFor="subject_email"
            className="flex items-center justify-center px-2 pb-5 pt-3 text-sm font-medium text-[#515364]"
          >
            Subject:
          </label>
          <p className="flex w-full flex-col items-start gap-y-3 rounded-lg bg-black pb-3 pt-1 text-sm text-white  placeholder:text-[#515364] md:flex-row md:items-center">
            <div className="flex items-center">
              <span className="mr-1">Send</span>
              <input
                value={amount}
                id="to_email"
                type="email"
                size={5}
                className="mx-1 rounded-lg border-2 border-[#515364] bg-black px-4 py-2 text-sm text-white placeholder:text-[#515364]"
                placeholder="Email Address OR Wallet Address"
                defaultValue={5}
                onChange={(e) => {
                  handleAmountChange(e);
                }}
                onBlur={(e) => {
                  handleAmountChange(e);
                }}
              />
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  className="mr-2 inline-flex h-full items-center justify-center rounded-md border-[1px] border-solid border-[#515364] p-2 text-white"
                  id="menu-button"
                  aria-expanded="true"
                  aria-haspopup="true"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  {Currency[currency]}
                  <svg
                    className="-mr-1 h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {dropdownOpen && (
                  <div
                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-black shadow-lg ring-1
                 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex={-1}
                  >
                    <div className="py-1" role="none">
                      <span
                        className={getCurrencyOptionClass(
                          currency === Currency.TEST,
                        )}
                        role="menuitem"
                        onClick={() => {
                          setCurrency(Currency.TEST);
                          setDropdownOpen(false);
                        }}
                      >
                        TEST
                      </span>
                      <span
                        className={getCurrencyOptionClass(
                          currency === Currency.USDC,
                        )}
                        role="menuitem"
                        onClick={() => {
                          setCurrency(Currency.USDC);
                          setDropdownOpen(false);
                        }}
                      >
                        USDC
                      </span>
                      <span
                        className={getCurrencyOptionClass(
                          currency === Currency.DAI,
                        )}
                        role="menuitem"
                        onClick={() => {
                          setCurrency(Currency.DAI);
                          setDropdownOpen(false);
                        }}
                      >
                        DAI
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <p
                className={`${
                  toEmail.length > 0 ? "" : "text-[#515364]"
                } inline w-[210px] overflow-x-scroll sm:w-[280px] lg:max-w-full`}
              >
                <span className="mr-2 text-white">To</span>
                {toEmail.length > 0
                  ? toEmail
                  : "Email Address OR Wallet Address"}
              </p>
              <ToolTip text="Copy to clipboard">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `Send ${amount?.toFixed(0)} ${
                        Currency[currency]
                      } to ${toEmail}`,
                    );
                  }}
                  className="pulsetarget ml-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6 text-[#515364] max-md:mt-3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                    />
                  </svg>
                </button>
              </ToolTip>
            </div>
          </p>
        </div>
        <div className="start-0 flex w-full">
          <textarea
            className="mt-3 flex w-full rounded-lg border bg-black px-4 py-2 text-sm text-white placeholder:text-[#515364]"
            defaultValue={"Thanks for teaching math!"}
            rows={isLargeScreen ? 8 : 4} /*TODO: fill this in */
          ></textarea>
        </div>

        {emailSent && (
          <>
            <div className="my-4 text-center">
              <p className="text-lg font-medium">
                {countdown
                  ? `Expect a response in ${countdown} seconds...`
                  : "Done processing! You should receive a reply shortly."}
              </p>
            </div>
          </>
        )}

        {emailSent && (
          <div className="flex w-full items-start sm:w-1/2">
            <a
              href={emailSearchLink}
              target="_blank"
              className={
                emailSearchLink
                  ? "flex h-12 w-full items-center justify-center gap-4 rounded-lg bg-gradient-to-t from-tertiary to-tertiary-foreground px-4 py-2 text-primary drop-shadow transition ease-in-out hover:scale-105 hover:transition-all dark:text-primary-foreground"
                  : "pointer-events-none flex h-12 w-full items-center justify-center gap-4 rounded-lg bg-gray-300 px-4 py-2 text-slate-50"
              }
            >
              {emailSearchLink
                ? `View Sent Email in ${emailProviderName} ➜`
                : `View your sent email for updates!`}
            </a>
          </div>
        )}

        <div className="flex w-full items-center justify-end gap-3 text-white">
          <Button
            // className="px-1.5"
            variant={"secondary"}
            onClick={() => {
              document.querySelectorAll(".pulsetarget").forEach((node) => {
                node.classList.add("pulse");
                setTimeout(() => {
                  node.classList.remove("pulse");
                }, 3000);
              });
            }}
          >
            Copy Details
          </Button>
          <p className="text-sm">OR</p>
          <a
            href={
              emailSent && (!countdown || countdown < countdownMax - 2)
                ? `mailto:optimism@sendeth.org?subject=Send%20${amount}%20${Currency[currency]}%20to%20${toEmail}`
                : emailLink
            }
            target="_blank"
            onClick={() => {
              setEmailSent(true);
              setCountdown(countdownMax);
              const intervalId = setInterval(() => {
                setCountdown((prevCountdown) =>
                  prevCountdown ? prevCountdown - 1 : null,
                );
              }, 1000);
              setTimeout(() => {
                clearInterval(intervalId);
                setCountdown(null);
              }, 60000);
            }}
            style={{
              background: `linear-gradient(180deg, #4D94FF 0%, #1766DC 100%)`,
            }}
            className={cn(buttonVariants({ className: "text-white" }))}
          >
            {!emailSent
              ? `Auto-Format Email`
              : `Failed? Re-send via default mail app`}
          </a>
        </div>
      </div>
    </>
  );
};

export default Send;
