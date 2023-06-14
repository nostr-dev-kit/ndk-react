import { useNDK } from "@nostr-dev-kit/ndk-react";

export default function GetProfile({}) {
  const { getUser, getProfile } = useNDK();

  let code1 = `const { getProfile } = useNDK();\n\n`;
  code1 += `<p>\n`;
  code1 += `  User's display name is:\n`;
  code1 += `  {\n`;
  code1 += `    getProfile(\n`;
  code1 += `      "npub1alpha9l6f7kk08jxfdaxrpqqnd7vwcz6e6cvtattgexjhxr2vrcqk86dsn"\n`;
  code1 += `    ).displayName\n`;
  code1 += `  }\n`;
  code1 += `</p>\n`;

  let code2 = `const { getProfile } = useNDK();\n\n`;
  code2 += `<img\n`;
  code2 += `  src={\n`;
  code2 += `    getProfile(\n`;
  code2 += `      "npub1alpha9l6f7kk08jxfdaxrpqqnd7vwcz6e6cvtattgexjhxr2vrcqk86dsn"\n`;
  code2 += `    ).image\n`;
  code2 += `  }\n`;
  code2 += `/>\n`;

  let code3 = ``;
  code3 += `export interface NDKUserProfile {\n`;
  code3 += `  name?: string;\n`;
  code3 += `  displayName?: string;\n`;
  code3 += `  image?: string;\n`;
  code3 += `  banner?: string;\n`;
  code3 += `  bio?: string;\n`;
  code3 += `  nip05?: string;\n`;
  code3 += `  lud06?: string;\n`;
  code3 += `  lud16?: string;\n`;
  code3 += `  about?: string;\n`;
  code3 += `  zapService?: string;\n`;
  code3 += `}\n`;

  return (
    <>
      <h2>Get User Profile</h2>
      <p>
        <code>getProfile()</code> returns the <code>NDKUserProfile</code> of a
        given <code>npub</code> or <code>hexpubkey</code>. Using this ensures
        that the profile is queried once and stored in <code>useRef()</code>.
      </p>

      <p>For example, to get the display name of the user:</p>
      <pre>
        <code>{code1}</code>
      </pre>
      <p>
        User's display name is:{" "}
        <code>
          {
            getProfile(
              "npub1alpha9l6f7kk08jxfdaxrpqqnd7vwcz6e6cvtattgexjhxr2vrcqk86dsn"
            ).displayName
          }
        </code>
      </p>

      <p>For example, to get the avatar of the user:</p>
      <pre>
        <code>{code2}</code>
      </pre>

      <img
        src={
          getProfile(
            "npub1alpha9l6f7kk08jxfdaxrpqqnd7vwcz6e6cvtattgexjhxr2vrcqk86dsn"
          ).image
        }
      />

      <p>
        Other attributes of <code>NDKUserProfile</code> you can get from{" "}
        <code>getProfile()</code>:
      </p>
      <pre>
        <code>{code3}</code>
      </pre>
    </>
  );
}
