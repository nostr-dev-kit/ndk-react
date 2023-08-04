import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NDKProvider } from "@nostr-dev-kit/ndk-react";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>NDK React Starter</title>
        <link rel="icon" sizes="192x192" href="/ndk.svg" />
      </Head>

      <NDKProvider
        relayUrls={[
          "wss://relay.damus.io",
          "wss://relay.snort.social",
          "wss://purplepag.es",
        ]}
      >
        <Component {...pageProps} />
      </NDKProvider>
    </>
  );
}
