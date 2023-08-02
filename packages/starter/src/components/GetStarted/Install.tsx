export default function Install() {
  let code = "npm install @nostr-dev-kit/ndk-react";
  return (
    <>
      <h3>Install</h3>
      <p>Execute this command to create a new Next.js application:</p>

      <pre>
        <code>npx create-next-app@latest --typescript .</code>
      </pre>

      <p>
        To get started with NDK-React, install the package from npm or yarn.
      </p>

      <pre>
        <code>{code}</code>
      </pre>
    </>
  );
}
