import GetEvents from "./GetEvents";
import SignPublishEvent from "./SignPublishEvent";

export default function Events() {
  return (
    <>
      <h2 id="Events">Events</h2>
      <GetEvents />
      <SignPublishEvent />
    </>
  );
}
