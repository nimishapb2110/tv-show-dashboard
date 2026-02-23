import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import RatingBadge from "./RatingBadge.vue";

describe("RatingBadge", () => {
  it("should render correct rating when value provided", () => {
    const wrapper = mount(RatingBadge, {
      props: {
        rating: 4.5
      }
    });
    expect(wrapper.text()).toContain("4.5");
  });
  it("should render 'N/A' when no rating value provided", () => {
    const wrapper = mount(RatingBadge, {
      props: {
        rating: null
      }
    });
    expect(wrapper.text()).toContain("N/A");
  });
  it("should render filled star icon", () => {
    const wrapper = mount(RatingBadge, {
      props: {
        rating: 3
      }
    });
    expect(wrapper.find(".pi-star-fill").exists()).toBe(true);
  });
  it("should render empty star icon", () => {
    const wrapper = mount(RatingBadge, {
      props: {
        rating: null
      }
    });
    expect(wrapper.find(".pi-star").exists()).toBe(true);
  });
});
