import { useNDK } from "@nostr-dev-kit/ndk-react";

export default function Provider({}) {
  const { loadNdk } = useNDK();

  let code = ``;
  code += `import type { AppProps } from "next/app";\n`;
  code += `import { NDKProvider } from "@nostr-dev-kit/ndk-react";\n`;
  code += `\n`;
  code += `export default function App({ Component, pageProps }: AppProps) {\n`;
  code += `  return (\n`;
  code += `    <NDKProvider>\n`;
  code += `      <Component {...pageProps} />\n`;
  code += `    </NDKProvider>\n`;
  code += `  );\n`;
  code += `}\n`;

  let code2 = ``;
  code2 += `const { loadNdk } = useNDK();\n`;
  code2 += `\n`;
  code2 += `function updateRelayUrls() {\n`;
  code2 += `  loadNdk(["wss://relay1", "wss://relay2", "wss://relay3"]);\n`;
  code2 += `}\n`;

  return (
    <>
      <h2>NDKProvider</h2>
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

      <h3>Update relay URLs</h3>
      <p>
        You can update the relay URLs with <code>loadNdk()</code>. Simply pass
        in a list of URLs:
      </p>
      <pre>
        <code>{code2}</code>
      </pre>
    </>
  );
}
