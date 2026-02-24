import { describe, expect, it } from "vitest";
import ShowPoster from "./ShowPoster.vue";
import { mount } from "@vue/test-utils";

describe("ShowPoster", () => {
  it("renders the poster image when image is provided", () => {
    const wrapper = mount(ShowPoster, {
      props: {
        image: "https://example.com/poster.jpg",
        name: "Test Show"
      }
    });
    const img = wrapper.find("img");
    expect(img.exists()).toBe(true);
    expect(img.attributes("src")).toBe("https://example.com/poster.jpg");
    expect(img.attributes("alt")).toBe("Poster for Test Show");
  });

  it("renders placeholder when image is not provided", () => {
    const wrapper = mount(ShowPoster, {
      props: {
        image: null,
        name: "Test Show"
      }
    });
    expect(wrapper.find("img").exists()).toBe(false);
    expect(wrapper.text()).toContain("No Image");
  });
});
