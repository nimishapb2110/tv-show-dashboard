import { describe, expect, it } from "vitest";
import ShowPoster from "./ShowPoster.vue";
import { mount } from "@vue/test-utils";

describe("ShowPoster", () => {
  it("renders the poster image when image is provided and applies eager loading when isLcp prop is true", () => {
    const wrapper = mount(ShowPoster, {
      props: {
        image: "https://example.com/poster.jpg",
        name: "Test Show",
        isLcp: true
      }
    });
    const img = wrapper.find("img");
    expect(img.exists()).toBe(true);
    expect(img.attributes("src")).toBe("https://example.com/poster.jpg");
    expect(img.attributes("alt")).toBe("Poster for Test Show");
    expect(img.attributes("loading")).toBe("eager");
    expect(img.attributes("fetchpriority")).toBe("high");
  });

  it("renders placeholder when image is not provided", () => {
    const wrapper = mount(ShowPoster, {
      props: {
        image: null,
        name: "Test Show",
        isLcp: true
      }
    });
    expect(wrapper.find("img").exists()).toBe(false);
    expect(wrapper.text()).toContain("No Image");
  });

  it("applies lazy loading when isLcp prop is false", () => {
    const wrapper = mount(ShowPoster, {
      props: {
        image: "https://example.com/poster.jpg",
        name: "Test Show",
        isLcp: false
      }
    });
    const img = wrapper.find("img");
    expect(img.attributes("loading")).toBe("lazy");
    expect(img.attributes("fetchpriority")).toBeUndefined();
  });
});
