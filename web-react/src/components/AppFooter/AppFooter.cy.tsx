import AppFooter from "./AppFooter";
import { mount } from "@cypress/react18";

describe("<AppFooter>", () => {
  it("mounts", () => {
    mount(<AppFooter />);
  });
});
