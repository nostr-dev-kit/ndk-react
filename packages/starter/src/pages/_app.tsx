import "@/styles/globals.css";
import { NDKProvider } from "@nostr-dev-kit/ndk-react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NDKProvider>
      <Component {...pageProps} />
    </NDKProvider>
  );
}
