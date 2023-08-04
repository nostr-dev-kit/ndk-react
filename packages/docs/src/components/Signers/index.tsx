import LogInExtension from "./LogInExtension";
import LogInNostrConnect from "./LogInNostrConnect";
import LogInSecret from "./LogInSecret";

export default function Signers() {
  return (
    <>
      <h2 id="Signers">Signers</h2>
      <LogInExtension />
      <LogInNostrConnect />
      <LogInSecret />
    </>
  );
}
