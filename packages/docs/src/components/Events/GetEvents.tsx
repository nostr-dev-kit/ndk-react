import { useState } from "react";
import { NDKFilter, NDKEvent } from "@nostr-dev-kit/ndk";
import { useNDK } from "@nostr-dev-kit/ndk-react";

export default function GetEvents() {
  const { fetchEvents } = useNDK();
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<NDKEvent[]>([]);

  async function getEvents() {
    setLoading(true);
    const filter: NDKFilter = {
      kinds: [1],
      "#t": ["ndk"],
    };

    const events = await fetchEvents(filter);
    setResults(events);

    setLoading(false);
  }

  let code = ``;
  code += `import { useNDK } from "@nostr-dev-kit/ndk-react";\n`;
  code += `import { NDKFilter } from "@nostr-dev-kit/ndk";\n`;
  code += `\n`;
  code += `const { fetchEvents } = useNDK();\n`;
  code += `\n`;
  code += `const filter: NDKFilter = {\n`;
  code += `  kinds: [1],\n`;
  code += `  "#t": ["ndk"],\n`;
  code += `};\n`;
  code += `\n`;
  code += `const events = await fetchEvents(filter);\n`;

  return (
    <>
      <h3>Get Events</h3>

      <p>
        This example shows how to fetch events from relay. You define the filter
        to get events and then call the fetchEvents function. The result is an
        array of <code>NDKEvent</code> events.
      </p>

      <pre>
        <code>{code}</code>
      </pre>

      {/* <h4>Demo</h4>

      <Button
        label={loading ? "..." : "Get Events"}
        onClick={() => getEvents()}
        disabled={loading}
      />

      {results.map((event, index) => {
        const content = parseContent(event);

        return content.map(({ type, value }, i) => {
          if (type === "text") return <span key={index}>{value}</span>;
        });
      })} */}
    </>
  );
}
