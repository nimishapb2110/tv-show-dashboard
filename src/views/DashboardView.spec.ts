import DashboardView from "./DashboardView.vue";
import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { useShowsStore } from "../store/shows";
import { createTestingPinia } from "@pinia/testing";

describe("DashboardView", () => {
  it("calls fetchShows on mount", () => {
    mount(DashboardView, {
      global: {
        plugins: [createTestingPinia()]
      }
    });
    const showsStore = useShowsStore();
    expect(showsStore.fetchShows).toHaveBeenCalled();
  });

  it("shows loading state when isLoading is true", () => {
    const wrapper = mount(DashboardView, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              shows: {
                isLoading: true
              }
            }
          })
        ]
      }
    });
    expect(wrapper.text()).toContain("Loading...");
  });

  it("shows error message when error is set", () => {
    const wrapper = mount(DashboardView, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              shows: {
                error: "Failed to fetch shows!"
              }
            }
          })
        ]
      }
    });
    expect(wrapper.text()).toContain("Failed to fetch shows!");
  });

  it("calls fetchShows when retry button is clicked", async () => {
    const wrapper = mount(DashboardView, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              shows: {
                error: "Failed to fetch shows!"
              }
            }
          })
        ]
      }
    });
    const showsStore = useShowsStore();
    await wrapper.find("button").trigger("click");
    expect(showsStore.fetchShows).toHaveBeenCalled();
  });

  it("calls handleRetry which calls searchShows when in search mode", async () => {
    const wrapper = mount(DashboardView, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              shows: {
                error: "Failed to search shows!",
                searchQuery: "test query",
                isSearchMode: true
              }
            }
          })
        ]
      }
    });
    const showsStore = useShowsStore();
    await wrapper.find("button").trigger("click");
    expect(showsStore.searchShows).toHaveBeenCalledWith("test query");
  });

  it("calls handleRetry which calls fetchShows when not in search mode", async () => {
    const wrapper = mount(DashboardView, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              shows: {
                error: "Failed to fetch shows!",
                isSearchMode: false
              }
            }
          })
        ]
      }
    });
    const showsStore = useShowsStore();
    await wrapper.find("button").trigger("click");
    expect(showsStore.fetchShows).toHaveBeenCalled();
  });
});
