import { useState } from "react";
import Input from "../common/input";
import Button from "../common/button";
import { useNDK } from "@nostr-dev-kit/ndk-react";

export default function LogInNostrConnect() {
  const [input, setInput] = useState<string>(
    "npub1alpha9l6f7kk08jxfdaxrpqqnd7vwcz6e6cvtattgexjhxr2vrcqk86dsn"
  );
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  let code = ``;
  code += `import { useNDK } from "@nostr-dev-kit/ndk-react";\n`;
  code += `\n`;
  code += `const { loginWithNip46 } = useNDK();\n`;
  code += `\n`;
  code += `const user = await loginWithNip46(npubOrToken);\n`;

  let code2 = `const user = await loginWithNip46(npubOrToken, sk);`;

  const { loginWithNip46 } = useNDK();

  async function connect() {
    setLoading(true);
    const user = await loginWithNip46(input);
    if (user) {
      setResult(JSON.stringify(user, null, 2));
    }
    setLoading(false);
  }

  return (
    <>
      <h3>Login with Nostr Connect</h3>

      <p>
        Login with Nostr Connect allows you to connect and sign events remotely
        without the client holding the private key of your nostr account. Read
        about{" "}
        <a
          href="https://github.com/nostr-protocol/nips/blob/master/46.md"
          rel="noreferrer"
          target="_blank"
        >
          NIP-46
        </a>{" "}
        to learn more.
      </p>

      <pre>
        <code>{code}</code>
      </pre>

      <p>
        To reconnect to user's account, you have to save user's{" "}
        <code>npub</code> and <code>sk</code>, and then use them to login again.
      </p>

      <pre>
        <code>{code2}</code>
      </pre>

      <h4>Demo</h4>

      <Input
        value={input}
        placeholder="input your npub"
        label="npub or token"
        onChange={setInput}
      />

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Button
          label={loading ? "..." : "Connect"}
          onClick={() => connect()}
          disabled={loading}
        />
      </div>

      {result && (
        <pre>
          <code>{result}</code>
        </pre>
      )}
    </>
  );
}
