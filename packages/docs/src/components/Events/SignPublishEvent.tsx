import { useState } from "react";
import { NDKEvent } from "@nostr-dev-kit/ndk";
import { useNDK } from "@nostr-dev-kit/ndk-react";
import Button from "../common/button";

export default function SignPublishEvent() {
  const { signer, signPublishEvent } = useNDK();
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string>("");

  async function signAndPublishEvent() {
    setLoading(true);

    const note = new NDKEvent();
    note.kind = 1;
    note.content = "Hello World from #NDK!";
    note.tags = [["t", "ndk"]];

    const event = await signPublishEvent(note);
    if (event) {
      setResult(JSON.stringify(event.rawEvent(), null, 2));
    }

    setLoading(false);
  }

  let code = ``;
  code += `import { NDKEvent } from "@nostr-dev-kit/ndk";\n`;
  code += `import { useNDK } from "@nostr-dev-kit/ndk-react";\n`;
  code += `\n`;
  code += `const { signPublishEvent } = useNDK();\n`;
  code += `\n`;
  code += `const note = new NDKEvent();\n`;
  code += `note.kind = 1;\n`;
  code += `note.content = "Hello World from #NDK!";\n`;
  code += `note.tags = [["t", "ndk"]];\n`;
  code += `\n`;
  code += `const event = await signPublishEvent(note);\n`;

  return (
    <>
      <h3>Sign and Publish Events</h3>

      <p>This example shows how to sign and publish events to the relay.</p>

      <pre>
        <code>{code}</code>
      </pre>

      <h4>Demo</h4>

      {signer === undefined && (
        <p>You must be signed in to sign and publish events.</p>
      )}

      <Button
        label="Sign and Publish Event"
        onClick={() => signAndPublishEvent()}
        disabled={loading || signer === undefined}
      />

      {result && (
        <pre>
          <code>{result}</code>
        </pre>
      )}
    </>
  );
}
