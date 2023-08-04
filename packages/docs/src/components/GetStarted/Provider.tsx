export default function Provider() {
  let code = ``;
  code += `import type { AppProps } from "next/app";\n`;
  code += `import { NDKProvider } from "@nostr-dev-kit/ndk-react";\n`;
  code += `\n`;
  code += `export default function App({ Component, pageProps }: AppProps) {\n`;
  code += `  return (\n`;
  code += `    <NDKProvider\n`;
  code += `      relayUrls={[\n`;
  code += `        "wss://relay.damus.io",\n`;
  code += `        "wss://relay.snort.social",\n`;
  code += `        "wss://purplepag.es",\n`;
  code += `      ]}\n`;
  code += `    >\n`;
  code += `      <Component {...pageProps} />\n`;
  code += `    </NDKProvider>\n`;
  code += `  );\n`;
  code += `}\n`;

  let code2 = ``;
  code2 += `import { useNDK } from "@nostr-dev-kit/ndk-react";\n`;
  code2 += `\n`;
  code2 += `const {\n`;
  code2 += `  ndk,\n`;
  code2 += `  signer,\n`;
  code2 += `  fetchEvents,\n`;
  code2 += `  fetchEventsEOSE,\n`;
  code2 += `  loginWithNip07,\n`;
  code2 += `  loginWithNip46,\n`;
  code2 += `  loginWithSecret,\n`;
  code2 += `  signPublishEvent,\n`;
  code2 += `} = useNDK();\n`;

  return (
    <>
      <h3>NDK Provider</h3>
      <p>
        <code>NDKProvider</code> is a React Context Provider that wraps your app
        and provides the NDK instance to all child components.
      </p>
      <p>
        In your <code>_app.tsx</code> file, wrap your app with{" "}
        <code>NDKProvider</code>:
      </p>
      <pre>
        <code>{code}</code>
      </pre>

      <h3>
        <code>useNDK()</code>
      </h3>
      <p>
        Once you've wrapped your app with <code>NDKProvider</code>, you can use
        the <code>useNDK</code> hook to access the NDK instance and other useful
        functions.
      </p>
      <pre>
        <code>{code2}</code>
      </pre>
    </>
  );
}
