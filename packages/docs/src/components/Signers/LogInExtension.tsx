import { useState } from "react";
import Button from "../common/button";
import { useNDK } from "@nostr-dev-kit/ndk-react";

export default function LogInExtension() {
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  let code = ``;
  code += `import { useNDK } from "@nostr-dev-kit/ndk-react";\n`;
  code += `\n`;
  code += `const { loginWithNip07 } = useNDK();\n`;
  code += `\n`;
  code += `const user = await loginWithNip07();\n`;

  const { loginWithNip07 } = useNDK();

  async function connectExtension() {
    setLoading(true);
    const user = await loginWithNip07();
    if (user) {
      setResult(JSON.stringify(user, null, 2));
    }
    setLoading(false);
  }

  return (
    <>
      <h3>Login with Extension</h3>

      <p>
        Login with Extension allows you to use your browser extension to login
        to your account. This function will return a user object that contains
        the user's information. Read about{" "}
        <a
          href="https://github.com/nostr-protocol/nips/blob/master/07.md"
          rel="noreferrer"
          target="_blank"
        >
          NIP-07
        </a>{" "}
        to learn more.
      </p>

      <pre>
        <code>{code}</code>
      </pre>

      <h4>Demo</h4>

      <Button
        label={loading ? "..." : "Connect with Extension"}
        onClick={() => connectExtension()}
        disabled={loading}
      />

      {result && (
        <pre>
          <code>{result}</code>
        </pre>
      )}
    </>
  );
}
