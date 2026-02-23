import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import ErrorMessage from "./ErrorMessage.vue";

describe("ErrorMessage", () => {
  it("should render error message when message prop is provided", () => {
    const wrapper = mount(ErrorMessage, {
      props: {
        message: "An error occurred!"
      }
    });
    expect(wrapper.text()).toContain("An error occurred!");
    expect(wrapper.find(".error-message").exists()).toBe(true);
  });
  it("should emit retry event when retry button is clicked", async () => {
    const wrapper = mount(ErrorMessage, {
      props: {
        message: "An error occurred!"
      }
    });
    await wrapper.find("button").trigger("click");
    expect(wrapper.emitted("retry")).toBeTruthy();
  });
});
