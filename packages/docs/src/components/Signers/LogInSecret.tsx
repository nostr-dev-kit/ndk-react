import { useState } from "react";
import Input from "../common/input";
import Button from "../common/button";
import { useNDK } from "@nostr-dev-kit/ndk-react";

export default function LogInSecret() {
  const [input, setInput] = useState<string>(
    "nsec1zyxuyap3zmewe7089wwnja2t0sjj2ql6ut7n4w58dcnwpgn0jzeqpjjsvc"
  );
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  let code = ``;
  code += `import { useNDK } from "@nostr-dev-kit/ndk-react";\n`;
  code += `\n`;
  code += `const { loginWithSecret } = useNDK();\n`;
  code += `\n`;
  code += `const user = await loginWithSecret(nsecOrSecretKey);\n`;

  const { loginWithSecret } = useNDK();

  async function connectSecret() {
    setLoading(true);
    const user = await loginWithSecret(input);
    if (user) {
      setResult(JSON.stringify(user, null, 2));
    }
    setLoading(false);
  }

  return (
    <>
      <h3>Login with Secret</h3>

      <p>
        Login with Secret is a function that allows you to login with a secret
        key or nsec. This function will return a user object that contains the
        user's information.
      </p>

      <pre>
        <code>{code}</code>
      </pre>

      <h4>Demo</h4>

      <Input
        value={input}
        placeholder="input your nsec"
        label="nsec or secret key"
        onChange={setInput}
      />

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Button
          label={loading ? "..." : "Connect"}
          onClick={() => connectSecret()}
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
