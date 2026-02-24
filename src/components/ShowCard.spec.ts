import { describe, expect, it, beforeEach } from "vitest";
import ShowCard from "./ShowCard.vue";
import { mount } from "@vue/test-utils";
import { mockShow } from "../__fixtures__/shows";
import { createRouter, createMemoryHistory } from "vue-router";

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: { template: "<div></div>" }
    },
    {
      path: "/shows/:id",
      name: "showDetails",
      component: { template: "<div></div>" }
    }
  ]
});

describe("ShowCard", () => {
  beforeEach(async () => {
    await router.push({ name: "home" });
  });
  it("renders show title and rating", () => {
    const wrapper = mount(ShowCard, {
      props: {
        show: mockShow({ name: "Mock Show", rating: { average: 7 } })
      },
      global: {
        plugins: [router]
      }
    });
    expect(wrapper.text()).toContain("Mock Show");
    expect(wrapper.text()).toContain("7");
  });

  it("renders 'N/A' when no rating is available", () => {
    const wrapper = mount(ShowCard, {
      props: {
        show: mockShow({ name: "No Rating Show", rating: { average: null } })
      },
      global: {
        plugins: [router]
      }
    });
    expect(wrapper.text()).toContain("No Rating Show");
    expect(wrapper.text()).toContain("N/A");
  });

  it("renders show image when available", () => {
    const wrapper = mount(ShowCard, {
      props: {
        show: mockShow({
          name: "Image Show",
          image: {
            original: "http://example.com/image-200x300.jpg",
            medium: "http://example.com/image-400x600.jpg"
          }
        })
      },
      global: {
        plugins: [router]
      }
    });
    const img = wrapper.find("img");
    expect(img.exists()).toBe(true);
    expect(img.attributes("src")).toBe("http://example.com/image-200x300.jpg");
  });

  it("navigates to show details page on click", async () => {
    const wrapper = mount(ShowCard, {
      props: {
        show: mockShow({ id: 123, name: "Clickable Show" })
      },
      global: {
        plugins: [router]
      }
    });
    await wrapper.find(".p-card").trigger("click");
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(router.currentRoute.value.name).toBe("showDetails");
    expect(router.currentRoute.value.params.id).toBe("123");
  });
});
